import Lenis from 'lenis';

const LOOP_SLIDER_SELECTORS = {
  root: ['[data-loop-slider="root"]', '.loop-slider-wrapper', '.slider-section'],
  track: ['[data-loop-slider="track"]', '.loop-slider-track'],
  list: ['[data-loop-slider="list"]', '.slider-wrapper'],
  loop: ['[data-loop-slider="loop"]', '.loop-slider.w-dyn-list', '.loop-slider'],
  item: ['[data-loop-slider="item"]', '.slide-w'],
  content: ['[data-loop-slider="content"]', '.slide'],
  blur: ['[data-loop-slider="blur"]', '.slide-blur'],
  media: ['[data-loop-slider="focus"]', '.work-list-img-wrap img', '.work-list-img-wrap'],
} as const satisfies Record<string, readonly string[]>;

const LOOP_SLIDER_CONFIG = {
  baseScale: 0.7,
  focusScale: 1,
  blurMax: 60,
  translateMax: 0,
  lerp: 0.08,
  progressLerp: 0.12,
  minOpacity: 0,
  safeZoneBuffer: 32, // 3rem buffer outside the viewport
  initialOffset: 0.125, // 12.5% of viewport height starting "scrolled up"
};

type SlideState = {
  node: HTMLElement;
  contentNode: HTMLElement;
  blurNode: HTMLElement | null;
  focusNodes: HTMLElement[];
  progress: number;
  targetProgress: number;
  scale: number;
  targetScale: number;
};

const LENIS_STYLE_ID = 'loop-slider-lenis-styles';
const LENIS_STYLES =
  'html.lenis,html.lenis body{height:auto}.lenis:not(.lenis-autoToggle).lenis-stopped{overflow:clip}.lenis [data-lenis-prevent],.lenis [data-lenis-prevent-wheel],.lenis [data-lenis-prevent-touch]{overscroll-behavior:contain}.lenis.lenis-smooth iframe{pointer-events:none}.lenis.lenis-autoToggle{transition-property:overflow;transition-duration:1ms;transition-behavior:allow-discrete}';
const LOOP_SLIDER_SNAP_ATTR = 'data-loop-slider-snap';

let sliderAnimationFrame: number | null = null;
let sliderScrollListenerAttached = false;
let sliderResizeListenerAttached = false;

const loopSliderInstances: LoopSliderInstance[] = [];

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

const ensureLenisStyles = () => {
  if (document.getElementById(LENIS_STYLE_ID)) {
    return;
  }

  const style = document.createElement('style');
  style.id = LENIS_STYLE_ID;
  style.textContent = LENIS_STYLES;
  document.head.appendChild(style);
};

const queryElementWithFallback = <T extends Element>(
  root: ParentNode | Document,
  selectors: readonly string[]
): T | null => {
  for (const selector of selectors) {
    const element = root.querySelector<T>(selector);
    if (element) {
      return element;
    }
  }

  return null;
};

const queryAllWithFallback = <T extends Element>(
  root: ParentNode | Document,
  selectors: readonly string[]
): T[] => {
  for (const selector of selectors) {
    const elements = Array.from(root.querySelectorAll<T>(selector));
    if (elements.length) {
      return elements;
    }
  }

  return [];
};

const getLoopSliderRoots = () => {
  const roots = queryAllWithFallback<HTMLElement>(document, LOOP_SLIDER_SELECTORS.root);
  return roots.filter((root) => queryElementWithFallback(root, LOOP_SLIDER_SELECTORS.list));
};

class LoopSliderInstance {
  public readonly root: HTMLElement;
  public readonly prefersInfinite: boolean;
  private readonly config = LOOP_SLIDER_CONFIG;
  private slides: SlideState[] = [];
  private viewportHeight = window.innerHeight || 0;
  private primaryList: HTMLElement | null = null;
  private loopHeight = 0;
  private loopOffset = 0;
  private virtualScroll = 0;
  private loopIndex = 0;
  private previousScroll: number | null = null;
  private trackElement: HTMLElement | null = null;
  private loopLists: HTMLElement[] = [];
  private localLenis: Lenis | null = null;
  private localLenisRaf: number | null = null;
  private handleLenisScroll?: () => void;

  constructor(root: HTMLElement) {
    this.root = root;
    this.prefersInfinite = root.dataset.loopSliderInfinite !== 'false';

    const track = queryElementWithFallback<HTMLElement>(root, LOOP_SLIDER_SELECTORS.track);
    const list = queryElementWithFallback<HTMLElement>(root, LOOP_SLIDER_SELECTORS.list);

    if (!list || !track) {
      throw new Error(
        'Loop slider list not found. Add data-loop-slider="list" to the slider wrapper.'
      );
    }

    this.primaryList = list;
    this.loopHeight = this.primaryList.scrollHeight;
    this.trackElement = track;
    this.prepareLoopLists(track);

    // Hide list initially to prevent jump
    this.primaryList.style.opacity = '0';
    this.primaryList.style.transition = 'opacity 0.4s ease-out';

    if (this.prefersInfinite) {
      this.initLocalLenis();
    }

    this.collectSlides();
  }

  public destroy() {
    if (this.handleLenisScroll && this.localLenis) {
      this.localLenis.off('scroll', this.handleLenisScroll);
    }

    if (this.localLenisRaf !== null) {
      window.cancelAnimationFrame(this.localLenisRaf);
      this.localLenisRaf = null;
    }

    this.localLenis?.destroy();
    this.localLenis = null;
  }

  public applyInitialOffset() {
    if (!this.localLenis) return;

    // Ensure we're in a fresh frame to avoid race conditions with layout
    requestAnimationFrame(() => {
      const offset = this.viewportHeight * this.config.initialOffset;
      if (offset > 0 && this.localLenis) {
        // Scroll backwards (negative) to shift content down
        this.localLenis.scrollTo(-offset, { immediate: true });
      }

      // Reveal the list in the next frame after scroll is applied
      requestAnimationFrame(() => {
        if (this.primaryList) {
          this.primaryList.style.opacity = '1';
        }
      });
    });
  }

  private initLocalLenis() {
    if (this.localLenis || !this.trackElement) {
      return;
    }

    ensureLenisStyles();

    this.root.style.overflow = this.root.style.overflow || 'hidden';
    this.root.style.position = this.root.style.position || 'relative';
    this.trackElement.style.willChange = this.trackElement.style.willChange || 'transform';

    this.localLenis = new Lenis({
      wrapper: this.root,
      content: this.trackElement,
      smoothWheel: true,
      infinite: true,
      syncTouch: true,
      touchMultiplier: 0.65,
    });

    this.handleLenisScroll = () => {
      this.measure();
    };

    this.localLenis.on('scroll', this.handleLenisScroll);

    const raf = (time: number) => {
      this.localLenis?.raf(time);
      this.localLenisRaf = window.requestAnimationFrame(raf);
    };

    this.localLenisRaf = window.requestAnimationFrame(raf);
  }

  private collectSlides() {
    const nodes = queryAllWithFallback<HTMLElement>(this.root, LOOP_SLIDER_SELECTORS.item);

    this.slides = nodes.map((node) => ({
      node,
      contentNode:
        queryElementWithFallback<HTMLElement>(node, LOOP_SLIDER_SELECTORS.content) ?? node,
      blurNode: queryElementWithFallback<HTMLElement>(node, LOOP_SLIDER_SELECTORS.blur),
      focusNodes: (() => {
        const focusTargets: HTMLElement[] = [];
        const primaryFocus = queryElementWithFallback<HTMLElement>(
          node,
          LOOP_SLIDER_SELECTORS.media
        );
        const titleNode = node.querySelector<HTMLElement>('.work-title');
        if (primaryFocus) {
          focusTargets.push(primaryFocus);
        }
        if (titleNode) {
          focusTargets.push(titleNode);
        }
        if (!focusTargets.length) {
          focusTargets.push(
            queryElementWithFallback<HTMLElement>(node, LOOP_SLIDER_SELECTORS.content) ?? node
          );
        }
        return focusTargets;
      })(),
      progress: 0,
      targetProgress: 0,
      scale: this.config.baseScale,
      targetScale: this.config.baseScale,
    }));

    this.slides.forEach((slide) => {
      const content = slide.contentNode;
      content.style.willChange = 'transform, opacity, filter';
      content.style.transformOrigin = 'center center';
      content.style.position = content.style.position || 'relative';
    });
  }

  private applySlideStyles(slide: SlideState) {
    const opacity = this.config.minOpacity + (1 - this.config.minOpacity) * slide.progress;
    const blurValue = (1 - slide.progress) * this.config.blurMax;

    slide.contentNode.style.transform = `scale(${slide.scale.toFixed(4)})`;
    slide.contentNode.style.opacity = opacity.toFixed(3);

    slide.focusNodes.forEach((target) => {
      // Use individual visibility if available, fallback to slide progress (for safety)
      const visibility = (target as any)._currentVisibility ?? slide.progress;
      const blurValue = (1 - visibility) * this.config.blurMax;
      target.style.filter = `blur(${blurValue.toFixed(2)}px)`;
    });

    if (slide.blurNode) {
      slide.blurNode.style.opacity = (1 - slide.progress).toFixed(3);
      slide.blurNode.style.filter = `blur(${Math.max(blurValue, this.config.blurMax * 0.6).toFixed(2)}px)`;
    }
  }

  private prepareLoopLists(track: HTMLElement) {
    this.loopLists = queryAllWithFallback<HTMLElement>(track, LOOP_SLIDER_SELECTORS.loop);

    if (!this.loopLists.length) {
      this.loopLists = [];
      return;
    }

    if (this.loopLists.length < 2) {
      const clone = this.loopLists[0].cloneNode(true) as HTMLElement;
      track.appendChild(clone);
      this.loopLists.push(clone);
    }
  }

  private rotateLists(direction: 'forward' | 'backward') {
    if (!this.trackElement || !this.loopLists.length) {
      return;
    }

    if (direction === 'forward') {
      const first = this.loopLists.shift();

      if (!first) {
        return;
      }

      this.trackElement.appendChild(first);
      this.loopLists.push(first);
    } else {
      const last = this.loopLists.pop();

      if (!last) {
        return;
      }

      const firstChild = this.trackElement.firstElementChild;
      if (firstChild) {
        this.trackElement.insertBefore(last, firstChild);
      } else {
        this.trackElement.appendChild(last);
      }

      this.loopLists.unshift(last);
    }
  }

  private computeLoopHeight() {
    if (!this.primaryList) {
      return this.loopHeight;
    }

    const height = this.primaryList.scrollHeight || this.primaryList.offsetHeight;

    if (height) {
      this.loopHeight = height;
    }

    return this.loopHeight;
  }

  private applyLoopOffset() {
    if (!this.prefersInfinite || !this.localLenis || !this.trackElement) {
      return;
    }

    const loopHeight = this.loopHeight || this.computeLoopHeight();

    if (!loopHeight) {
      return;
    }

    const { scroll } = this.localLenis;
    const limit = Math.max(this.localLenis.limit || loopHeight, loopHeight);

    if (this.previousScroll === null) {
      this.previousScroll = scroll;
      this.virtualScroll = 0;
      this.loopIndex = 0;
      this.loopOffset = 0;
      this.trackElement.style.transform = '';
      return;
    }

    let delta = scroll - this.previousScroll;

    if (Math.abs(delta) > limit * 0.5) {
      delta += delta > 0 ? -limit : limit;
    }

    this.virtualScroll += delta;
    this.previousScroll = scroll;
    const nextLoopIndex = Math.floor(this.virtualScroll / loopHeight);
    let diff = nextLoopIndex - this.loopIndex;

    while (diff > 0) {
      this.rotateLists('forward');
      this.loopIndex += 1;
      diff -= 1;
    }

    while (diff < 0) {
      this.rotateLists('backward');
      this.loopIndex -= 1;
      diff += 1;
    }

    const remainder = this.virtualScroll - this.loopIndex * loopHeight;
    this.loopOffset = scroll - remainder;
    this.trackElement.style.transform = `translate3d(0, ${this.loopOffset}px, 0)`;
  }

  public measure() {
    if (!this.slides.length) {
      return;
    }

    const viewportHeight = Math.max(window.innerHeight, 1);
    this.viewportHeight = viewportHeight;
    this.computeLoopHeight();
    this.applyLoopOffset();

    const buffer = this.config.safeZoneBuffer;

    this.slides.forEach((slide) => {
      const rect = slide.node.getBoundingClientRect();
      // We will now calculate visibility for EACH focus node individually
      // This ensures that a tall slide container doesn't trigger blur on a small child
      // The slide.progress and slide.scale will be based on the "most visible" element (or average?)
      // Actually, let's keep slide.targetScale based on the container (or the image?), but apply BLUR individually.

      // Let's refine: The slide SCALE should probably still be uniform for the whole slide to keep it cohesive.
      // But the BLUR should be independent.

      // 1. Calculate overall slide visibility for SCALE (using the main content or image)
      // We'll use the image (primary focus) if available, otherwise the whole slide.
      const scaleTarget = slide.focusNodes[0] || slide.node;
      const scaleRect = scaleTarget.getBoundingClientRect();
      const scaleHeight = scaleRect.height;

      const scaleTransitionDistance = scaleHeight;
      const scaleProgressTop = clamp(
        (scaleRect.top + buffer + scaleTransitionDistance) / scaleTransitionDistance,
        0,
        1
      );
      const scaleProgressBottom = clamp(
        (viewportHeight + buffer + scaleTransitionDistance - scaleRect.bottom) /
          scaleTransitionDistance,
        0,
        1
      );
      const scaleVisibility = Math.pow(Math.min(scaleProgressTop, scaleProgressBottom), 0.8);

      slide.targetProgress = scaleVisibility;
      slide.targetScale =
        this.config.baseScale + (this.config.focusScale - this.config.baseScale) * scaleVisibility;

      // 2. We don't apply blur here anymore on the slide object state.
      // Instead, we will store the individual visibility needs, OR we just apply it directly in animate()?
      // The current architecture calculates state in measure() and applies in animate().
      // To support independent blur, we need to store it.
      // Let's monkey-patch valid properties onto the elements or generic 'metadata' if we want to be clean,
      // but for now, let's just calculation it in animate() or store a map?
      // Actually, ‘measure’ is called constantly on scroll. ‘animate’ works on interpolated values.
      // If we want smooth blur, we need to interpolate the blur value too.
      // The current `slide` state only has ONE progress value.
      // We need to extend SlideState or just allow the children to be handled.

      // OPTION: We'll attach a custom property to the DOM node for 'targetBlur' and 'currentBlur'?
      // Or just map it on the slide.focusNodes?
      slide.focusNodes.forEach((node) => {
        const nodeRect = node.getBoundingClientRect();
        const nodeHeight = nodeRect.height;
        const nodeDist = nodeHeight; // transition over own height

        const pTop = clamp((nodeRect.top + buffer + nodeDist) / nodeDist, 0, 1);
        const pBottom = clamp(
          (viewportHeight + buffer + nodeDist - nodeRect.bottom) / nodeDist,
          0,
          1
        );
        const nodeVis = Math.pow(Math.min(pTop, pBottom), 0.8);

        // Store target visibility on the element itself to retrieve in animate()
        (node as any)._targetVisibility = nodeVis;
        if (typeof (node as any)._currentVisibility === 'undefined') {
          (node as any)._currentVisibility = nodeVis;
        }
      });
    });
  }

  public animate() {
    if (!this.slides.length) {
      return;
    }

    this.slides.forEach((slide) => {
      slide.scale += (slide.targetScale - slide.scale) * this.config.lerp;
      slide.progress += (slide.targetProgress - slide.progress) * this.config.progressLerp;

      // Interpolate individual focus nodes
      slide.focusNodes.forEach((node) => {
        const target = (node as any)._targetVisibility ?? 0;
        const current = (node as any)._currentVisibility ?? 0;
        const next = current + (target - current) * this.config.progressLerp;
        (node as any)._currentVisibility = next;
      });

      this.applySlideStyles(slide);
    });
  }

  public syncToTargets() {
    if (!this.slides.length) {
      return;
    }

    this.slides.forEach((slide) => {
      slide.scale = slide.targetScale;
      slide.progress = slide.targetProgress;
      this.applySlideStyles(slide);
    });
  }
}

const triggerSliderMeasurements = () => {
  loopSliderInstances.forEach((instance) => instance.measure());
};

const handleNativeScroll = () => {
  triggerSliderMeasurements();
};

const handleResize = () => {
  triggerSliderMeasurements();
};

const attachNativeScrollListener = () => {
  if (sliderScrollListenerAttached) {
    return;
  }

  window.addEventListener('scroll', handleNativeScroll, { passive: true });
  sliderScrollListenerAttached = true;
};

const attachResizeListener = () => {
  if (sliderResizeListenerAttached) {
    return;
  }

  window.addEventListener('resize', handleResize);
  sliderResizeListenerAttached = true;
};

const startSliderAnimationLoop = () => {
  if (sliderAnimationFrame !== null) {
    return;
  }

  const loop = () => {
    loopSliderInstances.forEach((instance) => instance.animate());
    sliderAnimationFrame = window.requestAnimationFrame(loop);
  };

  sliderAnimationFrame = window.requestAnimationFrame(loop);
};

export const destroyLoopSlider = () => {
  if (sliderAnimationFrame !== null) {
    window.cancelAnimationFrame(sliderAnimationFrame);
    sliderAnimationFrame = null;
  }

  if (sliderScrollListenerAttached) {
    window.removeEventListener('scroll', handleNativeScroll);
    sliderScrollListenerAttached = false;
  }

  if (sliderResizeListenerAttached) {
    window.removeEventListener('resize', handleResize);
    sliderResizeListenerAttached = false;
  }

  loopSliderInstances.forEach((instance) => instance.destroy());
  loopSliderInstances.length = 0;
};

export const initLoopSlider = () => {
  const shouldSnap = document.body.hasAttribute(LOOP_SLIDER_SNAP_ATTR);
  // Prevent browser scroll restoration from interfering with our custom offset
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  const sliderRoots = getLoopSliderRoots();

  if (!sliderRoots.length) {
    if (shouldSnap) {
      document.body.removeAttribute(LOOP_SLIDER_SNAP_ATTR);
    }
    return;
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (prefersReducedMotion.matches) {
    if (shouldSnap) {
      document.body.removeAttribute(LOOP_SLIDER_SNAP_ATTR);
    }
    return;
  }

  const instances = sliderRoots
    .map((root) => {
      try {
        return new LoopSliderInstance(root);
      } catch (error) {
        return null;
      }
    })
    .filter((instance): instance is LoopSliderInstance => Boolean(instance));

  if (!instances.length) {
    return;
  }

  loopSliderInstances.push(...instances);

  attachNativeScrollListener();
  attachResizeListener();

  triggerSliderMeasurements();
  if (shouldSnap) {
    instances.forEach((instance) => instance.syncToTargets());
    document.body.removeAttribute(LOOP_SLIDER_SNAP_ATTR);
  }

  // Apply initial offset after measure ensures everyone is ready
  instances.forEach((instance) => instance.applyInitialOffset());

  startSliderAnimationLoop();
};

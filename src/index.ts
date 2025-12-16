import Lenis from 'lenis';

const SELECTORS = {
  wrapper: '[data-nav="wrapper"]',
  toggle: '[data-nav="toggle"]',
  links: '[data-nav="links"] .nav-link',
  openIcon: '[data-nav-icon="open"]',
  closeIcon: '[data-nav-icon="close"]',
} as const;

type NavElements = {
  wrapper: HTMLElement;
  toggle: HTMLElement;
  openIcon: HTMLElement;
  closeIcon: HTMLElement;
  links: HTMLAnchorElement[];
};

const getNavElements = (): NavElements | null => {
  const wrapper = document.querySelector<HTMLElement>(SELECTORS.wrapper);
  const toggle = document.querySelector<HTMLElement>(SELECTORS.toggle);
  const openIcon = document.querySelector<HTMLElement>(SELECTORS.openIcon);
  const closeIcon = document.querySelector<HTMLElement>(SELECTORS.closeIcon);
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>(SELECTORS.links));

  if (!wrapper || !toggle || !openIcon || !closeIcon) {
    return null;
  }

  return { wrapper, toggle, openIcon, closeIcon, links };
};

const NAV_OPEN_CLASS = 'is-nav-open';
const NAV_LINKS_VISIBLE_CLASS = 'are-nav-links-visible';
const LINKS_FADE_DURATION = 320;

const initNavInteractions = () => {
  const elements = getNavElements();

  if (!elements) {
    return;
  }

  const { wrapper, toggle, openIcon, closeIcon, links } = elements;
  const hoverMediaQuery = window.matchMedia('(hover: hover)');

  const state = {
    isOpen: false,
    isLockedOpen: false,
    hoverEnabled: hoverMediaQuery.matches,
  };
  let hideLinksTimeout: number | null = null;

  const reflectIcons = () => {
    openIcon.toggleAttribute('aria-hidden', state.isOpen);
    closeIcon.toggleAttribute('aria-hidden', !state.isOpen);
    openIcon.hidden = state.isOpen;
    closeIcon.hidden = !state.isOpen;
  };

  const applyState = () => {
    wrapper.classList.toggle(NAV_OPEN_CLASS, state.isOpen);
    toggle.setAttribute('aria-expanded', String(state.isOpen));
    toggle.setAttribute('aria-pressed', String(state.isOpen));
    reflectIcons();
  };

  const nextFrame = (callback: () => void) => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(callback);
    });
  };

  const showLinks = () => {
    if (hideLinksTimeout !== null) {
      window.clearTimeout(hideLinksTimeout);
      hideLinksTimeout = null;
    }

    wrapper.classList.add(NAV_LINKS_VISIBLE_CLASS);
  };

  const scheduleHideLinks = () => {
    if (hideLinksTimeout !== null) {
      window.clearTimeout(hideLinksTimeout);
    }

    hideLinksTimeout = window.setTimeout(() => {
      if (state.isOpen) {
        return;
      }

      wrapper.classList.remove(NAV_LINKS_VISIBLE_CLASS);
    }, LINKS_FADE_DURATION);
  };

  const openNav = (lockOpen: boolean) => {
    showLinks();

    nextFrame(() => {
      state.isOpen = true;
      state.isLockedOpen = lockOpen ? true : state.isLockedOpen;
      applyState();
    });
  };

  const closeNav = () => {
    state.isOpen = false;
    state.isLockedOpen = false;
    applyState();
    scheduleHideLinks();
  };

  const toggleNav = () => {
    if (state.isOpen) {
      closeNav();
    } else {
      openNav(true);
    }
  };

  const handleHoverEnter = () => {
    if (!state.hoverEnabled || state.isLockedOpen) {
      return;
    }

    openNav(false);
  };

  const handleHoverLeave = () => {
    if (!state.hoverEnabled || state.isLockedOpen) {
      return;
    }

    closeNav();
  };

  toggle.setAttribute('role', 'button');
  toggle.tabIndex = toggle.tabIndex > -1 ? toggle.tabIndex : 0;
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-pressed', 'false');
  toggle.setAttribute('aria-label', 'Toggle navigation');
  reflectIcons();

  wrapper.addEventListener('mouseenter', handleHoverEnter);
  wrapper.addEventListener('mouseleave', handleHoverLeave);

  hoverMediaQuery.addEventListener('change', (event) => {
    state.hoverEnabled = event.matches;

    if (!state.hoverEnabled && state.isOpen && !state.isLockedOpen) {
      closeNav();
    }
  });

  toggle.addEventListener('click', (event) => {
    event.preventDefault();
    toggleNav();
  });

  toggle.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    event.preventDefault();
    toggleNav();
  });

  links.forEach((link) => {
    link.addEventListener('click', () => {
      closeNav();
    });
  });
};

const LOOP_SLIDER_SELECTORS = {
  root: ['[data-loop-slider="root"]', '.slider-section'],
  list: ['[data-loop-slider="list"]', '.slider-wrapper'],
  item: ['[data-loop-slider="item"]', '.slide-w'],
  content: ['[data-loop-slider="content"]', '.slide'],
  blur: ['[data-loop-slider="blur"]', '.slide-blur'],
  media: ['[data-loop-slider="focus"]', '.work-list-img-wrap img', '.work-list-img-wrap'],
} as const satisfies Record<string, readonly string[]>;

const LOOP_SLIDER_CONFIG = {
  baseScale: 0.8,
  focusScale: 1,
  blurMax: 80,
  translateMax: 0,
  lerp: 0.08,
  progressLerp: 0.12,
  minOpacity: 0.2,
};

type SlideState = {
  node: HTMLElement;
  contentNode: HTMLElement;
  blurNode: HTMLElement | null;
  mediaNode: HTMLElement | null;
  progress: number;
  targetProgress: number;
  scale: number;
  targetScale: number;
};

const LENIS_STYLE_ID = 'loop-slider-lenis-styles';
const LENIS_STYLES = `html.lenis,html.lenis body{height:auto}.lenis:not(.lenis-autoToggle).lenis-stopped{overflow:clip}.lenis [data-lenis-prevent],.lenis [data-lenis-prevent-wheel],.lenis [data-lenis-prevent-touch]{overscroll-behavior:contain}.lenis.lenis-smooth iframe{pointer-events:none}.lenis.lenis-autoToggle{transition-property:overflow;transition-duration:1ms;transition-behavior:allow-discrete}`;

let lenisInstance: Lenis | null = null;
let lenisRafId: number | null = null;
let lenisScrollAttached = false;
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

const ensureLenisInstance = () => {
  if (lenisInstance) {
    return lenisInstance;
  }

  ensureLenisStyles();

  lenisInstance = new Lenis({
    smoothWheel: true,
    infinite: true,
    syncTouch: true,
    touchMultiplier: 0.65,
  });

  const raf = (time: number) => {
    lenisInstance?.raf(time);
    lenisRafId = window.requestAnimationFrame(raf);
  };

  lenisRafId = window.requestAnimationFrame(raf);

  return lenisInstance;
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

  constructor(root: HTMLElement) {
    this.root = root;
    this.prefersInfinite = root.dataset.loopSliderInfinite !== 'false';

    const list = queryElementWithFallback<HTMLElement>(root, LOOP_SLIDER_SELECTORS.list);

    if (!list) {
      throw new Error(
        'Loop slider list not found. Add data-loop-slider="list" to the slider wrapper.'
      );
    }

    this.ensureLoopFiller(list);
    this.collectSlides();
  }

  private ensureLoopFiller(list: HTMLElement) {
    const parent = list.parentElement;

    if (!parent || parent.querySelector('.loop-filler')) {
      return;
    }

    const clone = list.cloneNode(true) as HTMLElement;
    clone.classList.add('loop-filler');
    parent.appendChild(clone);
  }

  private collectSlides() {
    const nodes = queryAllWithFallback<HTMLElement>(this.root, LOOP_SLIDER_SELECTORS.item);

    this.slides = nodes.map((node) => ({
      node,
      contentNode:
        queryElementWithFallback<HTMLElement>(node, LOOP_SLIDER_SELECTORS.content) ?? node,
      blurNode: queryElementWithFallback<HTMLElement>(node, LOOP_SLIDER_SELECTORS.blur),
      mediaNode: queryElementWithFallback<HTMLElement>(node, LOOP_SLIDER_SELECTORS.media),
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

  public measure() {
    if (!this.slides.length) {
      return;
    }

    const viewportHeight = Math.max(window.innerHeight, 1);
    this.viewportHeight = viewportHeight;
    const viewportTop = 0;
    const viewportBottom = viewportHeight;

    this.slides.forEach((slide) => {
      const rect = slide.node.getBoundingClientRect();
      const cardTop = rect.top;
      const cardBottom = rect.bottom;
      const cardHeight = Math.max(rect.height, 1);
      const visibleTop = Math.max(viewportTop, cardTop);
      const visibleBottom = Math.min(viewportBottom, cardBottom);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);
      const visibility = clamp(visibleHeight / cardHeight, 0, 1);

      slide.targetProgress = visibility;
      slide.targetScale =
        this.config.baseScale + (this.config.focusScale - this.config.baseScale) * visibility;
    });
  }

  public animate() {
    if (!this.slides.length) {
      return;
    }

    this.slides.forEach((slide) => {
      slide.scale += (slide.targetScale - slide.scale) * this.config.lerp;
      slide.progress += (slide.targetProgress - slide.progress) * this.config.progressLerp;
      const opacity = this.config.minOpacity + (1 - this.config.minOpacity) * slide.progress;
      const blurValue = (1 - slide.progress) * this.config.blurMax;

      slide.contentNode.style.transform = `scale(${slide.scale.toFixed(4)})`;
      slide.contentNode.style.opacity = opacity.toFixed(3);

      const blurTarget = slide.mediaNode ?? slide.contentNode;
      blurTarget.style.filter = `blur(${blurValue.toFixed(2)}px)`;

      if (slide.blurNode) {
        slide.blurNode.style.opacity = (1 - slide.progress).toFixed(3);
        slide.blurNode.style.filter = `blur(${Math.max(blurValue, this.config.blurMax * 0.6).toFixed(2)}px)`;
      }
    });
  }
}

const triggerSliderMeasurements = () => {
  loopSliderInstances.forEach((instance) => instance.measure());
};

const attachNativeScrollListener = () => {
  if (sliderScrollListenerAttached) {
    return;
  }

  window.addEventListener('scroll', triggerSliderMeasurements, { passive: true });
  sliderScrollListenerAttached = true;
};

const attachResizeListener = () => {
  if (sliderResizeListenerAttached) {
    return;
  }

  window.addEventListener('resize', triggerSliderMeasurements);
  sliderResizeListenerAttached = true;
};

const attachLenisScrollListener = () => {
  if (!lenisInstance || lenisScrollAttached) {
    return;
  }

  lenisInstance.on('scroll', triggerSliderMeasurements);
  lenisScrollAttached = true;
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

const initLoopSlider = () => {
  const sliderRoots = getLoopSliderRoots();

  if (!sliderRoots.length) {
    return;
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (prefersReducedMotion.matches) {
    return;
  }

  const instances = sliderRoots
    .map((root) => {
      try {
        return new LoopSliderInstance(root);
      } catch (error) {
        console.warn(error);
        return null;
      }
    })
    .filter((instance): instance is LoopSliderInstance => Boolean(instance));

  if (!instances.length) {
    return;
  }

  loopSliderInstances.push(...instances);

  const shouldUseLenis = loopSliderInstances.some((instance) => instance.prefersInfinite);

  if (shouldUseLenis) {
    ensureLenisInstance();
    attachLenisScrollListener();
  }

  attachNativeScrollListener();
  attachResizeListener();

  triggerSliderMeasurements();
  startSliderAnimationLoop();
};

const init = () => {
  initNavInteractions();
  initLoopSlider();
};

if (document.readyState === 'complete' || document.readyState === 'interactive') {
  init();
} else {
  document.addEventListener('DOMContentLoaded', init);
}

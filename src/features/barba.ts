/* eslint-disable @typescript-eslint/no-explicit-any */
import barba from '@barba/core';

import { setNavVisible } from './nav';

type BarbaCallbacks = {
  onAfterEnter: () => void;
  onBeforeLeave?: () => void;
};

declare global {
  interface Window {
    Webflow?: {
      destroy?: () => void;
      ready?: () => void;
      require?: (name: string) => { init?: () => void } | undefined;
    };
  }
}

const BARBA_WRAPPER_SELECTOR = '[data-barba="wrapper"]';
const DRAWER_SELECTOR = '.drawer, [data-nav="wrapper"]';
const NAV_CONTAINER_SELECTOR = '.nav-container';
const CLOSE_SELECTOR = '[data-nav="close-project"]';
const DRAWER_OPEN_CLASS = 'is-drawer-open';
const PERIPHERAL_BODY_CLASS = 'is-in-peripheral';
const TRANSITION_DURATION = 700;
const EASING = 'cubic-bezier(0.4, 0, 0.2, 1)';
const DRAWER_GAP = '5rem';
const NAV_FADE_SCALE = 0.96;
const NAV_FADE_TRANSLATE = '0.5rem';
const CLOSE_HOVER_SHIFT = '1.25rem';
const CLOSE_HOVER_DURATION = 200;
const CLOSE_HOVER_EASING = 'cubic-bezier(0.22, 1.2, 0.36, 1)';
const PROJECT_SHADOW_FALLBACK =
  '0 5px 15px 0 rgba(0, 0, 0, 0.35), -25px 0 50px -12px rgba(0, 0, 0, 0.25)';
const OFFSCREEN_TRANSLATE = 'calc(100vw - var(--drawer-gap, 5rem))';
const BARBA_CONTAINER_SELECTOR = '[data-barba="container"]';
const LOGO_PARENT_CANDIDATES = ['[data-logo-parent]', '.logo-2'];
const LOGO_WRAPPER_SELECTOR = '.logo-wrapper';
const LOGO_FULL_FALLBACK_SELECTOR = '.logo:not(.icon)';
const LOGO_ICON_FALLBACK_SELECTOR = '.logo.icon';

const setCssVars = () => {
  const computedGap = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue('--drawer-gap')
    .trim();
  if (!computedGap) {
    document.documentElement.style.setProperty('--drawer-gap', DRAWER_GAP);
  }
};

const getDrawer = () => document.querySelector<HTMLElement>(DRAWER_SELECTOR);
const getCloseTrigger = () => document.querySelector<HTMLElement>(CLOSE_SELECTOR);
const getNavContainers = () =>
  Array.from(document.querySelectorAll<HTMLElement>(NAV_CONTAINER_SELECTOR));
const getActiveContainer = () => document.querySelector<HTMLElement>(BARBA_CONTAINER_SELECTOR);
const closeHoverSources = new Set<string>();
const closeHoverTimeouts = new WeakMap<HTMLElement, number>();
const closeHoverTransitions = new WeakMap<
  HTMLElement,
  {
    transition: string;
    transitionPriority: string;
    property: string;
    propertyPriority: string;
    duration: string;
    durationPriority: string;
    timing: string;
    timingPriority: string;
    delay: string;
    delayPriority: string;
  }
>();
const getBaseDrawerGap = () => {
  const root = document.documentElement;
  if (!root.dataset.drawerGapBase) {
    const computedGap = window.getComputedStyle(root).getPropertyValue('--drawer-gap').trim();
    root.dataset.drawerGapBase = computedGap || DRAWER_GAP;
  }

  return root.dataset.drawerGapBase || DRAWER_GAP;
};

const getNavTransitionParts = () => {
  const value = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue('--nav-transition')
    .trim();
  const fallback = `${CLOSE_HOVER_DURATION}ms ${CLOSE_HOVER_EASING}`;
  const source = value || fallback;
  const match = source.match(/^(\d+(?:\.\d+)?m?s)\s*(.+)?$/);
  if (!match) {
    return { duration: `${CLOSE_HOVER_DURATION}ms`, timing: CLOSE_HOVER_EASING };
  }

  return {
    duration: match[1],
    timing: (match[2] || CLOSE_HOVER_EASING).trim(),
  };
};

const cacheHoverTransition = (element: HTMLElement) => {
  if (closeHoverTransitions.has(element)) {
    return;
  }

  closeHoverTransitions.set(element, {
    transition: element.style.getPropertyValue('transition'),
    transitionPriority: element.style.getPropertyPriority('transition'),
    property: element.style.getPropertyValue('transition-property'),
    propertyPriority: element.style.getPropertyPriority('transition-property'),
    duration: element.style.getPropertyValue('transition-duration'),
    durationPriority: element.style.getPropertyPriority('transition-duration'),
    timing: element.style.getPropertyValue('transition-timing-function'),
    timingPriority: element.style.getPropertyPriority('transition-timing-function'),
    delay: element.style.getPropertyValue('transition-delay'),
    delayPriority: element.style.getPropertyPriority('transition-delay'),
  });
};

const restoreHoverTransition = (element: HTMLElement) => {
  const cached = closeHoverTransitions.get(element);
  if (!cached) {
    return;
  }

  const restore = (property: string, value: string, priority: string) => {
    if (value) {
      element.style.setProperty(property, value, priority);
    } else {
      element.style.removeProperty(property);
    }
  };

  restore('transition', cached.transition, cached.transitionPriority);
  restore('transition-property', cached.property, cached.propertyPriority);
  restore('transition-duration', cached.duration, cached.durationPriority);
  restore('transition-timing-function', cached.timing, cached.timingPriority);
  restore('transition-delay', cached.delay, cached.delayPriority);

  closeHoverTransitions.delete(element);
};

const applyHoverTransition = (element: HTMLElement, properties: string[]) => {
  cacheHoverTransition(element);
  const computed = window.getComputedStyle(element);
  const { duration, timing } = getNavTransitionParts();
  const baseProperties = computed.transitionProperty
    .split(',')
    .map((prop) => prop.trim())
    .filter(Boolean);
  const hasAll = baseProperties.includes('all');
  const mergedProperties = hasAll
    ? 'all'
    : Array.from(new Set([...baseProperties.filter((prop) => prop !== 'none'), ...properties]))
        .filter(Boolean)
        .join(', ');

  element.style.setProperty(
    'transition-property',
    mergedProperties || properties.join(', '),
    'important'
  );
  element.style.setProperty('transition-duration', duration, 'important');
  element.style.setProperty('transition-timing-function', timing, 'important');
  element.style.setProperty('transition-delay', '0ms', 'important');
};

const getDrawerRevealOffset = (drawerWidth: number) => {
  if (!Number.isFinite(drawerWidth) || drawerWidth <= 0) {
    return OFFSCREEN_TRANSLATE;
  }

  const gapValue = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue('--drawer-gap')
    .trim();
  const gap = Number.parseFloat(gapValue);
  const gapPx = Number.isFinite(gap) ? gap : 0;
  const fullWidth = window.innerWidth - gapPx;
  const offset = Math.max(0, fullWidth - drawerWidth);

  return `${offset}px`;
};

const getLogoElements = () => {
  const parent = LOGO_PARENT_CANDIDATES.reduce<HTMLElement | null>((found, selector) => {
    if (found) return found;
    return document.querySelector<HTMLElement>(selector);
  }, null);

  if (!parent) {
    return { parent: null, full: undefined, icon: undefined };
  }

  const wrappers = parent.querySelectorAll<HTMLElement>(LOGO_WRAPPER_SELECTOR);
  if (wrappers.length >= 2) {
    return {
      parent,
      full: wrappers[0] as HTMLElement,
      icon: wrappers[1] as HTMLElement,
    };
  }

  const fullEmbed = parent.querySelector<HTMLElement>(LOGO_FULL_FALLBACK_SELECTOR) ?? undefined;
  const iconEmbed = parent.querySelector<HTMLElement>(LOGO_ICON_FALLBACK_SELECTOR) ?? undefined;

  if (fullEmbed && iconEmbed) {
    return { parent, full: fullEmbed, icon: iconEmbed };
  }

  return { parent, full: undefined, icon: undefined };
};

const getNamespace = (container?: Element | null) =>
  container?.getAttribute('data-barba-namespace') ?? null;
const isPeripheralNamespace = (ns: string | null | undefined) => Boolean(ns && ns !== 'home');

const updateBodyAttributes = (nextHtml: string) => {
  const parsed = new DOMParser().parseFromString(nextHtml, 'text/html');
  const nextBody = parsed.body;

  if (!nextBody) {
    return;
  }

  document.body.className = nextBody.className;

  const wfPage = nextBody.getAttribute('data-wf-page');
  if (wfPage) {
    document.body.setAttribute('data-wf-page', wfPage);
  } else {
    document.body.removeAttribute('data-wf-page');
  }
};

const reinitializeWebflow = () => {
  const webflow = window.Webflow;

  if (!webflow) {
    return;
  }

  if (webflow.destroy) {
    webflow.destroy();
  }

  if (webflow.ready) {
    webflow.ready();
  }

  const ix2 = webflow.require?.('ix2');
  if (ix2?.init) {
    ix2.init();
  }
};

const shouldPrevent = (el?: HTMLElement | null, href?: string) => {
  if (!href) {
    return true;
  }

  if (el?.closest('[data-barba-prevent]')) {
    return true;
  }

  if (
    href.startsWith('#') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    href.startsWith('javascript:')
  ) {
    return true;
  }

  if (el?.getAttribute('target') === '_blank') {
    return true;
  }

  const url = new URL(href, window.location.href);
  if (url.origin !== window.location.origin) {
    return true;
  }

  return false;
};

const waitForTransition = (element: HTMLElement) =>
  new Promise<void>((resolve) => {
    const timeout = window.setTimeout(resolve, TRANSITION_DURATION + 50);
    const handler = (event: TransitionEvent) => {
      if (event.target !== element || event.propertyName !== 'transform') {
        return;
      }
      element.removeEventListener('transitionend', handler);
      window.clearTimeout(timeout);
      resolve();
    };
    element.addEventListener('transitionend', handler);
  });

const ensureDrawerBaseStyles = () => {
  const drawer = getDrawer();
  if (!drawer) {
    return;
  }

  drawer.style.willChange = drawer.style.willChange || 'transform';
  drawer.style.transitionProperty = drawer.style.transitionProperty || 'transform';
};

const prepareNavContainersForFade = (containers: HTMLElement[], forceImportant = false) => {
  if (containers.length === 0) {
    return;
  }

  const priority = forceImportant ? 'important' : '';
  containers.forEach((container) => {
    container.style.setProperty('transition', 'none', priority);
    container.style.setProperty('opacity', '1', priority);
    container.style.setProperty('transform', 'translateX(0) scale(1)', priority);
    container.style.setProperty('will-change', 'opacity, transform', priority);
    container.style.setProperty('pointer-events', 'auto', priority);
  });

  void containers[0].offsetWidth;
};

const animateNavContainersOut = (containers: HTMLElement[], forceImportant = false) =>
  new Promise<void>((resolve) => {
    if (containers.length === 0) {
      resolve();
      return;
    }

    const priority = forceImportant ? 'important' : '';
    requestAnimationFrame(() => {
      containers.forEach((container) => {
        container.style.setProperty(
          'transition',
          `opacity ${TRANSITION_DURATION}ms ${EASING}, transform ${TRANSITION_DURATION}ms ${EASING}`,
          priority
        );
        container.style.setProperty('opacity', '0', priority);
        container.style.setProperty(
          'transform',
          `translateX(${NAV_FADE_TRANSLATE}) scale(${NAV_FADE_SCALE})`,
          priority
        );
        container.style.setProperty('pointer-events', 'none', priority);
      });
      waitForTransition(containers[0]).then(resolve);
    });
  });

const resetNavContainerStyles = () => {
  const navContainers = getNavContainers();
  navContainers.forEach((container) => {
    container.style.removeProperty('opacity');
    container.style.removeProperty('transform');
    container.style.removeProperty('transition');
    container.style.removeProperty('will-change');
    container.style.removeProperty('pointer-events');
  });
};

const setLogoState = (isPeripheral: boolean) => {
  const { parent, full, icon } = getLogoElements();

  if (!parent || !full || !icon) return;

  if (window.getComputedStyle(parent).position === 'static') {
    parent.style.setProperty('position', 'relative');
  }

  const commonStyles = {
    position: 'absolute',
    left: '0',
    top: '0',
    transition: `opacity ${TRANSITION_DURATION}ms ${EASING}, transform ${TRANSITION_DURATION}ms ${EASING}`,
  };

  Object.assign(full.style, commonStyles, {
    opacity: isPeripheral ? '0' : '1',
    transform: isPeripheral ? 'scale(0.8)' : 'scale(1)',
    pointerEvents: isPeripheral ? 'none' : 'auto',
  });

  // Force !important using setProperty since Object.assign doesn't support it directly
  full.style.setProperty('opacity', isPeripheral ? '0' : '1', 'important');
  full.style.setProperty('pointer-events', isPeripheral ? 'none' : 'auto', 'important');
  full.style.setProperty('transform', isPeripheral ? 'scale(0.8)' : 'scale(1)', 'important');
  full.style.setProperty('z-index', '100', 'important');

  Object.assign(icon.style, commonStyles, {
    // base styles
  });

  icon.style.setProperty('opacity', isPeripheral ? '1' : '0', 'important');
  icon.style.setProperty('pointer-events', isPeripheral ? 'auto' : 'none', 'important');
  icon.style.setProperty('transform', isPeripheral ? 'scale(1)' : 'scale(1.2)', 'important');
  icon.style.setProperty('z-index', '100', 'important');
};

const animateLogo = async (toPeripheral: boolean) => {
  const { parent, full, icon } = getLogoElements();
  if (!parent || !full || !icon) return;

  const transition = `opacity ${TRANSITION_DURATION}ms ${EASING}, transform ${TRANSITION_DURATION}ms ${EASING}`;
  full.style.transition = transition;
  icon.style.transition = transition;

  full.style.position = 'absolute';
  full.style.left = '0';
  full.style.top = '0';

  icon.style.position = 'absolute';
  icon.style.left = '0';
  icon.style.top = '0';

  // Force reflow
  void full.getBoundingClientRect();

  requestAnimationFrame(() => {
    setLogoState(toPeripheral);
  });
};

const applyDrawerLayout = (drawer: HTMLElement, isPeripheral: boolean, skipWidth = false) => {
  if (isPeripheral) {
    drawer.style.position = 'fixed';
    drawer.style.top = '0';
    drawer.style.right = '0';
    drawer.style.bottom = '0';
    drawer.style.left = '';
    if (!skipWidth) {
      drawer.style.setProperty(
        'width',
        `calc(100vw - var(--drawer-gap, ${DRAWER_GAP}))`,
        'important'
      );
    }
    drawer.style.setProperty('max-width', 'none', 'important');
  } else {
    drawer.style.position = 'absolute';
    drawer.style.top = '';
    drawer.style.right = '';
    drawer.style.bottom = '';
    drawer.style.left = '';
    drawer.style.removeProperty('width');
    drawer.style.removeProperty('max-width');
  }
};

const resetDrawerStylesForHome = () => {
  const drawer = getDrawer();
  if (!drawer) {
    return;
  }

  drawer.classList.remove(DRAWER_OPEN_CLASS);
  drawer.style.removeProperty('transform');
  drawer.style.removeProperty('transition');
  drawer.style.removeProperty('transition-property');
  drawer.style.removeProperty('transition-duration');
  drawer.style.removeProperty('transition-timing-function');
  drawer.style.removeProperty('will-change');
};

const setDrawerState = (
  drawer: HTMLElement,
  isOpen: boolean,
  animate = true,
  keepTransform = true,
  forceImportant = false
) => {
  drawer.classList.toggle(DRAWER_OPEN_CLASS, isOpen);
  const priority = forceImportant ? 'important' : '';
  drawer.style.setProperty('transition-property', 'transform', priority);
  drawer.style.setProperty(
    'transition-duration',
    animate ? `${TRANSITION_DURATION}ms` : '0ms',
    priority
  );
  drawer.style.setProperty('transition-timing-function', EASING, priority);

  if (!keepTransform && !isOpen) {
    drawer.style.removeProperty('transform');
    if (!forceImportant) {
      drawer.style.removeProperty('transition-duration');
    }
    return;
  }

  drawer.style.setProperty(
    'transform',
    isOpen ? 'translateX(0)' : `translateX(calc(100% - var(--drawer-gap, ${DRAWER_GAP})))`,
    priority
  );
};

const animateDrawer = async (isOpen: boolean, forceImportant = false) => {
  const drawer = getDrawer();
  if (!drawer) {
    return;
  }

  // Force the current (pre-animation) state to stick, then flip to the target
  // state on the next frame so the transition actually runs.
  void drawer.getBoundingClientRect();
  await new Promise<void>((resolve) => {
    window.requestAnimationFrame(() => {
      setDrawerState(drawer, isOpen, true, true, forceImportant);
      waitForTransition(drawer).then(resolve);
    });
  });
};

const setCloseTriggerVisible = (isVisible: boolean) => {
  const close = getCloseTrigger();
  if (!close) {
    return;
  }

  close.classList.toggle('is-visible', isVisible);
  close.style.pointerEvents = isVisible ? 'auto' : 'none';
  close.style.display = isVisible ? '' : 'none';
  close.style.setProperty('z-index', 'var(--close-z, 20)', 'important');
  close.style.setProperty('background-color', 'transparent', 'important');
  close.style.setProperty('background', 'transparent', 'important');
  close.setAttribute('aria-hidden', String(!isVisible));

  if (!isVisible) {
    closeHoverSources.clear();
    applyCloseHoverState(false);
    close.style.removeProperty('width');
    close.style.removeProperty('transition');
  } else {
    initCloseHover(close);
    initLogoHover();
  }
};

const setCloseHoverSource = (source: string, isActive: boolean) => {
  if (isActive) {
    closeHoverSources.add(source);
  } else {
    closeHoverSources.delete(source);
  }

  applyCloseHoverState(closeHoverSources.size > 0);
};

const applyCloseHoverState = (isHovering: boolean) => {
  const isPeripheral = document.body.classList.contains(PERIPHERAL_BODY_CLASS);
  if (!isPeripheral && isHovering) {
    return;
  }

  document.body.classList.toggle('is-close-hover', isHovering && isPeripheral);

  const drawer = getDrawer();
  const container = getActiveContainer();
  const close = getCloseTrigger();
  const baseGap = getBaseDrawerGap();
  const nextGap = isHovering ? `calc(${baseGap} + ${CLOSE_HOVER_SHIFT})` : baseGap;
  document.documentElement.style.setProperty('--drawer-gap', nextGap);

  const transitionTargets = [
    { element: drawer, properties: ['width'] },
    { element: container, properties: ['left', 'width'] },
    { element: close, properties: ['width'] },
  ];

  transitionTargets.forEach(({ element, properties }) => {
    if (!element) {
      return;
    }

    const pendingTimeout = closeHoverTimeouts.get(element);
    if (pendingTimeout) {
      window.clearTimeout(pendingTimeout);
      closeHoverTimeouts.delete(element);
    }

    applyHoverTransition(element, properties);

    if (!isHovering) {
      const timeoutId = window.setTimeout(() => {
        restoreHoverTransition(element);
      }, CLOSE_HOVER_DURATION + 40);
      closeHoverTimeouts.set(element, timeoutId);
    }
  });
};

const initCloseHover = (close: HTMLElement) => {
  if (close.dataset.closeHoverBound) {
    return;
  }

  close.dataset.closeHoverBound = 'true';
  const handleEnter = () => setCloseHoverSource('close', true);
  const handleLeave = () => setCloseHoverSource('close', false);

  close.addEventListener('pointerenter', handleEnter);
  close.addEventListener('pointerleave', handleLeave);
  close.addEventListener('focusin', handleEnter);
  close.addEventListener('focusout', handleLeave);
};

const initLogoHover = () => {
  const { parent } = getLogoElements();
  if (!parent || parent.dataset.closeHoverLogoBound) {
    return;
  }

  parent.dataset.closeHoverLogoBound = 'true';
  const handleEnter = () => setCloseHoverSource('logo', true);
  const handleLeave = () => setCloseHoverSource('logo', false);

  parent.addEventListener('pointerenter', handleEnter);
  parent.addEventListener('pointerleave', handleLeave);
  parent.addEventListener('focusin', handleEnter);
  parent.addEventListener('focusout', handleLeave);
};

const syncDrawerStateForNamespace = (namespace: string | null | undefined) => {
  const isPeripheral = isPeripheralNamespace(namespace);
  document.body.classList.toggle(PERIPHERAL_BODY_CLASS, isPeripheral);
  setCloseTriggerVisible(isPeripheral);
  void animateDrawer(isPeripheral);
};

const prepareContainer = (container: HTMLElement, isPeripheral: boolean) => {
  const { style } = container;
  style.position = isPeripheral ? 'fixed' : 'relative';
  style.top = isPeripheral ? '0' : '';
  style.right = isPeripheral ? '0' : '';
  style.bottom = isPeripheral ? '0' : '';
  style.left = isPeripheral ? `var(--drawer-gap, ${DRAWER_GAP})` : '';
  style.width = isPeripheral ? `calc(100vw - var(--drawer-gap, ${DRAWER_GAP}))` : '100%';
  style.maxWidth = isPeripheral ? 'none' : '';
  style.minHeight = style.minHeight || '100vh';
  style.overflowY = isPeripheral ? 'auto' : '';
  style.overflowX = isPeripheral ? 'visible' : '';
  style.willChange = 'transform, opacity';
  if (isPeripheral) {
    style.setProperty('z-index', 'var(--container-z, 40)', 'important');
    style.setProperty(
      'box-shadow',
      `var(--project-shadow, ${PROJECT_SHADOW_FALLBACK})`,
      'important'
    );
  } else {
    style.removeProperty('z-index');
    style.removeProperty('box-shadow');
  }
};

const placeContainerOffscreen = (container: HTMLElement, translateX = OFFSCREEN_TRANSLATE) => {
  const { style } = container;
  style.setProperty('transition', 'none', 'important');
  style.setProperty('transform', `translateX(${translateX})`, 'important');
};

const animateContainerTo = async (container: HTMLElement, translateX: string, opacity?: string) => {
  const { style } = container;
  style.setProperty('will-change', 'transform, opacity');
  // force a reflow to ensure the previous transform sticks before animating
  void container.getBoundingClientRect();
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
      style.setProperty('transition-property', 'transform, opacity', 'important');
      style.setProperty('transition-duration', `${TRANSITION_DURATION}ms`, 'important');
      style.setProperty('transition-timing-function', EASING, 'important');
      style.setProperty('transform', translateX, 'important');
      if (opacity !== undefined) {
        style.setProperty('opacity', opacity, 'important');
      }
      waitForTransition(container).then(resolve);
    });
  });
};

const hideCurrentContainer = (container: HTMLElement | null | undefined) => {
  if (!container) return;
  container.style.setProperty('opacity', '0', 'important');
  container.style.pointerEvents = 'none';
};

const syncInitialState = () => {
  const container = document.querySelector<HTMLElement>(BARBA_CONTAINER_SELECTOR);
  const drawer = getDrawer();
  const ns = getNamespace(container);
  const isPeripheral = isPeripheralNamespace(ns);

  document.body.classList.toggle(PERIPHERAL_BODY_CLASS, isPeripheral);
  setCloseTriggerVisible(isPeripheral);
  setLogoState(isPeripheral);
  resetNavContainerStyles();

  if (drawer) {
    if (isPeripheral) {
      ensureDrawerBaseStyles();
      applyDrawerLayout(drawer, true);
      setDrawerState(drawer, true, false, true);
    } else {
      resetDrawerStylesForHome();
      applyDrawerLayout(drawer, false);
    }
  }

  if (container) {
    prepareContainer(container, isPeripheral);
    container.style.transition = 'none';
    container.style.transform = 'translateX(0)';
  }
};

export const initBarba = ({ onAfterEnter, onBeforeLeave }: BarbaCallbacks) => {
  if (!document.querySelector(BARBA_WRAPPER_SELECTOR)) {
    return;
  }

  setCssVars();
  ensureDrawerBaseStyles();
  syncInitialState();

  barba.init({
    preventRunning: true,
    prevent: ({ el, href }: any) => shouldPrevent(el as HTMLElement | null, href),
    transitions: [
      {
        name: 'home-to-peripheral',
        from: { namespace: ['home'] },
        to: { namespace: ['verkada', 'film', 'about', 'work'] },
        sync: true,
        beforeEnter: ({ next }: any) => {
          const nextContainer = next.container as HTMLElement | null;
          if (!nextContainer) return;

          const drawers = document.querySelectorAll<HTMLElement>(DRAWER_SELECTOR);
          const navContainers = getNavContainers();
          let startWidth = 0;
          let wasNavOpen = false;
          let revealOffset = OFFSCREEN_TRANSLATE;

          // 1. Measure BEFORE changing any classes
          if (drawers.length > 0) {
            const sourceDrawer = drawers[0];
            wasNavOpen =
              document.body.classList.contains('is-nav-open') ||
              sourceDrawer.classList.contains('is-nav-open');
            startWidth = sourceDrawer.getBoundingClientRect().width;
            revealOffset = getDrawerRevealOffset(startWidth);
          }

          // 2. Change Global State (Classes)
          animateLogo(true);
          const nextNs = getNamespace(next.container);
          document.body.classList.toggle(PERIPHERAL_BODY_CLASS, isPeripheralNamespace(nextNs));
          // Remove nav open classes immediately
          document.body.classList.remove('is-nav-open');

          setCloseTriggerVisible(true);
          ensureDrawerBaseStyles();

          // 3. Lock Drawers to Measured State
          if (drawers.length > 0) {
            drawers.forEach((drawer) => {
              drawer.classList.remove('is-nav-open');
              drawer.style.setProperty('position', 'fixed', 'important');
              drawer.style.setProperty('top', '0', 'important');
              drawer.style.setProperty('bottom', '0', 'important');
              drawer.style.setProperty('right', '0', 'important');
              drawer.style.setProperty('left', 'auto', 'important');

              if (startWidth > 0) {
                drawer.style.setProperty('width', `${startWidth}px`, 'important');
              }

              drawer.style.setProperty('max-width', 'none', 'important');
              drawer.style.setProperty('transform', 'none', 'important');
              drawer.style.setProperty('transition', 'none', 'important');

              // Force Reflow
              void drawer.offsetWidth;
            });
          }

          prepareNavContainersForFade(navContainers, true);
          prepareContainer(nextContainer, true);
          placeContainerOffscreen(nextContainer, revealOffset);
          nextContainer.style.setProperty('opacity', '1', 'important');
        },
        leave: async ({ current, next }: any) => {
          onBeforeLeave?.();
          hideCurrentContainer(current?.container as HTMLElement | null);
          const nextContainer = next.container as HTMLElement | null;
          if (nextContainer) {
            const drawers = document.querySelectorAll<HTMLElement>(DRAWER_SELECTOR);
            const drawerWidth = drawers[0]?.getBoundingClientRect().width ?? 0;
            prepareContainer(nextContainer, true);
            placeContainerOffscreen(nextContainer, getDrawerRevealOffset(drawerWidth));
            nextContainer.style.setProperty('opacity', '1', 'important');
          }
        },
        enter: async ({ next }: any) => {
          const animations: Promise<void>[] = [];
          const nextContainer = next.container as HTMLElement | null;
          if (nextContainer) {
            animations.push(animateContainerTo(nextContainer, 'translateX(0)'));
          }

          const drawers = document.querySelectorAll<HTMLElement>(DRAWER_SELECTOR);
          if (drawers.length > 0) {
            // --- FLIP Step 2: Play (Animate) ---
            animations.push(
              new Promise<void>((resolve) => {
                requestAnimationFrame(() => {
                  requestAnimationFrame(() => {
                    drawers.forEach((drawer) => {
                      // Enable Transition
                      drawer.style.setProperty(
                        'transition',
                        `width ${TRANSITION_DURATION}ms ${EASING}, transform ${TRANSITION_DURATION}ms ${EASING}`,
                        'important'
                      );
                      // Set Final State
                      drawer.style.setProperty(
                        'width',
                        `calc(100vw - var(--drawer-gap, ${DRAWER_GAP}))`,
                        'important'
                      );
                    });

                    // Wait for the transition
                    waitForTransition(drawers[0]).then(resolve);
                  });
                });
              })
            );
          }
          const navContainers = getNavContainers();
          if (navContainers.length > 0) {
            animations.push(animateNavContainersOut(navContainers, true));
          }
          await Promise.all(animations);
          // Cleanup handled by next transition or 'after' hooks
        },
      },
      {
        name: 'peripheral-to-home',
        from: { namespace: ['verkada', 'film', 'about', 'work'] },
        to: { namespace: ['home'] },
        sync: true,
        beforeEnter: ({ next }: any) => {
          const nextContainer = next.container as HTMLElement | null;
          if (!nextContainer) return;
          prepareContainer(nextContainer, false);
          nextContainer.style.transition = 'none';
          nextContainer.style.transform = 'translateX(0)';
          nextContainer.style.opacity = '0';
          setCloseTriggerVisible(false);
        },
        leave: async ({ current }: any) => {
          onBeforeLeave?.();
          const animations: Promise<void>[] = [];

          animateLogo(false);

          const currentContainer = current.container as HTMLElement | null;
          if (currentContainer) {
            prepareContainer(currentContainer, true);
            animations.push(
              animateContainerTo(currentContainer, `translateX(${OFFSCREEN_TRANSLATE})`)
            );
          }
          const drawer = getDrawer();
          if (drawer) {
            applyDrawerLayout(drawer, true);
            animations.push(animateDrawer(false, true));
          }
          await Promise.all(animations);
        },
        enter: async ({ next }: any) => {
          const nextNs = getNamespace(next.container);
          document.body.classList.toggle(PERIPHERAL_BODY_CLASS, isPeripheralNamespace(nextNs));
          setCloseTriggerVisible(false);
          setNavVisible(true);
          resetNavContainerStyles();
          const drawer = getDrawer();
          if (drawer) {
            resetDrawerStylesForHome();
            applyDrawerLayout(drawer, false);
          }
          const nextContainer = next.container as HTMLElement | null;
          if (nextContainer) {
            nextContainer.style.transitionProperty = 'opacity';
            nextContainer.style.transitionDuration = `${TRANSITION_DURATION}ms`;
            nextContainer.style.transitionTimingFunction = EASING;
            nextContainer.style.opacity = '1';
          }
        },
        after: () => {
          const drawer = getDrawer();
          if (drawer) {
            resetDrawerStylesForHome();
            applyDrawerLayout(drawer, false);
          }
        },
      },
    ],
  });

  barba.hooks.beforeEnter((data: any) => {
    updateBodyAttributes(data.next.html);
    window.scrollTo(0, 0);
  });

  barba.hooks.afterEnter((data: any) => {
    const ns = getNamespace(data.next.container);
    document.body.classList.toggle(PERIPHERAL_BODY_CLASS, isPeripheralNamespace(ns));
    setCloseTriggerVisible(isPeripheralNamespace(ns));
    reinitializeWebflow();
    onAfterEnter();
    if (ns === 'home') {
      window.requestAnimationFrame(() => {
        window.dispatchEvent(new Event('resize'));
        window.dispatchEvent(new Event('scroll'));
      });
    }
  });
};

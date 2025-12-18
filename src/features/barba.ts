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
const CLOSE_SELECTOR = '[data-nav="close-project"]';
const DRAWER_OPEN_CLASS = 'is-drawer-open';
const PERIPHERAL_BODY_CLASS = 'is-in-peripheral';
const TRANSITION_DURATION = 700;
const EASING = 'cubic-bezier(0.4, 0, 0.2, 1)';
const DRAWER_GAP = '5rem';
const OFFSCREEN_TRANSLATE = 'calc(100vw - var(--drawer-gap, 5rem))';
const BARBA_CONTAINER_SELECTOR = '[data-barba="container"]';
const LOGO_PARENT_SELECTOR = '.logo';
const LOGO_FULL_SELECTOR = '.logo > .logo-wrapper:first-child';
const LOGO_ICON_SELECTOR = '.logo > .logo-wrapper:last-child';

const setCssVars = () => {
  if (!document.documentElement.style.getPropertyValue('--drawer-gap')) {
    document.documentElement.style.setProperty('--drawer-gap', DRAWER_GAP);
  }
};

const getDrawer = () => document.querySelector<HTMLElement>(DRAWER_SELECTOR);
const getCloseTrigger = () => document.querySelector<HTMLElement>(CLOSE_SELECTOR);

const getLogoElements = () => {
  const parent = document.querySelector<HTMLElement>(LOGO_PARENT_SELECTOR);
  const wrappers = document.querySelectorAll<HTMLElement>(`${LOGO_PARENT_SELECTOR} .logo-wrapper`);
  const full = wrappers[0] as HTMLElement | undefined;
  const icon = wrappers[1] as HTMLElement | undefined;
  return { parent, full, icon };
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

const setLogoState = (isPeripheral: boolean) => {
  const { parent, full, icon } = getLogoElements();

  // Debug logging - moved before check
  console.log('setLogoState check:', {
    isPeripheral,
    hasParent: !!parent,
    hasFull: !!full,
    hasIcon: !!icon,
    parentSelector: LOGO_PARENT_SELECTOR,
    foundWrappers: document.querySelectorAll(`${LOGO_PARENT_SELECTOR} .logo-wrapper`).length,
  });

  if (!parent || !full || !icon) return;

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

  // Debug logging
  console.log('setLogoState run:', { isPeripheral, full: !!full, icon: !!icon });

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
  close.style.zIndex = '30';
  close.setAttribute('aria-hidden', String(!isVisible));
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
  style.willChange = 'transform, opacity';
  style.zIndex = isPeripheral ? '20' : '0';
};

const placeContainerOffscreen = (container: HTMLElement) => {
  const { style } = container;
  style.setProperty('transition', 'none', 'important');
  style.setProperty('transform', `translateX(${OFFSCREEN_TRANSLATE})`, 'important');
};

const animateContainerTo = async (container: HTMLElement, translateX: string) => {
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
    prevent: ({ el, href }) => shouldPrevent(el as HTMLElement | null, href),
    transitions: [
      {
        name: 'home-to-peripheral',
        from: { namespace: ['home'] },
        to: { namespace: ['verkada', 'film', 'about', 'work'] },
        sync: true,
        beforeEnter: ({ next }) => {
          const nextContainer = next.container as HTMLElement | null;
          if (!nextContainer) return;
          const drawer = getDrawer();
          animateLogo(true);
          const nextNs = getNamespace(next.container);
          document.body.classList.toggle(PERIPHERAL_BODY_CLASS, isPeripheralNamespace(nextNs));
          setCloseTriggerVisible(true);
          ensureDrawerBaseStyles();
          if (drawer) {
            // Check if Nav is open (prevent snapping)
            const isNavOpen =
              document.body.classList.contains('is-nav-open') ||
              drawer.classList.contains('is-nav-open');
            if (isNavOpen) {
              const currentWidth = drawer.getBoundingClientRect().width;
              // Lock current width immediately
              drawer.style.setProperty('width', `${currentWidth}px`, 'important');
              // Force reflow
              void drawer.offsetWidth;
            }

            // Apply fixed layout, but skip setting the final calc width if we are animating it
            applyDrawerLayout(drawer, true, isNavOpen);

            // Now set up the transition
            const prop = isNavOpen ? 'transform, width' : 'transform';
            drawer.style.setProperty('transition-property', prop, 'important');
            drawer.style.setProperty(
              'transition-duration',
              `${TRANSITION_DURATION}ms`,
              'important'
            );
            drawer.style.setProperty('transition-timing-function', EASING, 'important');

            if (isNavOpen) {
              // Now set the target width to animate TO
              requestAnimationFrame(() => {
                drawer.style.setProperty(
                  'width',
                  `calc(100vw - var(--drawer-gap, ${DRAWER_GAP}))`,
                  'important'
                );
              });
            }
          }
          setNavVisible(false);
          prepareContainer(nextContainer, true);
          placeContainerOffscreen(nextContainer);
          nextContainer.style.setProperty('opacity', '1', 'important');
        },
        leave: async ({ current, next }) => {
          onBeforeLeave?.();
          hideCurrentContainer(current?.container as HTMLElement | null);
          const nextContainer = next.container as HTMLElement | null;
          if (nextContainer) {
            prepareContainer(nextContainer, true);
            placeContainerOffscreen(nextContainer);
            nextContainer.style.setProperty('opacity', '1', 'important');
          }
        },
        enter: async ({ next }) => {
          const animations: Promise<void>[] = [];
          const nextContainer = next.container as HTMLElement | null;
          if (nextContainer) {
            animations.push(animateContainerTo(nextContainer, 'translateX(0)'));
          }
          const drawer = getDrawer();
          if (drawer) {
            applyDrawerLayout(drawer, true);
            animations.push(animateDrawer(true, true));
          }
          await Promise.all(animations);
          if (drawer) {
            setDrawerState(drawer, true, false, true);
          }
        },
      },
      {
        name: 'peripheral-to-home',
        from: { namespace: ['verkada', 'film', 'about', 'work'] },
        to: { namespace: ['home'] },
        sync: true,
        beforeEnter: ({ next }) => {
          const nextContainer = next.container as HTMLElement | null;
          if (!nextContainer) return;
          prepareContainer(nextContainer, false);
          nextContainer.style.transition = 'none';
          nextContainer.style.transform = 'translateX(0)';
          nextContainer.style.opacity = '0';
          setCloseTriggerVisible(false);
        },
        leave: async ({ current }) => {
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
        enter: async ({ next }) => {
          const nextNs = getNamespace(next.container);
          document.body.classList.toggle(PERIPHERAL_BODY_CLASS, isPeripheralNamespace(nextNs));
          setCloseTriggerVisible(false);
          setNavVisible(true);
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
      },
    ],
  });

  barba.hooks.beforeEnter((data) => {
    updateBodyAttributes(data.next.html);
    window.scrollTo(0, 0);
  });

  barba.hooks.afterEnter((data) => {
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

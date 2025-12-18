import barba from '@barba/core';

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

const setCssVars = () => {
  if (!document.documentElement.style.getPropertyValue('--drawer-gap')) {
    document.documentElement.style.setProperty('--drawer-gap', DRAWER_GAP);
  }
};

const getDrawer = () => document.querySelector<HTMLElement>(DRAWER_SELECTOR);
const getCloseTrigger = () => document.querySelector<HTMLElement>(CLOSE_SELECTOR);
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

const applyDrawerLayout = (drawer: HTMLElement, isPeripheral: boolean) => {
  if (isPeripheral) {
    drawer.style.position = 'fixed';
    drawer.style.top = '0';
    drawer.style.right = '0';
    drawer.style.bottom = '0';
    drawer.style.left = '';
    drawer.style.setProperty(
      'width',
      `calc(100vw - var(--drawer-gap, ${DRAWER_GAP}))`,
      'important'
    );
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

  // start from current state and ensure we actually animate; force important so CSS can't override
  setDrawerState(drawer, isOpen, true, true, forceImportant);
  await waitForTransition(drawer);
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
  style.position = 'relative';
  style.top = '';
  style.left = '';
  style.right = '';
  style.bottom = '';
  style.width = isPeripheral ? `calc(100vw - var(--drawer-gap, ${DRAWER_GAP}))` : '100%';
  style.minHeight = style.minHeight || '100vh';
  style.willChange = 'transform, opacity';
  style.zIndex = isPeripheral ? '20' : '0';
};

const placeContainerOffscreen = (container: HTMLElement) => {
  const { style } = container;
  style.transition = 'none';
  style.transform = `translateX(${OFFSCREEN_TRANSLATE})`;
};

const animateContainerTo = async (container: HTMLElement, translateX: string) => {
  const { style } = container;
  // force a reflow to ensure the previous transform sticks before animating
  void container.getBoundingClientRect();
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
      style.transitionProperty = 'transform, opacity';
      style.transitionDuration = `${TRANSITION_DURATION}ms`;
      style.transitionTimingFunction = EASING;
      style.transform = translateX;
      waitForTransition(container).then(resolve);
    });
  });
};

const syncInitialState = () => {
  const container = document.querySelector<HTMLElement>(BARBA_CONTAINER_SELECTOR);
  const drawer = getDrawer();
  const ns = getNamespace(container);
  const isPeripheral = isPeripheralNamespace(ns);

  document.body.classList.toggle(PERIPHERAL_BODY_CLASS, isPeripheral);
  setCloseTriggerVisible(isPeripheral);

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
          prepareContainer(nextContainer, true);
          placeContainerOffscreen(nextContainer);
          setCloseTriggerVisible(true);
        },
        leave: async ({ next }) => {
          onBeforeLeave?.();
          ensureDrawerBaseStyles();
          const nextNs = getNamespace(next?.container);
          document.body.classList.toggle(PERIPHERAL_BODY_CLASS, isPeripheralNamespace(nextNs));
          const drawer = getDrawer();
          if (drawer) {
            applyDrawerLayout(drawer, true);
            setDrawerState(drawer, false, false, true, true);
          }
          const nextContainer = next.container as HTMLElement | null;
          if (nextContainer) {
            prepareContainer(nextContainer, true);
            placeContainerOffscreen(nextContainer);
            nextContainer.style.opacity = '1';
          }
          await Promise.all([
            animateDrawer(true, true),
            nextContainer ? animateContainerTo(nextContainer, 'translateX(0)') : Promise.resolve(),
          ]);
        },
        enter: async ({ next }) => {
          // drawer/container already animated in leave (sync), just ensure final state
          const drawer = getDrawer();
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
          nextContainer.style.transform = 'translateX(0)';
          nextContainer.style.opacity = '0';
          setCloseTriggerVisible(false);
        },
        leave: async ({ current }) => {
          onBeforeLeave?.();
          const animations: Promise<void>[] = [];
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

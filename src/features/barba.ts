/* eslint-disable @typescript-eslint/no-explicit-any */
import barba from '@barba/core';

import { forceCloseNav, setNavVisible } from './nav';

type BarbaCallbacks = {
  onAfterEnter: () => void;
  onBeforeLeave?: (data: {
    currentNamespace: string | null;
    nextNamespace: string | null;
    isPeripheralCurrent: boolean;
    isPeripheralNext: boolean;
  }) => void;
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

const CLOSE_SELECTOR = '[data-nav="close-project"]';
const NAV_SELECTOR = '.drawer';
const NAV_WRAPPER_SELECTOR = '.drawer-wrapper';
const NAV_SHELL_SELECTOR = `${NAV_WRAPPER_SELECTOR}, ${NAV_SELECTOR}`;
const NAV_PERSIST_ATTR = 'data-nav-persistent';
const CLOSE_PERSIST_ATTR = 'data-close-persistent';

const PERIPHERAL_BODY_CLASS = 'is-in-peripheral';
const TRANSITIONING_PERIPHERAL_CLASS = 'is-transitioning-peripheral';
const TRANSITION_DURATION = 700;
const EASING = 'cubic-bezier(0.4, 0, 0.2, 1)';
const DEBUG_TRANSITIONS = false;

const LOOP_SLIDER_SNAP_ATTR = 'data-loop-slider-snap';

const BARBA_CONTAINER_SELECTOR = '[data-barba="container"]';
const PROJECT_WRAPPER_SELECTOR = '.project-wrapper';
const HOME_CONTENT_SELECTOR = '.home-main';

const ensurePersistentShell = () => {
  const wrapper = document.querySelector<HTMLElement>(BARBA_WRAPPER_SELECTOR);
  if (!wrapper) {
    return;
  }

  const container = document.querySelector<HTMLElement>(BARBA_CONTAINER_SELECTOR);

  let navShell =
    wrapper.querySelector<HTMLElement>(`${NAV_WRAPPER_SELECTOR}[${NAV_PERSIST_ATTR}]`) ||
    wrapper.querySelector<HTMLElement>(NAV_WRAPPER_SELECTOR) ||
    wrapper.querySelector<HTMLElement>(`${NAV_SELECTOR}[${NAV_PERSIST_ATTR}]`) ||
    wrapper.querySelector<HTMLElement>(NAV_SELECTOR) ||
    container?.querySelector<HTMLElement>(`${NAV_WRAPPER_SELECTOR}[${NAV_PERSIST_ATTR}]`) ||
    container?.querySelector<HTMLElement>(NAV_WRAPPER_SELECTOR) ||
    container?.querySelector<HTMLElement>(`${NAV_SELECTOR}[${NAV_PERSIST_ATTR}]`) ||
    container?.querySelector<HTMLElement>(NAV_SELECTOR) ||
    null;

  if (navShell) {
    navShell.setAttribute(NAV_PERSIST_ATTR, 'true');
    if (navShell.parentElement !== wrapper) {
      wrapper.insertBefore(navShell, wrapper.firstChild);
    }
  }

  const pruneShellNodes = (root: Element | null) => {
    if (!root || !navShell) {
      return;
    }
    root.querySelectorAll<HTMLElement>(NAV_SHELL_SELECTOR).forEach((node) => {
      if (node === navShell || navShell.contains(node) || node.contains(navShell)) {
        return;
      }
      node.remove();
    });
  };

  pruneShellNodes(wrapper);
  pruneShellNodes(container);

  let close =
    wrapper.querySelector<HTMLElement>(`${CLOSE_SELECTOR}[${CLOSE_PERSIST_ATTR}]`) ||
    wrapper.querySelector<HTMLElement>(CLOSE_SELECTOR) ||
    container?.querySelector<HTMLElement>(CLOSE_SELECTOR) ||
    null;

  if (close) {
    close.setAttribute(CLOSE_PERSIST_ATTR, 'true');
    if (close.parentElement !== wrapper) {
      wrapper.insertBefore(close, navShell?.nextSibling ?? wrapper.firstChild);
    }
  }

  wrapper.querySelectorAll<HTMLElement>(CLOSE_SELECTOR).forEach((node) => {
    if (close && node === close) {
      return;
    }
    node.remove();
  });

  if (container) {
    container.querySelectorAll<HTMLElement>(CLOSE_SELECTOR).forEach((node) => {
      if (close && node === close) {
        return;
      }
      node.remove();
    });
  }
};

const setHorizontalOverflowLock = (lock: boolean) => {
  const root = document.documentElement;
  const { body } = document;
  if (lock) {
    root.style.setProperty('overflow-x', 'hidden');
    body.style.setProperty('overflow-x', 'hidden');
  } else {
    root.style.removeProperty('overflow-x');
    body.style.removeProperty('overflow-x');
  }
};

const waitForOpacityTransition = (element: HTMLElement, duration: number) =>
  new Promise<void>((resolve) => {
    let settled = false;
    const done = () => {
      if (settled) return;
      settled = true;
      element.removeEventListener('transitionend', onEnd);
      resolve();
    };
    const onEnd = (event: TransitionEvent) => {
      if (event.propertyName === 'opacity') {
        done();
      }
    };
    element.addEventListener('transitionend', onEnd);
    window.setTimeout(done, duration + 50);
  });

const getTransitionDurationMs = (element: HTMLElement) => {
  const duration = getComputedStyle(element).transitionDuration;
  const parts = duration.split(',').map((part) => part.trim());
  const first = parts[0] ?? '0s';
  if (first.endsWith('ms')) {
    return Number.parseFloat(first);
  }
  if (first.endsWith('s')) {
    return Number.parseFloat(first) * 1000;
  }
  return 0;
};

const fadeOutElement = async (element: HTMLElement) => {
  element.style.display = element.style.display || '';
  element.style.visibility = 'visible';
  element.style.transition = `opacity ${TRANSITION_DURATION}ms ${EASING}`;
  element.style.opacity = '1';
  void element.offsetWidth;
  await new Promise<void>((resolve) => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        element.style.opacity = '0';
        resolve();
      });
    });
  });

  const computedDuration = getTransitionDurationMs(element);
  if (computedDuration <= 0) {
    return;
  }

  await waitForOpacityTransition(element, computedDuration);
  element.style.visibility = 'hidden';
  element.style.pointerEvents = 'none';
};

const getFadeTarget = (container?: Element | null) => {
  if (!container) {
    return null;
  }
  return (
    container.querySelector<HTMLElement>(PROJECT_WRAPPER_SELECTOR) ??
    container.querySelector<HTMLElement>(HOME_CONTENT_SELECTOR) ??
    (container as HTMLElement)
  );
};

const debugLog = (label: string, payload?: Record<string, unknown>) => {
  if (!DEBUG_TRANSITIONS) {
    return;
  }
  const time = Math.round(performance.now());
  if (payload) {
    console.log(`[barba ${time}] ${label}`, payload);
  } else {
    console.log(`[barba ${time}] ${label}`);
  }
};

const getComputedSnapshot = () => {
  const nav = document.querySelector<HTMLElement>(NAV_SELECTOR);
  const container = document.querySelector<HTMLElement>(BARBA_CONTAINER_SELECTOR);
  const wrapper = document.querySelector<HTMLElement>(BARBA_WRAPPER_SELECTOR);
  const main = document.querySelector<HTMLElement>('.main-wrapper');
  const project = document.querySelector<HTMLElement>('.project-wrapper');

  const navStyles = nav ? getComputedStyle(nav) : null;
  const containerStyles = container ? getComputedStyle(container) : null;
  const wrapperStyles = wrapper ? getComputedStyle(wrapper) : null;
  const mainStyles = main ? getComputedStyle(main) : null;
  const projectStyles = project ? getComputedStyle(project) : null;

  return {
    bodyClasses: document.body.className,
    nav: nav
      ? {
          display: navStyles?.display,
          opacity: navStyles?.opacity,
          visibility: navStyles?.visibility,
          zIndex: navStyles?.zIndex,
          width: navStyles?.width,
          height: navStyles?.height,
          background: navStyles?.backgroundColor,
        }
      : null,
    container: container
      ? {
          display: containerStyles?.display,
          opacity: containerStyles?.opacity,
          visibility: containerStyles?.visibility,
          zIndex: containerStyles?.zIndex,
          position: containerStyles?.position,
          overflow: containerStyles?.overflow,
        }
      : null,
    wrapper: wrapper
      ? {
          display: wrapperStyles?.display,
          opacity: wrapperStyles?.opacity,
          visibility: wrapperStyles?.visibility,
          zIndex: wrapperStyles?.zIndex,
          position: wrapperStyles?.position,
        }
      : null,
    mainWrapper: main
      ? {
          display: mainStyles?.display,
          opacity: mainStyles?.opacity,
          visibility: mainStyles?.visibility,
          zIndex: mainStyles?.zIndex,
          position: mainStyles?.position,
          overflow: mainStyles?.overflow,
        }
      : null,
    projectWrapper: project
      ? {
          display: projectStyles?.display,
          opacity: projectStyles?.opacity,
          visibility: projectStyles?.visibility,
          zIndex: projectStyles?.zIndex,
          position: projectStyles?.position,
          overflow: projectStyles?.overflow,
        }
      : null,
  };
};

const startTransitionDebugObserver = () => {
  if (!DEBUG_TRANSITIONS) {
    return () => {};
  }

  const targets = [
    document.body,
    document.querySelector<HTMLElement>(NAV_SELECTOR),
    document.querySelector<HTMLElement>(BARBA_CONTAINER_SELECTOR),
    document.querySelector<HTMLElement>('.main-wrapper'),
    document.querySelector<HTMLElement>('.project-wrapper'),
  ].filter(Boolean) as HTMLElement[];

  const observer = new MutationObserver((mutations) => {
    const summaries = mutations.map((mutation) => ({
      type: mutation.type,
      target:
        mutation.target instanceof HTMLElement
          ? mutation.target.className || mutation.target.tagName
          : String(mutation.target),
      attributeName: mutation.attributeName || null,
    }));
    debugLog('mutation', { summaries, snapshot: getComputedSnapshot() });
  });

  targets.forEach((target) => {
    observer.observe(target, {
      attributes: true,
      attributeFilter: ['class', 'style'],
    });
  });

  debugLog('observer-start', getComputedSnapshot());

  return () => {
    observer.disconnect();
    debugLog('observer-stop', getComputedSnapshot());
  };
};
const getCloseTrigger = () => document.querySelector<HTMLElement>(CLOSE_SELECTOR);

const getNamespace = (container?: Element | null) =>
  container?.getAttribute('data-barba-namespace') ?? null;
const isPeripheralNamespace = (ns: string | null | undefined) => Boolean(ns && ns !== 'home');
const isPeripheralHref = (href?: string | null) => {
  if (!href) {
    return false;
  }
  try {
    const url = new URL(href, window.location.href);
    const path = url.pathname.replace(/\/+$/, '');
    return path !== '';
  } catch {
    return false;
  }
};

const updateBodyAttributes = (nextHtml: string) => {
  const parsed = new DOMParser().parseFromString(nextHtml, 'text/html');
  const nextBody = parsed.body;

  if (!nextBody) {
    return;
  }

  if (!document.body.classList.contains(TRANSITIONING_PERIPHERAL_CLASS)) {
    document.body.className = nextBody.className;
  }
  // Ensure we keep the peripheral class if we are navigating between peripheral pages
  // Note: Barba hooks will handle adding/removing it based on transition
  // But for now, let's rely on the incoming body class which should match the page

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
};

const syncInitialState = () => {
  debugLog('sync-initial', getComputedSnapshot());
  const container = document.querySelector<HTMLElement>(BARBA_CONTAINER_SELECTOR);
  const ns = getNamespace(container);
  const isPeripheral = isPeripheralNamespace(ns);

  document.body.classList.toggle(PERIPHERAL_BODY_CLASS, isPeripheral);
  setCloseTriggerVisible(isPeripheral);
  setHorizontalOverflowLock(!isPeripheral);
};

export const initBarba = ({ onAfterEnter, onBeforeLeave }: BarbaCallbacks) => {
  if (!document.querySelector(BARBA_WRAPPER_SELECTOR)) {
    return;
  }

  ensurePersistentShell();
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
        beforeEnter: () => {
          debugLog('home-to-peripheral:beforeEnter', getComputedSnapshot());
          // ensure the close trigger is ready as we transition in
          setCloseTriggerVisible(true);
        },
        leave: async ({ current, next, trigger }: any) => {
          const stopObserver = startTransitionDebugObserver();
          const currentNamespace = getNamespace(current?.container);
          const nextNamespace = getNamespace(next?.container);
          const nextHref =
            next?.url?.href ??
            (trigger instanceof Element ? trigger.getAttribute('href') : null);
          onBeforeLeave?.({
            currentNamespace,
            nextNamespace,
            isPeripheralCurrent: isPeripheralNamespace(currentNamespace),
            isPeripheralNext: isPeripheralNamespace(nextNamespace) || isPeripheralHref(nextHref),
          });
          document.body.classList.add(TRANSITIONING_PERIPHERAL_CLASS);
          const currentContainer = current.container as HTMLElement | null;
          if (currentContainer) {
            currentContainer.classList.add('is-leaving');
          }
          const currentFadeTarget = getFadeTarget(currentContainer);
          if (currentFadeTarget) {
            // Fade out current content
            await fadeOutElement(currentFadeTarget);
          }
          stopObserver();
        },
        enter: async ({ next }: any) => {
          debugLog('home-to-peripheral:enter-start', getComputedSnapshot());
          window.scrollTo(0, 0);

          // Trigger the 'Dynamic Island' expansion via CSS class
          document.body.classList.add(TRANSITIONING_PERIPHERAL_CLASS);
          document.body.classList.add(PERIPHERAL_BODY_CLASS);

          // Ensure the underlying nav state is closed so it doesn't snap when we return
          forceCloseNav();

          const nextContainer = next.container as HTMLElement | null;
          const nextFadeTarget = getFadeTarget(nextContainer);
          if (nextContainer) {
            // Ensure next container starts invisible and waits for the drawer to expand
            nextContainer.style.opacity = '1';
          }
          if (nextFadeTarget) {
            nextFadeTarget.style.opacity = '0';
          }

          // Wait for the drawer expansion transition
          // The drawer transition is controlled by CSS on .is-in-peripheral
          await new Promise((r) => setTimeout(r, TRANSITION_DURATION));

          document.body.classList.remove(TRANSITIONING_PERIPHERAL_CLASS);

          if (nextFadeTarget) {
            void nextFadeTarget.offsetWidth;
            nextFadeTarget.style.transition = `opacity ${TRANSITION_DURATION}ms ${EASING}`;
            nextFadeTarget.style.opacity = '1';
          }
          debugLog('home-to-peripheral:enter-end', getComputedSnapshot());
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
          setHorizontalOverflowLock(true);
          // prepare container styles if necessary, but CSS usually handles it.
          // Home container usually doesn't need special prep if CSS is correct.
          setCloseTriggerVisible(false);
        },
        leave: async ({ current, next, trigger }: any) => {
          const stopObserver = startTransitionDebugObserver();
          const currentNamespace = getNamespace(current?.container);
          const nextNamespace = getNamespace(next?.container);
          const nextHref =
            next?.url?.href ??
            (trigger instanceof Element ? trigger.getAttribute('href') : null);
          onBeforeLeave?.({
            currentNamespace,
            nextNamespace,
            isPeripheralCurrent: isPeripheralNamespace(currentNamespace),
            isPeripheralNext: isPeripheralNamespace(nextNamespace) || isPeripheralHref(nextHref),
          });
          const currentContainer = current.container as HTMLElement | null;
          const currentFadeTarget = getFadeTarget(currentContainer);
          if (currentFadeTarget) {
            document.body.classList.add(TRANSITIONING_PERIPHERAL_CLASS);
            await fadeOutElement(currentFadeTarget);
          }

          forceCloseNav();

          window.scrollTo(0, 0);

          if (!currentFadeTarget) {
            await new Promise((r) => setTimeout(r, TRANSITION_DURATION));
          }

          // Trigger shrink back to home after content fades out
          document.body.classList.remove(PERIPHERAL_BODY_CLASS);
          document.body.classList.remove(TRANSITIONING_PERIPHERAL_CLASS);
          stopObserver();
        },
        enter: async ({ next }: any) => {
          setCloseTriggerVisible(false);
          setNavVisible(true);

          const nextContainer = next.container as HTMLElement | null;
          const nextFadeTarget = getFadeTarget(nextContainer);
          if (nextContainer) {
            nextContainer.style.opacity = '1';
          }
          if (nextFadeTarget) {
            nextFadeTarget.style.transition = `opacity ${TRANSITION_DURATION}ms ${EASING}`;
            nextFadeTarget.style.opacity = '1';
          }
        },
      },
    ],
  });

  barba.hooks.beforeEnter((data: any) => {
    ensurePersistentShell();
    window.scrollTo(0, 0);
  });

  barba.hooks.afterEnter((data: any) => {
    updateBodyAttributes(data.next.html);
    ensurePersistentShell();
    const ns = getNamespace(data.next.container);
    const prevNs = getNamespace(data.current?.container);
    const shouldSnapLoopSlider = ns === 'home' && isPeripheralNamespace(prevNs);
    if (shouldSnapLoopSlider) {
      document.body.setAttribute(LOOP_SLIDER_SNAP_ATTR, 'true');
    } else {
      document.body.removeAttribute(LOOP_SLIDER_SNAP_ATTR);
    }
    document.body.classList.toggle(PERIPHERAL_BODY_CLASS, isPeripheralNamespace(ns));
    setCloseTriggerVisible(isPeripheralNamespace(ns));
    setHorizontalOverflowLock(!isPeripheralNamespace(ns));
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

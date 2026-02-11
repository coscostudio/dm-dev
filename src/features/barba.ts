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
const NAV_SELECTOR = 'nav.drawer';
const NAV_PERSIST_ATTR = 'data-nav-persistent';
const CLOSE_PERSIST_ATTR = 'data-close-persistent';

const PERIPHERAL_BODY_CLASS = 'is-in-peripheral';
const TRANSITION_DURATION = 700;
const EASING = 'cubic-bezier(0.4, 0, 0.2, 1)';

const LOOP_SLIDER_SNAP_ATTR = 'data-loop-slider-snap';

const BARBA_CONTAINER_SELECTOR = '[data-barba="container"]';

const ensurePersistentShell = () => {
  const wrapper = document.querySelector<HTMLElement>(BARBA_WRAPPER_SELECTOR);
  if (!wrapper) {
    return;
  }

  const container = document.querySelector<HTMLElement>(BARBA_CONTAINER_SELECTOR);

  let nav =
    wrapper.querySelector<HTMLElement>(`${NAV_SELECTOR}[${NAV_PERSIST_ATTR}]`) ||
    wrapper.querySelector<HTMLElement>(NAV_SELECTOR) ||
    container?.querySelector<HTMLElement>(NAV_SELECTOR) ||
    null;

  if (nav) {
    nav.setAttribute(NAV_PERSIST_ATTR, 'true');
    if (nav.parentElement !== wrapper) {
      wrapper.insertBefore(nav, wrapper.firstChild);
    }
  }

  wrapper.querySelectorAll<HTMLElement>(NAV_SELECTOR).forEach((node) => {
    if (nav && node === nav) {
      return;
    }
    node.remove();
  });

  if (container) {
    container.querySelectorAll<HTMLElement>(NAV_SELECTOR).forEach((node) => {
      if (nav && node === nav) {
        return;
      }
      node.remove();
    });
  }

  let close =
    wrapper.querySelector<HTMLElement>(`${CLOSE_SELECTOR}[${CLOSE_PERSIST_ATTR}]`) ||
    wrapper.querySelector<HTMLElement>(CLOSE_SELECTOR) ||
    container?.querySelector<HTMLElement>(CLOSE_SELECTOR) ||
    null;

  if (close) {
    close.setAttribute(CLOSE_PERSIST_ATTR, 'true');
    if (close.parentElement !== wrapper) {
      wrapper.insertBefore(close, nav?.nextSibling ?? wrapper.firstChild);
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

  document.body.className = nextBody.className;
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
          // ensure the close trigger is ready as we transition in
          setCloseTriggerVisible(true);
        },
        leave: async ({ current, next, trigger }: any) => {
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
          if (currentContainer) {
            // Fade out current content
            currentContainer.style.transition = `opacity ${TRANSITION_DURATION}ms ${EASING}`;
            currentContainer.style.opacity = '0';
            // Wait for fade out
            await new Promise((r) => setTimeout(r, TRANSITION_DURATION));
          }
        },
        enter: async ({ next }: any) => {
          window.scrollTo(0, 0);

          // Trigger the 'Dynamic Island' expansion via CSS class
          document.body.classList.add(PERIPHERAL_BODY_CLASS);

          // Ensure the underlying nav state is closed so it doesn't snap when we return
          forceCloseNav();

          const nextContainer = next.container as HTMLElement | null;
          if (nextContainer) {
            // Ensure next container starts invisible then fades in
            nextContainer.style.opacity = '0';
            // Force reflow
            void nextContainer.offsetWidth;

            requestAnimationFrame(() => {
              nextContainer.style.transition = `opacity ${TRANSITION_DURATION}ms ${EASING}`;
              nextContainer.style.opacity = '1';
            });
          }

          // Wait for the drawer expansion transition
          // The drawer transition is controlled by CSS on .is-in-peripheral
          await new Promise((r) => setTimeout(r, TRANSITION_DURATION));
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
          if (currentContainer) {
            currentContainer.style.transition = `opacity ${TRANSITION_DURATION}ms ${EASING}`;
            currentContainer.style.opacity = '0';
          }

          forceCloseNav();

          // Trigger shrink back to home via CSS class removal
          document.body.classList.remove(PERIPHERAL_BODY_CLASS);
          window.scrollTo(0, 0);

          await new Promise((r) => setTimeout(r, TRANSITION_DURATION));
        },
        enter: async ({ next }: any) => {
          setCloseTriggerVisible(false);
          setNavVisible(true);

          const nextContainer = next.container as HTMLElement | null;
          if (nextContainer) {
            nextContainer.style.transition = `opacity ${TRANSITION_DURATION}ms ${EASING}`;
            nextContainer.style.opacity = '1';
          }
        },
      },
    ],
  });

  barba.hooks.beforeEnter((data: any) => {
    updateBodyAttributes(data.next.html);
    ensurePersistentShell();
    window.scrollTo(0, 0);
  });

  barba.hooks.afterEnter((data: any) => {
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

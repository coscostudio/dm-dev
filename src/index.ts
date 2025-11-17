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

  const openNav = (lockOpen: boolean) => {
    state.isOpen = true;
    state.isLockedOpen = lockOpen ? true : state.isLockedOpen;
    applyState();
  };

  const closeNav = () => {
    state.isOpen = false;
    state.isLockedOpen = false;
    applyState();
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

if (document.readyState === 'complete' || document.readyState === 'interactive') {
  initNavInteractions();
} else {
  document.addEventListener('DOMContentLoaded', initNavInteractions);
}

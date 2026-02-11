const SELECTORS = {
  wrapper: '[data-nav="wrapper"]',
  drawer: '.drawer',
  container: '.nav-container',
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

type NavCleanup = () => void;

const getNavElements = (): NavElements | null => {
  const wrapper =
    document.querySelector<HTMLElement>(SELECTORS.drawer) ||
    document.querySelector<HTMLElement>(SELECTORS.wrapper);
  const toggle = document.querySelector<HTMLElement>(SELECTORS.toggle);
  const openIcon = document.querySelector<HTMLElement>(SELECTORS.openIcon);
  const closeIcon = document.querySelector<HTMLElement>(SELECTORS.closeIcon);
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>(SELECTORS.links));

  if (!wrapper || !toggle || !openIcon || !closeIcon) {
    return null;
  }

  return { wrapper, toggle, openIcon, closeIcon, links };
};

export const NAV_OPEN_CLASS = 'is-nav-open';
export const NAV_LINKS_VISIBLE_CLASS = 'are-nav-links-visible';
const LINKS_FADE_DURATION = 320;

export const forceCloseNav = () => {
  const elements = getNavElements();

  if (!elements) {
    return;
  }

  const { wrapper, toggle, openIcon, closeIcon } = elements;
  wrapper.classList.remove(NAV_OPEN_CLASS, NAV_LINKS_VISIBLE_CLASS);
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-pressed', 'false');
  openIcon.toggleAttribute('aria-hidden', false);
  closeIcon.toggleAttribute('aria-hidden', true);
  openIcon.hidden = false;
  closeIcon.hidden = true;
};

export const setNavVisible = (isVisible: boolean) => {
  const navContainer = document.querySelector<HTMLElement>(SELECTORS.container);
  if (!navContainer) return;

  navContainer.style.opacity = isVisible ? '1' : '0';
  navContainer.style.pointerEvents = isVisible ? '' : 'none';
  navContainer.style.visibility = isVisible ? '' : 'hidden'; // Ensure it doesn't block clicks when hidden
};

export const initNavInteractions = (): NavCleanup | null => {
  const elements = getNavElements();

  if (!elements) {
    return null;
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

  const resetNavState = () => {
    state.isOpen = false;
    state.isLockedOpen = false;
    wrapper.classList.remove(NAV_OPEN_CLASS, NAV_LINKS_VISIBLE_CLASS);
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-pressed', 'false');
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

  const handleHoverChange = (event: MediaQueryListEvent) => {
    state.hoverEnabled = event.matches;

    if (!state.hoverEnabled && state.isOpen && !state.isLockedOpen) {
      closeNav();
    }
  };

  const handleToggleClick = (event: MouseEvent) => {
    event.preventDefault();
    toggleNav();
  };

  const handleToggleKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    event.preventDefault();
    toggleNav();
  };

  /* 
     UPDATED: Don't close nav immediately if we are going to a peripheral page 
     This prevents the "shrink then expand" flicker.
     Let Barba transition handle the state change.
  */
  const handleLinkClick = (e: MouseEvent) => {
    const target = e.currentTarget as HTMLAnchorElement;
    const href = target.getAttribute('href');

    // Check if the link points to a peripheral page
    const isPeripheral =
      href &&
      (href.includes('verkada') ||
        href.includes('film') ||
        href.includes('about') ||
        href.includes('work'));

    if (isPeripheral) {
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
  hoverMediaQuery.addEventListener('change', handleHoverChange);

  toggle.addEventListener('click', handleToggleClick);
  toggle.addEventListener('keydown', handleToggleKeyDown);

  links.forEach((link) => {
    link.addEventListener('click', handleLinkClick);
  });

  return () => {
    if (hideLinksTimeout !== null) {
      window.clearTimeout(hideLinksTimeout);
      hideLinksTimeout = null;
    }

    wrapper.removeEventListener('mouseenter', handleHoverEnter);
    wrapper.removeEventListener('mouseleave', handleHoverLeave);
    hoverMediaQuery.removeEventListener('change', handleHoverChange);

    toggle.removeEventListener('click', handleToggleClick);
    toggle.removeEventListener('keydown', handleToggleKeyDown);

    links.forEach((link) => {
      link.removeEventListener('click', handleLinkClick);
    });

    resetNavState();
  };
};

import './styles/transitions.css';

import { initBarba } from './features/barba';
import { destroyLoopSlider, initLoopSlider } from './features/loopSlider';
import { forceCloseNav, initNavInteractions, setNavVisible } from './features/nav';

let navCleanup: ((options?: { resetState?: boolean }) => void) | null = null;

const cleanupFeatures = (options?: { preserveNavState?: boolean }) => {
  if (options?.preserveNavState) {
    navCleanup?.({ resetState: false });
  } else {
    navCleanup?.();
  }
  navCleanup = null;
  destroyLoopSlider();
};

const initFeatures = () => {
  cleanupFeatures();
  const isPeripheral = document.body.classList.contains('is-in-peripheral');
  if (!isPeripheral) {
    setNavVisible(true);
    navCleanup = initNavInteractions();
  } else {
    forceCloseNav();
    setNavVisible(true);
    navCleanup = null;
  }
  initLoopSlider();
  window.requestAnimationFrame(() => {
    navCleanup?.();
    const isStillPeripheral = document.body.classList.contains('is-in-peripheral');
    if (!isStillPeripheral) {
      setNavVisible(true);
      navCleanup = initNavInteractions();
    } else {
      forceCloseNav();
      setNavVisible(true);
      navCleanup = null;
    }
  });
};

const init = () => {
  initFeatures();

  initBarba({
    onBeforeLeave: () => {
      cleanupFeatures({ preserveNavState: true });
    },
    onAfterEnter: initFeatures,
  });
};

if (document.readyState === 'complete' || document.readyState === 'interactive') {
  init();
} else {
  document.addEventListener('DOMContentLoaded', init);
}

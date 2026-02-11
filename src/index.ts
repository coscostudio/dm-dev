import './styles/transitions.css';

import { initBarba } from './features/barba';
import { destroyLoopSlider, initLoopSlider } from './features/loopSlider';
import { forceCloseNav, initNavInteractions, setNavVisible } from './features/nav';

let navCleanup: (() => void) | null = null;

const cleanupFeatures = () => {
  navCleanup?.();
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
    setNavVisible(false);
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
      setNavVisible(false);
      navCleanup = null;
    }
  });
};

const init = () => {
  initFeatures();

  initBarba({
    onBeforeLeave: cleanupFeatures,
    onAfterEnter: initFeatures,
  });
};

if (document.readyState === 'complete' || document.readyState === 'interactive') {
  init();
} else {
  document.addEventListener('DOMContentLoaded', init);
}

import { initBarba } from './features/barba';
import { destroyLoopSlider, initLoopSlider } from './features/loopSlider';
import { forceCloseNav, initNavInteractions } from './features/nav';

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
    navCleanup = initNavInteractions();
  } else {
    forceCloseNav();
    navCleanup = null;
  }
  initLoopSlider();
  // Re-run nav init on the next frame to survive any late DOM mutations (e.g. Webflow)
  window.requestAnimationFrame(() => {
    navCleanup?.();
    const isStillPeripheral = document.body.classList.contains('is-in-peripheral');
    if (!isStillPeripheral) {
      navCleanup = initNavInteractions();
    } else {
      forceCloseNav();
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

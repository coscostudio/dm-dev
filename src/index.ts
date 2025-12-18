import { initBarba } from './features/barba';
import { destroyLoopSlider, initLoopSlider } from './features/loopSlider';
import { initNavInteractions } from './features/nav';

let navCleanup: (() => void) | null = null;

const cleanupFeatures = () => {
  navCleanup?.();
  navCleanup = null;
  destroyLoopSlider();
};

const initFeatures = () => {
  cleanupFeatures();
  navCleanup = initNavInteractions();
  initLoopSlider();
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

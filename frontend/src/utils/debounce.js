/**
 * debounce.js
 * -----------------------------------------------------------------------
 * Minimal debounce utility — replaces the `lodash` dependency, which was
 * only being used for ONE function (`debounce`) in the entire BulgeText
 * feature. Pulling in all of lodash for that is unnecessary bundle weight.
 *
 * Behavior matches lodash's debounce closely enough for our use case:
 * delays invoking `fn` until `wait` ms have passed since the last call,
 * and exposes `.cancel()` for effect cleanup.
 */
export function debounce(fn, wait = 100) {
  let timeoutId;

  function debounced(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      timeoutId = undefined;
      fn(...args);
    }, wait);
  }

  debounced.cancel = () => {
    clearTimeout(timeoutId);
    timeoutId = undefined;
  };

  return debounced;
}
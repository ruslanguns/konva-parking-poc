/**
 * @template T, U
 *
 * @description The throttle function is a higher-order function that ensures that a provided
 * callback function does not execute more frequently than a specified limit. It works by
 * maintaining the timestamp of the last time the function was called and comparing
 * it with the current time when the function is triggered next. If the time difference is
 * less than the specified limit, the function does not execute the callback. If the time
 * difference is greater than or equal to the limit, the function executes the callback and
 * updates the timestamp.
 *
 * This function is particularly useful in performance-sensitive situations where the callback
 * function is potentially expensive (in terms of time or resources) and could be triggered
 * rapidly or frequently, such as during window resize or scroll events, mouse move events,
 * or rapidly repeating keypress events.
 *
 * @param {(...args: T) => U} callback - The function to be throttled. It can accept any number
 * and type of arguments and can return a result of any type.
 * @param {number} limit - The minimum number of milliseconds that must elapse between
 * subsequent calls to the callback function. If a call is attempted before this limit has
 * elapsed since the last call, it is ignored.
 *
 * @returns {(...args: T) => U | void} - Returns a new function that wraps the callback
 * with throttling behavior. When this function is called, it will either call the callback
 * function (and return its result) if enough time has elapsed since the last call, or it will
 * do nothing (and return `undefined`) if not enough time has elapsed. The arguments and the
 * context (`this` value) are the same as those passed to the returned function.
 *
 * @example
 *
 * // Create a function that logs the current time
 * const logTime = () => console.log(Date.now());
 * // Create a throttled version of logTime that can only be called once per second
 * const throttledLogTime = throttle(logTime, 1000);
 * // Call the throttled function several times in quick succession
 * for (let i = 0; i < 10; i++) {
 *   throttledLogTime();
 * }
 * // Despite the loop calling throttledLogTime ten times almost simultaneously, the actual
 * // logTime function will only be called once, because the calls were throttled to once per second.
 */
export const throttle = <T extends unknown[], U>(
  callback: (...args: T) => U,
  limit: number
) => {
  let lastCall = 0;
  return function (...args: T) {
    const now = Date.now();
    if (now - lastCall < limit) {
      return;
    }
    lastCall = now;
    return callback(...args);
  };
};

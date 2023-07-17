export const PARKING_IMAGE = '/demo-parking-floormap.jpg';
/**
 * The size of the control circle used for resizing the parking lot component.
 * This constant specifies the width and height of the control circle in pixels.
 */
export const PARKINGLOT_CONTROL_SIZE = 10;

/**
 * The minimum width allowed for the parking lot component.
 * This constant defines the minimum width in pixels that the parking lot can be resized to.
 * It ensures that the parking lot does not become too narrow.
 */
export const PARKINGLOT_MIN_WIDTH = 15;

/**
 * The minimum height allowed for the parking lot component.
 * This constant defines the minimum height in pixels that the parking lot can be resized to.
 * It ensures that the parking lot does not become too short.
 */
export const PARKINGLOT_MIN_HEIGHT = 15;

/**
 * The rate at which the `onResize` callback function is throttled.
 * This constant determines the delay in milliseconds between successive calls to the `onResize` function.
 * It helps limit the frequency of resize events and optimize performance.
 */
export const PARKINGLOT_THROTTLE_RATE = 100;

import { KonvaEventObject } from 'konva/lib/Node';
import React, { useState, useEffect, useCallback } from 'react';
import { Rect, Group, Circle } from 'react-konva';
import { throttle } from '../utils';
import {
  PARKINGLOT_CONTROL_SIZE,
  PARKINGLOT_MIN_WIDTH,
  PARKINGLOT_MIN_HEIGHT,
  PARKINGLOT_THROTTLE_RATE,
} from '../constants';

/**
 * Represents the props for the ParkingLot component.
 *
 * @interface ParkingLotProps
 */
interface ParkingLotProps {
  /**
   * The x-coordinate of the parking lot's position.
   */
  x: number;

  /**
   * The y-coordinate of the parking lot's position.
   */
  y: number;

  /**
   * The width of the parking lot.
   */
  width: number;

  /**
   * The height of the parking lot.
   */
  height: number;

  /**
   * The status of the parking lot indicating occupancy (true) or vacancy (false).
   */
  status: boolean;

  /**
   * Indicates whether the parking lot is currently selected.
   * Optional property.
   */
  isSelected?: boolean;

  options?: {
    /**
     * Color of the parking lot when it is occupied.
     * Optional property.
     * Default: 'lightgrey'
     */
    occupiedColor?: string;

    /**
     * Color of the parking lot when it is vacant.
     * Optional property.
     * Default: '#47A992'
     */
    vacantColor?: string;
  };

  /**
   * Callback function invoked when the parking lot is dragged.
   * Optional property.
   */
  onDragMove?: (newX: number, newY: number) => void;

  /**
   * Callback function invoked when the parking lot is resized.
   * Optional property.
   */
  onResize?: (newWidth: number, newHeight: number) => void;

  /**
   * Callback function invoked when the parking lot is clicked.
   * Optional property.
   */
  onClick?: (e: KonvaEventObject<MouseEvent>) => void;

  /**
   * Callback function invoked when the parking lot is mouse entered (hovered).
   * Optional property.
   */
  onMouseEnter?: (e: KonvaEventObject<MouseEvent>) => void;

  /**
   * Callback function invoked when the parking lot is mouse entered (hovered).
   * Optional property.
   */
  onMouseLeave?: (e: KonvaEventObject<MouseEvent>) => void;

  /**
   * Callback function invoked when the parking lot is right-clicked.
   * Optional property.
   */
  onContextMenu?: (e: KonvaEventObject<PointerEvent>) => void;

  /**
   * Callback function invoked when the parking lot is double-clicked.
   * Optional property.
   */
  onDoubleClick?: (e: KonvaEventObject<PointerEvent>) => void;
}

/**
 * The parking lot component represents an individual parking space in the user
 * interface.
 *
 * This is a draggable and resizable rectangle that can be selected.
 * The rectangle's color changes depending on the status of the parking lot:
 * green for available and red for occupied.
 *
 * When the 'Control' key is pressed, a control circle is displayed that allows
 * the user to resize the parking lot.
 *
 * @component
 * @example
 * // Create a ParkingLot that is initially positioned at (10,20) with a width
 * // of 50, height of 50, and is available. The 'onDragMove' and 'onResize' callback
 * // functions are used to keep track of changes in the position and size of the parking lot.
 * // These functions could update state in a parent component or in a global state
 * // management library like Redux.
 *
 * <ParkingLot
 *   x={10}
 *   y={20}
 *   width={50}
 *   height={50}
 *   status={true}
 *   isSelected={false}
 *   onDragMove={(newX, newY) => console.log(`Moved to (${newX}, ${newY})`)}
 *   onResize={(newWidth, newHeight) => console.log(`Resized to ${newWidth}x${newHeight}`)}
 * />
 *
 * // IMPORTANT: The Parking Lot component should be used as a child of the Parking Space component.
 */
const ParkingLot: React.FC<ParkingLotProps> = ({
  x,
  y,
  width,
  height,
  status,
  isSelected,
  options = {
    vacantColor: 'lightgrey',
    occupiedColor: '#47A992',
  },
  onDragMove,
  onResize,
  onClick,
  onContextMenu,
  onDoubleClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [ctrlPressed, setCtrlPressed] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [newX, setNewX] = useState(x);
  const [newY, setNewY] = useState(y);
  const [newWidth, setNewWidth] = useState(width);
  const [newHeight, setNewHeight] = useState(height);

  /**
   * Handles the keydown event for the "Control" key.
   *
   * When the "Control" key is pressed, this function sets the `ctrlPressed` state
   * to `true`, indicating that the "Control" key is currently being held down.
   *
   * @param {KeyboardEvent} event - The keydown event object.
   *
   * @returns {void}
   */
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Control') {
      setCtrlPressed(true);
    }
  }, []);

  /**
   * Handles the keyup event for the "Control" key.
   *
   * When the "Control" key is released, this function sets the `ctrlPressed` state
   * to `false`, indicating that the "Control" key is no longer being held down.
   *
   * @param {KeyboardEvent} event - The keyup event object.
   *
   * @returns {void}
   */
  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Control') {
      setCtrlPressed(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  useEffect(() => {
    setNewX(x);
  }, [x]);

  useEffect(() => {
    setNewY(y);
  }, [y]);

  useEffect(() => {
    setNewWidth(width);
  }, [width]);

  useEffect(() => {
    setNewHeight(height);
  }, [height]);

  /**
   * Handles the drag movement of the parking lot.
   *
   * When a drag event occurs on the parking lot, this function updates the `newX` and
   * `newY` states with the new position of the parking lot.
   *
   * It also invokes the `onDragMove` callback (if provided) with the new coordinates,
   * allowing communication of the position changes to the parent component.
   *
   * @param {KonvaEventObject<DragEvent>} e - The Konva drag event object.
   *
   * @returns {void}
   */
  const handleDragMove = (e: KonvaEventObject<DragEvent>) => {
    setNewX(e.target.x());
    setNewY(e.target.y());
    onDragMove?.(e.target.x(), e.target.y());
  };

  /**
   * Handles the dragging movement of the control circle, which is responsible for resizing
   * the parking lot.
   *
   * It adjusts the width and height of the parking lot while a drag operation is in progress.
   * The new dimensions are calculated based on the control circle's position. The control
   * circle's size is divided by two to calculate the offset. This offset ensures that the
   * parking lot's resizing is centered, not based on the top-left corner.
   *
   * After calculating the new dimensions, it verifies whether they are within the acceptable
   * bounds. This prevents the parking lot from shrinking beyond a certain limit.
   *
   * Then, the state is updated with the new dimensions.
   *
   * The resizing is also communicated to the parent component through the 'onResize' callback
   * function. The callback function is throttled to control the rate of updates, thus enhancing
   * performance. The throttle rate is defined by the THROTTLE_RATE constant.
   *
   * @function
   * @param {KonvaEventObject<DragEvent>} e - The Konva drag event
   * @example
   * // The resizing mechanism in action:
   *
   * // Initial state
   * // (x,y)───────┐
   * // │           │
   * // │   Parking │
   * // │    Lot    │
   * // └───────(control)
   * //
   * // After dragging the control to the right and down:
   * //
   * // (x,y)───────────┐
   * // │               │
   * // │   Resized     │
   * // │   Parking     │
   * // │    Lot        │
   * // └───────────(control)
   * //
   */
  const handleControlDragMove = (e: KonvaEventObject<DragEvent>) => {
    if (!isResizing) {
      setIsResizing(true);
    }

    let newWidth = e.target.x() - newX + PARKINGLOT_CONTROL_SIZE / 2;
    let newHeight = e.target.y() - newY + PARKINGLOT_CONTROL_SIZE / 2;

    // Ensure the new dimensions are within acceptable bounds
    newWidth = Math.max(PARKINGLOT_MIN_WIDTH, newWidth);
    newHeight = Math.max(PARKINGLOT_MIN_HEIGHT, newHeight);

    setNewWidth(newWidth);
    setNewHeight(newHeight);

    // Call onResize at a controlled rate
    const throttledOnResize = throttle((width: number, height: number) => {
      onResize?.(width, height);
    }, PARKINGLOT_THROTTLE_RATE);

    throttledOnResize(newWidth, newHeight);
  };

  return (
    <Group>
      <Rect
        x={newX}
        y={newY}
        width={newWidth}
        height={newHeight}
        fill={status ? options.occupiedColor : options.vacantColor}
        stroke={'black'}
        cornerRadius={3}
        strokeWidth={1}
        strokeEnabled={isSelected}
        draggable={isSelected}
        onDragMove={handleDragMove}
        opacity={isHovered ? 0.7 : 1}
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
        onClick={onClick}
        onDblClick={onDoubleClick}
        onContextMenu={onContextMenu}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
      {isSelected && ctrlPressed && (
        <Circle
          x={newX + newWidth - PARKINGLOT_CONTROL_SIZE / 2}
          y={newY + newHeight - PARKINGLOT_CONTROL_SIZE / 2}
          width={PARKINGLOT_CONTROL_SIZE}
          height={PARKINGLOT_CONTROL_SIZE}
          fill={'white'}
          stroke={'lightblue'}
          strokeWidth={1}
          draggable
          onDragMove={handleControlDragMove}
          onDragEnd={() => setIsResizing(false)}
        />
      )}
    </Group>
  );
};

export default ParkingLot;

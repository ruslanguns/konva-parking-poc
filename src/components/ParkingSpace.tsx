import { KonvaEventObject } from 'konva/lib/Node';
import type { Stage as StageI } from 'konva/lib/Stage';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Image as KonvaImage, Layer, Stage } from 'react-konva';
import useImage from 'use-image';
import { useElementSize } from '@mantine/hooks';
import { useDebouncedCallback } from 'use-debounce';

export type ParkingSpaceProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & { src: string };

export type ParkingSpaceRef = {
  scaleToOne: () => void;
  handleZoomIn: () => void;
  handleZoomOut: () => void;
};

const ParkingSpace = forwardRef<ParkingSpaceRef, ParkingSpaceProps>(
  ({ src, children, ...props }, parkingSpaceRef) => {
    const [image] = useImage(src);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState({ x: 1, y: 1 });
    const stageRef = useRef<StageI | null>(null);
    const { ref, width, height } = useElementSize<HTMLDivElement>();

    /**
     * This advanced zoom function permits the user to zoom in and out of the stage by interacting with the mouse scroll wheel,
     * allowing separate scale factors along the x and y dimensions, dynamic zoom speed based on the current scale,
     * zooming relative to a specified point, and limiting zoom levels.
     *
     * @param {KonvaEventObject<WheelEvent>} e - A wrapper around the standard WheelEvent object.
     */
    const handleWheel = useCallback((e: KonvaEventObject<WheelEvent>) => {
      // Prevent the default event behavior (i.e., page scrolling).
      e.evt.preventDefault();

      // Set the minimum and maximum permitted scale levels.
      const minScale = 0.5;
      const maxScale = 5.0;

      // Obtain a reference to the stage object.
      const stage = stageRef.current;

      // If the stage is unavailable, halt the execution.
      if (!stage) return;

      // Determine the current scales (s1_x and s1_y) along the x and y dimensions.
      const oldScaleX = stage.scaleX();
      const oldScaleY = stage.scaleY();

      // Calculate the dynamic scale factor 'f' based on the current scale.
      // Note: Modify this formula as needed to achieve the desired zoom speed characteristics.
      const scaleByX = 0.1 * oldScaleX + 1;
      const scaleByY = 0.1 * oldScaleY + 1;

      // Compute the new scales (s2_x and s2_y) using the provided formula, dependent on the scroll direction.
      let newScaleX =
        e.evt.deltaY > 0 ? oldScaleX * scaleByX : oldScaleX / scaleByX;
      let newScaleY =
        e.evt.deltaY > 0 ? oldScaleY * scaleByY : oldScaleY / scaleByY;

      // Enforce the scale limits.
      newScaleX = Math.max(minScale, Math.min(maxScale, newScaleX));
      newScaleY = Math.max(minScale, Math.min(maxScale, newScaleY));

      // Compute the position of the zoom center.
      // Note: Replace 'getPointerPosition()' with the desired zoom center if different from the mouse pointer.
      const zoomCenter = {
        x: stage.getPointerPosition()!.x / oldScaleX - stage.x() / oldScaleX,
        y: stage.getPointerPosition()!.y / oldScaleY - stage.y() / oldScaleY,
      };

      // Apply the new scales (s2_x and s2_y) to the stage.
      stage.scale({ x: newScaleX, y: newScaleY });

      // Calculate the new position of the stage based on the zoom center.
      const newPos = {
        x:
          -(zoomCenter.x - stage.getPointerPosition()!.x / newScaleX) *
          newScaleX,
        y:
          -(zoomCenter.y - stage.getPointerPosition()!.y / newScaleY) *
          newScaleY,
      };

      // Update the stage's position to match the calculated position.
      stage.position(newPos);

      // Update the state with the new scale and position.
      setZoom({ x: newScaleX, y: newScaleY });
      setPosition(newPos);
    }, []);

    /**
     * The `handleDrag` function is called upon every user drag event on the stage.
     * Its role is to synchronize the position state with the new position of the stage.
     * The function uses a callback with an empty dependencies array, meaning it is only created once when the component is mounted.
     * This is important for performance reasons, as it prevents unnecessary re-creation of the function at every component re-render.
     *
     * @callback handleDrag
     * @param none
     */
    const handleDrag = useCallback(() => {
      // Obtain a reference to the stage object.
      const stage = stageRef.current;

      // Check if the stage exists.
      // This is important because the stage might not be defined yet when the component first renders (before the Konva Stage has had a chance to mount and provide its instance).
      // Accessing properties on an undefined stage would result in a runtime error.
      if (stage) {
        // Calculate the new position after the drag event.
        const newPosition = { x: stage.x(), y: stage.y() };

        // Check if the position has changed before updating the state.
        // This is an optimization to avoid unnecessary state updates and subsequent re-renders.
        if (newPosition.x !== position.x || newPosition.y !== position.y) {
          setPosition(newPosition);
        }
      }
    }, [position]);

    /**
     * This function adjusts the stage's scale and position to fit an image to the width of the stage.
     * It sets the stage's scale such that the image width matches the stage width (thus setting the zoom level to 1),
     * and repositions the stage to the origin. It assumes that the `zoom` state variable is an object
     * with `x` and `y` properties representing the scaling factor along each dimension.
     *
     * @callback scaleToOne
     * @param none
     */
    const scaleToOne = useCallback(() => {
      // Check if the stage reference and the image exist.
      if (stageRef.current && image) {
        // Calculate the scale needed for the image to fit the stage width.
        const scale = width / image.width;

        // Update the zoom state for both x and y dimensions.
        setZoom({ x: scale, y: scale });
        // Reset the position state to the origin.
        setPosition({ x: 0, y: 0 });

        // Update the stage's scale for both x and y dimensions.
        stageRef.current.scale({ x: scale, y: scale });
        // Reset the stage's position to the origin.
        stageRef.current.position({ x: 0, y: 0 });
      }
    }, [image, width]);

    const handleZoomIn = () => {
      setZoom({
        x: zoom.x * 1.1,
        y: zoom.y * 1.1,
      });
    };

    const handleZoomOut = () => {
      setZoom({
        x: zoom.x / 1.1,
        y: zoom.y / 1.1,
      });
    };

    /**
     * The `fitStage` function is equipped with debounce functionality and employed to modify the dimensions of the stage to match the container's width.
     * The function is only invoked after 300 milliseconds have passed since the last invocation,
     * a strategy designed to optimize performance by eliminating superfluous function invocations during rapid and consecutive resize events.
     *
     * @callback fitStage
     * @param none
     */
    const fitStage = useDebouncedCallback(() => {
      // Ascertain the existence of the container before accessing its properties.
      if (ref.current) {
        const containerWidth = ref.current.offsetWidth;
        const scale = containerWidth / width;

        // Confirm that the stage reference exists before attempting to manipulate it.
        if (stageRef.current) {
          // Adjust the width and height of the stage in accordance with the calculated scale.
          stageRef.current.width(width * scale);
          stageRef.current.height(height * scale);
          // Call the `scaleToOne` function to resize the image to fit the width of the stage.
          scaleToOne();
        }
      }
    }, 300); // The debounce delay is set at 300 milliseconds.

    useEffect(() => {
      // Immediately call the function upon the component's mount.
      fitStage();

      // Establish the window resize event listener.
      window.addEventListener('resize', fitStage);

      // On the component's unmount, clean up the event listener.
      return () => {
        window.removeEventListener('resize', fitStage);
      };
    }, [fitStage]);

    // This hook exposes the `scaleToOne` function to the parent component.
    useImperativeHandle(parkingSpaceRef, () => ({
      scaleToOne,
      handleZoomIn,
      handleZoomOut,
    }));

    return (
      <div ref={ref} {...props}>
        <Stage
          ref={stageRef}
          onWheel={handleWheel}
          draggable
          onDragEnd={handleDrag}
          onDragMove={handleDrag}
          scaleX={zoom.x}
          scaleY={zoom.y}
          x={position.x}
          y={position.y}
        >
          <Layer>
            <KonvaImage image={image} />
            {children}
          </Layer>
        </Stage>
      </div>
    );
  }
);

export default ParkingSpace;

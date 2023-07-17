import React from 'react';

const Controls: React.FC<{
  zoom: number;
  setZoom: (zoom: number) => void;
  setPan: (pan: { x: number; y: number }) => void;
}> = ({ zoom, setZoom, setPan }) => {
  const handleZoomIn = () => {
    setZoom(zoom * 1.1);
  };

  const handleZoomOut = () => {
    setZoom(zoom / 1.1);
  };

  const handleCenter = () => {
    setPan({ x: 0, y: 0 });
    setZoom(1);
  };

  return (
    <div>
      <button onClick={handleZoomIn}>Zoom In</button>
      <button onClick={handleZoomOut}>Zoom Out</button>
      <button onClick={handleCenter}>Center</button>
    </div>
  );
};

export default Controls;

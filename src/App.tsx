import { useRef, useState } from 'react';
import ParkingLot from './components/ParkingLot';
import ParkingSpace, { ParkingSpaceRef } from './components/ParkingSpace';
import { PARKING_IMAGE } from './constants';

import './App.css';

const PARKING_LOTS = [
  { id: 1, status: false, coorX: 100, coorY: 100 },
  { id: 2, status: true, coorX: 200, coorY: 200 },
  { id: 3, status: false, coorX: 300, coorY: 300 },
  { id: 4, status: true, coorX: 340, coorY: 340 },
  { id: 5, status: false, coorX: 380, coorY: 380 },
];

function App() {
  const [selected, setSelected] = useState(0);
  const parkingSpaceRef = useRef<ParkingSpaceRef>(null);

  const resetScale = () => {
    parkingSpaceRef.current?.scaleToOne();
  };

  return (
    <div className="container">
      <button onClick={resetScale}>Reset</button>

      <ParkingSpace
        ref={parkingSpaceRef}
        src={PARKING_IMAGE}
        className="parking-space"
      >
        {PARKING_LOTS.map((lot) => (
          <ParkingLot
            key={lot.id}
            x={lot.coorX}
            y={lot.coorY}
            width={50}
            height={50}
            status={lot.status}
            isSelected={selected === lot.id}
            onDoubleClick={() => {
              setSelected((p) => (p === lot.id ? 0 : lot.id));
            }}
          />
        ))}
      </ParkingSpace>

      {/* Information */}
      <p>
        <strong>Selected:</strong> {selected === 0 ? 'None' : selected}
      </p>
      <pre>
        {JSON.stringify(
          PARKING_LOTS.find((lot) => lot.id === selected),
          null,
          2
        )}
      </pre>
    </div>
  );
}

export default App;

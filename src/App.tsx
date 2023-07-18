import { useRef, useState } from 'react';
import ParkingLot from './components/ParkingLot';
import ParkingSpace, { ParkingSpaceRef } from './components/ParkingSpace';
import { PARKING_IMAGE } from './constants';

import { useForm } from 'react-hook-form';
import './App.css';

type ParkingLot = {
  id: number;
  status: boolean;
  coorX: number;
  coorY: number;
  width: number;
  height: number;
};

const PARKING_LOTS: Array<ParkingLot> = [
  { id: 1, status: false, coorX: 100, coorY: 100, width: 50, height: 50 },
  { id: 2, status: true, coorX: 200, coorY: 200, width: 50, height: 50 },
  { id: 3, status: false, coorX: 300, coorY: 300, width: 50, height: 50 },
  { id: 4, status: true, coorX: 340, coorY: 340, width: 50, height: 50 },
  { id: 5, status: false, coorX: 380, coorY: 380, width: 50, height: 50 },
];

function App() {
  const [selected, setSelected] = useState(0);
  const parkingSpaceRef = useRef<ParkingSpaceRef>(null);

  const { handleSubmit, watch, register, reset, setValue, getValues } = useForm(
    {
      defaultValues: {
        coorX: 0,
        coorY: 0,
        width: 0,
        height: 0,
        status: false,
      },
    }
  );

  const resetScale = () => {
    parkingSpaceRef.current?.scaleToOne();
  };

  const updateParkingLot = (id: number, data: Omit<ParkingLot, 'id'>) => {
    const index = PARKING_LOTS.findIndex((lot) => lot.id === id);
    if (index === -1) return;

    PARKING_LOTS[index] = {
      ...PARKING_LOTS[index],
      ...data,
    };
  };

  // const createParkingLot = (data: Omit<ParkingLot, 'id'>) => {
  //   const id = PARKING_LOTS.length + 1;
  //   PARKING_LOTS.push({
  //     id,
  //     ...data,
  //   });
  //   setSelected(id);
  // };

  // const deleteParkingLot = (id: number) => {
  //   const index = PARKING_LOTS.findIndex((lot) => lot.id === id);
  //   if (index === -1) return;

  //   PARKING_LOTS.splice(index, 1);
  //   setSelected(0);
  // };

  const onSubmit = (data: any) => {
    console.log(data);

    updateParkingLot(selected, data);

    reset();

    setSelected(0);
  };

  return (
    <div className="container">
      <button onClick={resetScale}>Reset</button>

      <ParkingSpace
        ref={parkingSpaceRef}
        src={PARKING_IMAGE}
        className="parking-space"
      >
        {PARKING_LOTS.map((lot) => {
          return (
            <ParkingLot
              key={lot.id}
              x={selected === lot.id ? watch('coorX') : lot.coorX}
              y={selected === lot.id ? watch('coorY') : lot.coorY}
              width={selected === lot.id ? watch('width') : lot.width}
              height={selected === lot.id ? watch('height') : lot.height}
              status={selected === lot.id ? watch('status') : lot.status}
              isSelected={selected === lot.id}
              onDoubleClick={(e) => {
                setSelected((p) => (p === lot.id ? 0 : lot.id));

                if (lot.id === selected) {
                  reset();
                } else {
                  setValue('coorX', e.target.attrs.x);
                  setValue('coorY', e.target.attrs.y);
                  setValue('width', e.target.attrs.width);
                  setValue('height', e.target.attrs.height);
                  setValue('status', lot.status);
                }
              }}
              onResize={(newWidth, newHeight) => {
                setValue('width', newWidth);
                setValue('height', newHeight);
              }}
              onDragMove={(newX, newY) => {
                setValue('coorX', newX);
                setValue('coorY', newY);
              }}
            />
          );
        })}
      </ParkingSpace>

      {/* Information */}
      <p>
        <strong>Selected:</strong> {selected === 0 ? 'None' : selected}
      </p>

      {/* Inputs to control the parking lot selected */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <label>
          coorX:
          <input
            {...register('coorX', { valueAsNumber: true })}
            disabled={selected === 0}
            type="number"
            value={watch('coorX')}
          />
        </label>

        <label>
          coorY:
          <input
            {...register('coorY', { valueAsNumber: true })}
            disabled={selected === 0}
            type="number"
            value={watch('coorY')}
          />
        </label>

        <label>
          width:
          <input
            {...register('width', { valueAsNumber: true })}
            disabled={selected === 0}
            type="number"
            value={watch('width')}
          />
        </label>

        <label>
          height:
          <input
            {...register('height', { valueAsNumber: true })}
            disabled={selected === 0}
            type="number"
            value={watch('height')}
          />
        </label>

        <label>
          Status:
          <input
            {...register('status')}
            disabled={selected === 0}
            type="checkbox"
            checked={watch('status')}
          />
        </label>

        <button type="submit" disabled={selected === 0}>
          Update
        </button>
      </form>

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

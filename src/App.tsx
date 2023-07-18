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

  const { handleSubmit, watch, register, reset, setValue } = useForm({
    defaultValues: {
      coorX: 0,
      coorY: 0,
      width: 0,
      height: 0,
      status: false,
    },
  });

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
          const isSelected = selected === lot.id;

          return (
            <ParkingLot
              key={lot.id}
              {...{
                isSelected,
                height: isSelected ? watch('height') : lot.height,
                status: isSelected ? watch('status') : lot.status,
                width: isSelected ? watch('width') : lot.width,
                x: isSelected ? watch('coorX') : lot.coorX,
                y: isSelected ? watch('coorY') : lot.coorY,
                onDoubleClick: (e) => {
                  setSelected((p) => {
                    if (isSelected) {
                      // TODO: Update form (equivalent to submit functionality)
                      // investigate how to trigger the submit from this... on double click we expect to save so good UX

                      return 0;
                    }

                    return lot.id;
                  });

                  if (isSelected) {
                    reset();
                  } else {
                    setValue('coorX', e.target.attrs.x);
                    setValue('coorY', e.target.attrs.y);
                    setValue('width', e.target.attrs.width);
                    setValue('height', e.target.attrs.height);
                    setValue('status', lot.status);
                  }
                },
                onResize: (newWidth, newHeight) => {
                  setValue('width', newWidth);
                  setValue('height', newHeight);
                },
                onDragMove: (newX, newY) => {
                  setValue('coorX', newX);
                  setValue('coorY', newY);
                },
              }}
            />
          );
        })}
      </ParkingSpace>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <h4>
          <strong>Selected:</strong> {selected === 0 ? 'None' : selected}
        </h4>
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
    </div>
  );
}

export default App;

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
  { id: 1, status: false, coorX: 100, coorY: 100, width: 30, height: 65 },
  { id: 2, status: true, coorX: 200, coorY: 200, width: 30, height: 65 },
  { id: 3, status: false, coorX: 300, coorY: 300, width: 30, height: 65 },
  { id: 4, status: true, coorX: 340, coorY: 340, width: 30, height: 65 },
  { id: 5, status: false, coorX: 380, coorY: 380, width: 30, height: 65 },
];

function App() {
  const [selected, setSelected] = useState(0);
  const [hovered, setHovered] = useState(0);
  const parkingSpaceRef = useRef<ParkingSpaceRef>(null);

  const scaleToOne = () => parkingSpaceRef.current?.scaleToOne();
  const handleZoomIn = () => parkingSpaceRef.current?.handleZoomIn();
  const handleZoomOut = () => parkingSpaceRef.current?.handleZoomOut();

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

  const updateParkingLot = (id: number, data: Omit<ParkingLot, 'id'>) => {
    const index = PARKING_LOTS.findIndex((lot) => lot.id === id);
    if (index === -1) return;

    PARKING_LOTS[index] = {
      ...PARKING_LOTS[index],
      ...data,
    };
  };

  const createParkingLot = (data: Omit<ParkingLot, 'id'>) => {
    const id = PARKING_LOTS.length + 1;
    PARKING_LOTS.push({
      id,
      ...data,
    });

    setValue('coorX', data.coorX);
    setValue('coorY', data.coorY);
    setValue('width', data.width);
    setValue('height', data.height);
    setValue('status', data.status);

    setSelected(id);
  };

  // const deleteParkingLot = (id: number) => {
  //   const index = PARKING_LOTS.findIndex((lot) => lot.id === id);
  //   if (index === -1) return;

  //   PARKING_LOTS.splice(index, 1);
  //   setSelected(0);
  // };

  const onSubmit = (data: any) => {
    updateParkingLot(selected, data);

    reset();

    setSelected(0);
  };

  const showData = () => {
    console.log(getValues());
  };

  return (
    <div className="container">
      <button onClick={scaleToOne}>Reset</button>
      <button
        onClick={() =>
          createParkingLot({
            status: false,
            coorX: 400,
            coorY: 400,
            width: 30,
            height: 65,
          })
        }
      >
        Add new parking lot
      </button>
      <button onClick={showData}>Log data</button>
      <button onClick={handleZoomIn}>+</button>
      <button onClick={handleZoomOut}>-</button>

      <h2>Parking Lots ({PARKING_LOTS.length})</h2>

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
                  setSelected(isSelected ? 0 : lot.id);

                  if (isSelected) {
                    updateParkingLot(selected, getValues());
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
                onMouseEnter: () => {
                  setHovered(lot.id);
                },
                onMouseLeave: () => {
                  setHovered(0);
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
          <strong>Selected:</strong> {selected === 0 ? 'None' : selected} |{' '}
          <strong>Hovered:</strong> {hovered === 0 ? 'None' : hovered}
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

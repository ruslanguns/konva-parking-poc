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
  {
    id: 1,
    coorX: 630,
    coorY: 62,
    status: false,
    width: 30,
    height: 65,
  },
  {
    id: 2,
    coorX: 669,
    coorY: 62,
    status: true,
    width: 30,
    height: 65,
  },
  {
    id: 3,
    coorX: 706,
    coorY: 62,
    status: false,
    width: 30,
    height: 65,
  },
  {
    id: 4,
    coorX: 746,
    coorY: 62,
    status: true,
    width: 30,
    height: 65,
  },
  {
    id: 5,
    coorX: 784,
    coorY: 62,
    status: true,
    width: 30,
    height: 65,
  },
  {
    id: 6,
    coorX: 822,
    coorY: 62,
    status: false,
    width: 30,
    height: 65,
  },
  {
    id: 7,
    coorX: 861,
    coorY: 62,
    status: true,
    width: 30,
    height: 65,
  },
  {
    id: 8,
    coorX: 900,
    coorY: 62,
    status: true,
    width: 30,
    height: 65,
  },
  {
    id: 9,
    coorX: 938,
    coorY: 62,
    status: true,
    width: 30,
    height: 65,
  },
  {
    id: 10,
    coorX: 977,
    coorY: 62,
    status: true,
    width: 30,
    height: 65,
  },
  {
    id: 11,
    coorX: 1015,
    coorY: 62,
    status: false,
    width: 30,
    height: 65,
  },
  {
    id: 12,
    coorX: 1054,
    coorY: 62,
    status: true,
    width: 30,
    height: 65,
  },
  {
    id: 13,
    coorX: 1092,
    coorY: 62,
    status: true,
    width: 30,
    height: 65,
  },
  {
    id: 14,
    coorX: 1130,
    coorY: 62,
    status: true,
    width: 30,
    height: 65,
  },
  {
    id: 15,
    coorX: 1169,
    coorY: 62,
    status: false,
    width: 30,
    height: 65,
  },
  {
    id: 16,
    coorX: 1208,
    coorY: 62,
    status: false,
    width: 30,
    height: 65,
  },
  {
    id: 17,
    coorX: 1246,
    coorY: 62,
    status: true,
    width: 30,
    height: 65,
  },
  {
    id: 18,
    coorX: 1285,
    coorY: 62,
    status: false,
    width: 30,
    height: 65,
  },
  {
    id: 19,
    coorX: 1323,
    coorY: 62,
    status: true,
    width: 30,
    height: 65,
  },
  {
    id: 20,
    status: true,
    coorX: 515,
    coorY: 238,
    width: 30,
    height: 65,
  },
  {
    id: 21,
    status: true,
    coorX: 592.362825437341,
    coorY: 238,
    width: 30,
    height: 65,
  },
  {
    id: 22,
    status: true,
    coorX: 552,
    coorY: 238,
    width: 30,
    height: 65,
  },
  {
    id: 23,
    status: true,
    coorX: 630,
    coorY: 238,
    width: 30,
    height: 65,
  },
  {
    id: 24,
    status: true,
    coorX: 668,
    coorY: 238,
    width: 30,
    height: 65,
  },
  {
    id: 25,
    status: true,
    coorX: 706.468590776211,
    coorY: 238,
    width: 30,
    height: 65,
  },
  {
    id: 26,
    status: true,
    coorX: 746.08810441268,
    coorY: 238,
    width: 30,
    height: 65,
  },
  {
    id: 27,
    status: true,
    coorX: 784,
    coorY: 238,
    width: 30,
    height: 65,
  },
  {
    id: 28,
    status: true,
    coorX: 823,
    coorY: 238,
    width: 30,
    height: 65,
  },
  {
    id: 29,
    status: true,
    coorX: 862,
    coorY: 238,
    width: 30,
    height: 65,
  },
  {
    id: 30,
    status: true,
    coorX: 900,
    coorY: 238,
    width: 30,
    height: 65,
  },
  {
    id: 31,
    status: true,
    coorX: 938,
    coorY: 238,
    width: 30,
    height: 65,
  },
  {
    id: 32,
    status: true,
    coorX: 977,
    coorY: 238,
    width: 30,
    height: 65,
  },
  {
    id: 33,
    status: true,
    coorX: 1014.7418716423614,
    coorY: 238,
    width: 30,
    height: 65,
  },
  {
    id: 34,
    status: true,
    coorX: 1054,
    coorY: 238,
    width: 30,
    height: 65,
  },
  {
    id: 35,
    status: true,
    coorX: 1092,
    coorY: 238,
    width: 30,
    height: 65,
  },
  {
    id: 36,
    status: true,
    coorX: 1131,
    coorY: 238,
    width: 30,
    height: 65,
  },
  {
    id: 37,
    status: true,
    coorX: 1169,
    coorY: 238,
    width: 30,
    height: 65,
  },
  {
    id: 38,
    status: true,
    coorX: 359.99849518207503,
    coorY: 318,
    width: 30,
    height: 65,
  },
  {
    id: 39,
    status: true,
    coorX: 399,
    coorY: 318,
    width: 30,
    height: 65,
  },
  {
    id: 40,
    status: true,
    coorX: 437.07535595601,
    coorY: 318,
    width: 30,
    height: 65,
  },
  {
    id: 41,
    status: true,
    coorX: 475.558397989414,
    coorY: 318,
    width: 30,
    height: 65,
  },
  {
    id: 42,
    status: true,
    coorX: 514,
    coorY: 318,
    width: 30,
    height: 65,
  },
  {
    id: 43,
    status: true,
    coorX: 552,
    coorY: 318,
    width: 30,
    height: 65,
  },
  {
    id: 44,
    status: true,
    coorX: 592,
    coorY: 318,
    width: 30,
    height: 65,
  },
  {
    id: 45,
    status: true,
    coorX: 630,
    coorY: 318,
    width: 30,
    height: 65,
  },
  {
    id: 46,
    status: true,
    coorX: 668,
    coorY: 318,
    width: 30,
    height: 65,
  },
  {
    id: 47,
    status: true,
    coorX: 706.468590776211,
    coorY: 318,
    width: 30,
    height: 65,
  },
  {
    id: 48,
    status: true,
    coorX: 746,
    coorY: 318,
    width: 30,
    height: 65,
  },
  {
    id: 49,
    status: true,
    coorX: 784,
    coorY: 318,
    width: 30,
    height: 65,
  },
  {
    id: 50,
    status: true,
    coorX: 823,
    coorY: 318,
    width: 30,
    height: 65,
  },
  {
    id: 51,
    status: true,
    coorX: 861,
    coorY: 318,
    width: 30,
    height: 65,
  },
  {
    id: 52,
    status: false,
    coorX: 746,
    coorY: 496,
    width: 30,
    height: 65,
  },
  {
    id: 53,
    status: true,
    coorX: 784,
    coorY: 496,
    width: 30,
    height: 65,
  },
  {
    id: 54,
    status: false,
    coorX: 822,
    coorY: 496,
    width: 30,
    height: 65,
  },
  {
    id: 55,
    status: true,
    coorX: 861,
    coorY: 496,
    width: 30,
    height: 65,
  },
  {
    id: 56,
    status: false,
    coorX: 900,
    coorY: 496,
    width: 30,
    height: 65,
  },
  {
    id: 57,
    status: false,
    coorX: 939,
    coorY: 496,
    width: 30,
    height: 65,
  },
  {
    id: 58,
    status: false,
    coorX: 707,
    coorY: 496,
    width: 30,
    height: 65,
  },
  {
    id: 59,
    status: false,
    coorX: 668,
    coorY: 496,
    width: 30,
    height: 65,
  },
  {
    id: 60,
    status: false,
    coorX: 630,
    coorY: 496,
    width: 30,
    height: 65,
  },
  {
    id: 61,
    status: true,
    coorX: 592,
    coorY: 496,
    width: 30,
    height: 65,
  },
  {
    id: 62,
    status: true,
    coorX: 552,
    coorY: 496,
    width: 30,
    height: 65,
  },
  {
    id: 63,
    status: true,
    coorX: 515,
    coorY: 496,
    width: 30,
    height: 65,
  },
  {
    id: 64,
    status: true,
    coorX: 476,
    coorY: 496,
    width: 30,
    height: 65,
  },
  {
    id: 65,
    status: true,
    coorX: 438,
    coorY: 496,
    width: 30,
    height: 65,
  },
  {
    id: 66,
    coorX: 438,
    coorY: 576,
    status: true,
    width: 30,
    height: 65,
  },
  {
    id: 67,
    coorX: 476,
    coorY: 576,
    status: true,
    width: 30,
    height: 65,
  },
  {
    id: 68,
    coorX: 514,
    coorY: 576,
    status: true,
    width: 30,
    height: 65,
  },
  {
    id: 69,
    coorX: 552,
    coorY: 576,
    status: true,
    width: 30,
    height: 65,
  },
  {
    id: 70,
    coorX: 593,
    coorY: 576,
    status: true,
    width: 30,
    height: 65,
  },
  {
    id: 71,
    coorX: 630,
    coorY: 576,
    status: true,
    width: 30,
    height: 65,
  },
  {
    id: 72,
    coorX: 669,
    coorY: 576,
    status: false,
    width: 30,
    height: 65,
  },
  {
    id: 73,
    coorX: 707,
    coorY: 576,
    status: true,
    width: 30,
    height: 65,
  },
  {
    id: 74,
    coorX: 745,
    coorY: 576,
    status: false,
    width: 30,
    height: 65,
  },
  {
    id: 75,
    coorX: 784,
    coorY: 576,
    status: true,
    width: 30,
    height: 65,
  },
  {
    id: 76,
    coorX: 823,
    coorY: 576,
    status: true,
    width: 30,
    height: 65,
  },
  {
    id: 77,
    coorX: 861,
    coorY: 576,
    status: true,
    width: 30,
    height: 65,
  },
  {
    id: 78,
    coorX: 899,
    coorY: 576,
    status: false,
    width: 30,
    height: 65,
  },
  {
    id: 79,
    coorX: 938,
    coorY: 576,
    status: false,
    width: 30,
    height: 65,
  },
  {
    id: 80,
    coorX: 977,
    coorY: 576,
    status: false,
    width: 30,
    height: 65,
  },
  {
    id: 81,
    coorX: 1015,
    coorY: 576,
    status: true,
    width: 30,
    height: 65,
  },
  {
    id: 82,
    coorX: 1054,
    coorY: 576,
    status: true,
    width: 30,
    height: 65,
  },
  {
    id: 83,
    coorX: 1092,
    coorY: 576,
    status: true,
    width: 30,
    height: 65,
  },
  {
    id: 84,
    coorX: 1130,
    coorY: 576,
    status: true,
    width: 30,
    height: 65,
  },
  {
    id: 85,
    coorX: 1169,
    coorY: 576,
    status: true,
    width: 30,
    height: 65,
  },
  {
    id: 86,
    coorX: 283,
    coorY: 754,
    status: true,
    width: 30,
    height: 65,
  },
  {
    id: 87,
    coorX: 321,
    coorY: 754,
    status: true,
    width: 30,
    height: 65,
  },
  {
    id: 88,
    coorX: 360,
    coorY: 754,
    status: false,
    width: 30,
    height: 65,
  },
  {
    id: 89,
    coorX: 399,
    coorY: 754,
    status: true,
    width: 30,
    height: 65,
  },
  {
    id: 90,
    coorX: 437,
    coorY: 754,
    status: true,
    width: 30,
    height: 65,
  },
  {
    id: 91,
    coorX: 475,
    coorY: 754,
    status: true,
    width: 30,
    height: 65,
  },
  {
    id: 92,
    coorX: 514,
    coorY: 754,
    status: true,
    width: 30,
    height: 65,
  },
  {
    id: 93,
    coorX: 553,
    coorY: 754,
    status: false,
    width: 30,
    height: 65,
  },
  {
    id: 94,
    coorX: 591,
    coorY: 754,
    status: false,
    width: 30,
    height: 65,
  },
  {
    id: 95,
    coorX: 629,
    coorY: 754,
    status: false,
    width: 30,
    height: 65,
  },
  {
    id: 96,
    coorX: 668,
    coorY: 754,
    status: false,
    width: 30,
    height: 65,
  },
  {
    id: 97,
    coorX: 706,
    coorY: 754,
    status: false,
    width: 30,
    height: 65,
  },
  {
    id: 98,
    coorX: 746,
    coorY: 754,
    status: true,
    width: 30,
    height: 65,
  },
  {
    id: 99,
    coorX: 783,
    coorY: 754,
    status: true,
    width: 30,
    height: 65,
  },
  {
    id: 100,
    coorX: 822,
    coorY: 754,
    status: true,
    width: 30,
    height: 65,
  },
  {
    id: 101,
    coorX: 861,
    coorY: 754,
    status: false,
    width: 30,
    height: 65,
  },
  {
    id: 102,
    coorX: 900,
    coorY: 754,
    status: true,
    width: 30,
    height: 65,
  },
  {
    id: 103,
    coorX: 938,
    coorY: 754,
    status: false,
    width: 30,
    height: 65,
  },
  {
    id: 104,
    coorX: 976,
    coorY: 754,
    status: true,
    width: 30,
    height: 65,
  },
  {
    id: 105,
    coorX: 1015,
    coorY: 754,
    status: true,
    width: 30,
    height: 65,
  },
  {
    id: 106,
    coorX: 1054,
    coorY: 754,
    status: true,
    width: 30,
    height: 65,
  },
  {
    id: 107,
    coorX: 1092,
    coorY: 754,
    status: true,
    width: 30,
    height: 65,
  },
  {
    id: 108,
    coorX: 1131,
    coorY: 754,
    status: false,
    width: 30,
    height: 65,
  },
  {
    id: 109,
    coorX: 1169,
    coorY: 754,
    status: false,
    width: 30,
    height: 65,
  },
  {
    id: 110,
    coorX: 1208,
    coorY: 754,
    status: true,
    width: 30,
    height: 65,
  },
  {
    id: 111,
    coorX: 1246,
    coorY: 754,
    status: true,
    width: 30,
    height: 65,
  },
  {
    id: 112,
    coorX: 1285,
    coorY: 754,
    status: true,
    width: 30,
    height: 65,
  },
  {
    id: 113,
    coorX: 1324,
    coorY: 754,
    status: true,
    width: 30,
    height: 65,
  },
  {
    id: 114,
    status: false,
    coorX: 210,
    coorY: 527.909841968122,
    width: 65,
    height: 30,
  },
  {
    id: 115,
    status: false,
    coorX: 210,
    coorY: 594,
    width: 65,
    height: 30,
  },
  {
    id: 116,
    status: false,
    coorX: 210,
    coorY: 633,
    width: 65,
    height: 30,
  },
  {
    id: 117,
    status: false,
    coorX: 210,
    coorY: 672,
    width: 65,
    height: 30,
  },
  {
    id: 118,
    status: false,
    coorX: 210,
    coorY: 710,
    width: 65,
    height: 30,
  },
  {
    id: 119,
    coorX: 1365,
    coorY: 156,
    status: false,
    width: 65,
    height: 30,
  },
  {
    id: 120,
    coorX: 1365,
    coorY: 194,
    status: false,
    width: 65,
    height: 30,
  },
  {
    id: 121,
    coorX: 1365,
    coorY: 232,
    status: false,
    width: 65,
    height: 30,
  },
  {
    id: 122,
    coorX: 1365,
    coorY: 271,
    status: false,
    width: 65,
    height: 30,
  },
  {
    id: 123,
    coorX: 1365,
    coorY: 328,
    status: false,
    width: 65,
    height: 30,
  },
  {
    id: 124,
    coorX: 1365,
    coorY: 366,
    status: false,
    width: 65,
    height: 30,
  },
  {
    id: 125,
    coorX: 1365,
    coorY: 405,
    status: false,
    width: 65,
    height: 30,
  },
  {
    id: 126,
    coorX: 1365,
    coorY: 444,
    status: false,
    width: 65,
    height: 30,
  },
  {
    id: 127,
    coorX: 1365,
    coorY: 483,
    status: false,
    width: 65,
    height: 30,
  },
  {
    id: 128,
    coorX: 1365,
    coorY: 521,
    status: false,
    width: 65,
    height: 30,
  },
  {
    id: 129,
    coorX: 1365,
    coorY: 578,
    status: false,
    width: 65,
    height: 30,
  },
  {
    id: 130,
    coorX: 1365,
    coorY: 617,
    status: false,
    width: 65,
    height: 30,
  },
  {
    id: 131,
    coorX: 1365,
    coorY: 655,
    status: false,
    width: 65,
    height: 30,
  },
  {
    id: 132,
    coorX: 1365,
    coorY: 694,
    status: false,
    width: 65,
    height: 30,
  },
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

    PARKING_LOTS[index] = { ...PARKING_LOTS[index], ...data };
  };

  const createParkingLot = (data: Omit<ParkingLot, 'id'>) => {
    const id = PARKING_LOTS.length + 1;

    PARKING_LOTS.push({ id, ...data });

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

  const onSubmit = (data: Omit<ParkingLot, 'id'>) => {
    updateParkingLot(selected, data);

    reset();

    setSelected(0);
  };

  const logSelected = () => {
    console.log(getValues());
  };

  const logAll = () => {
    console.log(PARKING_LOTS);
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
      <button onClick={logSelected}>Log Selected</button>
      <button onClick={logAll}>Log All</button>
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
                    setValue('coorX', e.target.attrs.x as number);
                    setValue('coorY', e.target.attrs.y as number);
                    setValue('width', e.target.attrs.width as number);
                    setValue('height', e.target.attrs.height as number);
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

import { DateValue } from "@nextui-org/react";
import Line from "./Line";

export interface IChartLines {
  x: number;
  y: 1 | 2 | 3 | 4;
}

interface IChartLinesProps {
  data: IChartLines[];
  rows: number;
  height: number;
  date: DateValue;
  width: number;
  setTimeRowsArray: React.Dispatch<
    React.SetStateAction<{
      1: string;
      2: string;
      3: string;
      4: string;
    }>
  >;
}

const ChartLines = ({
  data,
  rows,
  height,
  date,
  width,
  setTimeRowsArray,
}: IChartLinesProps) => {
  return (
    <div className="flex w-full h-full z-20 absolute">
      {data.map((value, index) => {
        const nextEvent = data?.[index + 1];

        return (
          <Line
            setTimeRowsArray={setTimeRowsArray}
            width={width}
            date={date}
            nextEvent={nextEvent}
            height={height}
            rows={rows}
            y={value.y}
            key={index}
            x={value.x}
          />
        );
      })}
    </div>
  );
};

export default ChartLines;

import { motion } from "framer-motion";
import { IChartLines } from "./ChartLines";
import ChartConnectingLine from "./ChartConnectingLine";
import { DateValue } from "@nextui-org/react";
import { useEffect, useState } from "react";

interface ILineProps {
  y: 1 | 2 | 3 | 4;
  x: number;
  color: string;
  rows: number;
  height: number;
  nextEvent: IChartLines;
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
const Line = ({
  rows,
  color,
  y,
  height,
  x,
  nextEvent,
  date,
  width,
  setTimeRowsArray,
}: ILineProps) => {
  const lineDate = new Date(x);
  const hours = lineDate.getHours();
  const minutes = lineDate.getMinutes();
  const seconds = lineDate.getSeconds();
  const columnWidth = width / 24;
  const xPosition =
    hours * columnWidth +
    (minutes / 60) * columnWidth +
    (seconds / 3600) * columnWidth;
  const [lengthInPixels, setLengthInPixels] = useState(0);
  const [duration, setDuration] = useState({
    hours: 0,
    minutes: 0,
  });
  useEffect(() => {
    if (nextEvent) {
      const differenceInMillis = Math.abs(x - nextEvent.x);
      const differenceInSeconds = Math.floor(differenceInMillis / 1000);
      setDuration({
        hours: Math.floor(differenceInSeconds / 3600),
        minutes: Math.floor((differenceInSeconds % 3600) / 60),
      });
      setTimeRowsArray((prevState) => ({
        ...prevState,
        [y]: `${duration.hours}h ${duration.minutes}m`,
      }));
      const totalDurationInSeconds = 24 * 3600;
      const lineWidth = (differenceInSeconds / totalDurationInSeconds) * width;
      setLengthInPixels(lineWidth);
    } else {
      const currentDate = new Date(date.toDate("")).getTime();
      const differenceInMillis = Math.abs(x - currentDate);
      const differenceInSeconds = Math.floor(differenceInMillis / 1000);
      setDuration({
        hours: Math.floor(differenceInSeconds / 3600),
        minutes: Math.floor((differenceInSeconds % 3600) / 60),
      });
      setTimeRowsArray((prevState) => ({
        ...prevState,
        [y]: `${duration.hours}h ${duration.minutes}m`,
      }));
      const totalDurationInSeconds = 24 * 3600;
      const lineWidth = (differenceInSeconds / totalDurationInSeconds) * width;
      setLengthInPixels(lineWidth);
    }
  }, [width, height]);

  return (
    <motion.div
      className="h-full flex absolute"
      initial={{
        x: 0,
        width: 0,
      }}
      animate={{
        x: xPosition,
        width: lengthInPixels,
      }}
    >
      <motion.p
        className="text-[10px] w-full flex justify-center"
        initial={{
          y: 0,
        }}
        animate={{
          y: (height / rows) * y - height / rows / 1.5 - 15,
        }}
      >
        {duration.hours}h {duration.minutes}m
      </motion.p>
      <motion.div
        initial={{
          y: 0,
        }}
        animate={{
          y: (height / rows) * y - height / rows / 1.5,
        }}
        className={`w-full h-[3px] ${color}  absolute`}
      />
      {nextEvent && nextEvent.y != y && (
        <ChartConnectingLine
          nextEvent={nextEvent}
          height={height}
          rows={rows}
          y={y}
          color={color}
        />
      )}
    </motion.div>
  );
};

export default Line;

import { motion } from "framer-motion";
import { IChartLines } from "./ChartLines";
import ChartConnectingLine from "./ChartConnectingLine";
import { DateValue } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { getLocalTimeZone, now } from "@internationalized/date";
import { getLinePixels, getStartOfDayAndEndOfDay } from "../untils/utils";

interface ILineProps {
  y: 1 | 2 | 3 | 4;
  x: number;
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
    const pickerDate = new Date(date.toDate("")).getTime();
    const { startOfDaY, endOfDaY } = getStartOfDayAndEndOfDay(
      now(getLocalTimeZone())
    );
    if (nextEvent) {
      getLinePixels(
        x,
        nextEvent.x,
        width,
        y,
        setDuration,
        duration,
        setTimeRowsArray,
        setLengthInPixels
      );
    } else if (x >= startOfDaY && x <= endOfDaY) {
      getLinePixels(
        x,
        pickerDate,
        width,
        y,
        setDuration,
        duration,
        setTimeRowsArray,
        setLengthInPixels
      );
    } else {
      const { endOfDaY } = getStartOfDayAndEndOfDay(date);
      getLinePixels(
        x,
        endOfDaY,
        width,
        y,
        setDuration,
        duration,
        setTimeRowsArray,
        setLengthInPixels
      );
    }
  }, [width, height, x, date]);

  useEffect(() => {
    setTimeRowsArray({
      1: "0",
      2: "0",
      3: "0",
      4: "0",
    });
  }, [date]);
  const color = {
    1: "bg-red-500",
    2: "bg-green-500",
    3: "bg-yellow-500",
    4: "bg-blue-500",
  };

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
        className={`w-full h-[3px] ${color[y]}  absolute`}
      />
      {nextEvent && nextEvent.y != y && (
        <ChartConnectingLine
          nextEvent={nextEvent}
          height={height}
          rows={rows}
          y={y}
          color={color[y]}
        />
      )}
    </motion.div>
  );
};

export default Line;

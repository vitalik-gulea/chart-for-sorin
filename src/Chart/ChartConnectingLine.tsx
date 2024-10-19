import { motion } from "framer-motion";
import { IChartLines } from "./ChartLines";
import { useEffect, useState } from "react";
interface IChartConnectingLineProps {
  height: number;
  rows: number;
  y: number;
  color: string;
  nextEvent: IChartLines;
}
const ChartConnectingLine = ({
  height,
  rows,
  y,
  color,
  nextEvent,
}: IChartConnectingLineProps) => {
  const nextEventY = (height / rows) * nextEvent.y - height / rows / 1.5;
  const [lineY, setLineY] = useState(0);
  const [lineHeight, setLineHeight] = useState(0);
  useEffect(() => {
    if (y > nextEvent.y) {
      setLineHeight((height / rows) * y - height / rows / 1.5 - nextEventY);
      setLineY(nextEventY);
    } else {
      setLineHeight(nextEventY - ((height / rows) * y - height / rows / 1.5));
      setLineY((height / rows) * y - height / rows / 1.5);
    }
  }, [nextEvent,height]);
  return (
    <motion.div
      initial={{
        width: 3,
        y: 0,
        height: 0,
        right: 0,
      }}
      animate={{
        y: lineY,
        height: lineHeight + 2.5,
      }}
      className={`${color} absolute`}
    />
  );
};

export default ChartConnectingLine;

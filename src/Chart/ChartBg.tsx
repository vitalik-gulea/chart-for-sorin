import { useEffect, useRef } from "react";
import chartbgIcon from "../icons/bg.svg";
interface IChartBgProps {
  rows: number;
  columns: number;
  setHeight: React.Dispatch<React.SetStateAction<number>>;
  setWidth: React.Dispatch<React.SetStateAction<number>>;
}
const ChartBg = ({ rows, columns, setHeight, setWidth }: IChartBgProps) => {
  const total = rows * columns;
  const bgArray = Array.from({ length: total });
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setTimeout(() => {
      if (ref.current) {
        setHeight(ref.current.clientHeight);
        setWidth(ref.current.clientWidth);
      }
    }, 20);
  }, [bgArray]);
  return (
    <div
      ref={ref}
      className="grid z-10 relative w-full"
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {bgArray.map((_, index) => (
        <img key={index} src={chartbgIcon} alt="chartbgIcon" className="w-full h-full" />
      ))}
    </div>
  );
};

export default ChartBg;

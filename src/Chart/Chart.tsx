import { DateValue } from "@nextui-org/react";
import ChartBg from "./ChartBg";
import ChartLines, { IChartLines } from "./ChartLines";
import { useState } from "react";
import ChartLabelTime from "./ChartLabelTime";
import ChartLabelsRows from "./ChartLabelsRows";

interface IChartProps {
  rows: number;
  columns: number;
  date: DateValue;
  data: IChartLines[]
}
const Chart = ({ rows, columns, date ,data}: IChartProps) => {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  const [timeRowsArray, setTimeRowsArray] = useState({
    1: "0",
    2: "0",
    3: "0",
    4: "0",
  });

  return (
    <div className="flex relative w-full gap-[5px]">
      <ChartLabelsRows labels={["Off", "SB", "D", "On"]} />
      <div className="raltive w-full flex flex-col gap-[5px]">
        <ChartLabelTime columns={columns} />
        <div className="relative w-full flex">
          <ChartBg
            columns={columns}
            rows={rows}
            setHeight={setHeight}
            setWidth={setWidth}
          />
          <ChartLines
            setTimeRowsArray={setTimeRowsArray}
            width={width}
            date={date}
            height={height}
            rows={rows}
            data={data}
          />
        </div>
      </div>
      <ChartLabelsRows
        labels={[
          timeRowsArray[1],
          timeRowsArray[2],
          timeRowsArray[3],
          timeRowsArray[4],
        ]}
      />
    </div>
  );
};

export default Chart;

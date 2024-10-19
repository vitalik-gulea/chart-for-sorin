import {
  Card,
  CardBody,
  CardHeader,
  DatePicker,
  DateValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import Chart from "./Chart/Chart";
import { useState } from "react";
import { getLocalTimeZone, now } from "@internationalized/date";
import { IChartLines } from "./Chart/ChartLines";
import { getEventValue, getFormattedTimeFromTimestamp } from "./untils/utils";
const App = () => {
  const [date, setDate] = useState<DateValue>(now(getLocalTimeZone()));
  const [data] = useState<IChartLines[]>([
    {
      x: 1729285200 * 1000,
      y: 1,
      color: "bg-red-400",
    },
    {
      x: 1729288800 * 1000,
      y: 3,
      color: "bg-blue-400",
    },
    {
      x: 1729292400 * 1000,
      y: 4,
      color: "bg-green-400",
    },
    {
      x: 1729337400 * 1000,
      y: 2,
      color: "bg-yellow-400",
    },
  ]);
  return (
    <div className="w-screen h-screen flex justify-center  items-center">
      <Card className="w-[90%] h-[75%]">
        <CardHeader className="gap-[15px]">
          Chart
          <DatePicker
            label="Birth date"
            defaultValue={now(getLocalTimeZone())}
            maxValue={now(getLocalTimeZone())}
            value={date}
            onChange={(e) => setDate(e)}
            granularity="day"
            className="max-w-[284px]"
          />
        </CardHeader>
        <CardBody className="gap-[50px]">
          <Chart data={data} columns={24} rows={4} date={date} />
          <Table>
            <TableHeader>
              <TableColumn>Date</TableColumn>
              <TableColumn>Event</TableColumn>
            </TableHeader>
            <TableBody>
              {data.map((value, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {getFormattedTimeFromTimestamp(value.x)}
                  </TableCell>
                  <TableCell>{getEventValue(value.y)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default App;

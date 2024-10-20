import {
  Button,
  Card,
  CardBody,
  CardHeader,
  DatePicker,
  DateValue,
} from "@nextui-org/react";
import Chart from "./Chart/Chart";
import { useEffect, useState } from "react";
import { getLocalTimeZone, now } from "@internationalized/date";
import { IChartLines } from "./Chart/ChartLines";
import EventTable from "./Table/EventTable";
import CreateLogModal from "./Modal/CreateLogModal";
import { getStartOfDayAndEndOfDay } from "./untils/utils";
const App = () => {
  const [date, setDate] = useState<DateValue>(now(getLocalTimeZone()));
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState<IChartLines[]>([
    {
      x: 1729371600 * 1000,
      y: 1,
    },
    {
      x: 1729425600 * 1000,
      y: 3,
    },
    {
      x: 1729429200 * 1000,
      y: 4,
    },
    {
      x: 1729440000 * 1000,
      y: 2,
    },
  ]);
  const [filtredData, setFiltredData] = useState<IChartLines[]>(data);
  const openModalClick = () => {
    setOpenModal(true);
  };
  const closeModalClick = () => {
    setOpenModal(false);
  };
  const createLog = (x: number, y: 1 | 2 | 3 | 4) => {
    setData((prevState) => {
      prevState.push({
        x,
        y,
      });
      const sortedData = [...prevState].sort((a, b) => a.x - b.x);
      console.log(sortedData);
      
      return sortedData;
    });
    setOpenModal(false);
  };
  useEffect(() => {
    const { startOfDaY, endOfDaY } = getStartOfDayAndEndOfDay(date);
    console.log('init');
    
    setFiltredData(() =>
      data.filter((value) => {
        return value.x >= startOfDaY && value.x <= endOfDaY;
      })
    );
  }, [date, data]);

  return (
    <div className="w-screen h-screen flex justify-center  items-center">
      <Card className="w-[95%] h-[95%]">
        <CardHeader className="gap-[15px]">
          Chart
          <DatePicker
            aria-label="Select date"
            showMonthAndYearPickers
            defaultValue={now(getLocalTimeZone())}
            maxValue={now(getLocalTimeZone())}
            value={date}
            onChange={(e) => setDate(e)}
            granularity="day"
            className="max-w-[284px]"
          />
        </CardHeader>
        <CardBody className="gap-[50px]">
          <Chart data={filtredData} columns={24} rows={4} date={date} />
          <div className="gap-[15px] flex flex-col">
            <div>
              <Button onClick={openModalClick}>Create Log</Button>
            </div>
            <EventTable data={filtredData} />
          </div>
        </CardBody>
      </Card>
      <CreateLogModal
        open={openModal}
        closeModal={closeModalClick}
        onFinish={createLog}
      />
    </div>
  );
};

export default App;

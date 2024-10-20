import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { getFormattedTimeFromTimestamp, getEventValue } from "../untils/utils";
import { IChartLines } from "../Chart/ChartLines";
interface IEventTableProps {
  data: IChartLines[];
}
const EventTable = ({ data }: IEventTableProps) => {
  return (
    <Table aria-label="Table">
      <TableHeader>
        <TableColumn>Date</TableColumn>
        <TableColumn>Event</TableColumn>
      </TableHeader>
      <TableBody>
        {data.map((value, index) => (
          <TableRow key={index}>
            <TableCell>{getFormattedTimeFromTimestamp(value.x)}</TableCell>
            <TableCell>{getEventValue(value.y)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default EventTable;

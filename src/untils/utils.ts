import { DateValue } from "@nextui-org/react";

export const getEventValue = (y: number) => {
  const eventArray = ["Off", "SB", "D", "On"];
  return eventArray[y - 1];
};

export const getFormattedTimeFromTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);

  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
};

export const getStartOfDayAndEndOfDay = (timestamp: DateValue) => {
  const startOfDaY = new Date(
    timestamp
      .set({
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0,
      })
      .toDate("")
  ).getTime();
  const endOfDaY = new Date(
    timestamp
      .set({
        hour: 29,
        minute: 59,
        second: 59,
        millisecond: 999,
      })
      .toDate("")
  ).getTime();
  return {
    startOfDaY,
    endOfDaY,
  };
};

export const getLinePixels = (
  x: number,
  timestamp: number,
  width: number,
  y: 1 | 2 | 3 | 4,
  setDuration: (
    value: React.SetStateAction<{
      hours: number;
      minutes: number;
    }>
  ) => void,
  duration: {
    hours: number;
    minutes: number;
  },
  setTimeRowsArray: (
    value: React.SetStateAction<{
      1: string;
      2: string;
      3: string;
      4: string;
    }>
  ) => void,
  setLengthInPixels: (value: React.SetStateAction<number>) => void
) => {
  const differenceInMillis = Math.abs(x - timestamp);
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
};

import { DATE_TIME_FORMAT_MINUTE } from "@common/constant/date";
import dayjs from "dayjs";

const range = (start, end) => {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
};

export const formatDateTimeTable = (
  value,
  format = DATE_TIME_FORMAT_MINUTE,
) => {
  if (!value) return "-";
  const newDay = dayjs(value);
  return newDay?.locale("ja").format(format);
};

export const isBeforeFromToday = (date, valueCompare = "day") => {
  return dayjs(date).diff(dayjs(), valueCompare) < 0;
};

export const validateDateStatus = (startDate, endDate) => {
  if (dayjs(startDate).diff(Date.now()) > 0) return "Prepare";
  if (!endDate && dayjs(startDate).diff(Date.now()) < 0) return "Inprogress";
  if (
    dayjs(startDate).diff(Date.now()) < 0 &&
    dayjs(endDate).diff(Date.now()) > 0
  )
    return "Inprogress";

  return "End";
};

export const disableDateBefore = (current) => {
  return current && current < dayjs().startOf("day");
};

export const disableBeforeDateWithParams = (current, date) => {
  if (!date) return null;
  return current && dayjs(current).isBefore(date, "day");
};

export const disableAfterDateWithParams = (current, date) => {
  if (!date) return null;
  return current && dayjs(current).isAfter(date, "day");
};

export const disableTimeBefore = (hour, minute) => ({
  disabledHours: () => range(0, 24).splice(0, hour),
  disabledMinutes: () => range(0, minute),
});

export const disableTimeAfter = (hour, minute) => ({
  disabledHours: () => range(0, 24).splice(hour, 24),
  disabledMinutes: () => range(minute, 60),
});

export const disableRangeTime = (
  startHour,
  endHour,
  startMinute,
  endMinute,
  current,
) => ({
  disabledHours: () => [
    ...range(0, 24).splice(0, startHour),
    ...range(0, 24).splice(endHour, 24),
  ],
  disabledMinutes: () =>
    // eslint-disable-next-line no-nested-ternary
    startHour === endHour - 1
      ? [...range(0, startMinute), ...range(endMinute, 60)]
      : // eslint-disable-next-line no-nested-ternary
      dayjs().hour() === dayjs(current).hour()
      ? range(0, dayjs().minute())
      : endHour - 1 === dayjs(current).hour()
      ? range(endMinute, 60)
      : [],
});

export const convertSecondsToTime = (seconds = 0) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return dayjs()
    .hour(hours)
    .minute(minutes)
    .second(remainingSeconds)
    .format("H:mm:ss");
};

// "YYYY-MM-DD"
export const convertDateFormToString = (date) => {
  if (!date) return null;
  const newDate = new Date(
    "Wed Sep 13 2023 17:10:01 GMT+0700 (Giờ Đông Dương)",
  );

  const year = newDate.getFullYear();
  const month = String(newDate.getMonth() + 1).padStart(2, "0");
  const day = String(newDate.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};

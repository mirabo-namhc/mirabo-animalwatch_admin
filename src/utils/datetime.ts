import dayjs, { Dayjs } from 'dayjs';
import isToday from 'dayjs/plugin/isToday';

export const convertDateToFormat = (isoDateString?: string | dayjs.Dayjs) => {
  if (!isoDateString) return null;

  const dateTime = dayjs(isoDateString);

  const formattedDateTime: string = dateTime.format('YYYY-MM-DD HH:mm:ss');

  return formattedDateTime;
};

export const convertOnlyDate = (dateTimeString: string): string => {
  const formattedDate = dayjs(dateTimeString).format('YYYY-MM-DD');
  return formattedDate;
}

export const disableDateBefore = (current: Dayjs) => {
  return current && current < dayjs().startOf('day');
};

export const disableBeforeDateWithParams = (current: Dayjs, date?: Dayjs) => {
  if (!date) return false;
  return current && dayjs(current).isBefore(date, 'day');
};

export const disableTimeBefore = (hour: number, minute: number) => ({
  disabledHours: () => range(0, 24).splice(0, hour) as number[],
  disabledMinutes: () => range(0, minute) as number[],
});

export const disableTimeAfter = (hour: number, minute: number) => ({
  disabledHours: () => range(0, 24).splice(hour, 24) as number[],
  disabledMinutes: () => range(minute, 60) as number[],
});

const range = (start: number, end: number): number[] => {
  const result: number[] = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
};

export const handleDisableTime = (current: Dayjs, hour: number, minute: number) => {
  if (!dayjs(current).isToday()) return null;
  return disableTimeBefore(hour, hour === dayjs(current).hour() ? minute : 0);
};

export const handleDisableAfterTime = (
  current: Dayjs,
  startDate: Dayjs,
  hour: number,
  minute: number,
) => {
  if (!dayjs(current).isSame(startDate, 'day')) return null;
  return disableTimeAfter(
    minute === 0 ? hour - 1 : hour,
    hour - 1 === dayjs(current).hour() ? minute : 60,
  );
};

export const handleDisableBeforeTime = (
  current: Dayjs,
  startDate: Dayjs,
  hour: number,
  minute: number,
) => {
  if (!dayjs(current).isSame(startDate, 'day')) return null;
  return disableTimeBefore(hour, hour === dayjs(current).hour() ? minute + 1 : 0);
};

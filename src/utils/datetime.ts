import dayjs from "dayjs";

export const convertDateToFormat = (isoDateString?: string) => {
    if (!isoDateString) return null

    const dateTime = dayjs(isoDateString);

    const formattedDateTime: string = dateTime.format('YYYY-MM-DD HH:mm:ss');

    return formattedDateTime;
}
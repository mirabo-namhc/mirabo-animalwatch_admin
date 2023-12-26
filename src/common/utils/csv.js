/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import { DATE_FORMAT_DISPLAY } from "@common/constant/date";
import { formatDateTimeTable } from "./dateHelper";

export function convertToCSV(objArray) {
  const array = typeof objArray !== "object" ? JSON.parse(objArray) : objArray;
  let str = "";

  for (let i = 0; i < array.length; i++) {
    let line = "";
    for (const index in array[i]) {
      if (line !== "") line += ",";

      line += array[i][index];
    }

    str += `${line}\r\n`;
  }

  return str;
}

export const prepareCsvToDownload = (csv, exportedFilename) => {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  if (navigator.msSaveBlob) {
    // IE 10+
    navigator.msSaveBlob(blob, exportedFilename);
  } else {
    const link = document.createElement("a");
    if (link.download !== undefined) {
      // feature detection
      // Browsers that support HTML5 download attribute
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", exportedFilename);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
};

export function exportCSVFile(headers, items, fileTitle) {
  if (headers) {
    items.unshift(headers);
  }

  // Convert Object to JSON
  const jsonObject = JSON.stringify(items);

  const csv = convertToCSV(jsonObject);

  const exportedFilename = `${fileTitle}.csv` || "export.csv";

  prepareCsvToDownload(csv, exportedFilename);
}

export const formateDataCsvUserJoin = (data = [], isDrawEvent = true) => {
  return data.map((item) => {
    const dataFormate = {
      id: item.id,
      username: item.user.username,
      fullName: item.fullName,
      email: item.email,
      phoneNumber: item.phoneNumber,
      address: item.address,
      birthDay: formatDateTimeTable(item.birthday, DATE_FORMAT_DISPLAY),
      timesUserJoined: item.eventJoineds,
      status: "参加予定",
    };
    if (!isDrawEvent) delete dataFormate.status;

    return dataFormate;
  });
};

import TYPE_COLLECTION from "@common/constant/collection";
import { DATE_FORMAT_API } from "@common/constant/date";
import dayjs from "dayjs";
import { convertDateFormToString } from "./dateHelper";

export const appendFormData = (values, field = "images") => {
  const formData = new FormData();
  Object.keys(values).forEach((key) => {
    switch (key) {
      case field:
        if (values.images) {
          const lengthImgArr = values.images.length;
          for (let i = 0; i < lengthImgArr; i++) {
            formData.append(field, values.images[i].originFileObj);
          }
        }
        break;
      case "image":
        for (let i = 0; i < values?.image?.length; i++) {
          formData.append(`images[${i}]`, values.image[i]);
        }
        break;
      case "imagesCheckPoint":
        for (let i = 0; i < values?.imagesCheckPoint?.length; i++) {
          formData.append(`image[${i}]`, values.imagesCheckPoint[i]);
        }
        break;
      case "imagesNoti":
        for (let i = 0; i < values?.imagesNoti?.length; i++) {
          formData.append(`images[${i}]`, values.imagesNoti[i]?.originFileObj);
        }
        break;
      case "imagesAddCheckPoint":
        if (values.imagesAddCheckPoint) {
          const lengthImgArr = values.imagesAddCheckPoint.length;
          for (let i = 0; i < lengthImgArr; i++) {
            formData.append(
              "image",
              values.imagesAddCheckPoint[i].originFileObj,
            );
          }
        }
        break;
      case "deleteImageIds":
        if (values.deleteImageIds) {
          formData.append("deleteImageIds", values.deleteImageIds);
        }
        break;
      case "listCheckpointId":
        if (values?.listCheckpointId?.length) {
          for (let i = 0; i < values?.listCheckpointId?.length; i++) {
            formData.append(
              `listCheckpointId[${i}]`,
              values.listCheckpointId[i],
            );
          }
        }
        if (
          values?.type === TYPE_COLLECTION[1].value &&
          !values?.listCheckpointId?.length
        ) {
          formData.append("listCheckpointId", []);
        }
        break;
      case "listCoursesId":
        if (values?.listCoursesId?.length) {
          for (let i = 0; i < values?.listCoursesId?.length; i++) {
            formData.append(`listCoursesId[${i}]`, values.listCoursesId[i]);
          }
        }
        if (
          values?.type === TYPE_COLLECTION[1].value &&
          !values?.listCoursesId?.length
        ) {
          formData.append("listCoursesId", []);
        }
        break;
      case "listEventCoursesId":
        if (values?.listEventCoursesId)
          formData.append(`listCoursesId[${0}]`, values.listEventCoursesId);
        else formData.append(`listCoursesId[${0}]`, []);
        break;
      case "listDeleteCoursesId":
        for (let i = 0; i < values?.listDeleteCoursesId?.length; i++) {
          formData.append(
            `listDeleteCoursesId[${i}]`,
            values.listDeleteCoursesId[i],
          );
        }
        break;
      case "imagesEvent":
        for (let i = 0; i < values?.imagesEvent?.length; i++) {
          formData.append(`images[${i}]`, values.imagesEvent[i].originFileObj);
        }
        break;
      case "startDate":
        formData.append(
          "startDate",
          dayjs(values.startDate).format(DATE_FORMAT_API),
        );
        break;
      case "endDate":
        formData.append(
          "endDate",
          dayjs(values.endDate).format(DATE_FORMAT_API),
        );
        break;
      case "deadlineDate":
        formData.append(
          "deadlineDate",
          dayjs(values.deadlineDate).format(DATE_FORMAT_API),
        );
        break;
      case "avatar":
        formData.append("avatar", values?.avatar[0]?.originFileObj);
        break;
      case "imageBadge":
        formData.append("image", values?.imageBadge[0]?.originFileObj);
        break;
      case "file":
        formData.append(
          "file",
          values?.file?.file || values?.file?.originFileObj,
        );
        break;
      case "fileMap":
        formData.append("fileMap", values?.fileMap?.file);
        break;
      case "fileSendMailCsv":
        formData.append("file", values?.fileSendMailCsv);
        break;
      case "sendAtCsv":
        formData.append(
          "sendAt",
          dayjs(values.sendAtCsv).format(DATE_FORMAT_API),
        );
        break;
      default:
        if (values[key] != null)
          formData.append(key, String(values[key])?.trim());

        break;
    }
  });
  return formData;
};

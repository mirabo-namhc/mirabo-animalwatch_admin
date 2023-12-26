import { replacePositionRangeNumber } from "@common/utils/numberHelper";
import {
  EMAIL_REGEXP,
  NUMBER_REGEX,
  PASSWORD_REGEXP,
} from "@common/utils/regex";
import { message, Upload } from "antd";

export const email = (t) => ({
  validator(_, value) {
    if (!value || !value?.trim())
      return Promise.reject(new Error(t("auth.message.emailRequire")));

    if (!EMAIL_REGEXP.test(value?.trim()))
      return Promise.reject(new Error(t("auth.message.incorrectEmail")));

    return Promise.resolve();
  },
});

export const number = (t) => ({
  validator(_, value) {
    if (!value || !value?.trim())
      return Promise.reject(new Error(t("auth.message.emailRequire")));

    if (!NUMBER_REGEX.test(value))
      return Promise.reject(new Error(t("is require number")));

    return Promise.resolve();
  },
});

export const validatePassword = (t) => ({
  validator(_, value) {
    if (!value || !value?.trim())
      return Promise.reject(new Error(t("auth.message.passwordRequire")));

    if (!PASSWORD_REGEXP.test(value))
      return Promise.reject(new Error(t("auth.message.incorrectPassword")));

    return Promise.resolve();
  },
});

export const validateCompareValue =
  (t, fieldName) =>
  ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue(fieldName) === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error(t("auth.message.notMatchPassword")));
    },
  });

export const handleOnKeyPress = (e) => {
  const specialCharRegex = /[0-9]/;
  const pressedKey = String.fromCharCode(!e.charCode ? e.which : e.charCode);
  if (!specialCharRegex.test(pressedKey)) {
    e.preventDefault();
    return false;
  }
  return false;
};

export const empty = (mes = "") => ({
  validator(_, value) {
    const stringify = value?.toString();

    if (value === undefined || value === null || stringify?.trim() === "") {
      return Promise.reject(new Error(mes));
    }
    return Promise.resolve();
  },
});

export const emptyImg = (mes = "") => ({
  validator(_, value) {
    if (value?.fileList === undefined || value?.fileList?.length === 0) {
      if (value?.length) {
        return Promise.resolve();
      }
      return Promise.reject(new Error(mes));
    }
    return Promise.resolve();
  },
});

export const numberPreventInput = (value, form, field, fixNumber) => {
  form.setFieldValue(
    field,
    replacePositionRangeNumber(value, null, null, fixNumber),
  );
};

export const coordinates = (value, form, field, posStart, posEnd) => {
  form.setFieldValue(
    field,
    replacePositionRangeNumber(value, posStart, posEnd),
  );
};

export const checkBeforeUpload = (t, file, fileSize) => {
  // check size file
  const isLt8M = file.size / 1024 / 1024 < fileSize;
  if (!isLt8M) {
    message.error(t("validate.imageRequireLess2mb"));
    return isLt8M || Upload.LIST_IGNORE;
  }

  // check type file
  const isJpgOrPng = ["image/jpeg", "image/png"].includes(file.type);

  if (!isJpgOrPng) {
    message.error(t("validate.notImageFormat"));
    return isJpgOrPng || Upload.LIST_IGNORE;
  }

  // check last file name includes jpeg or png
  const checkLastNameFile = ["jpg", "png", "jpeg"].includes(
    file?.name?.split(".")?.at(-1),
  );

  if (!checkLastNameFile) {
    message.error(t("validate.notImageFormat"));
    return checkLastNameFile || Upload.LIST_IGNORE;
  }

  return false;
};

export const getFileExtension = (fileName) => {
  const parts = fileName.split(".");
  return parts[parts.length - 1].toLowerCase();
};

export const checkBeforeUploadFile = (
  t,
  file,
  messageError,
  allowFiles,
  allowFileWindows,
) => {
  const extension = getFileExtension(file.name);
  const allowFileWindow =
    allowFileWindows.length && allowFileWindows.includes(extension);

  if (!allowFileWindow) {
    message.error(messageError);
    return allowFileWindow || Upload.LIST_IGNORE;
  }

  return false;
};

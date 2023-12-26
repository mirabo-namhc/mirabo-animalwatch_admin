/* eslint-disable prefer-regex-literals */
export const EMAIL_REGEXP = new RegExp(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/);
export const PASSWORD_REGEXP =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,16}$/;
export const NUMBER_REGEX = /^-?\d+\.?\d*$/;
export const LONGITUDE = /^-?(180(\.0+)?|1[0-7]\d(\.\d+)?|\d{1,2}(\.\d+)?)$/;
export const ALPHABET_AND_LESS_THAN_O_REGEX = /[^0-9-.]+/g;
export const ALPHABET_REPLACE = /[^0-9.]+/g;
export const DECIMAL = /\.(?=.*\.)/g;
export const URL_FORMATE = /^https?:\/\//;

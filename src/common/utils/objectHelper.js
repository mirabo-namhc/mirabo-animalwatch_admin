export function isEmptyObj(obj) {
  return Object.keys(obj).length === 0;
}
export function trimObj(obj) {
  Object.keys(obj).forEach((k) => {
    // eslint-disable-next-line no-param-reassign
    if (typeof obj[k] === "string") obj[k] = obj[k].trim();
  });
  return obj;
}

export function convertListOptions(list) {
  if (!list) return [];
  return list?.map((item) => ({
    key: item?.id,
    value: item?.id,
    label: item?.name,
  }));
}

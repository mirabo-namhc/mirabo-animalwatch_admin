import { replacePositionRangeNumber } from "@common/utils/numberHelper";

const coordinates = (value, form, field, posStart, posEnd) => {
  form.setFieldValue(
    field,
    replacePositionRangeNumber(value, posStart, posEnd),
  );
};

export const checkpoint = {
  coordinates,
};

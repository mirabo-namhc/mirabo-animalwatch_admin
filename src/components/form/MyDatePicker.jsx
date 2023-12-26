import React from "react";
import PropTypes from "prop-types";
import { Col, DatePicker, Form } from "antd";

import { DATE_FORMAT_DISPLAY } from "@common/constant/date";

function MyDatePicker({
  label,
  name,
  rules,
  picker,
  isToDay,
  colwidth,
  disableDate,
  ...props
}) {
  return (
    <Col xs={colwidth || 24}>
      <Form.Item label={label} name={name} rules={rules}>
        <DatePicker
          showToday={isToDay}
          format={DATE_FORMAT_DISPLAY}
          picker={picker}
          disabledDate={disableDate}
          {...props}
        />
      </Form.Item>
    </Col>
  );
}

export default MyDatePicker;

MyDatePicker.propTypes = {
  label: PropTypes.string,
  name: PropTypes.any,
  rules: PropTypes.array,
  picker: PropTypes.string,
  isToDay: PropTypes.bool,
  colwidth: PropTypes.number,
  disableDate: PropTypes.func,
};

import React from "react";
import PropTypes from "prop-types";
import { Col, Form, ColorPicker } from "antd";

function MyColorPicker({
  label,
  name,
  rules,
  picker,
  colwidth,
  setDataColor,
  ...props
}) {
  const handleChange = (value, colorObj) => {
    if (colorObj) setDataColor(colorObj);
  };
  return (
    <Col xs={colwidth || 24}>
      <Form.Item label={label} name={name} rules={rules}>
        <ColorPicker showText {...props} onChange={handleChange} />
      </Form.Item>
    </Col>
  );
}

export default MyColorPicker;

MyColorPicker.propTypes = {
  label: PropTypes.string,
  name: PropTypes.any,
  rules: PropTypes.array,
  picker: PropTypes.string,
  colwidth: PropTypes.number,
  setDataColor: PropTypes.func,
};

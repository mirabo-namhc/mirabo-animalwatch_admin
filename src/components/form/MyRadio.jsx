import React from "react";
import PropTypes from "prop-types";
import { Form, Radio } from "antd";

function MyRadio({ label, name, radioValues, rules, onChange }) {
  return (
    <Form.Item label={label} name={name} rules={rules}>
      <Radio.Group onChange={onChange}>
        {radioValues.map((radio) => (
          <Radio key={radio.key} value={radio.value}>
            {radio.label}
          </Radio>
        ))}
      </Radio.Group>
    </Form.Item>
  );
}

MyRadio.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  rules: PropTypes.array,
  radioValues: PropTypes.array,
  onChange: PropTypes.func,
};

export default MyRadio;

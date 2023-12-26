import React from "react";
import PropTypes from "prop-types";
import { Col, Form, Checkbox } from "antd";

function MyCheckbox({ label, name, colwidth, checked, setData, ...props }) {
  const onChange = (e) => {
    setData(e.target.checked);
  };

  return (
    <Col xs={colwidth || 24}>
      <Form.Item name={name}>
        <Checkbox checked={checked} onChange={onChange}>
          {label}
        </Checkbox>
      </Form.Item>
    </Col>
  );
}

export default MyCheckbox;

MyCheckbox.propTypes = {
  label: PropTypes.string,
  name: PropTypes.any,
  colwidth: PropTypes.number,
  checked: PropTypes.bool,
  setData: PropTypes.func,
};

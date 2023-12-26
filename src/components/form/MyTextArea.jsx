import React from "react";
import PropTypes from "prop-types";
import { Col, Form, Input } from "antd";

function MyTextArea({
  label,
  name,
  placeholder,
  subLabel = " ",
  subMessages,
  rules,
  disabled,
  hideField,
  ...props
}) {
  return (
    <Col hidden={hideField}>
      <Form.Item
        name={name}
        label={label}
        rules={rules}
        className="form-item-input"
      >
        <Input.TextArea
          rows={5}
          {...props}
          disabled={disabled}
          placeholder={placeholder}
          autoSize={false}
        />
      </Form.Item>
      {subMessages && (
        <Form.Item label={subLabel} className="sub-mesage">
          {subMessages.map((message, index) => (
            <p className="mt-5 fz-12" key={index}>
              {message}
            </p>
          ))}
        </Form.Item>
      )}
    </Col>
  );
}

MyTextArea.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  subLabel: PropTypes.string,
  subMessages: PropTypes.array,
  rules: PropTypes.array,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  hideField: PropTypes.bool,
};

export default MyTextArea;

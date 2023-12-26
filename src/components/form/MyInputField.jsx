import React from "react";
import PropTypes from "prop-types";
import { Form, Input, InputNumber, Col, Row } from "antd";

function MyInputField({
  label,
  name,
  type,
  placeholder,
  rules,
  dependencies,
  clsInput,
  className,
  isInputNumber,
  value,
  precision,
  onKeyPress,
  defaultValue,
  max,
  min,
  colwidth,
  hideField,
  ...props
}) {
  const { addonAfter } = props;

  return (
    !hideField && (
      <Col xs={colwidth || 24}>
        <Form.Item
          label={label}
          name={name}
          rules={rules}
          dependencies={dependencies}
          className={`input-field-default ${className}`}
        >
          {!isInputNumber ? (
            <Input
              type={type}
              placeholder={placeholder}
              className={clsInput}
              {...props}
            />
          ) : (
            <InputNumber
              className="full-width"
              placeholder={placeholder}
              {...props}
              max={max}
              min={min}
              addonAfter={addonAfter}
              precision={precision}
              onKeyPress={onKeyPress}
              defaultValue={defaultValue}
            />
          )}
        </Form.Item>
      </Col>
    )
  );
}

MyInputField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  type: PropTypes.string,
  placeholder: PropTypes.string,
  rules: PropTypes.array,
  dependencies: PropTypes.array,
  clsInput: PropTypes.string,
  className: PropTypes.string,
  isInputNumber: PropTypes.bool,
  onKeyPress: PropTypes.func,
  max: PropTypes.number,
  min: PropTypes.number,
  value: PropTypes.string,
  suffix: PropTypes.string,
  defaultValue: PropTypes.number,
  addonAfter: PropTypes.string,
  precision: PropTypes.number,
  colwidth: PropTypes.number,
  hideField: PropTypes.bool,
};

export default MyInputField;

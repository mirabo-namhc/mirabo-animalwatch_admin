import React from "react";
import PropTypes from "prop-types";
import { Form, Select, Col } from "antd";
import { IconDropDown } from "@assets/icons";

function MySelect({
  listOptions,
  placeholder,
  style,
  optionFilterProp,
  disabled,
  name,
  rules,
  className,
  label,
  mode,
  colwidth,
  hideField,
  filterOption,
  ...props
}) {
  const isMobile = window.location.pathname.split("/").includes("mobile");
  const { onChange } = props;
  return (
    !hideField && (
      <Col xs={colwidth || 24}>
        <Form.Item rules={rules} label={label} name={name}>
          <Select
            mode={mode}
            allowClear
            disabled={disabled}
            style={style}
            placeholder={placeholder}
            optionFilterProp={optionFilterProp}
            className={`${className} ${isMobile ? "fz-12" : ""}`}
            onChange={onChange}
            filterOption={filterOption}
            {...props}
          >
            {listOptions?.map((item) => (
              <Select.Option
                key={item?.key}
                value={item?.value}
                className={isMobile ? "fz-12" : ""}
              >
                {item?.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
    )
  );
}

export default MySelect;

MySelect.propTypes = {
  listOptions: PropTypes.array,
  placeholder: PropTypes.string,
  style: PropTypes.object,
  optionFilterProp: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.any,
  rules: PropTypes.array,
  className: PropTypes.string,
  label: PropTypes.string,
  mode: PropTypes.string,
  colwidth: PropTypes.number,
  onChange: PropTypes.func,
  hideField: PropTypes.bool,
  filterOption: PropTypes.func,
};

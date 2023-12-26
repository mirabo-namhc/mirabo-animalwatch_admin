import React from "react";
import PropTypes from "prop-types";
import { Form, TreeSelect } from "antd";

function MyTreeSelect({
  label,
  name,
  treeData,
  className,
  rules,
  isCheckable,
  placeholder,
}) {
  return (
    <Form.Item label={label} name={name} rules={rules}>
      <TreeSelect
        treeData={treeData}
        treeCheckable={isCheckable}
        className={className}
        placeholder={placeholder}
      />
    </Form.Item>
  );
}

MyTreeSelect.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  treeData: PropTypes.array,
  rules: PropTypes.array,
  className: PropTypes.string,
  isCheckable: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default MyTreeSelect;

import { Form } from 'antd';
import { Rule } from 'antd/es/form';
import React from 'react';
import AInput from '~atoms/a-input';
import { IAInput } from '~atoms/a-input/AInput';

export interface IMFormInputProps extends IAInput {
  name: string;
  rules: Rule[] | undefined;
}

function MFormInput({
  placeholder,
  name,
  type,
  id,
  value,
  onChange,
  prefix,
  rules,
  ...props
}: IMFormInputProps) {
  return (
    <Form.Item
      name={name}
      rules={rules}
    >
      <AInput
        prefix={prefix}
        placeholder={placeholder}
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        {...props}
      />
    </Form.Item>
  );
}

export default MFormInput;

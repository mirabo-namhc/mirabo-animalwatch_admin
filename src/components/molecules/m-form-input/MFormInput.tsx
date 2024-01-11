import { LockOutlined } from '@ant-design/icons';
import { Form } from 'antd';
import React from 'react';
import AInput from '~atoms/a-input';
import { IAInput } from '~atoms/a-input/AInput';

export interface IMFormInputProps extends IAInput {
  name: string;
  message: string;
  isRequired: boolean;
}

function MFormInput({
  isRequired,
  message,
  placeholder,
  name,
  type,
  id,
  value,
  onChange,
  prefix,
  ...props
}: IMFormInputProps) {
  return (
    <Form.Item name={name} rules={[{ required: isRequired, message: message }]}>
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

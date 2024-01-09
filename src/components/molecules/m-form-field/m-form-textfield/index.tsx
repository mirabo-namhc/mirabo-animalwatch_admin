import { Col, Form, Input, InputNumber } from 'antd';
import React from 'react';
import { ETypeFieldForm } from '~/types/enum.type';
import { IMFormItemProps } from '~/types/form.type';

interface IMFormTextField extends IMFormItemProps<ETypeFieldForm.TEXT_FIELD> {
  isInputNumber?: boolean;
  placeholder?: string;
  clsInput?: string;
  max?: number;
  min?: number;
}

export default function MFormTextField({
  colProps,
  atomProps,
  className,
  isInputNumber,
  placeholder,
  clsInput,
  type,
  max,
  min,
  ...props
}: IMFormTextField) {
  return (
    <Col {...colProps}>
      <Form.Item {...props} className={className}>
        {!isInputNumber ? (
          <Input placeholder={placeholder} className={clsInput} {...atomProps} />
        ) : (
          <InputNumber max={max} min={min} placeholder={placeholder} className={clsInput} />
        )}
      </Form.Item>
    </Col>
  );
}

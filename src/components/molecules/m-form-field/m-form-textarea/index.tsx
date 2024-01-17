import { Col, Form, Input } from 'antd';
import React from 'react';
import { ETypeFieldForm } from '~/types/enum.type';
import { IMFormItemProps } from '~/types/form.type';

const { TextArea } = Input;

interface IMFormTextArea extends IMFormItemProps<ETypeFieldForm.TEXT_AREA> {
  placeholder?: string;
  clsInput?: string;
  max?: number;
  min?: number;
}

export default function MFormTextArea({
  colProps,
  atomProps,
  className,
  placeholder,
  clsInput,
  type,
  max,
  min,
  ...props
}: IMFormTextArea) {
  return (
    <Col {...colProps}>
      <Form.Item {...props} className={className}>
        <TextArea placeholder={placeholder} className={clsInput} {...atomProps} />
      </Form.Item>
    </Col>
  );
}

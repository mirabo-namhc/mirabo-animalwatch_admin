import React from 'react';
import { Form, Select, Col } from 'antd';
import { IMFormItemProps } from '~/types/form.type';
import { ETypeFieldForm } from '~/types/enum.type';

interface IMFormSelect extends IMFormItemProps<ETypeFieldForm.SELECT> {
  listOptions?: any[];
  placeholder?: string;
}

function MFormSelect({
  listOptions,
  placeholder,
  atomProps,
  colProps,
  className,
  ...props
}: IMFormSelect) {
  return (
    <Col {...colProps}>
      <Form.Item {...props}>
        <Select
          virtual={false}
          placeholder={placeholder ?? '形式をえらんでください'}
          className={className}
          {...atomProps}
        />
      </Form.Item>
    </Col>
  );
}

export default MFormSelect;

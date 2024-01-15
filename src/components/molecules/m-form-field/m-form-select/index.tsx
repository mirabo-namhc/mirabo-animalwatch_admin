import React from 'react';
import { Form, Select, Col } from 'antd';
import { IMFormItemProps } from '~/types/form.type';
import { ETypeFieldForm } from '~/types/enum.type';
import clsx from 'clsx';

interface IMFormSelect extends IMFormItemProps<ETypeFieldForm.SELECT> {
  listOptions?: any[];
  placeholder?: string;
}

function MFormSelect({
  listOptions,
  placeholder,
  atomProps,
  colProps,
  isDisable = false,
  className,
  ...props
}: IMFormSelect) {
  const classMFormSelect = clsx(
    {
      'pointer-events-none': isDisable,
    },
    className,
  );

  return (
    <Col {...colProps}>
      <Form.Item {...props}>
        <Select
          virtual={false}
          placeholder={placeholder ?? '形式をえらんでください'}
          className={classMFormSelect}
          {...atomProps}
        />
      </Form.Item>
    </Col>
  );
}

export default MFormSelect;

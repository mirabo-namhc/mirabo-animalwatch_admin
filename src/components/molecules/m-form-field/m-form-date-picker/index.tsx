import { Col, Form } from 'antd';
import clsx from 'clsx';
import { ETypeFieldForm } from '~/types/enum.type';
import { IMFormItemProps } from '~/types/form.type';

import ADatePicker from '~atoms/a-date-picker';

const MFormDatePicker = ({
  atomProps,
  colProps,
  isDisable,
  className,
  ...formItemProps
}: IMFormItemProps<ETypeFieldForm.DATEPICKER>) => {
  const classMFormSelect = clsx(
    {
      'pointer-events-none': isDisable,
    },
    className,
  );

  return (
    <Col {...colProps}>
      <Form.Item {...formItemProps}>
        <ADatePicker {...atomProps} className={classMFormSelect} />
      </Form.Item>
    </Col>
  );
};

export default MFormDatePicker;

import { Col, Form } from 'antd';
import { ETypeFieldForm } from '~/types/enum.type';
import { IMFormItemProps } from '~/types/form.type';

import ADatePicker from '~atoms/a-date-picker';

const MFormDatePicker = ({
  atomProps,
  colProps,
  ...formItemProps
}: IMFormItemProps<ETypeFieldForm.DATEPICKER>) => {
  return (
    <Col {...colProps}>
      <Form.Item {...formItemProps}>
        <ADatePicker {...atomProps} />
      </Form.Item>
    </Col>
  );
};

export default MFormDatePicker;

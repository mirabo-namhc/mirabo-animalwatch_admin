import { Checkbox, Col, Form } from 'antd';
import { ETypeFieldForm } from '~/types/enum.type';
import { IMFormItemProps } from '~types';

const MFormCheckbox = ({
  colProps,
  atomProps,
  ...formItemProps
}: IMFormItemProps<ETypeFieldForm.CHECKBOX>) => {
  return (
    <Col {...colProps}>
      <Form.Item {...formItemProps}>
        <Checkbox.Group {...atomProps} />
      </Form.Item>
    </Col>
  );
};

export default MFormCheckbox;

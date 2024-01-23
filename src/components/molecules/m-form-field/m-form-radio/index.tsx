import { Col, Form, Radio } from 'antd';
import { ETypeFieldForm } from '~/types/enum.type';
import { IMFormItemProps } from '~/types/form.type';

const MFormRadio = ({
  colProps,
  atomProps,
  ...formItemProps
}: IMFormItemProps<ETypeFieldForm.RADIO>) => {
  return (
    <Col {...colProps}>
      <Form.Item {...formItemProps}>
        <Radio.Group {...atomProps} />
      </Form.Item>
    </Col>
  );
};

export default MFormRadio;

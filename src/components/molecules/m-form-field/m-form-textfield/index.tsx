import { Col, Form, Input } from 'antd';
import { ETypeFieldForm } from '~/types/enum.type';
import { IMFormItemProps } from '~/types/form.type';

interface IMFormTextField extends IMFormItemProps<ETypeFieldForm.TEXT_FIELD> {
  placeholder?: string;
  clsInput?: string;
}

export default function MFormTextField({
  colProps,
  atomProps,
  className,
  placeholder,
  clsInput,
  type,
  ...props
}: IMFormTextField) {
  return (
    <Col {...colProps}>
      <Form.Item {...props} className={className}>
        {atomProps?.type === 'password' ? (
          <Input.Password placeholder={placeholder} className={clsInput} {...atomProps} />
        ) : (
          <Input placeholder={placeholder} className={clsInput} {...atomProps} />
        )}
      </Form.Item>
    </Col>
  );
}

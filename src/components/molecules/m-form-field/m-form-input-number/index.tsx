import { Col, Form, Input } from 'antd';
import { ETypeFieldForm } from '~/types/enum.type';
import { IMFormItemProps } from '~/types/form.type';
import { numberPreventInput } from '~utils/funcHelper';

interface IMFormInputNumber extends IMFormItemProps<ETypeFieldForm.INPUT_NUMBER> {
  placeholder?: string;
  clsInput?: string;
  fixNumber?: number;
}

export default function MFormInputNumber({
  colProps,
  atomProps,
  className,
  placeholder,
  clsInput,
  fixNumber = 2,
  ...props
}: IMFormInputNumber) {
  const { name } = props;

  return (
    <Col {...colProps}>
      <Form.Item {...props} className={className}>
        <Input
          onChange={(e) => {
            numberPreventInput(e.target.value || '', name, fixNumber, atomProps?.formControl);
          }}
          placeholder={placeholder}
          className={clsInput}
          {...atomProps}
        />
      </Form.Item>
    </Col>
  );
}

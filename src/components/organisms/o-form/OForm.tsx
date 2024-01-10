import { Button, Form, FormProps, Row } from 'antd';
import clsx from 'clsx';

import './OForm.scss';
import { TMappedFormItems } from '~/types/form.type';
import { ETypeFieldForm } from '~/types/enum.type';
import { MFormField } from '~molecules/m-form-field';

interface IOForm<Values extends Record<string, any> = Record<string, any>>
  extends FormProps<Values> {
  listField: TMappedFormItems[];
  handleValuesChange?: (changedValues: object, values: Values) => void;
  onSubmitForm: (values: Values) => void;
  hanleResetForm?: () => void;
  loading?: boolean;
}

export default function OForm<Values extends Record<string, any>>({
  listField,
  handleValuesChange,
  onSubmitForm,
  hanleResetForm,
  loading,
  className,
  initialValues,
  ...props
}: IOForm<Values>) {
  const classOForm = clsx('classOForm', className);

  const renderFieldForm = () => {
    return listField.map((item, index) => {
      switch (item.type) {
        case ETypeFieldForm.TEXT_FIELD:
          return <MFormField.TextField key={`${item.name}-${index}`} {...item} />;
        case ETypeFieldForm.SELECT:
          return <MFormField.Slect key={`${item.name}-${index}`} {...item} />;
        case ETypeFieldForm.DATEPICKER:
          return <MFormField.DatePicker key={`${item.name}-${index}`} {...item} />;
        case ETypeFieldForm.RADIO:
          return <MFormField.Radio key={`${item.name}-${index}`} {...item} />;
        case ETypeFieldForm.UPLOAD:
          return <MFormField.Upload key={`${item.name}-${index}`} {...item} />;
        default:
          return null;
      }
    });
  };

  return (
    <div className={classOForm}>
      <Form<Values>
        colon={false}
        layout="vertical"
        initialValues={initialValues ?? {}}
        onValuesChange={handleValuesChange}
        onFinish={onSubmitForm}
        onReset={hanleResetForm}
        {...props}
      >
        <Row gutter={[48, 8]}>{renderFieldForm()}</Row>

        <Row justify="center" className="mt-30 flex gap-20 group-btn-event">
          <Button type="default">プレビュ</Button>
          <Button type="primary" htmlType="submit" loading={loading} disabled={loading}>
            登録
          </Button>
        </Row>
      </Form>
    </div>
  );
}

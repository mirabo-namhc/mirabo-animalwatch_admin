import { Form, FormProps, Row } from 'antd';
import clsx from 'clsx';

import { useEffect, useMemo } from 'react';
import { useURLInfo } from '~/hooks';
import { ETypeFieldForm } from '~/types/enum.type';
import { TMappedFormItems } from '~/types/form.type';
import AButton from '~atoms/a-button';
import { MFormField } from '~molecules/m-form-field';
import './OForm.scss';

interface IOForm<Values extends Record<string, any> = Record<string, any>>
  extends FormProps<Values> {
  listField: TMappedFormItems[];
  handleValuesChange?: (changedValues: object, values: Values) => void;
  onSubmitForm: (values: Values) => void;
  hanleResetForm?: () => void;
  loading?: boolean;
  onCancel?: () => void;
  onDelete?: () => void;
}

export default function OForm<Values extends Record<string, any>>({
  listField,
  handleValuesChange,
  onSubmitForm,
  onCancel,
  onDelete,
  hanleResetForm,
  loading = false,
  className,
  initialValues,
  ...props
}: IOForm<Values>) {
  const { isEdit } = useURLInfo();
  const { form } = props;
  const classOForm = clsx('o-form', className);

  const renderFieldForm = useMemo(() => {
    return listField.map((item, index) => {
      switch (item.type) {
        case ETypeFieldForm.TEXT_FIELD:
          return <MFormField.TextField key={`${item.name}-${index}`} {...item} />;
        case ETypeFieldForm.INPUT_NUMBER:
          return <MFormField.InputNumber key={`${item.name}-${index}`} {...item} />;
        case ETypeFieldForm.TEXT_AREA:
          return <MFormField.TextArea key={`${item.name}-${index}`} {...item} />;
        case ETypeFieldForm.SELECT:
          return <MFormField.Select key={`${item.name}-${index}`} {...item} />;
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
  }, [listField]);

  useEffect(() => {
    form?.setFieldsValue(initialValues ?? {});
  }, [initialValues]);

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
        <Row gutter={[48, 8]}>{renderFieldForm}</Row>

        <Row justify="center" className="mt-30 flex gap-20 group-btn-event">
          {isEdit ? (
            <>
              <AButton danger onClick={onDelete}>
                削除
              </AButton>
              <Form.Item>
                <AButton type="primary" htmlType="submit" loading={loading} disabled={loading}>
                  更新
                </AButton>
              </Form.Item>
            </>
          ) : (
            <>
              <AButton type="default" onClick={onCancel}>
                キャンセル
              </AButton>
              <Form.Item>
                <AButton type="primary" htmlType="submit" loading={loading} disabled={loading}>
                  登録
                </AButton>
              </Form.Item>
            </>
          )}
        </Row>
      </Form>
    </div>
  );
}

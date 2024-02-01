import { useForm } from 'antd/es/form/Form';
import { useAppDispatch, useAppSelector } from '~/_lib/redux/hooks';
import { ETypeFieldForm } from '~/types/enum.type';
import { COLDEF } from '~constants/form';
import OForm from '~organisms/o-form';
import { authActions } from '~store/auth/authSlice';
import { IResetPassPayload, TMappedFormItems } from '~types';
import {
  messageErrorBetweenCharacter,
  messageErrorMaxCharacter,
  messageErrorRequired,
} from '~utils/funcHelper';

export default function ResetPasswordPage() {
  const { loadingRegister } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [formControl] = useForm();
  const listFieldForm: TMappedFormItems[] = [
    {
      type: ETypeFieldForm.TEXT_FIELD,
      label: 'ユーザー名',
      name: 'username',
      atomProps: {
        placeholder: messageErrorRequired('ユーザー名'),
        maxLength: 255,
        autoComplete: 'off',
      },
      colProps: {
        span: COLDEF,
      },
      rules: [
        {
          required: true,
          whitespace: true,
          message: messageErrorRequired('ユーザー名'),
        },
        {
          max: 255,
          message: messageErrorMaxCharacter(255),
        },
      ],
    },
    {
      type: ETypeFieldForm.TEXT_FIELD,
      label: 'パスワード',
      name: 'password',
      atomProps: {
        placeholder: messageErrorRequired('パスワード'),
        maxLength: 255,
        type: 'password',
        autoComplete: 'off',
      },
      colProps: {
        span: COLDEF,
      },
      rules: [
        {
          required: true,
          whitespace: true,
          message: messageErrorRequired('パスワード'),
        },
        {
          max: 255,
          message: messageErrorMaxCharacter(255),
        },
      ],
    },
    {
      type: ETypeFieldForm.TEXT_FIELD,
      label: '新しいパスワード',
      name: 'newpassword',
      atomProps: {
        placeholder: messageErrorRequired('新しいパスワード'),
        maxLength: 255,
        type: 'password',
      },
      colProps: {
        span: COLDEF,
      },
      rules: [
        {
          required: true,
          whitespace: true,
          message: messageErrorRequired('新しいパスワード'),
        },
        {
          max: 8,
          message: messageErrorBetweenCharacter(6, 8),
        },
        {
          min: 6,
          message: messageErrorBetweenCharacter(6, 8),
        },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (value && getFieldValue('password') === value) {
              return Promise.reject(
                new Error('新しいパスワードフィールドとパスワードは異なっている必要があります。'),
              );
            }
            return Promise.resolve();
          },
        }),
      ],
    },
  ];

  const handleSubmit = (values: IResetPassPayload) => {
    try {
      const params = { ...values };
      dispatch(authActions.resetPassword({ ...params, onHanldeSuccess: handleResetForm }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleResetForm = () => {
    formControl.resetFields();
  };

  return (
    <div className="max-w-percent-50 ma-auto mt-50">
      <OForm
        colon={false}
        form={formControl}
        listField={listFieldForm}
        onSubmitForm={handleSubmit}
        initialValues={{}}
        onCancel={handleResetForm}
        loading={loadingRegister}
      />
    </div>
  );
}

import { Form, Modal, Spin, message } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '~/_lib/redux/hooks';
import { useGetDetail } from '~/hooks';
import useURLInfo from '~/hooks/useURLInfo';
import { EActiveField, EMessageErrorRequired, ETypeFieldForm } from '~/types/enum.type';
import { TMappedFormItems } from '~/types/form.type';
import { APP_ROUTE_URL } from '~constants/endpoint';
import { COLDEF, COL_HAFT, isActiveFacilityOptions } from '~constants/form';
import { MFormField } from '~molecules/m-form-field';
import OForm from '~organisms/o-form';
import { quizActions } from '~store/quiz/quiz.slice';
import { IQuiz } from '~types';
import './QuizForm.scss';
import {
  convertDateToFormat,
  disableBeforeDateWithParams,
  disableDateBefore,
} from '~utils/datetime';
import { isNullable, messageErrorMaxCharacter, messageErrorRequired } from '~utils/funcHelper';
import { EStatusFileUpload, IRefFormUpload } from '~molecules/m-form-field/m-form-upload';

export default function QuizForm() {
  const uploadImageQuestionRef = React.useRef<IRefFormUpload>(null);
  const uploadImageExplanationRef = React.useRef<IRefFormUpload>(null);

  const [quiz, setQuiz] = React.useState<IQuiz>({} as IQuiz);

  const dispatch = useAppDispatch();
  const [formControl] = Form.useForm();
  const { id: quizId, isEdit, isCreate } = useURLInfo();

  //Navigator
  const navigate = useNavigate();

  const { detailData: quizDetail, loading } = useGetDetail<IQuiz | undefined>({
    action: quizActions,
    nameState: 'quiz',
    isGetApi: isEdit,
  });

  const listFieldForm: TMappedFormItems[] = [
    {
      type: ETypeFieldForm.TEXT_FIELD,
      label: 'タイトル',
      name: 'title',
      atomProps: {
        placeholder: messageErrorRequired('タイトル'),
        maxLength: 63,
      },
      colProps: {
        span: COLDEF,
      },
      rules: [
        {
          required: true,
          whitespace: true,
          message: messageErrorRequired('タイトル'),
        },
        {
          max: 63,
          message: messageErrorMaxCharacter(63),
        },
      ],
    },
    {
      type: ETypeFieldForm.TEXT_FIELD,
      label: '質問',
      name: 'question',
      atomProps: {
        placeholder: messageErrorRequired('質問'),
        maxLength: 89,
      },
      colProps: {
        span: COLDEF,
      },
      rules: [
        {
          required: true,
          whitespace: true,
          message: messageErrorRequired('質問'),
        },
        {
          max: 89,
          message: messageErrorMaxCharacter(89),
        },
      ],
    },
    {
      type: ETypeFieldForm.UPLOAD,
      typeScreen:'quiz',
      label: '設問画像',
      name: 'image_path',
      length: 1,
      ref: uploadImageQuestionRef,
      colProps: {
        span: COLDEF,
      },
      atomProps: {
        setUrlFile: (file) => formControl.setFieldValue('image_path', file),
        initialFileList: quiz?.image_url
          ? [
              {
                uid: quiz?.image_url,
                url: quiz?.image_url,
                name: quiz?.image_url,
              },
            ]
          : [],
      },
      rules: [
        {
          required: true,
          message: messageErrorRequired('設問画像', EMessageErrorRequired.SELECT),
        },
      ],
    },
    {
      type: ETypeFieldForm.RADIO,
      name: 'correct_answer',
      colProps: {
        span: 12,
      },
      atomProps: {
        className: 'correct_answer_group',
        options: [
          {
            label: (
              <MFormField.TextField
                type={ETypeFieldForm.TEXT_FIELD}
                label="選択肢1"
                name="answer_a"
                className="input_field_answer"
                atomProps={{
                  placeholder: messageErrorRequired('選択肢1'),
                  maxLength: 28,
                }}
                colProps={{
                  span: COLDEF,
                }}
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: messageErrorRequired('選択肢1'),
                  },
                  {
                    max: 28,
                    message: messageErrorMaxCharacter(28),
                  },
                ]}
              />
            ),
            value: 'answer_a',
          },
          {
            label: (
              <MFormField.TextField
                type={ETypeFieldForm.TEXT_FIELD}
                label="選択肢2"
                name="answer_b"
                className="input_field_answer"
                atomProps={{
                  placeholder: messageErrorRequired('選択肢2'),
                  maxLength: 28,
                }}
                colProps={{
                  span: COLDEF,
                }}
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: messageErrorRequired('選択肢2'),
                  },
                  {
                    max: 28,
                    message: messageErrorMaxCharacter(28),
                  },
                ]}
              />
            ),
            value: 'answer_b',
          },
          {
            label: (
              <MFormField.TextField
                type={ETypeFieldForm.TEXT_FIELD}
                label="選択肢3"
                name="answer_c"
                className="input_field_answer"
                atomProps={{
                  placeholder: messageErrorRequired('選択肢3'),
                  maxLength: 28,
                }}
                colProps={{
                  span: COLDEF,
                }}
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: messageErrorRequired('選択肢3'),
                  },
                  {
                    max: 28,
                    message: messageErrorMaxCharacter(28),
                  },
                ]}
              />
            ),
            value: 'answer_c',
          },
        ],
      },
      rules: [
        {
          required: true,
          message: messageErrorRequired('正解', EMessageErrorRequired.SELECT),
        },
      ],
    },
    {
      type: ETypeFieldForm.UPLOAD,
      label: '解説画像',
      name: 'explanation_image_path',
      length: 1,
      ref: uploadImageExplanationRef,
      colProps: {
        span: COLDEF,
      },
      atomProps: {
        setUrlFile: (file) => formControl.setFieldValue('explanation_image_path', file),
        initialFileList: quiz?.explanation_image_url
          ? [
              {
                uid: quiz?.explanation_image_url,
                url: quiz?.explanation_image_url,
                name: quiz?.explanation_image_url,
              },
            ]
          : [],
      },
      rules: [
        {
          required: true,
          message: messageErrorRequired('解説画像', EMessageErrorRequired.SELECT),
        },
      ],
    },

    {
      type: ETypeFieldForm.TEXT_AREA,
      label: '答え',
      name: 'explanation_content',
      atomProps: {
        placeholder: messageErrorRequired('答え'),
        maxLength: 305,
      },
      colProps: {
        span: COLDEF,
      },
      rules: [
        {
          required: true,
          whitespace: true,
          message: messageErrorRequired('答え'),
        },
        {
          max: 305,
          message: messageErrorMaxCharacter(305),
        },
      ],
    },

    {
      type: ETypeFieldForm.DATEPICKER,
      label: '公開開始日',
      name: 'start_date',
      colProps: {
        span: COL_HAFT,
      },
      atomProps: { disabledDate: disableDateBefore },
      rules: [
        {
          required: true,
          message: messageErrorRequired('公開開始日'),
        },
      ],
    },
    {
      type: ETypeFieldForm.DATEPICKER,
      label: '公開終了日',
      name: 'end_date',
      colProps: {
        span: COL_HAFT,
      },
      atomProps: {
        disabledDate: (current) =>
          disableBeforeDateWithParams(current, formControl.getFieldValue('start_date')),
      },
    },
    {
      type: ETypeFieldForm.SELECT,
      label: '非表示フラグ',
      name: 'is_active',
      initialValue: EActiveField.ACTIVE,
      atomProps: {
        placeholder: messageErrorRequired('非表示フラグ', EMessageErrorRequired.SELECT),
        options: isActiveFacilityOptions,
      },
      colProps: {
        span: COLDEF,
      },
      rules: [
        {
          required: true,
          message: messageErrorRequired('非表示フラグ', EMessageErrorRequired.SELECT),
        },
      ],
    },
  ];

  const handleValuesChange = (value: IQuiz) => {
    if (!!Object.keys(value).includes('start_date') && !!value.start_date) {
      formControl.setFieldValue('end_date', null);
    }
  };

  const handleSubmit = (values: IQuiz) => {
    const params = {
      ...values,
      start_date: convertDateToFormat(values.start_date),
      end_date: convertDateToFormat(values.end_date),
      image_url: formControl.getFieldValue('image_path'),
      explanation_image_url: formControl.getFieldValue('explanation_image_path'),
    };

    const isUploadImageQuestionSuccess =
      uploadImageQuestionRef.current?.status === EStatusFileUpload.SUCCESS;
    const isUploadImageExplanationSuccess =
      uploadImageExplanationRef.current?.status === EStatusFileUpload.SUCCESS;

    if (!isUploadImageQuestionSuccess || !isUploadImageExplanationSuccess) {
      message.warning('ロゴ画像をアップロードしていますので、少々お待ちください。');
      return;
    }

    if (isCreate) {
      dispatch(
        quizActions.create({
          params,
          onCreatedSuccess: () => {
            navigateToQuizList();
          },
        }),
      );
    }

    if (isEdit && quizId) {
      dispatch(
        quizActions.edit({
          params: { id: quizId, ...params },
          onUpdateSuccess: () => {
            navigateToQuizList();
          },
        }),
      );
    }
  };

  const handleDeleteQuiz = () => {
    Modal.confirm({
      title: 'クイズを削除しますか。よろしいでしょうか。',
      okText: 'はい',
      cancelText: 'いいえ',
      onOk() {
        dispatch(
          quizActions.delete({
            params: quizId,
            onDeleteSuccess: () => {
              navigateToQuizList();
            },
          }),
        );
      },
    });
  };

  const handleCancel = () => {
    const currentValues = formControl.getFieldsValue();

    const fieldSkipCheckChange = ['is_active', 'end_date'];

    const hasValueChanged = Object.keys(currentValues).some(
      (key) => !isNullable(currentValues[key]) && !fieldSkipCheckChange.includes(key),
    );

    if (hasValueChanged) {
      Modal.confirm({
        title: '変更は保存されません。 まだページを離れますか?',
        okText: 'はい',
        cancelText: 'いいえ',
        onOk() {
          navigateToQuizList();
        },
      });
    } else navigateToQuizList();
  };

  const navigateToQuizList = () => {
    //Navigate to quiz list page
    navigate(`${APP_ROUTE_URL.QUIZ.INDEX}`, { replace: true });
  };

  React.useEffect(() => {
    if (quizDetail) {
      setQuiz({
        ...quizDetail,
        start_date: quizDetail?.start_date && dayjs(quizDetail?.start_date),
        end_date: quizDetail?.end_date && dayjs(quizDetail?.end_date),
      });
    }
  }, [quizDetail]);

  return (
    <div>
      {loading ? (
        <div className="mt-30 dis-flex jc-center">
          <Spin size="large" />
        </div>
      ) : (
        <OForm
          form={formControl}
          listField={listFieldForm}
          onSubmitForm={handleSubmit}
          initialValues={isCreate ? {} : quiz}
          onCancel={handleCancel}
          onValuesChange={handleValuesChange}
          onDelete={handleDeleteQuiz}
        />
      )}
    </div>
  );
}

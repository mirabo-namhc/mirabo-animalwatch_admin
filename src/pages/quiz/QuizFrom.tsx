import { Form, Modal, Spin } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '~/_lib/redux/hooks';
import { useGetDetail } from '~/hooks';
import useURLInfo from '~/hooks/useURLInfo';
import { EActiveField, ETypeFieldForm } from '~/types/enum.type';
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
import { isNullable } from '~utils/funcHelper';

export default function QuizForm() {
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
        placeholder: 'タイトル',
      },
      colProps: {
        span: COLDEF,
      },
      rules: [
        {
          required: true,
          message: 'Required',
        },
      ],
    },
    {
      type: ETypeFieldForm.TEXT_FIELD,
      label: '質問',
      name: 'question',
      atomProps: {
        placeholder: '質問',
      },
      colProps: {
        span: COLDEF,
      },
      rules: [
        {
          required: true,
          message: 'Required',
        },
      ],
    },
    {
      type: ETypeFieldForm.UPLOAD,
      label: '設問画像',
      name: 'image_url',
      length: 1,
      colProps: {
        span: COLDEF,
      },
      rules: [
        {
          required: true,
          message: 'Required',
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
                  placeholder: '選択肢1',
                }}
                colProps={{
                  span: COLDEF,
                }}
                rules={[
                  {
                    required: true,
                    message: 'Required',
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
                  placeholder: '選択肢2',
                }}
                colProps={{
                  span: COLDEF,
                }}
                rules={[
                  {
                    required: true,
                    message: 'Required',
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
                  placeholder: '選択肢3',
                }}
                colProps={{
                  span: COLDEF,
                }}
                rules={[
                  {
                    required: true,
                    message: 'Required',
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
          message: 'Required',
        },
      ],
    },
    {
      type: ETypeFieldForm.UPLOAD,
      label: '解説画像',
      name: 'explanation_image_url',
      length: 1,
      colProps: {
        span: COLDEF,
      },
      rules: [
        {
          required: true,
          message: 'Required',
        },
      ],
    },

    {
      type: ETypeFieldForm.TEXT_AREA,
      label: '答え',
      name: 'explanation_content',
      atomProps: {
        placeholder: '答え',
      },
      colProps: {
        span: COLDEF,
      },
      rules: [
        {
          required: true,
          message: 'Required',
        },
      ],
    },

    {
      type: ETypeFieldForm.DATEPICKER,
      label: '公開日',
      name: 'start_date',
      colProps: {
        span: COL_HAFT,
      },
      atomProps: {
        disabledDate: disableDateBefore,
      },
      rules: [
        {
          required: true,
          message: 'Required',
        },
      ],
    },
    {
      type: ETypeFieldForm.DATEPICKER,
      label: '終了日',
      name: 'end_date',
      colProps: {
        span: COL_HAFT,
      },
      atomProps: {
        disabledDate: (current) =>
          disableBeforeDateWithParams(current, formControl.getFieldValue('start_date')),
      },
      rules: [
        {
          required: true,
          message: 'Required',
        },
      ],
    },
    {
      type: ETypeFieldForm.SELECT,
      label: '非表示フラグ',
      name: 'is_active',
      initialValue: EActiveField.ACTIVE,
      atomProps: {
        placeholder: '非表示フラグ',
        options: isActiveFacilityOptions,
      },
      colProps: {
        span: COLDEF,
      },
      rules: [
        {
          required: true,
          message: 'Required',
        },
      ],
    },
  ];

  const handleSubmit = (values: IQuiz) => {
    const params = {
      ...values,
      // TODO: remove this when we have functional upload files
      explanation_image_url: 'https://example.com/assets/images/a.png',
      image_url: 'https://example.com/assets/images/test.png',
      start_date: convertDateToFormat(values.start_date),
      end_date: convertDateToFormat(values.end_date),
    };

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

    const hasValueChanged = Object.keys(currentValues).some(
      (key) => !isNullable(currentValues[key]) && key !== 'is_active',
    );

    if (hasValueChanged) {
      Modal.confirm({
        title: 'このカテ��リをキャンセルしてもよ��しいですか?',
        okText: 'はい',
      });

      return;
    }

    navigateToQuizList();
  };

  const navigateToQuizList = () => {
    //Navigate to quiz list page
    navigate(`${APP_ROUTE_URL.QUIZ.INDEX}`, { replace: true });
  };

  React.useEffect(() => {
    if (quizDetail) {
      setQuiz({
        ...quizDetail,
        start_date: dayjs(new Date()),
        end_date: dayjs(new Date()),
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
          initialValues={isCreate && quiz ? {} : quiz}
          onCancel={handleCancel}
          onDelete={handleDeleteQuiz}
        />
      )}
    </div>
  );
}

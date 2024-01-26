import { CaseReducerActions, SliceCaseReducers } from '@reduxjs/toolkit';
import { Form, Modal, Spin } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '~/_lib/redux/hooks';
import { useGetDetail } from '~/hooks';
import useSelectOptions, { NameStateOption } from '~/hooks/useSelectOptions';
import useURLInfo from '~/hooks/useURLInfo';
import { EActiveField, EMessageErrorRequired, ETypeFieldForm } from '~/types/enum.type';
import { TMappedFormItems } from '~/types/form.type';
import { APP_ROUTE_URL } from '~constants/endpoint';
import { BANNER_REFERENCE_TYPE, COLDEF, COL_HAFT, isActiveFacilityOptions } from '~constants/form';
import OForm from '~organisms/o-form';
import { bannerActions } from '~store/banner/bannerSlice';
import { eventActions } from '~store/event/eventSlice';
import { facilityActions } from '~store/facility/facilitySlice';
import { quizActions } from '~store/quiz/quiz.slice';
import { EBannerTypeEnum, IBanner } from '~types';
import {
  convertDateToFormat,
  disableBeforeDateWithParams,
  disableDateBefore,
} from '~utils/datetime';
import { isNullable, messageErrorRequired } from '~utils/funcHelper';

type BannerStateOptions = Exclude<NameStateOption, 'coupon'>;

const stateOptions: {
  [K in BannerStateOptions]: {
    nameState: K;
    action: CaseReducerActions<SliceCaseReducers<K>, K>;
  };
} = {
  event: {
    nameState: 'event',
    action: eventActions,
  },
  facility: {
    nameState: 'facility',
    action: facilityActions,
  },
  quiz: {
    nameState: 'quiz',
    action: quizActions,
  },
};

type StateOptionsType = (typeof stateOptions)[Exclude<NameStateOption, 'coupon'>];

export default function BannerForm() {
  const [initFormValues, setInitFormValues] = React.useState<IBanner | null>(null);
  const [stateOption, setStateOption] = React.useState<StateOptionsType>();
  const [currentSelectType, setCurrentSelectType] = React.useState<EBannerTypeEnum>(
    EBannerTypeEnum.FACILITY,
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formControl] = Form.useForm();

  const { id: bannerId, isEdit, isCreate } = useURLInfo();

  const { detailData, loading } = useGetDetail<IBanner | null>({
    action: bannerActions,
    nameState: 'banner',
    isGetApi: isEdit,
  });

  const {
    options: optionsReferences,
    loading: isLoadingSelect,
    onSelectScrollToLoadMore,
    handleSearch,
    setOption,
    onReset: onSelectReset,
  } = useSelectOptions({
    ...stateOption,
  });

  const listFieldForm = [
    {
      type: ETypeFieldForm.INPUT_NUMBER,
      label: '表示順',
      name: 'order',
      atomProps: {
        placeholder: messageErrorRequired('表示順'),
        formControl,
      },
      colProps: {
        span: COLDEF,
      },
      rules: [
        {
          required: true,
          message: messageErrorRequired('表示順'),
        },
      ],
    },
    {
      type: ETypeFieldForm.SELECT,
      label: 'タイプ',
      name: 'type',
      initialValue: EBannerTypeEnum.FACILITY,
      atomProps: {
        onChange: (option: EBannerTypeEnum) => {
          if (
            (option === EBannerTypeEnum.COUPON && currentSelectType === EBannerTypeEnum.FACILITY) ||
            (option === EBannerTypeEnum.FACILITY && currentSelectType === EBannerTypeEnum.COUPON)
          ) {
            setStateOption(stateOptions['facility']);
          } else {
            onSelectReset();
            setStateOption(stateOptions[option as BannerStateOptions]);
          }

          setCurrentSelectType(option);
          formControl.setFieldValue('reference_id', undefined);
        },
        placeholder: messageErrorRequired('タイプ', EMessageErrorRequired.SELECT),
        options: BANNER_REFERENCE_TYPE,
      },
      colProps: {
        span: COLDEF,
      },
      rules: [
        {
          required: true,
          message: messageErrorRequired('タイプ', EMessageErrorRequired.SELECT),
        },
      ],
    },
    {
      type: ETypeFieldForm.SELECT,
      label: 'リンク',
      name: 'reference_id',
      atomProps: {
        placeholder: messageErrorRequired('リンク'),
        options: optionsReferences,
        showSearch: true,
        filterOption: false,
        loading: isLoadingSelect,
        onPopupScroll: onSelectScrollToLoadMore,
        onSearch: handleSearch,
      },
      colProps: {
        span: COLDEF,
      },
      rules: [
        {
          required: true,
          message: messageErrorRequired('リンク', EMessageErrorRequired.SELECT),
        },
      ],
    },
    {
      type: ETypeFieldForm.UPLOAD,
      label: 'クーポン写真',
      name: 'image_url',
      colProps: {
        span: COLDEF,
      },
      atomProps: {
        setUrlFile: (file) => formControl.setFieldValue('image_path', file),
        initialFileList: initFormValues?.image_url
          ? [
              {
                uid: initFormValues?.image_url,
                url: initFormValues?.image_url,
                name: initFormValues?.image_url,
              },
            ]
          : [],
      },
      rules: [
        {
          required: true,
          message: messageErrorRequired('クーポン写真', EMessageErrorRequired.SELECT),
        },
      ],
      length: 1,
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
          message: messageErrorRequired('公開日'),
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
  ] as TMappedFormItems[];

  const handleSubmit = (values: IBanner) => {
    const params = {
      ...values,
      start_date: convertDateToFormat(values.start_date),
      end_date: convertDateToFormat(values.end_date),
      image_url: formControl.getFieldValue('image_path'),
    };

    if (isCreate) {
      dispatch(
        bannerActions.create({
          params,
          onCreatedSuccess: () => {
            navigateToBannerList();
          },
        }),
      );
    } else if (isEdit) {
      dispatch(
        bannerActions.edit({
          params: { id: bannerId, ...params },
          onUpdateSuccess: () =>
            navigate(`../${APP_ROUTE_URL.SETTING.INDEX}/${APP_ROUTE_URL.SETTING.BANNER.INDEX}`, {
              replace: true,
            }),
        }),
      );
    }
  };

  const navigateToBannerList = () => {
    navigate(`../${APP_ROUTE_URL.SETTING.INDEX}/${APP_ROUTE_URL.SETTING.BANNER.INDEX}`, {
      replace: true,
    });
  };

  const handleCancel = () => {
    const currentValues = formControl.getFieldsValue();

    const fieldSkipCheckChange = ['is_active', 'end_date', 'type'];

    const hasValueChanged = Object.keys(currentValues).some(
      (key) => !isNullable(currentValues[key]) && !fieldSkipCheckChange.includes(key),
    );

    if (hasValueChanged) {
      Modal.confirm({
        title: (
          <span>
            変更は保存されません。
            <br /> まだページを離れますか?
          </span>
        ),
        okText: 'はい',
        cancelText: 'いいえ',
        onOk() {
          navigateToBannerList();
        },
      });
    } else navigateToBannerList();
  };

  const handleValuesChange = (value: IBanner) => {
    if (!Object.keys(value).includes('start_date') || !value.start_date) return;
    formControl.setFieldValue('end_date', null);
  };

  const handleDeleteBanner = () => {
    Modal.confirm({
      title: (
        <span>
          バナーを削除しますか。
          <br />
          よろしいでしょうか。
        </span>
      ),
      okText: 'はい',
      cancelText: 'いいえ',
      onOk() {
        dispatch(
          bannerActions.remove({
            id: Number(bannerId),
            onDeleteSuccess: () => {
              navigateToBannerList();
            },
          }),
        );
      },
    });
  };

  React.useEffect(() => {
    if (detailData) {
      setOption([
        {
          label: detailData.reference_name,
          value: detailData!.reference_id,
        },
      ]);

      setStateOption(
        stateOptions[
          (detailData.type === 'coupon' ? 'facility' : detailData.type) as BannerStateOptions
        ],
      );
      setInitFormValues({
        ...detailData,
        start_date: detailData?.start_date && dayjs(detailData?.start_date),
        end_date: detailData?.end_date && dayjs(detailData?.end_date),
      });
    }
  }, [detailData]);

  React.useEffect(() => {
    if (isCreate) setStateOption(stateOptions['facility']);
  }, []);

  React.useEffect(() => {
    if (stateOption?.action) dispatch(stateOption?.action.clearData([]));
  }, [stateOption]);

  return (
    <div>
      {loading && !initFormValues ? (
        <div className="mt-30 dis-flex jc-center">
          <Spin size="large" />
        </div>
      ) : (
        <OForm
          form={formControl}
          listField={listFieldForm}
          onSubmitForm={handleSubmit}
          initialValues={isCreate ? {} : (initFormValues as IBanner)}
          onCancel={handleCancel}
          onValuesChange={handleValuesChange}
          onDelete={handleDeleteBanner}
        />
      )}
    </div>
  );
}

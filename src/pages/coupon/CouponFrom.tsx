import { Form, Modal, Spin, message } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '~/_lib/redux/hooks';
import { useGetDetail } from '~/hooks';
import useSelectOptions from '~/hooks/useSelectOptions';
import useURLInfo from '~/hooks/useURLInfo';
import { EActiveField, EMessageErrorRequired, ETypeFieldForm } from '~/types/enum.type';
import { TMappedFormItems } from '~/types/form.type';
import { APP_ROUTE_URL } from '~constants/endpoint';
import { COLDEF, COL_HAFT, isActiveFacilityOptions } from '~constants/form';
import { EStatusFileUpload, IRefFormUpload } from '~molecules/m-form-field/m-form-upload';
import OForm from '~organisms/o-form';
import { couponActions } from '~store/coupon/couponSlice';
import { facilityActions } from '~store/facility/facilitySlice';
import { ICoupon, ICouponContent, ICouponMutate } from '~types';
import {
  convertDateToFormat,
  disableBeforeDateWithParams,
  disableDateBefore,
} from '~utils/datetime';
import { isNullable, messageErrorMaxCharacter, messageErrorRequired } from '~utils/funcHelper';

export default function CouponForm() {
  const uploadImageRef = React.useRef<IRefFormUpload>(null);

  const [formCouponData, setFormCouponData] = React.useState<ICouponMutate | undefined>(undefined);

  const { id: couponId, isEdit, isCreate } = useURLInfo();

  const [formControl] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { detailData: couponDetail, loading } = useGetDetail<ICoupon | undefined>({
    action: couponActions,
    nameState: 'coupon',
    isGetApi: isEdit,
  });

  const {
    options: optionsFacility,
    loading: isLoadingSelect,
    onSelectScrollToLoadMore,
    handleSearch,
  } = useSelectOptions({
    action: facilityActions,
    nameState: 'facility',
  });

  const listFieldForm = [
    {
      type: ETypeFieldForm.TEXT_FIELD,
      label: 'タイトル',
      name: 'title',
      atomProps: {
        placeholder: messageErrorRequired('タイトル'),
        maxLength: 255,
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
          max: 255,
          message: messageErrorMaxCharacter(255),
        },
      ],
    },
    {
      type: ETypeFieldForm.SELECT,
      label: '施設名',
      name: 'facility_id',
      atomProps: {
        placeholder: messageErrorRequired('施設名', EMessageErrorRequired.SELECT),
        options: optionsFacility,
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
          message: messageErrorRequired('施設名', EMessageErrorRequired.SELECT),
        },
      ],
    },
    {
      type: ETypeFieldForm.UPLOAD,
      label: 'クーポン写真',
      name: 'image_path',
      ref: uploadImageRef,
      colProps: {
        span: COLDEF,
      },
      atomProps: {
        setUrlFile: (file) => formControl.setFieldValue('image_path', file),
        initialFileList: formCouponData?.image_url
          ? [
              {
                uid: formCouponData?.image_url,
                url: formCouponData?.image_url,
                name: formCouponData?.image_url,
              },
            ]
          : [],
      },
      rules: [
        {
          required: true,
          message: messageErrorRequired('クーポン写真'),
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

  const handleValuesChange = (value: ICouponContent) => {
    if (!!Object.keys(value).includes('start_date') && !!value.start_date) {
      formControl.setFieldValue('end_date', null);
    }
  };

  const handleSubmit = (values: ICouponMutate) => {
    const params = {
      ...values,
      image_url: formControl.getFieldValue('image_path'),
      start_date: convertDateToFormat(values.start_date),
      end_date: convertDateToFormat(values.end_date),
    };

    if (uploadImageRef.current?.status !== EStatusFileUpload.SUCCESS) {
      message.warning('ロゴ画像をアップロードしていますので、少々お待ちください。');
      return;
    }

    if (isCreate) {
      dispatch(
        couponActions.create({
          params,
          onCreatedSuccess: () => {
            navigateToCouponList();
          },
        }),
      );
    }

    if (isEdit && couponId) {
      dispatch(
        couponActions.edit({
          params: { id: couponId, ...params },
          onUpdateSuccess: () => {
            // Go back to detail coupon page
            navigate(APP_ROUTE_URL.COUPON.INDEX);
          },
        }),
      );
    }
  };

  const handleCancel = () => {
    const currentValues = formControl.getFieldsValue();

    const fieldSkipCheckChange = ['is_active', 'end_date'];

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
          navigateToCouponList();
        },
      });
    } else navigateToCouponList();
  };

  const handleDeleteCoupon = () => {
    Modal.confirm({
      title: (
        <span>
          このクーポンーを削除しますか。
          <br />
          よろしいでしょうか。
        </span>
      ),
      okText: 'はい',
      cancelText: 'いいえ',
      onOk() {
        dispatch(
          couponActions.delete({
            params: couponId,
            onDeleteSuccess: () => {
              navigateToCouponList();
            },
          }),
        );
      },
    });
  };

  const navigateToCouponList = () => {
    //Navigate to coupon list page
    navigate(`../${APP_ROUTE_URL.COUPON.INDEX}`, { replace: true });
  };

  React.useEffect(() => {
    if (couponDetail) {
      formControl.setFieldValue('facility_id', [
        {
          label: couponDetail.content?.facility?.name,
          value: couponDetail.content?.facility_id || 0,
        },
      ]);

      setFormCouponData({
        title: couponDetail.title,
        image_path: couponDetail.image_path,
        image_url: couponDetail.image_url,
        facility_id: couponDetail.content?.facility_id,
        is_active: couponDetail.content?.is_active,
        start_date: couponDetail.content?.start_date && dayjs(couponDetail.content?.start_date),
        end_date: couponDetail.content?.end_date && dayjs(couponDetail.content?.end_date),
      });
    }
  }, [couponDetail]);

  React.useEffect(() => {
    return () => {
      dispatch(facilityActions.clearData());
    };
  }, []);

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
          initialValues={isCreate ? {} : formCouponData}
          onCancel={handleCancel}
          onValuesChange={handleValuesChange}
          onDelete={handleDeleteCoupon}
        />
      )}
    </div>
  );
}

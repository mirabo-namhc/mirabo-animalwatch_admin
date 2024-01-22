import { Form, Modal, Spin } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '~/_lib/redux/hooks';
import { useGetDetail, useGetList } from '~/hooks';
import useDebounce from '~/hooks/useDebounce';
import useURLInfo from '~/hooks/useURLInfo';
import { EActiveField, EMessageErrorRequired, ETypeFieldForm } from '~/types/enum.type';
import { TMappedFormItems } from '~/types/form.type';
import { APP_ROUTE_URL } from '~constants/endpoint';
import { COLDEF, COL_HAFT, isActiveFacilityOptions } from '~constants/form';
import OForm from '~organisms/o-form';
import { couponActions } from '~store/coupon/couponSlice';
import { facilityActions } from '~store/facility/facilitySlice';
import { ICoupon, ICouponContent, ICouponMutate, IFacility, TFilterParams } from '~types';
import {
  convertDateToFormat,
  disableBeforeDateWithParams,
  disableDateBefore,
} from '~utils/datetime';
import { isNullable, messageErrorMaxCharacter, messageErrorRequired } from '~utils/funcHelper';

const searchFacilityOptions: TFilterParams<IFacility> = { current_page: 1, per_page: 10 };

export default function CouponForm() {
  const [formCouponData, setFormCouponData] = React.useState<ICouponMutate | undefined>(undefined);
  const [optionsFacility, setOptionFacility] = React.useState<
    Array<{ label: string | undefined; value: number | undefined }>
  >([]);
  const [searchFacility, setSearchFacility] = React.useState<string>('');
  const [isSearchingFacility, setIsSearchingFacility] = React.useState<boolean>(false);
  const [paramsQuery, setParamsQuery] =
    React.useState<TFilterParams<IFacility>>(searchFacilityOptions);

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
    listData: listFacility,
    pagination,
    loading: loadingOptionFacility,
  } = useGetList<IFacility[]>({
    params: paramsQuery,
    action: facilityActions,
    nameState: 'facility',
  });

  // DeBounce Function When Searching Facilities
  useDebounce(
    () => {
      if (isSearchingFacility) {
        setParamsQuery({
          ...searchFacilityOptions,
          keyword: searchFacility,
        });
      }
    },
    [searchFacility],
    500,
  );

  // Scroll to loadmore Facility
  const onSelectFacilityScroll = (event: any) => {
    const target = event.target;
    if (
      !loadingOptionFacility &&
      target.scrollTop + target.offsetHeight === target.scrollHeight &&
      pagination?.current_page &&
      pagination?.total_page &&
      pagination.current_page < pagination.total_page
    ) {
      setParamsQuery({
        ...searchFacilityOptions,
        current_page: pagination.current_page + 1,
      });
    }
  };

  const handleSearchFacility = (value: string) => {
    setSearchFacility(value);
    setIsSearchingFacility(true);
    setOptionFacility(formCouponData && isEdit ? [optionsFacility[0]] : []);
  };

  const listFieldForm = [
    {
      type: ETypeFieldForm.SELECT,
      label: '施設名',
      name: 'facility_id',
      atomProps: {
        placeholder: messageErrorRequired('施設名', EMessageErrorRequired.SELECT),
        options: optionsFacility,
        showSearch: true,
        filterOption: false,
        loading: loadingOptionFacility,
        onPopupScroll: onSelectFacilityScroll,
        onSearch: handleSearchFacility,
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
      name: 'image_url',
      colProps: {
        span: COLDEF,
      },
      atomProps: {},
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
        placeholder: '',
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
      label: '終了日',
      name: 'end_date',
      colProps: {
        span: COL_HAFT,
      },
      atomProps: {
        placeholder: '',
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
      // TODO: remove this when we have functional upload files
      image_url: 'https://example.com/assets/images/test.png',
      start_date: convertDateToFormat(values.start_date),
      end_date: convertDateToFormat(values.end_date),
    };

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
      setOptionFacility([
        {
          label: couponDetail.content?.facility?.name,
          value: couponDetail.content?.facility_id,
        },
      ]);
      setFormCouponData({
        //TODO: with real links assets
        image_url: 'https://example.com/assets/images/test.png',
        facility_id: couponDetail.content?.facility_id,
        is_active: couponDetail.content?.is_active,
        start_date: couponDetail.content?.start_date && dayjs(couponDetail.content?.start_date),
        end_date: couponDetail.content?.end_date && dayjs(couponDetail.content?.end_date),
      });
    }
  }, [couponDetail]);

  React.useEffect(() => {
    if (!loadingOptionFacility && listFacility.length) {
      const options = listFacility.map((facility) => ({
        label: facility.name,
        value: facility.id,
      }));

      const filteredOptions = formCouponData
        ? options.filter((facility) => facility.value !== optionsFacility[0]?.value)
        : options;

      if ((isEdit && formCouponData) || isCreate)
        setOptionFacility([...optionsFacility, ...filteredOptions]);
    }
  }, [listFacility, formCouponData, loadingOptionFacility]);

  React.useEffect(() => {
    return () => {
      dispatch(facilityActions.reset());
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

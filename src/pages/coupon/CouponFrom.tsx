import { Form, Modal, Spin, message } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '~/_lib/redux/hooks';
import { useGetDetail } from '~/hooks';
import useURLInfo from '~/hooks/useURLInfo';
import { ETypeFieldForm } from '~/types/enum.type';
import { TMappedFormItems } from '~/types/form.type';
import { APP_ROUTE_URL } from '~constants/endpoint';
import { COLDEF, COL_HAFT, groupsFacilityOptions, isActiveFacilityOptions } from '~constants/form';
import OForm from '~organisms/o-form';
import { couponActions } from '~store/coupon/couponSlice';
import { ICoupon, IFacility } from '~types';

export default function CouponForm() {
  const [coupon, setCoupon] = React.useState<ICoupon>({});

  const dispatch = useAppDispatch();
  const [formControl] = Form.useForm();
  const { id: couponId, isDetail, isEdit, isCreate } = useURLInfo();

  //Navigator
  const navigate = useNavigate();

  const { detailData: couponDetail, loading } = useGetDetail<ICoupon | undefined>({
    action: couponActions,
    nameState: 'coupon',
    isGetApi: isDetail || isEdit,
  });

  const listFieldForm: TMappedFormItems[] = [
    {
      type: ETypeFieldForm.SELECT,
      label: '施設名',
      name: 'facility_name',
      atomProps: {
        placeholder: '施設名',
        options: groupsFacilityOptions,
        disabled: isDetail,
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
      label: 'クーポン写真',
      name: 'image_thumnail_url',
      colProps: {
        span: COLDEF,
      },
      atomProps: {
        disabled: isDetail,
      },
      rules: [
        {
          required: true,
          message: 'Required',
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
        disabled: isDetail,
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
        disabled: isDetail,
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
      name: 'flag',
      atomProps: {
        placeholder: '非表示フラグ',
        options: isActiveFacilityOptions,
        disabled: isDetail,
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

  const handleSubmit = (values: IFacility) => {
    const params = { ...values };
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
          params: { couponId, ...params },
          onUpdateSuccess: () => {
            // Go back to detail coupon page
            navigate(`../${APP_ROUTE_URL.COUPON.DETAIL}/${couponId}`, { replace: true });
          },
        }),
      );
    }
  };

  const handleCancel = () => {
    if (isCreate || isDetail) navigate(APP_ROUTE_URL.COUPON.INDEX);
    else navigate(`../${APP_ROUTE_URL.COUPON.DETAIL}/${couponId}`, { replace: true });
  };

  const handleEditCoupon = () => {
    if (isDetail) navigate(`../${APP_ROUTE_URL.COUPON.EDIT}/${couponId}`, { replace: true });
  };

  const handleDeleteCoupon = () => {
    Modal.confirm({
      title: 'このカテゴリを削除してもよろしいですか?',
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
    // if (couponDetail) {
    setCoupon({
      ...couponDetail,
      facility_name: 2,
      flag: 1,
      start_date: dayjs('2023/11/01'),
      end_date: dayjs('2023/11/01'),
    });
    // }
  }, [couponDetail]);

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
          initialValues={isCreate ? {} : coupon}
          onCancel={handleCancel}
          onDelete={handleDeleteCoupon}
          onNavigateEdit={handleEditCoupon}
        />
      )}
    </div>
  );
}

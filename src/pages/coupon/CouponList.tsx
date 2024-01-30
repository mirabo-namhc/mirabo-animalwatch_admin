import { PlusCircleOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '~/_lib/redux/hooks';
import { useGetList } from '~/hooks';
import { ICoupon } from '~/types/coupon.type';
import { EActiveField } from '~/types/enum.type';
import AButton from '~atoms/a-button';
import { APP_ROUTE_URL } from '~constants/endpoint';
import MInputSearch from '~molecules/m-input-search';
import OTable from '~organisms/o-table';
import { couponActions } from '~store/coupon/couponSlice';
import { facilityActions } from '~store/facility/facilitySlice';
import { TFilterParams } from '~types';
import { getNoTable, getTotal } from '~utils/tableHelper';

interface ICouponTables extends ICoupon {
  key: string | number;
}

export default function CouponList() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [paramsQuery, setParamsQuery] = useState<TFilterParams<ICoupon>>({
    current_page: 1,
    per_page: 10,
  });

  const [dataCouponList, setDataCouponList] = React.useState<Array<ICouponTables>>([]);

  const {
    listData: listCoupon,
    pagination,
    loading,
  } = useGetList<ICoupon[]>({
    params: paramsQuery,
    action: couponActions,
    nameState: 'coupon',
  });

  const columns: ColumnsType<ICouponTables> = [
    {
      title: '',
      dataIndex: 'index',
      render: (_: unknown, record: ICouponTables, index: number) => (
        <span>{getNoTable(index, pagination?.current_page, pagination?.per_page)}</span>
      ),
    },
    {
      title: '施設名',
      render: (_: unknown, record: ICouponTables, index: number) => (
        <span>{record.content?.facility?.name}</span>
      ),
    },
    {
      title: '表示状態',
      dataIndex: 'is_active',
      render: (_: unknown, record: ICouponTables, index: number) => (
        <span>{record.content?.is_active === EActiveField.ACTIVE ? '表示' : '非表示'}</span>
      ),
    },
    {
      dataIndex: 'action',
      render: (_: unknown, record: ICouponTables) => (
        <div className="dis-flex ai-flex-center jc-center">
          <AButton
            size="small"
            className="h-32 w-97 gray-80"
            onClick={() => record?.id && onNavigateDetail(record.id)}
            type="primary"
            data-testid="btn-preview"
          >
            詳細
          </AButton>
        </div>
      ),
    },
  ];

  const onNavigateDetail = (id: number) => {
    dispatch(facilityActions.reset());
    navigate(`${APP_ROUTE_URL.COUPON.EDIT}?id=${id}`);
  };
  const onNavigateCreateCoupon = () => {
    dispatch(facilityActions.reset());
    navigate(APP_ROUTE_URL.COUPON.CREATE);
  };

  React.useEffect(() => {
    if (Array.isArray(listCoupon)) {
      setDataCouponList(() => {
        return listCoupon.map((item) => {
          return {
            ...item,
            key: item.id,
          } as ICouponTables;
        });
      });
    }
  }, [listCoupon]);

  return (
    <div className="gray fs-20">
      <div className="dis-flex mb-10 ai-center jc-space-between mb-30">
        <div className="dis-flex ai-center">
          <h4 className="mr-10">施設:</h4>{' '}
          <MInputSearch setParamsQuery={setParamsQuery} paramsQuery={paramsQuery} />
        </div>
        <AButton
          size="middle"
          onClick={onNavigateCreateCoupon}
          type="primary"
          leftIcon={<PlusCircleOutlined />}
        >
          新規登録
        </AButton>
      </div>
      <OTable
        columns={columns}
        dataSource={dataCouponList}
        pageSize={pagination?.per_page}
        total={getTotal(pagination?.total_page, pagination?.per_page)}
        setParamsQuery={setParamsQuery}
        paramsQuery={paramsQuery}
        loading={loading}
      />
    </div>
  );
}

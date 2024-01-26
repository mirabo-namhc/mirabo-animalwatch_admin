import { PlusCircleOutlined } from '@ant-design/icons';
import { Card, Tooltip, Typography } from 'antd';
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '~/_lib/redux/hooks';
import { useGetList } from '~/hooks';
import { ICoupon } from '~/types/coupon.type';
import { EActiveField } from '~/types/enum.type';
import AButton from '~atoms/a-button';
import { APP_ROUTE_URL } from '~constants/endpoint';
import MCard from '~molecules/m-card';
import MInputSearch from '~molecules/m-input-search';
import MPagination from '~molecules/m-pagination';
import { couponActions } from '~store/coupon/couponSlice';
import { facilityActions } from '~store/facility/facilitySlice';
import { TFilterParams } from '~types';
import { getTotal } from '~utils/tableHelper';

interface ICouponTables extends ICoupon {
  key: string | number;
}

const gridStyle: React.CSSProperties = {
  width: '20%',
  textAlign: 'center',
  borderTopLeftRadius: '8px',
  borderTopRightRadius: '8px',
  backgroundColor: 'unset',
  border: 'unset',
  boxShadow: 'unset',
};

const { Text } = Typography;

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

  const onNavigateDetail = (id: number) => {
    dispatch(facilityActions.reset());
    navigate(`${APP_ROUTE_URL.COUPON.EDIT}?id=${id}`);
  };
  const onNavigateCreateCoupon = () => {
    dispatch(facilityActions.reset());
    navigate(APP_ROUTE_URL.COUPON.CREATE);
  };

  const showListCoupon = useMemo(
    () => (
      <Card style={{ background: 'unset', border: 'unset' }}>
        {dataCouponList.map((coupon, index) => (
          <Card.Grid hoverable={false} style={gridStyle} key={index}>
            <MCard
              className="m-card-coupon"
              thumbnailUrl={coupon.image_url}
              onActionEdit={() => coupon?.id && onNavigateDetail(coupon.id)}
              title={
                <div>
                  施設名:{' '}
                  <Tooltip title={coupon.content?.facility?.name}>
                    <Text className="max-w-percent-70" ellipsis>
                      {coupon.content?.facility?.name}
                    </Text>
                  </Tooltip>
                </div>
              }
              description={
                <div>
                  表示状態:{' '}
                  <span>
                    {coupon.content?.is_active === EActiveField.ACTIVE ? '表示' : '非表示'}
                  </span>
                </div>
              }
            />
          </Card.Grid>
        ))}
      </Card>
    ),
    [dataCouponList],
  );

  const handlePagination = (page: number) => {
    if (page) {
      setParamsQuery?.((pre) => ({
        ...pre,
        current_page: page ?? 0,
      }));
    }
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
      <div>
        {loading ? (
          <Card style={{ width: 300, marginTop: 16 }} loading={loading}></Card>
        ) : (
          <>
            {Array.isArray(dataCouponList) && showListCoupon}{' '}
            {dataCouponList?.length > 0 && (
              <MPagination
                total={getTotal(pagination?.total_page, pagination?.per_page)}
                pageSize={pagination?.per_page}
                onChange={handlePagination}
                current={paramsQuery?.current_page || 1}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

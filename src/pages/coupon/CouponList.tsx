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
import { convertOnlyDate } from '~utils/datetime';
import { getTextEActive } from '~utils/funcHelper';
import { getTotal } from '~utils/tableHelper';

interface ICouponTables extends ICoupon {
  key: string | number;
}

const gridStyle: React.CSSProperties = {
  width: '330px',
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
    navigate(`${APP_ROUTE_URL.COUPON.EDIT}?id=${id}`);
  };
  const onNavigateCreateCoupon = () => {
    navigate(APP_ROUTE_URL.COUPON.CREATE);
  };

  const showListCoupon = useMemo(
    () => (
      <Card style={{ background: 'unset', border: 'unset', flexWrap: 'wrap' }}>
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
                <div
                  style={{
                    textAlign: 'left',
                  }}
                >
                  <p> 非表示フラグ: {getTextEActive(coupon.content?.is_active)}</p>
                  <p> 公開日: {convertOnlyDate(coupon.content?.start_date as string)}</p>
                  <p> 公開終了日: {convertOnlyDate(coupon.content?.end_date as string)}</p>
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

  React.useEffect(() => {
    return () => {
      dispatch(facilityActions.clearData());
    };
  }, []);

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

import { PlusCircleOutlined } from '@ant-design/icons';
import { Card, Row, Col} from 'antd';
import MPagination from '~molecules/m-pagination';
import {  EditOutlined} from '@ant-design/icons'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '~/_lib/redux/hooks';
import { useGetList } from '~/hooks';
import { ICoupon } from '~/types/coupon.type';
import { EActiveField } from '~/types/enum.type';
import AButton from '~atoms/a-button';
import { APP_ROUTE_URL } from '~constants/endpoint';
import MInputSearch from '~molecules/m-input-search';
import { couponActions } from '~store/coupon/couponSlice';
import { facilityActions } from '~store/facility/facilitySlice';
import { TFilterParams } from '~types';
import { getNoTable, getTotal } from '~utils/tableHelper';
import './CouponCard.scss';

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
  } = useGetList<ICoupon[]>({
    params: paramsQuery,
    action: couponActions,
    nameState: 'coupon',
  });
  const { Meta } = Card;

  const handlePageChange = (page: number) => {
    setParamsQuery({
      ...paramsQuery,
      current_page: page,
    });
  };

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
      
      <Row  gutter={[36,36]} >
        {dataCouponList.map((record) => (
          <Col key={record.key} >
          <Card  style={{ width: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
            hoverable
            cover={
              <div className="card-cover">
              <img src={record.image_url} alt="Coupon Image" />
            </div>
            }
            actions={[
              <EditOutlined key="edit" onClick={() => record?.id && onNavigateDetail(record.id)}/>,
              ]}
            >
            <Meta
            key={record.key}
            title={record.content?.facility?.name}
            description={record.content?.is_active === EActiveField.ACTIVE ? '表示' : '非表示'}
          />
          </Card>
          </Col>
        ))}
      </Row>
      <div>
      <div className="pagination-container">
        <MPagination
        
          current={pagination?.current_page}
          total={getTotal(pagination?.total_page, pagination?.per_page)}
          pageSize={pagination?.per_page}
          onChange={handlePageChange}
        />
      </div>
      </div>
    </div>
    
  );
}

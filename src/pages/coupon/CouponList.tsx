import { PlusCircleOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetList } from '~/hooks';
import { ICoupon } from '~/types/coupon.type';
import AButton from '~atoms/a-button';
import { APP_ROUTE_URL } from '~constants/endpoint';
import MInputSearch from '~molecules/m-input-search';
import OTable from '~organisms/o-table';
import { couponActions } from '~store/coupon/couponSlice';
import { TFilterParams } from '~types';

interface ICouponTables extends ICoupon {
  key: string | number;
}

const dataTable: ICouponTables[] = [
  {
    key: '1',
    id: 1,
    facility_name: 'てんのうじ動物園',
    status: '非表示',
    title: 'クーポンタイトル',
  },
  {
    key: '2',
    id: 2,
    facility_name: 'てんのうじ動物園',
    status: '非公開',
    title: 'タイトル写真',
  },
];

export default function CouponList() {
  const navigate = useNavigate();
  const [paramsQuery, setParamsQuery] = useState<TFilterParams<ICoupon>>({
    current_page: 1,
    limit: 20,
  });

  const {
    listData: listCoupon,
    pagination,
    loading,
  } = useGetList({
    params: paramsQuery,
    action: couponActions,
    nameState: 'coupon',
  });

  const columns: ColumnsType<ICouponTables> = [
    {
      title: '',
      dataIndex: 'index',
      render: (_: unknown, record: ICoupon, index: number) => <span>{index + 1}</span>,
    },
    {
      title: '施設名',
      dataIndex: 'facility_name',
    },
    {
      title: 'タイトル',
      dataIndex: 'title',
    },
    {
      title: '表示状態',
      dataIndex: 'status',
    },
    {
      dataIndex: 'action',
      render: (_: unknown, record: ICoupon) => (
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
    navigate(`${APP_ROUTE_URL.COUPON.DETAIL}?id=${id}`);
  };
  const onNavigateCreateCoupon = () => {
    navigate(APP_ROUTE_URL.COUPON.CREATE);
  };

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
        dataSource={dataTable}
        pageSize={10}
        total={pagination?.total_page}
        setParamsQuery={setParamsQuery}
        paramsQuery={paramsQuery}
        loading={loading}
      />
    </div>
  );
}

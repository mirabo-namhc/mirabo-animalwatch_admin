import { PlusCircleOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetList } from '~/hooks';
import AButton from '~atoms/a-button';
import { APP_ROUTE_URL } from '~constants/endpoint';
import { groupsFacilityOptions } from '~constants/form';
import MInputSearch from '~molecules/m-input-search';
import OTable from '~organisms/o-table';
import { facilityActions } from '~store/facility/facilitySlice';
import { IFacility, TFilterParams } from '~types';

export default function FacilityList() {
  const navigate = useNavigate();
  const [paramsQuery, setParamsQuery] = useState<TFilterParams<IFacility>>({
    current_page: 1,
  });

  const {
    listData: listFacility,
    pagination,
    loading,
  } = useGetList({
    params: paramsQuery,
    action: facilityActions,
    nameState: 'facility',
  });

  const columns: ColumnsType<IFacility> = [
    {
      title: '',
      dataIndex: 'index',
      render: (_: unknown, record: IFacility, index: number) => <span>{index + 1}</span>,
    },
    {
      title: '施設名',
      dataIndex: 'name',
    },
    {
      title: 'カテゴリ',
      dataIndex: 'group_id',
      render: (value) => (value ? groupsFacilityOptions[value - 1].label : ''),
    },
    {
      title: '表示状態',
      dataIndex: 'is_active',
      render: (value) => (value ? '画面' : '非表示'),
    },
    {
      title: '表示状態',
      dataIndex: 'order',
    },
    {
      dataIndex: 'action',
      render: (_: unknown, record: IFacility) => (
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
    navigate(`${APP_ROUTE_URL.FACILITY.EDIT}?id=${id}`);
  };
  const onNavigateCreate = () => {
    navigate(APP_ROUTE_URL.FACILITY.CREATE);
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
          onClick={onNavigateCreate}
          type="primary"
          leftIcon={<PlusCircleOutlined />}
        >
          新規登録
        </AButton>
      </div>
      <OTable
        columns={columns}
        dataSource={listFacility as IFacility[]}
        pageSize={10}
        total={pagination?.total_page}
        setParamsQuery={setParamsQuery}
        paramsQuery={paramsQuery}
        loading={loading}
      />
    </div>
  );
}

import { PlusCircleOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IFacility, IGroupFacility } from '~/types/facility.type';
import AButton from '~atoms/a-button';
import { APP_ROUTE_URL } from '~constants/endpoint';
import { groupsFacilityOptions } from '~constants/form';
import MInputSearch from '~molecules/m-input-search';
import OTable from '~organisms/o-table';
import { TFilterParams } from '~types';

const dataTable: IFacility[] = [
  { id: 1, name: 'すみだ水族館', group_id: IGroupFacility.ZOO, is_active: true, order: 1 },
  {
    id: 2,
    name: 'てんのうじ動物園',
    group_id: IGroupFacility.AQUARIUM,
    is_active: false,
    order: 2,
  },
];

export default function FacilityList() {
  const navigate = useNavigate();
  const [paramsQuery, setParamsQuery] = useState<TFilterParams<IFacility>>({
    page: 1,
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
            onClick={() => onNavigateDetail(record.id)}
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
    navigate(`${APP_ROUTE_URL.FACILITY.DETAIL}/${id}`);
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
        dataSource={dataTable}
        pageSize={5}
        total={dataTable.length}
        setParamsQuery={setParamsQuery}
        paramsQuery={paramsQuery}
      />
    </div>
  );
}

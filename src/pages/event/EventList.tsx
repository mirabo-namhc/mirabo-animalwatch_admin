import { PlusCircleOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetList } from '~/hooks';
import { IEvent } from '~/types/event.type';
import AButton from '~atoms/a-button';
import { APP_ROUTE_URL } from '~constants/endpoint';
import MInputSearch from '~molecules/m-input-search';
import OTable from '~organisms/o-table';
import { eventActions } from '~store/event/eventSlice';
import { TFilterParams } from '~types';

export default function EventList() {
  const navigate = useNavigate();
  const [paramsQuery, setParamsQuery] = useState<TFilterParams<IEvent>>({
    current_page: 1,
  });

  const {
    listData: listEvent,
    pagination,
    loading,
  } = useGetList({
    params: paramsQuery,
    action: eventActions,
    nameState: 'event',
  });

  const columns: ColumnsType<IEvent> = [
    {
      title: '',
      dataIndex: 'index',
      render: (_: unknown, record: IEvent, index: number) => <span>{index + 1}</span>,
    },
    {
      title: '施設名',
      dataIndex: 'name',
    },
    {
      title: 'タイトル',
      dataIndex: 'facility_id',
      render: (value) => value,
    },
    {
      dataIndex: 'action',
      render: (_: unknown, record: IEvent) => (
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
    navigate(`${APP_ROUTE_URL.EVENT.EDIT}?id=${id}`);
  };
  const onNavigateCreate = () => {
    navigate(APP_ROUTE_URL.EVENT.CREATE);
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
        dataSource={listEvent as IEvent[]}
        pageSize={10}
        total={pagination?.total_page}
        setParamsQuery={setParamsQuery}
        paramsQuery={paramsQuery}
        loading={loading}
      />
    </div>
  );
}

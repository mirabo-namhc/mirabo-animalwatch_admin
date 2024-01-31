import { PlusCircleOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetList } from '~/hooks';
import { IContentEvent, IEvent } from '~/types/event.type';
import AButton from '~atoms/a-button';
import { APP_ROUTE_URL } from '~constants/endpoint';
import MInputSearch from '~molecules/m-input-search';
import OTable from '~organisms/o-table';
import { eventActions } from '~store/event/eventSlice';
import { TFilterParams } from '~types';
import { convertOnlyDate } from '~utils/datetime';
import { getNoTable, getTotal } from '~utils/tableHelper';

export default function EventList() {
  const navigate = useNavigate();
  const [paramsQuery, setParamsQuery] = useState<TFilterParams<IEvent>>({
    current_page: 1,
    per_page: 10,
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
      render: (_: unknown, record: IEvent, index: number) => (
        <span>{getNoTable(index, pagination?.current_page, pagination?.per_page)}</span>
      ),
    },
    {
      title: 'イベント名',
      dataIndex: 'name',
    },
    {
      title: '施設名',
      dataIndex: 'facility_name',
    },
    {
      title: '公開日',
      dataIndex: 'start_date',
      render: (value, record: IEvent) =>
        convertOnlyDate((record.content as IContentEvent).start_date),
    },
    {
      title: '公開終了日',
      dataIndex: 'end_date',
      render: (value, record: IEvent) =>
        convertOnlyDate((record.content as IContentEvent).end_date),
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
    navigate(`${APP_ROUTE_URL.EVENT.INFOR.EDIT}?id=${id}`);
  };
  const onNavigateCreate = () => {
    navigate(APP_ROUTE_URL.EVENT.INFOR.CREATE);
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
        dataSource={(listEvent as IEvent[]).map((item) => ({ ...item, key: item.id }))}
        pageSize={pagination?.per_page}
        total={getTotal(pagination?.total_page, pagination?.per_page)}
        setParamsQuery={setParamsQuery}
        paramsQuery={paramsQuery}
        loading={loading}
      />
    </div>
  );
}

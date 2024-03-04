import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  MenuOutlined,
  PlusCircleOutlined,
  VerticalAlignBottomOutlined,
  VerticalAlignTopOutlined,
} from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Dropdown, Modal,Skeleton,Divider } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { MenuProps } from 'antd/lib';
import React from 'react';
import {  useNavigate } from 'react-router-dom';
import { useAppDispatch } from '~/_lib/redux/hooks';
import { useGetList } from '~/hooks';
import AButton from '~atoms/a-button';
import { APP_ROUTE_URL } from '~constants/endpoint';
import { groupsFacilityOptions } from '~constants/form';
import MInputSearch from '~molecules/m-input-search';
import OTable from '~organisms/o-table';
import { facilityActions } from '~store/facility/facilitySlice';
import { ETypeSortFacility, IFacility, TFilterParams, TParamsSort } from '~types';
import { filterDuplicateIds } from '~utils/arrayHelper';
import { convertOnlyDate } from '~utils/datetime';
import { getTextEActive } from '~utils/funcHelper';
import { getTotal } from '~utils/tableHelper';



interface IFacilityTables extends IFacility {
  key: string | number;
}

const initialParams = {
  current_page: 1,
  per_page: 10,
};

export default function FacilityList() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [paramsQuery, setParamsQuery] = React.useState<TFilterParams<IFacility>>(initialParams);
  const [idFacility, setIdFacility] = React.useState<number | undefined>(undefined);
  const [dataFacilityTable, setDataFacilityTable] = React.useState<Array<IFacilityTables>>([]);
  const [hasMore, setHasMore] = React.useState<boolean>(true)

 
  const {
    listData: listFacility,
    pagination,
    loading,
  } = useGetList<IFacility[]>({
    params: paramsQuery,
    action: facilityActions,
    nameState: 'facility',
  });

  const itemsAction = (index: number): MenuProps['items'] => [
    {
      key: ETypeSortFacility.MOVE_UP,
      label: '上に移動',
      icon: <ArrowUpOutlined />,
      onClick: (info) => onSortFacility(Number(info.key), idFacility),
      disabled: index === 0,
    },
    {
      key: ETypeSortFacility.MOVE_DOWN,
      label: '下に移動',
      icon: <ArrowDownOutlined />,
      onClick: (info) => onSortFacility(Number(info.key), idFacility),
      disabled: index === dataFacilityTable?.length - 1,
    },
    {
      key: ETypeSortFacility.TO_TOP,
      label: 'ページの先頭に移動',
      icon: <VerticalAlignTopOutlined />,
      onClick: (info) => onSortFacility(Number(info.key), idFacility),
      disabled: index === 0,
    },
    {
      key: ETypeSortFacility.DOWN_BOTTOM,
      label: 'ページの一番下までスクロールします',
      icon: <VerticalAlignBottomOutlined />,
      onClick: (info) => onSortFacility(Number(info.key), idFacility),
      disabled: index === dataFacilityTable?.length - 1,
    },
  ];

  const columns: ColumnsType<IFacility> = [
    {
      title: 'No',
      dataIndex: 'index',
      width: 80,
      render: (_: unknown, record: IFacility, index: number) => <span>{index + 1}</span>,
    },
    {
      title: '施設名',
      dataIndex: 'name',
      width: 650,
    },
    {
      title: 'カテゴリ',
      dataIndex: 'group_id',
      width: 100,
      render: (value) => (value ? groupsFacilityOptions[value - 1].label : ''),
    },
    {
      title: '非表示フラグ',
      dataIndex: 'is_active',
      width: 100,
      render: (value) => getTextEActive(value),
    },
    {
      title: '表示順',
      dataIndex: 'order',
      width: 100,
    },
    {
      title: '公開開始日',
      dataIndex: 'start_date',
      width: 150,
      render: (value) => convertOnlyDate(value),
    },
    {
      title: '公開終了日',
      dataIndex: 'end_date',
      width: 150,
      render: (value) => convertOnlyDate(value),
    },
    {
      dataIndex: 'action',
      width: 150,
      render: (_: unknown, record: IFacility, index: number) => (
        <div className="dis-flex ai-flex-center jc-center">
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
          <Dropdown
            onOpenChange={(originNode) => originNode && setIdFacility(record.id)}
            menu={{ items: itemsAction(index) }}
            placement="bottomLeft"
            arrow
            trigger={['click']}
          >
            <div>
              <AButton size="small" className="ml-10" type="primary">
                <MenuOutlined />
              </AButton>
            </div>
          </Dropdown>
        </div>
      ),
    },
  ];

  const onSortFacility = (type: ETypeSortFacility, idFacility?: number) => {
    Modal.confirm({
      title: '施設の表示順を変更します。よろしいでしょうか。',
      okText: 'はい',
      cancelText: 'いいえ',
      onOk() {
        handleSortFacility(type, idFacility);
      },
    });
  };

  const handleSortFacility = (type: ETypeSortFacility, idFacility?: number) => {
    let paramsSort: TParamsSort = [];
    if (idFacility) {
      const indexItem = dataFacilityTable.findIndex((facility) => facility.id === idFacility);
      const orderFacility = dataFacilityTable[indexItem].order;

      switch (type) {
        case ETypeSortFacility.MOVE_UP:
          const itemReplaceUp = dataFacilityTable[indexItem - 1];
          paramsSort = [
            { id: idFacility, order: itemReplaceUp.order },
            { id: itemReplaceUp.id, order: orderFacility },
          ];
          break;

        case ETypeSortFacility.MOVE_DOWN:
          const itemReplaceDown = dataFacilityTable[indexItem + 1];
          paramsSort = [
            { id: idFacility, order: itemReplaceDown.order },
            { id: itemReplaceDown.id, order: orderFacility },
          ];
          break;

        case ETypeSortFacility.TO_TOP:
          const itemReplaceTop = dataFacilityTable[0];
          paramsSort = [
            { id: idFacility, order: itemReplaceTop.order },
            { id: itemReplaceTop.id, order: orderFacility },
          ];
          break;

        case ETypeSortFacility.DOWN_BOTTOM:
          const itemReplaceBottom = dataFacilityTable[dataFacilityTable.length - 1];
          paramsSort = [
            { id: idFacility, order: itemReplaceBottom.order },
            { id: itemReplaceBottom.id, order: orderFacility },
          ];
          break;
        default:
          break;
      }
    }

    dispatch(facilityActions.sortOrder(paramsSort));
  };

  const handleLoadMore = () => {
    setParamsQuery?.((pre) => {
      if (Number(pre?.current_page) < Number(pagination?.total_page)) {
        return {
          ...pre,
          current_page: Number(pre?.current_page) + 1,
        };
        
      }else{
        setHasMore(false);
      }
      return pre;
    });
  };

  const onNavigateDetail = (id: number) => {
    navigate(`${APP_ROUTE_URL.FACILITY.EDIT}?id=${id}`);
  };
  const onNavigateCreate = () => {
    navigate(APP_ROUTE_URL.FACILITY.CREATE);
  };

  const handleBeforeSearch = () => {
    dispatch(facilityActions.clearData());
  };

  React.useEffect(() => {
    if (Array.isArray(listFacility)) {
      setDataFacilityTable(() => {
        return filterDuplicateIds(listFacility).map((item) => {
          return {
            ...item,
            key: item.id,
          } as IFacilityTables;
        });
      });
    }
  }, [listFacility]);



  return (
    <div className="gray fs-20">
      <div className="dis-flex mb-10 ai-center jc-space-between mb-30">
        <div className="dis-flex ai-center">
          <h4 className="mr-10">施設:</h4>{' '}
          <MInputSearch
            handleBeforeSearch={handleBeforeSearch}
            setParamsQuery={setParamsQuery}
            paramsQuery={paramsQuery}
          />
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
        <InfiniteScroll
        dataLength={dataFacilityTable.length}
        next={handleLoadMore}
        hasMore={hasMore}
        endMessage={<Divider plain>It is all, nothing more </Divider>}

      >
      <OTable
        columns={columns}
        dataSource={dataFacilityTable}
        pageSize={pagination?.per_page}
        total={getTotal(pagination?.total_page, pagination?.per_page)}
        setParamsQuery={setParamsQuery}
        paramsQuery={paramsQuery}
        loading={loading}
        isShowPagination={false}
      />
      </InfiniteScroll>

      
    </div>
  );
}

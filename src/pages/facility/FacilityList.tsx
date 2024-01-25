import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  MenuOutlined,
  PlusCircleOutlined,
  VerticalAlignBottomOutlined,
  VerticalAlignTopOutlined,
} from '@ant-design/icons';
import { Dropdown } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { MenuProps } from 'antd/lib';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '~/_lib/redux/hooks';
import { useGetList } from '~/hooks';
import AButton from '~atoms/a-button';
import { APP_ROUTE_URL } from '~constants/endpoint';
import { groupsFacilityOptions } from '~constants/form';
import MInputSearch from '~molecules/m-input-search';
import OTable from '~organisms/o-table';
import { facilityActions } from '~store/facility/facilitySlice';
import { ETypeSortFacility, IFacility, TParamsSort, TFilterParams } from '~types';
import { getNoTable, getTotal } from '~utils/tableHelper';

interface IFacilityTables extends IFacility {
  key: string | number;
}

export default function FacilityList() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [paramsQuery, setParamsQuery] = React.useState<TFilterParams<IFacility>>({
    current_page: 1,
    per_page: 10,
  });
  const [idFacility, setIdFacility] = React.useState<number | undefined>(undefined);

  const [dataFacilityTable, setDataFacilityTable] = React.useState<Array<IFacilityTables>>([]);

  const {
    listData: listFacility,
    pagination,
    loading,
  } = useGetList<IFacility[]>({
    params: paramsQuery,
    action: facilityActions,
    nameState: 'facility',
  });

  const itemsAction: MenuProps['items'] = [
    {
      key: ETypeSortFacility.MOVE_UP,
      label: '上に移動',
      icon: <ArrowUpOutlined />,
      onClick: (info) => handleSortFacility(Number(info.key), idFacility),
    },
    {
      key: ETypeSortFacility.MOVE_DOWN,
      label: '下に移動',
      icon: <ArrowDownOutlined />,
      onClick: (info) => handleSortFacility(Number(info.key), idFacility),
    },
    {
      key: ETypeSortFacility.TO_TOP,
      label: 'ページの先頭に移動',
      icon: <VerticalAlignTopOutlined />,
      onClick: (info) => handleSortFacility(Number(info.key), idFacility),
    },
    {
      key: ETypeSortFacility.DOWN_BOTTOM,
      label: 'ページの一番下までスクロールします',
      icon: <VerticalAlignBottomOutlined />,
      onClick: (info) => handleSortFacility(Number(info.key), idFacility),
    },
  ];

  const columns: ColumnsType<IFacility> = [
    {
      title: '',
      dataIndex: 'index',
      render: (_: unknown, record: IFacility, index: number) => (
        <span>{getNoTable(index, pagination?.current_page, pagination?.per_page)}</span>
      ),
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
      render: (value) => (value ? '表示' : '非表示'),
    },
    {
      title: '表示順',
      dataIndex: 'order',
    },
    {
      dataIndex: 'action',
      render: (_: unknown, record: IFacility) => (
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
            menu={{ items: itemsAction }}
            placement="bottomLeft"
            arrow
            trigger={['click']}
          >
            <AButton size="small" className="ml-10" type="primary">
              <MenuOutlined />
            </AButton>
          </Dropdown>
        </div>
      ),
    },
  ];

  const handleSortFacility = (type: ETypeSortFacility, idFacility?: number) => {
    let paramsSort: TParamsSort = [];
    if (idFacility) {
      const indexItem = listFacility.findIndex((facility) => facility.id === idFacility);
      const orderFacility = listFacility[indexItem].order;

      switch (type) {
        case ETypeSortFacility.MOVE_UP:
          const itemReplaceUp = listFacility[indexItem - 1];
          paramsSort = [
            { id: idFacility, order: itemReplaceUp.order },
            { id: itemReplaceUp.id, order: orderFacility },
          ];
          break;

        case ETypeSortFacility.MOVE_DOWN:
          const itemReplaceDown = listFacility[indexItem + 1];
          paramsSort = [
            { id: idFacility, order: itemReplaceDown.order },
            { id: itemReplaceDown.id, order: orderFacility },
          ];
          break;

        case ETypeSortFacility.TO_TOP:
          const itemReplaceTop = listFacility[0];
          paramsSort = [
            { id: idFacility, order: itemReplaceTop.order },
            { id: itemReplaceTop.id, order: orderFacility },
          ];
          break;

        case ETypeSortFacility.DOWN_BOTTOM:
          const itemReplaceBottom = listFacility[listFacility.length - 1];
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

  const onNavigateDetail = (id: number) => {
    navigate(`${APP_ROUTE_URL.FACILITY.EDIT}?id=${id}`);
  };
  const onNavigateCreate = () => {
    navigate(APP_ROUTE_URL.FACILITY.CREATE);
  };

  React.useEffect(() => {
    if (Array.isArray(listFacility)) {
      setDataFacilityTable(() => {
        return listFacility.map((item) => {
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
        dataSource={dataFacilityTable}
        pageSize={pagination?.per_page}
        total={getTotal(pagination?.total_page, pagination?.per_page)}
        setParamsQuery={setParamsQuery}
        paramsQuery={paramsQuery}
        loading={loading}
      />
    </div>
  );
}

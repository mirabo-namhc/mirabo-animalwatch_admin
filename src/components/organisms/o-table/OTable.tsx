import type { AnyObject } from 'antd/es/_util/type';
import type { ColumnsType } from 'antd/es/table';
import type {
  FilterValue,
  SortOrder,
  SorterResult,
  TableRowSelection,
} from 'antd/es/table/interface';
import type { TablePaginationConfig, TableProps } from 'antd/lib';
import clsx from 'clsx';
import React from 'react';

import MTable from '~molecules/m-table';
import type { TFilterParams } from '~types';

import './OTable.scss';

interface TOTable<T> extends TableProps<T> {
  className?: string;
  columns: ColumnsType<T>;
  useGetData?: () => void;
  paramsQuery?: TFilterParams;
  setParamsQuery?: React.Dispatch<React.SetStateAction<TFilterParams>>;
  onRow?: TableProps<T>['onRow'];
  rowSelection?: TableRowSelection<T>;
  pageSize?: number;
  total?: number;
  scroll?: TableProps<T>['scroll'];
  contentPagination?: React.ReactNode;
  isShowPagination?: boolean;
  rowKey?: TableProps<T>['rowKey'];
  locale?: TableProps<T>['locale'];
}

export function OTable<T extends AnyObject>({
  className,
  columns,
  pageSize = 10,
  total = 0,
  useGetData,
  paramsQuery,
  setParamsQuery,
  ...props
}: TOTable<T>) {
  const handlePagination = (page: number) => {
    if (page) {
      setParamsQuery?.((pre) => ({
        ...pre,
        page: page ?? 0,
      }));
    }
  };

  const handleChangeTable = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<T> | SorterResult<T>[],
  ) => {
    const sort: Record<string, SortOrder> = {};
    // sorterResult = obj || array
    if (Array.isArray(sorter)) {
      sorter.forEach(({ columnKey, order }) => {
        if (columnKey && order) {
          if (typeof columnKey === 'string') {
            sort[columnKey] = order;
          }
        }
      });
    } else if (sorter?.order) {
      const { column, order } = sorter;
      if (column && order) {
        if (typeof column.dataIndex === 'string') {
          sort[column.dataIndex] = order;
        }
      }
    }
    setParamsQuery?.((pre) => ({
      ...pre,
      sort,
    }));
  };

  const classOTable = clsx('o-table', className);

  return (
    <div className={classOTable} data-testid="table-data">
      <MTable<T>
        size="middle"
        bordered
        onChange={handleChangeTable}
        handlePagination={handlePagination}
        current={paramsQuery?.current_page || 1}
        pageSize={pageSize}
        pagingPosition={['bottomLeft']}
        columns={columns}
        total={total}
        {...props}
      />
    </div>
  );
}

import type { PaginationProps } from 'antd';
import { Table } from 'antd';
import type { AnyObject } from 'antd/es/_util/type';
import type { TablePaginationConfig, TableProps } from 'antd/es/table';
import React from 'react';

import './MTable.scss';
import MPagination from '~molecules/m-pagination';

interface IMTable<T extends AnyObject> extends TableProps<T> {
  total: number;
  pagingPosition: TablePaginationConfig['position'];
  pageSize: number;
  current: number;
  handlePagination: PaginationProps['onChange'];
  contentPagination?: React.ReactNode;
  isShowPagination?: boolean;
  isHandleDataClient?: boolean;
}

export function MTable<T extends AnyObject>({
  total,
  pagingPosition,
  pageSize,
  current,
  handlePagination,
  contentPagination,
  isShowPagination = true,
  isHandleDataClient = false,
  ...props
}: IMTable<T>) {
  const paginationProp = {
    total,
    current,
    pageSize,
  };

  return (
    <>
      <Table
        className="m-table"
        scroll={{ x: 0 }}
        sticky={true}
        pagination={isShowPagination ? { pageSize: pageSize } : false}
        {...props}
      />
      <div className="m-table-pagination">
        {isShowPagination && <MPagination {...paginationProp} onChange={handlePagination} />}
        {contentPagination}
      </div>
    </>
  );
}

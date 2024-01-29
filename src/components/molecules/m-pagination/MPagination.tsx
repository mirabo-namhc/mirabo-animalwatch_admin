import React from 'react';
import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';
import clsx from 'clsx';

import './MPagination.scss';

export default function MPagination({
  className = '',
  showSizeChanger = false,
  prevIcon,
  nextIcon,
  onChange, 
  ...props
}: PaginationProps   & { onChange?: (page: number) => void }){
  const classPagination = clsx('m-pagination', className);

  return <Pagination className={classPagination} showSizeChanger={showSizeChanger} onChange={onChange} {...props} />;
}

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
    ...props
}: PaginationProps) {
    const classPagination = clsx('m-pagination', className);

    return (
        <Pagination
            className={classPagination}
            showSizeChanger={showSizeChanger}
            {...props}
        />
    );
}

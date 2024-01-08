import { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react'
import MInputSearch from '~molecules/MInputSearch';
import OTable from '~organisms/o-table';
import { TFilterParams } from '~types';

interface IUser {
    name: string;
    age: number;
}

const dataTable: IUser[] = [
    { name: 'John', age: 1 },
    { name: 'John 2', age: 2 },
    { name: 'John 3', age: 3 },
    { name: 'John 3', age: 3 },
    { name: 'John 3', age: 3 },
    { name: 'John 3', age: 3 },
    { name: 'John 3', age: 3 },
    { name: 'John 3', age: 3 },
    { name: 'John 3', age: 3 },
]

export default function DashboardDefault() {
    const [paramsQuery, setParamsQuery] = useState<TFilterParams<IUser>>({
        page: 1,
    });
    const columns: ColumnsType<IUser> = [
        {
            title: 'Name',
            dataIndex: 'name',
            width: 66,
            sorter: true
        },
        {
            title: 'Age',
            dataIndex: 'age',
            width: 80,
            sorter: true
        },
    ];


    return (
        <div className='gray fs-20'>
            <h1 className='mb-20'>Example Table</h1>
            <div className='dis-flex mb-10'>
                <MInputSearch setParamsQuery={setParamsQuery} paramsQuery={paramsQuery} />
            </div>
            <OTable columns={columns} dataSource={dataTable} pageSize={5} total={dataTable.length} setParamsQuery={setParamsQuery} paramsQuery={paramsQuery} />
        </div>
    )
}
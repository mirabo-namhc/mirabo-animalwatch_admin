import { Input } from 'antd';
import { SearchProps } from 'antd/es/input';
import React, { useState } from 'react'
import { TFilterParams } from '~types';

const { Search } = Input;

interface IMInputSearch {
    paramsQuery?: TFilterParams;
    setParamsQuery?: React.Dispatch<React.SetStateAction<TFilterParams>>;
}

export default function MInputSearch({ setParamsQuery, paramsQuery }: IMInputSearch) {
    const [value, setValue] = useState(paramsQuery?.search ?? '')

    const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
        setParamsQuery?.((pre) => ({
            ...pre,
            search: value,
        }));
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e?.target?.value || '')
    }

    return (
        <Search
            value={value}
            placeholder="input search text"
            allowClear
            onSearch={onSearch}
            onChange={onChange}
            style={{ width: 304 }}
        />
    )
}
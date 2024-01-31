import { Input } from 'antd';
import { SearchProps } from 'antd/es/input';
import React, { useState } from 'react';
import { TFilterParams } from '~types';

const { Search } = Input;

interface IMInputSearch {
  paramsQuery?: TFilterParams;
  setParamsQuery?: React.Dispatch<React.SetStateAction<TFilterParams>>;
  handleBeforeSearch?: () => void;
}

export default function MInputSearch({
  setParamsQuery,
  paramsQuery,
  handleBeforeSearch,
}: IMInputSearch) {
  const [initParamsFilterQuery] = useState(
    paramsQuery ?? {
      per_page: 1,
      current_page: 10,
      keyword: '',
    },
  );
  const [value, setValue] = useState(paramsQuery?.keyword ?? '');

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
    handleBeforeSearch?.();
    setParamsQuery?.((pre) => ({
      ...initParamsFilterQuery,
      keyword: value,
    }));
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e?.target?.value || '');
  };

  return (
    <Search
      value={value}
      placeholder="施設を入力してください"
      allowClear
      onSearch={onSearch}
      onChange={onChange}
      style={{ width: 304 }}
    />
  );
}

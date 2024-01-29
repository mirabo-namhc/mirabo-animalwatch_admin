import React from 'react';
import { TFilterParams } from '~types';
import { useGetList, useURLInfo } from '.';
import useDebounce from './useDebounce';
import { Option, Option as SelectOption } from '~molecules/m-form-field/m-form-select';
import { IUseGetListProps } from './useGetList';
import { useAppDispatch } from '~/_lib/redux/hooks';

export const defaultSearchOptions: TFilterParams = { current_page: 1, per_page: 7 };

export type NameStateOption = Exclude<IUseGetListProps['nameState'], 'banner' | undefined>;
export interface IUseSelectOptions extends IUseGetListProps {
  params?: TFilterParams;
  nameState?: NameStateOption;
}

export function useSelectOptions({ params, action, nameState }: IUseSelectOptions) {
  const { isEdit, isCreate } = useURLInfo();

  const [options, setOption] = React.useState<Array<SelectOption>>([]);
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [isSearching, setIsSearching] = React.useState<boolean>(false);
  const [paramsQuery, setParamsQuery] = React.useState<TFilterParams>(
    params ?? defaultSearchOptions,
  );

  const dispatch = useAppDispatch();

  const { listData, pagination, loading } = useGetList<Array<any>>({
    params: paramsQuery,
    action,
    nameState,
  });
  // DeBounce Function When Searching Facilities
  useDebounce(
    () => {
      if (isSearching) {
        setParamsQuery({
          ...defaultSearchOptions,
          keyword: searchValue,
        });
      }
    },
    [searchValue],
    500,
  );

  // Scroll to load_more
  const onSelectScrollToLoadMore = (event: any) => {
    const target = event.target;
    if (
      !loading &&
      target.scrollTop + target.offsetHeight === target.scrollHeight &&
      pagination?.current_page &&
      pagination?.total_page &&
      pagination.current_page < pagination.total_page
    ) {
      setParamsQuery({
        ...defaultSearchOptions,
        current_page: pagination.current_page + 1,
      });
    }
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
    setIsSearching(true);
    setOption(isEdit ? [options[0]] : []);
  };

  const onReset = () => {
    setOption([]);
    setParamsQuery(defaultSearchOptions);
    if (action) dispatch(action?.clearData([]));
  };

  const mappingFieldSelectOption = (nameState: NameStateOption, item: any) => {
    if (nameState) {
      const mappingField: Record<typeof nameState, Option> = {
        video: {
          label: `[${item.facility_name ?? ''}] ${item.name}`,
          value: item.id,
        },
        coupon: {
          label: `[${item.facility_name ?? ''}] ${item.title}`,
          value: item.id,
        },
        event: {
          label: `[${item.facility_name ?? ''}] ${item.name}`,
          value: item.id,
        },
        facility: {
          label: item.name,
          value: item.id,
        },
        quiz: {
          label: item.title,
          value: item.id,
        },
      };

      return mappingField[nameState];
    }
    return {
      label: '',
      value: '',
    };
  };

  React.useEffect(() => {
    if (!loading && nameState) {
      const formatOptions = listData.map((item: any) => mappingFieldSelectOption(nameState, item));
      setOption([...options, ...formatOptions]);
    }
  }, [listData, loading]);

  return {
    onSelectScrollToLoadMore,
    handleSearch,
    setSearchValue,
    setIsSearching,
    setOption,
    onReset,
    options,
    loading,
  };
}

export default useSelectOptions;

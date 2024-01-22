import { FormInstance, Upload, message } from 'antd';
import { UploadFile } from 'antd/lib';
import { EMessageErrorRequired } from '~/types/enum.type';
import { MenuItem } from '~organisms/o-side-menu/OSideMenu';
import { IPagination, IResponseApiList } from '~types';
import { replacePositionRangeNumber } from './number';

export function getItemSideMenu(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

interface FileError extends File {
  status?: boolean;
}

export const checkBeforeUpload = (file: FileError, fileSize: number): boolean | string => {
  // check type file
  const isJpgOrPng = ['image/jpeg', 'image/png'].includes(file.type);
  if (!isJpgOrPng) {
    message.error('画像のフォーマットは正しくないです。');
    return isJpgOrPng || Upload.LIST_IGNORE;
  }

  // check last file name includes jpeg or png
  const checkLastNameFile = ['jpg', 'png', 'jpeg'].includes(
    (file?.name?.split('.')?.pop() || '').toLowerCase(),
  );
  if (!checkLastNameFile) {
    message.error('画像のフォーマットは正しくないです。');
    return checkLastNameFile || Upload.LIST_IGNORE;
  }

  // check size file
  const isLt8M = file.size / 1024 / 1024 < fileSize;
  if (!isLt8M) {
    message.error('ファイルサイズの上限 5MBを超えています。');
    return isLt8M || Upload.LIST_IGNORE;
  }

  return false;
};

export const getPaginationInfo = <T>(response: IResponseApiList<T>['data']) => {
  let pagination: IPagination = {};
  if (response) {
    pagination = {
      total_page: response?.meta?.total_page,
      per_page: response?.meta?.per_page,
      current_page: response?.meta?.current_page,
      last_page: response?.meta?.last_page,
    };
  }
  return pagination;
};

export const isNullable = (value: any): boolean => {
  return value === undefined || value === null || value === '';
};

export const handleCheckDataForm = (form?: FormInstance) => {
  if (!form) return false;
  const values = form.getFieldsValue();
  const hasAtLeastOneValue = Object.values(values).some(
    (value) => value !== undefined && value !== null && value !== '',
  );

  return hasAtLeastOneValue;
};

export const messageErrorRequired = (title: string, type?: EMessageErrorRequired) => {
  if (type === EMessageErrorRequired.SELECT) return `${title}.を選択してください`;
  return `${title}を入力してください`;
};
export const messageErrorMaxCharacter = (number: number) => {
  return `最大 ${number} 文字です。`;
};

export const numberPreventInput = (
  value: string,
  field: string,
  fixNumber: number,
  form?: FormInstance,
) => {
  if (form) {
    form.setFieldValue(field, replacePositionRangeNumber(value, undefined, undefined, fixNumber));
  }
};

export const messageCud = (
  name: string,
  type: 'CREATE' | 'UPDATE' | 'DELETE',
): { successMessage: string; failedMessage: string } => {
  switch (type) {
    case 'CREATE':
      return {
        successMessage: `${name}を登録に成功しました。`,
        failedMessage: `${name}を登録に失敗しました。`,
      };
    case 'UPDATE':
      return {
        successMessage: `${name}を編集に成功しました。`,
        failedMessage: `${name}編集に失敗しました。`,
      };
    case 'DELETE':
      return {
        successMessage: `${name}を削除に成功しました。`,
        failedMessage: `${name}を削除に失敗しました。`,
      };
    default:
      return {
        successMessage: '',
        failedMessage: '',
      };
  }
};
export const handleAppendFormDataFile = (file: UploadFile<any>) => {
  const formData = new FormData();
  if (file?.originFileObj) formData.append('file', file.originFileObj as Blob);

  return formData;
};

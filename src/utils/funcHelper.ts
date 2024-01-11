import { MenuItem } from '~organisms/o-side-menu/OSideMenu';
import { Upload, message } from "antd";
import { IPagination, IResponseApiList } from '~types';


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

export const checkBeforeUpload = (
  file: FileError,
  fileSize: number
): boolean | string => {
  // check size file
  const isLt8M = file.size / 1024 / 1024 < fileSize;
  if (!isLt8M) {
    message.error("todo");
    return isLt8M || Upload.LIST_IGNORE;
  }

  // check type file
  const isJpgOrPng = ["image/jpeg", "image/png"].includes(file.type);

  if (!isJpgOrPng) {
    message.error("todo");
    return isJpgOrPng || Upload.LIST_IGNORE;
  }

  // check last file name includes jpeg or png
  const checkLastNameFile = ["jpg", "png", "jpeg"].includes(
    (file?.name?.split(".")?.pop() || "").toLowerCase()
  );

  if (!checkLastNameFile) {
    message.error("todo");
    return checkLastNameFile || Upload.LIST_IGNORE;
  }

  return false;
};

export const getPaginationInfo = <T>(response: IResponseApiList<T>) => {
  let pagination: IPagination = {}
  if (response) {
    pagination = {
      total: response?.total,
      per_page: response?.per_page,
      current_page: response?.current_page,
      last_page: response?.last_page,
    }
  }
  return pagination
}

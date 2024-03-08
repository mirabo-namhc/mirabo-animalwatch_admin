import { CheckboxGroupProps } from 'antd/es/checkbox';
import { ETypeFieldForm } from './enum.type';
import type {
  ColProps,
  DatePickerProps,
  FormInstance,
  FormItemProps,
  InputNumberProps,
  InputProps,
  RadioGroupProps,
  SelectProps,
  UploadFile,
  UploadProps,
} from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import { TextAreaProps } from 'antd/es/input';
import { PasswordProps } from 'antd/lib/input';
import { ReactNode } from 'react';

interface ICustomMappedFormItems {
  length?: number;
  isDisable?: boolean;
  ref?: React.RefObject<any>;
  
}
interface ICustomInputNumber extends InputProps {
  formControl: FormInstance;
}
interface ICustomUpload extends UploadProps {
  initialFileList: UploadFile<any>[];
  setUrlFile: (file: string | undefined) => void;
}

export interface IAtomFormItemsProps {
  [ETypeFieldForm.TEXT_FIELD]: InputProps;
  [ETypeFieldForm.SELECT]: SelectProps;
  [ETypeFieldForm.DATEPICKER]: DatePickerProps;
  [ETypeFieldForm.CHECKBOX]: CheckboxGroupProps;
  [ETypeFieldForm.RADIO]: RadioGroupProps;
  [ETypeFieldForm.RANGE_DATE]: RangePickerProps;
  [ETypeFieldForm.TEXT_AREA]: TextAreaProps;
  [ETypeFieldForm.UPLOAD]: ICustomUpload;
  [ETypeFieldForm.PASSWORD]: PasswordProps;
  [ETypeFieldForm.INPUT_NUMBER]: ICustomInputNumber;
}

export type TMappedFormItems = {
  [K in keyof IAtomFormItemsProps]: {
    type: K;
    typeScreen?: ReactNode;
    atomProps?: IAtomFormItemsProps[K];
    colProps?: ColProps;
  } & FormItemProps;
}[keyof IAtomFormItemsProps] &
  ICustomMappedFormItems;

export interface IMFormItemProps<T extends ETypeFieldForm> extends Omit<TMappedFormItems, 'type'> {
  type: T;
  typeScreen?: ReactNode;
  atomProps?: IAtomFormItemsProps[T];
}

export interface IFormState {
  hasAtLeastOneValue?: boolean;
}

export interface ICheckboxList {
  label?: string;
  value?: string;
}

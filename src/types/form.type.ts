import { CheckboxGroupProps } from "antd/es/checkbox";
import { ETypeFieldForm } from "./enum.type";
import type {
    ColProps,
    DatePickerProps,
    FormItemProps,
    InputNumberProps,
    InputProps,
    RadioGroupProps,
    SelectProps,
    UploadProps,
} from 'antd';
import { RangePickerProps } from "antd/es/date-picker";
import { TextAreaProps } from "antd/es/input";
import { PasswordProps } from "antd/lib/input";

interface ICustomMappedFormItems {
    length?: number;
    isDisable?: boolean;
}

export interface IAtomFormItemsProps {
    [ETypeFieldForm.TEXT_FIELD]: InputProps;
    [ETypeFieldForm.SELECT]: SelectProps;
    [ETypeFieldForm.DATEPICKER]: DatePickerProps;
    [ETypeFieldForm.CHECKBOX]: CheckboxGroupProps;
    [ETypeFieldForm.RADIO]: RadioGroupProps;
    [ETypeFieldForm.RANGE_DATE]: RangePickerProps;
    [ETypeFieldForm.TEXT_AREA]: TextAreaProps;
    [ETypeFieldForm.UPLOAD]: UploadProps;
    [ETypeFieldForm.PASSWORD]: PasswordProps;
    [ETypeFieldForm.INPUT_NUMBER]: InputNumberProps;
}

export type TMappedFormItems = {
    [K in keyof IAtomFormItemsProps]: {
        type: K;
        atomProps?: IAtomFormItemsProps[K];
        colProps?: ColProps;
    } & FormItemProps;
}[keyof IAtomFormItemsProps] & ICustomMappedFormItems;

export interface IMFormItemProps<T extends ETypeFieldForm> extends Omit<TMappedFormItems, 'type'> {
    type: T;
    atomProps?: IAtomFormItemsProps[T];
}

export interface IFormState {
    hasAtLeastOneValue?: boolean
}
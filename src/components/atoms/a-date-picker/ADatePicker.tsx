import type { DatePickerProps } from 'antd';
import { DatePicker } from 'antd';

const ADatePicker = (props: DatePickerProps) => {
  return <DatePicker className="w-full" {...props} />;
};

export default ADatePicker;

import { Form } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';
import { ETypeFieldForm } from '~/types/enum.type';
import { TMappedFormItems } from '~/types/form.type';
import { COL_HAFT } from '~constants/form';
import MInputSearch from '~molecules/m-input-search';
import OForm from '~organisms/o-form';
import OTable from '~organisms/o-table';
import { TFilterParams } from '~types';
import { convertToSelectOptions } from '~utils/arrayHelper';

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
];

export default function DashboardDefault() {
  const [formControl] = Form.useForm();
  const [paramsQuery, setParamsQuery] = useState<TFilterParams<IUser>>({
    current_page: 1,
  });
  const columns: ColumnsType<IUser> = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: 66,
      sorter: true,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      width: 80,
      sorter: true,
    },
  ];

  const listFieldForm: TMappedFormItems[] = [
    {
      type: ETypeFieldForm.TEXT_FIELD,
      label: 'テストID',
      name: 'testId',
      atomProps: {
        placeholder: 'テストIDを入力',
      },
      colProps: {
        span: COL_HAFT,
      },
      rules: [
        {
          required: true,
          message: 'vui long dien',
        },
      ],
    },
    {
      type: ETypeFieldForm.SELECT,
      label: '教科',
      name: 'subjectCode',
      atomProps: {
        defaultValue: '',
        placeholder: '教科を選択',
        options: convertToSelectOptions(
          [
            { subjectName: '全教科', subjectCode: 1 },
            { subjectName: '全教科 2', subjectCode: 2 },
          ],
          'subjectName',
          'subjectCode',
        ),
      },
      colProps: {
        span: 12,
      },
      rules: [
        {
          required: true,
          message: 'vui long dien',
        },
      ],
    },
    {
      type: ETypeFieldForm.DATEPICKER,
      label: '教科',
      name: 'datepicker',
      colProps: {
        span: 12,
      },
      rules: [
        {
          required: true,
          message: 'vui long dien',
        },
      ],
    },
    {
      type: ETypeFieldForm.RADIO,
      label: '教科',
      name: 'radio',
      colProps: {
        span: 12,
      },
      atomProps: {
        options: [
          { label: 'Apple', value: 'Apple' },
          { label: 'Pear', value: 'Pear' },
        ],
      },
      rules: [
        {
          required: true,
          message: 'vui long dien',
        },
      ],
    },
    {
      type: ETypeFieldForm.UPLOAD,
      label: 'Upload',
      name: 'upload',
      colProps: {
        span: 12,
      },
      rules: [
        {
          required: true,
          message: 'vui long dien',
        },
      ],
    },
  ];

  const handleSubmit = (values: any) => {
    // todo
    console.log('values', values);
  };

  return (
    <div className="gray fs-20">
      <h1 className="mb-20">Example Table</h1>
      <div className="dis-flex mb-10">
        <MInputSearch setParamsQuery={setParamsQuery} paramsQuery={paramsQuery} />
      </div>
      <OTable
        columns={columns}
        dataSource={dataTable}
        pageSize={5}
        total={dataTable.length}
        setParamsQuery={setParamsQuery}
        paramsQuery={paramsQuery}
      />
      <OForm form={formControl} listField={listFieldForm} onSubmitForm={handleSubmit} />
    </div>
  );
}

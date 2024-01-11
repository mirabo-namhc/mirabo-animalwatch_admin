import { Form, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '~/_lib/redux/hooks';
import { useGetDetail } from '~/hooks';
import useURLInfo from '~/hooks/useURLInfo';
import { ETypeFieldForm } from '~/types/enum.type';
import { TMappedFormItems } from '~/types/form.type';
import { APP_ROUTE_URL } from '~constants/endpoint';
import { COLDEF, COL_HAFT, groupsFacilityOptions, isActiveFacilityOptions } from '~constants/form';
import OForm from '~organisms/o-form';
import { facilityActions } from '~store/facility/facilitySlice';
import { IFacility } from '~types';

export default function FacilityForm() {
  const dispatch = useAppDispatch();
  const [formControl] = Form.useForm();
  const navigate = useNavigate();
  const { id, isDetail, isEdit, isCreate } = useURLInfo();

  const listFieldForm: TMappedFormItems[] = [
    {
      type: ETypeFieldForm.TEXT_FIELD,
      label: '施設名',
      name: 'name',
      atomProps: {
        placeholder: '',
        readOnly: isDetail,
      },
      colProps: {
        span: COLDEF,
      },
      rules: [
        {
          required: true,
          message: '',
        },
      ],
    },
    {
      type: ETypeFieldForm.SELECT,
      label: 'カテゴリ',
      name: 'group_id',
      atomProps: {
        placeholder: '',
        options: groupsFacilityOptions,
        disabled: isDetail,
      },
      colProps: {
        span: COLDEF,
      },
      rules: [
        {
          required: true,
          message: '',
        },
      ],
    },
    {
      type: ETypeFieldForm.TEXT_FIELD,
      label: 'Youtube Video ID',
      name: 'youtube_channel_id',
      atomProps: {
        placeholder: '',
        readOnly: isDetail,
      },
      colProps: {
        span: COLDEF,
      },
      rules: [
        {
          required: true,
          message: '',
        },
      ],
    },
    {
      type: ETypeFieldForm.TEXT_FIELD,
      label: 'Instagramトークン',
      name: 'instagram_token_id',
      atomProps: {
        placeholder: '',
        readOnly: isDetail,
      },
      colProps: {
        span: COLDEF,
      },
      rules: [
        {
          required: true,
          message: '',
        },
      ],
    },
    {
      type: ETypeFieldForm.UPLOAD,
      label: 'ロゴ',
      name: 'image_thumnail_url',
      colProps: {
        span: COLDEF,
      },
      atomProps: {
        length: 1,
        disabled: isDetail,
      },
      rules: [
        {
          required: true,
          message: '',
        },
      ],
    },
    {
      type: ETypeFieldForm.TEXT_FIELD,
      label: '動画フォルダID',
      name: 'folder_id',
      atomProps: {
        placeholder: '',
        readOnly: isDetail,
      },
      colProps: {
        span: COLDEF,
      },
      rules: [
        {
          required: true,
          message: '',
        },
      ],
    },
    {
      type: ETypeFieldForm.SELECT,
      label: '非表示フラグ',
      name: 'is_active',
      atomProps: {
        placeholder: '',
        options: isActiveFacilityOptions,
        disabled: isDetail,
      },
      colProps: {
        span: COLDEF,
      },
      rules: [
        {
          required: true,
          message: '',
        },
      ],
    },
    {
      type: ETypeFieldForm.DATEPICKER,
      label: '公開日',
      name: 'start_date',
      colProps: {
        span: COL_HAFT,
      },
      atomProps: {
        disabled: isDetail,
      },
      rules: [
        {
          required: true,
          message: '',
        },
      ],
    },
    {
      type: ETypeFieldForm.DATEPICKER,
      label: '公開終了日',
      name: 'end_date',
      colProps: {
        span: COL_HAFT,
      },
      atomProps: {
        disabled: isDetail,
      },
      rules: [
        {
          required: true,
          message: '',
        },
      ],
    },
    {
      type: ETypeFieldForm.SELECT,
      label: '表示順',
      name: 'order',
      atomProps: {
        placeholder: '',
        options: [{ label: 1, value: 1 }],
        disabled: isDetail,
      },
      colProps: {
        span: COLDEF,
      },
      rules: [
        {
          required: true,
          message: '',
        },
      ],
    },
  ];

  const { detailData, loading } = useGetDetail({
    id: Number(id),
    action: facilityActions,
    nameState: 'facility',
    isGetApi: isDetail || isEdit,
  });

  const handleSubmit = (values: IFacility) => {
    const params = { ...values };
    if (isCreate) {
      dispatch(facilityActions.create(params));
    }
  };

  const handleCancel = () => {
    if (isCreate || isDetail) navigate(APP_ROUTE_URL.FACILITY.INDEX);
    else navigate(APP_ROUTE_URL.FACILITY.DETAIL);
  };

  const handleDelete = () => {
    // todo
    console.log('id', id);
  };

  return (
    <div>
      {loading ? (
        <div className="mt-30 dis-flex jc-center">
          <Spin size="large" />
        </div>
      ) : (
        <OForm
          form={formControl}
          listField={listFieldForm}
          onSubmitForm={handleSubmit}
          initialValues={isCreate ? {} : detailData}
          onCancel={handleCancel}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

import { Modal, Spin } from 'antd';
import { useForm } from 'antd/es/form/Form';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '~/_lib/redux/hooks';
import { useGetDetail } from '~/hooks';
import useURLInfo from '~/hooks/useURLInfo';
import { ETypeFieldForm } from '~/types/enum.type';
import { TMappedFormItems } from '~/types/form.type';
import { APP_ROUTE_URL } from '~constants/endpoint';
import { COLDEF, COL_HAFT, groupsFacilityOptions, isActiveFacilityOptions } from '~constants/form';
import OForm from '~organisms/o-form';
import { facilityActions } from '~store/facility/facilitySlice';
import { IFacility } from '~types';
import {
  convertDateToFormat,
  disableBeforeDateWithParams,
  disableDateBefore,
} from '~utils/datetime';

export default function FacilityForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loadingForm } = useAppSelector((state) => state.facility);
  const { id, isDetail, isEdit, isCreate } = useURLInfo();

  const [formControl] = useForm();

  const { detailData, loading } = useGetDetail<IFacility | undefined>({
    action: facilityActions,
    nameState: 'facility',
    isGetApi: isDetail || isEdit,
  });

  const initValues = {
    ...detailData,
    start_date: detailData?.start_date && dayjs(detailData?.start_date),
    end_date: detailData?.end_date && dayjs(detailData?.end_date),
  };

  const handleValuesChange = (value: IFacility) => {
    if (!Object.keys(value).includes('start_date') || !value.start_date) return;
    formControl.setFieldValue('end_date', null);
  };

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
      isDisable: isDetail,
      atomProps: {
        placeholder: '',
        options: groupsFacilityOptions,
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
      length: 1,
      colProps: {
        span: COLDEF,
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
      isDisable: isDetail,
      atomProps: {
        placeholder: '',
        options: isActiveFacilityOptions,
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
      isDisable: isDetail,
      atomProps: {
        disabledDate: disableDateBefore,
      },
      colProps: {
        span: COL_HAFT,
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
      isDisable: isDetail,
      atomProps: {
        disabledDate: (current) =>
          disableBeforeDateWithParams(current, formControl.getFieldValue('start_date')),
      },
      colProps: {
        span: COL_HAFT,
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
      isDisable: isDetail,
      atomProps: {
        placeholder: '',
        options: [{ label: 1, value: 1 }],
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

  const handleSubmit = (values: IFacility) => {
    try {
      const params = {
        ...values,
        start_date: convertDateToFormat(values.start_date),
        end_date: convertDateToFormat(values.end_date),
      };
      if (isCreate) {
        dispatch(
          facilityActions.create({
            ...params,
            onNavigate: () => navigate(APP_ROUTE_URL.FACILITY.INDEX),
          }),
        );
      } else if (isEdit) {
        dispatch(
          facilityActions.edit({
            id,
            ...params,
            onNavigate: () =>
              navigate(`${APP_ROUTE_URL.FACILITY.INDEX}/${APP_ROUTE_URL.FACILITY.DETAIL}/${id}`),
          }),
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    if (isCreate || isDetail) navigate(APP_ROUTE_URL.FACILITY.INDEX);
    else navigate(`${APP_ROUTE_URL.FACILITY.INDEX}/${APP_ROUTE_URL.FACILITY.DETAIL}/${id}`);
  };
  const handleNavigateEdit = () => {
    navigate(`${APP_ROUTE_URL.FACILITY.INDEX}/${APP_ROUTE_URL.FACILITY.EDIT}/${id}`);
  };

  const handleDelete = () => {
    Modal.confirm({
      title: 'このカテゴリを削除してもよろしいですか?',
      okText: 'はい',
      cancelText: 'いいえ',
      onOk() {
        dispatch(
          facilityActions.remove({
            id: Number(id),
            onNavigate: () => navigate(APP_ROUTE_URL.FACILITY.INDEX),
          }),
        );
      },
    });
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
          initialValues={isCreate ? {} : initValues}
          onCancel={handleCancel}
          onDelete={handleDelete}
          onNavigateEdit={handleNavigateEdit}
          onValuesChange={handleValuesChange}
          loading={loadingForm}
        />
      )}
    </div>
  );
}

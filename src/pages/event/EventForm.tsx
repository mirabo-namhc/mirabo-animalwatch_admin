import { Modal, Spin } from 'antd';
import { useForm } from 'antd/es/form/Form';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '~/_lib/redux/hooks';
import { useGetDetail, useGetList } from '~/hooks';
import useURLInfo from '~/hooks/useURLInfo';
import { EMessageErrorRequired, ETypeFieldForm } from '~/types/enum.type';
import { TMappedFormItems } from '~/types/form.type';
import { APP_ROUTE_URL } from '~constants/endpoint';
import { COLDEF, COL_HAFT, isActiveFacilityOptions } from '~constants/form';
import OForm from '~organisms/o-form';
import { eventActions } from '~store/event/eventSlice';
import { facilityActions } from '~store/facility/facilitySlice';
import { formActions } from '~store/form/formSlice';
import { IEvent, IFacility } from '~types';
import { convertToSelectOptions } from '~utils/arrayHelper';
import {
  convertDateToFormat,
  disableBeforeDateWithParams,
  disableDateBefore,
} from '~utils/datetime';
import { getMessageErrorRequired, handleCheckDataForm } from '~utils/funcHelper';

export default function EventForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loadingForm } = useAppSelector((state) => state.event);
  const { id, isEdit, isCreate } = useURLInfo();

  const [formControl] = useForm();

  const { listData: listFacility, loading: loadingListFacility } = useGetList<IFacility[]>({
    params: undefined,
    action: facilityActions,
    nameState: 'facility',
  });
  const { detailData, loading } = useGetDetail<IEvent | undefined>({
    action: eventActions,
    nameState: 'event',
    isGetApi: isEdit,
  });

  const initValues = {
    ...detailData,
    start_date: detailData?.start_date && dayjs(detailData?.start_date),
    end_date: detailData?.end_date && dayjs(detailData?.end_date),
    is_active: detailData?.is_active ?? 1,
  };

  const handleValuesChange = (value: IEvent) => {
    if (!!Object.keys(value).includes('start_date') && !!value.start_date) {
      formControl.setFieldValue('end_date', null);
    }

    const hasAtLeastOneValue = handleCheckDataForm(formControl);
    dispatch(formActions.getHasAtLeastOneValue(hasAtLeastOneValue));
  };

  const listFieldForm: TMappedFormItems[] = [
    {
      type: ETypeFieldForm.SELECT,
      label: '施設名',
      name: 'facility_id',
      atomProps: {
        placeholder: '',
        defaultValue: initValues.facility_id,
        options: convertToSelectOptions(listFacility, 'name', 'id'),
        loading: loadingListFacility,
      },
      colProps: {
        span: COLDEF,
      },
      rules: [
        {
          required: true,
          message: getMessageErrorRequired('施設名', EMessageErrorRequired.SELECT),
        },
      ],
    },
    {
      type: ETypeFieldForm.TEXT_FIELD,
      label: 'イベント名',
      name: 'name',
      atomProps: {
        placeholder: '',
      },
      colProps: {
        span: COLDEF,
      },
      rules: [
        {
          required: true,
          message: getMessageErrorRequired('イベント名'),
        },
        {
          max: 255,
          message: '',
        },
      ],
    },
    {
      type: ETypeFieldForm.TEXT_FIELD,
      label: 'タイトル',
      name: 'title',
      atomProps: {
        placeholder: '',
      },
      colProps: {
        span: COLDEF,
      },
      rules: [
        {
          required: true,
          message: getMessageErrorRequired('タイトル'),
        },
        {
          max: 255,
          message: '',
        },
      ],
    },
    {
      type: ETypeFieldForm.UPLOAD,
      label: '画像',
      name: 'image_url',
      length: 1,
      colProps: {
        span: COLDEF,
      },
      atomProps: {},
      rules: [
        {
          required: true,
          message: getMessageErrorRequired('画像', EMessageErrorRequired.SELECT),
        },
      ],
    },
    {
      type: ETypeFieldForm.TEXT_AREA,
      label: '概要',
      name: 'overview',
      atomProps: {
        placeholder: '',
      },
      colProps: {
        span: COLDEF,
      },
      rules: [
        {
          required: true,
          message: getMessageErrorRequired('概要'),
        },
        {
          max: 65535,
          message: '',
        },
      ],
    },
    {
      type: ETypeFieldForm.DATEPICKER,
      label: '公開日',
      name: 'start_date',
      atomProps: {
        disabledDate: disableDateBefore,
      },
      colProps: {
        span: COL_HAFT,
      },
      rules: [
        {
          required: true,
          message: getMessageErrorRequired('公開日', EMessageErrorRequired.SELECT),
        },
      ],
    },
    {
      type: ETypeFieldForm.DATEPICKER,
      label: '公開終了日',
      name: 'end_date',
      atomProps: {
        disabledDate: (current) =>
          disableBeforeDateWithParams(current, formControl.getFieldValue('start_date')),
      },
      colProps: {
        span: COL_HAFT,
      },
    },
    {
      type: ETypeFieldForm.SELECT,
      label: '非表示フラグ',
      name: 'is_active',
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
          message: getMessageErrorRequired('非表示フラグ', EMessageErrorRequired.SELECT),
        },
      ],
    },
  ];

  const handleSubmit = (values: IEvent) => {
    try {
      const params = {
        ...values,
        start_date: convertDateToFormat(values.start_date),
        end_date: convertDateToFormat(values.end_date),
        image_url: '',
      };
      if (isCreate) {
        dispatch(
          eventActions.create({
            ...params,
            onNavigate: () => navigate(APP_ROUTE_URL.EVENT.INDEX),
          }),
        );
      } else if (isEdit) {
        dispatch(
          eventActions.edit({
            id,
            ...params,
            onNavigate: () => navigate(APP_ROUTE_URL.EVENT.INDEX),
          }),
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    const hasAtLeastOneValue = handleCheckDataForm(formControl);
    if (hasAtLeastOneValue) {
      Modal.confirm({
        title: (
          <span>
            このページを離れてもよろしいですか? <br /> 入力したデータは失われます。
          </span>
        ),
        okText: 'はい',
        cancelText: 'いいえ',
        onOk() {
          navigate(APP_ROUTE_URL.EVENT.INDEX);
        },
      });
    } else navigate(APP_ROUTE_URL.EVENT.INDEX);
  };

  const handleDelete = () => {
    Modal.confirm({
      title: 'このイベントを削除してもよろしいですか?',
      okText: 'はい',
      cancelText: 'いいえ',
      onOk() {
        dispatch(
          eventActions.remove({
            id: Number(id),
            onNavigate: () => navigate(APP_ROUTE_URL.EVENT.INDEX),
          }),
        );
      },
    });
  };

  useEffect(() => {
    return () => {
      dispatch(formActions.getHasAtLeastOneValue(false));
    };
  }, []);

  return (
    <div>
      {loading ? (
        <div className="mt-30 dis-flex jc-center">
          <Spin size="large" />
        </div>
      ) : (
        <OForm
          colon={false}
          form={formControl}
          listField={listFieldForm}
          onSubmitForm={handleSubmit}
          initialValues={initValues}
          onCancel={handleCancel}
          onDelete={handleDelete}
          onValuesChange={handleValuesChange}
          loading={loadingForm}
        />
      )}
    </div>
  );
}

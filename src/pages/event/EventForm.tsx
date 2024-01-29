import { Modal, Spin, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import dayjs from 'dayjs';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '~/_lib/redux/hooks';
import { useGetDetail, useGetList } from '~/hooks';
import useURLInfo from '~/hooks/useURLInfo';
import { EMessageErrorRequired, ETypeFieldForm } from '~/types/enum.type';
import { TMappedFormItems } from '~/types/form.type';
import { APP_ROUTE_URL } from '~constants/endpoint';
import { COLDEF, COL_HAFT, isActiveFacilityOptions } from '~constants/form';
import { EStatusFileUpload, IRefFormUpload } from '~molecules/m-form-field/m-form-upload';
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
import {
  messageErrorRequired,
  handleCheckDataForm,
  messageErrorMaxCharacter,
} from '~utils/funcHelper';

export default function EventForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loadingForm } = useAppSelector((state) => state.event);
  const { id, isEdit, isCreate } = useURLInfo();
  const uploadImageCoverRef = useRef<IRefFormUpload>(null);

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
    image_url: detailData?.image_url,
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
        placeholder: messageErrorRequired('施設名', EMessageErrorRequired.SELECT),
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
          message: messageErrorRequired('施設名', EMessageErrorRequired.SELECT),
        },
      ],
    },
    {
      type: ETypeFieldForm.TEXT_FIELD,
      label: 'イベント名',
      name: 'name',
      atomProps: {
        placeholder: messageErrorRequired('イベント名'),
        maxLength: 255,
      },
      colProps: {
        span: COLDEF,
      },
      rules: [
        {
          required: true,
          message: messageErrorRequired('イベント名'),
        },
        {
          max: 255,
          message: messageErrorMaxCharacter(255),
        },
      ],
    },
    {
      type: ETypeFieldForm.TEXT_FIELD,
      label: 'タイトル',
      name: 'title',
      atomProps: {
        placeholder: messageErrorRequired('タイトル'),
        maxLength: 255,
      },
      colProps: {
        span: COLDEF,
      },
      rules: [
        {
          required: true,
          message: messageErrorRequired('タイトル'),
        },
        {
          max: 255,
          message: messageErrorMaxCharacter(255),
        },
      ],
    },
    {
      type: ETypeFieldForm.UPLOAD,
      label: '画像',
      name: 'image_path',
      length: 1,
      colProps: {
        span: COLDEF,
      },
      ref: uploadImageCoverRef,
      atomProps: {
        setUrlFile: (file) => formControl.setFieldValue('image_path', file),
        initialFileList: initValues?.image_url
          ? [
              {
                uid: initValues?.image_url,
                url: initValues?.image_url,
                name: initValues?.image_url,
              },
            ]
          : [],
      },
      rules: [
        {
          required: true,
          message: messageErrorRequired('画像', EMessageErrorRequired.SELECT),
        },
      ],
    },
    {
      type: ETypeFieldForm.TEXT_AREA,
      label: '概要',
      name: 'overview',
      atomProps: {
        placeholder: messageErrorRequired('概要'),
        maxLength: 65535,
      },
      colProps: {
        span: COLDEF,
      },
      rules: [
        {
          required: true,
          message: messageErrorRequired('概要'),
        },
        {
          max: 65535,
          message: messageErrorMaxCharacter(65535),
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
          message: messageErrorRequired('公開日', EMessageErrorRequired.SELECT),
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
        placeholder: messageErrorRequired('非表示フラグ', EMessageErrorRequired.SELECT),
        options: isActiveFacilityOptions,
      },
      colProps: {
        span: COLDEF,
      },
      rules: [
        {
          required: true,
          message: messageErrorRequired('非表示フラグ', EMessageErrorRequired.SELECT),
        },
      ],
    },
  ];

  const handleSubmit = (values: IEvent) => {
    if (uploadImageCoverRef.current?.status !== EStatusFileUpload.SUCCESS) {
      message.warning('ロゴ画像をアップロードしていますので、少々お待ちください。');
      return;
    }
    try {
      const params = {
        ...values,
        image_url: formControl.getFieldValue('image_path'),
        start_date: convertDateToFormat(values.start_date),
        end_date: convertDateToFormat(values.end_date),
      };
      if (isCreate) {
        dispatch(
          eventActions.create({
            ...params,
            onNavigate: () =>
              navigate(`${APP_ROUTE_URL.EVENT.INDEX}/${APP_ROUTE_URL.EVENT.INFOR.INDEX}`),
          }),
        );
      } else if (isEdit) {
        dispatch(
          eventActions.edit({
            id,
            ...params,
            onNavigate: () =>
              navigate(`${APP_ROUTE_URL.EVENT.INDEX}/${APP_ROUTE_URL.EVENT.INFOR.INDEX}`),
          }),
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    const hasAtLeastOneValue = handleCheckDataForm(formControl, ['is_active', 'end_date']);
    if (hasAtLeastOneValue) {
      Modal.confirm({
        title: '変更は保存されません。 まだページを離れますか?',
        okText: 'はい',
        cancelText: 'いいえ',
        onOk() {
          navigate(`${APP_ROUTE_URL.EVENT.INDEX}/${APP_ROUTE_URL.EVENT.INFOR.INDEX}`);
        },
      });
    } else navigate(`${APP_ROUTE_URL.EVENT.INDEX}/${APP_ROUTE_URL.EVENT.INFOR.INDEX}`);
  };

  const handleDelete = () => {
    Modal.confirm({
      title: 'このイベントを削除しますか。よろしいでしょうか。',
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

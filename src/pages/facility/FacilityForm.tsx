import { Modal, Spin, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import dayjs from 'dayjs';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '~/_lib/redux/hooks';
import { useGetDetail } from '~/hooks';
import useURLInfo from '~/hooks/useURLInfo';
import { EMessageErrorRequired, ETypeFieldForm } from '~/types/enum.type';
import { TMappedFormItems } from '~/types/form.type';
import { APP_ROUTE_URL } from '~constants/endpoint';
import {
  COLDEF,
  COL_HAFT,
  groupsFacilityOptions,
  isActiveFacilityOptions,
  optionsDisplayTabFacility,
} from '~constants/form';
import { EStatusFileUpload, IRefFormUpload } from '~molecules/m-form-field/m-form-upload';
import OForm from '~organisms/o-form';
import { facilityActions } from '~store/facility/facilitySlice';
import { formActions } from '~store/form/formSlice';
import { IFacility, IIsActiveFacility } from '~types';
import {
  convertDateToFormat,
  disableBeforeDateWithParams,
  disableDateBefore,
} from '~utils/datetime';
import {
  checkKeyExistsCheckbox,
  handleCheckDataForm,
  messageErrorMaxCharacter,
  messageErrorRequired,
} from '~utils/funcHelper';

export default function FacilityForm() {
  const uploadImageCoverRef = useRef<IRefFormUpload>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loadingForm } = useAppSelector((state) => state.facility);
  const { id, isEdit, isCreate } = useURLInfo();

  const [formControl] = useForm();

  const { detailData, loading } = useGetDetail<IFacility | undefined>({
    action: facilityActions,
    nameState: 'facility',
    isGetApi: isEdit,
  });

  const getInitIsActive = (detailData?: IFacility) => {
    const list_active: (keyof IIsActiveFacility)[] = [];
    if (detailData) {
      Object.keys(detailData).forEach((key) => {
        const typedKey = key as keyof IFacility;
        if (
          checkKeyExistsCheckbox(optionsDisplayTabFacility, typedKey) &&
          Boolean(detailData[typedKey])
        ) {
          list_active.push(typedKey as keyof IIsActiveFacility);
        }
      });
    }
    return list_active;
  };

  const initValues = {
    ...detailData,
    start_date: detailData?.start_date && dayjs(detailData?.start_date),
    end_date: detailData?.end_date && dayjs(detailData?.end_date),
    is_active: detailData?.is_active ?? 0,
    img_cover_url: detailData?.img_cover_url,
    list_active: getInitIsActive(detailData),
  };

  const handleValuesChange = (value: IFacility) => {
    if (!!Object.keys(value).includes('start_date') && !!value.start_date) {
      formControl.setFieldValue('end_date', null);
    }

    const hasAtLeastOneValue = handleCheckDataForm(formControl);
    dispatch(formActions.getHasAtLeastOneValue(hasAtLeastOneValue));
  };

  const listFieldForm: TMappedFormItems[] = [
    {
      type: ETypeFieldForm.TEXT_FIELD,
      label: '施設名',
      name: 'name',
      atomProps: {
        placeholder: messageErrorRequired('施設名'),
        maxLength: 255,
      },
      colProps: {
        span: COLDEF,
      },
      rules: [
        {
          required: true,
          whitespace: true,
          message: messageErrorRequired('施設名'),
        },
        {
          max: 255,
          message: messageErrorMaxCharacter(255),
        },
      ],
    },
    {
      type: ETypeFieldForm.SELECT,
      label: 'カテゴリ',
      name: 'group_id',
      atomProps: {
        placeholder: messageErrorRequired('カテゴリ', EMessageErrorRequired.SELECT),
        options: groupsFacilityOptions,
      },
      colProps: {
        span: COLDEF,
      },
      rules: [
        {
          required: true,
          message: messageErrorRequired('カテゴリ', EMessageErrorRequired.SELECT),
        },
      ],
    },
    {
      type: ETypeFieldForm.TEXT_FIELD,
      label: 'Youtube Video ID',
      name: 'youtube_channel_id',
      atomProps: {
        placeholder: messageErrorRequired('Youtube Video ID'),
        maxLength: 255,
      },
      colProps: {
        span: COLDEF,
      },
      rules: [
        {
          max: 255,
          message: messageErrorMaxCharacter(255),
        },
      ],
    },
    {
      type: ETypeFieldForm.TEXT_FIELD,
      label: 'Instagramトークン',
      name: 'instagram_token_id',
      atomProps: {
        placeholder: messageErrorRequired('Instagramトークン'),
        maxLength: 255,
      },
      colProps: {
        span: COLDEF,
      },
      rules: [
        {
          max: 255,
          message: messageErrorMaxCharacter(255),
        },
      ],
    },
    {
      type: ETypeFieldForm.UPLOAD,
      label: 'ロゴ',
      name: 'img_cover_path',
      length: 1,
      colProps: {
        span: COLDEF,
      },
      ref: uploadImageCoverRef,
      atomProps: {
        setUrlFile: (file) => formControl.setFieldValue('img_cover_path', file),
        initialFileList: initValues?.img_cover_url
          ? [
              {
                uid: initValues?.img_cover_url,
                url: initValues?.img_cover_url,
                name: initValues?.img_cover_url,
              },
            ]
          : [],
      },
      rules: [
        {
          required: true,
          message: messageErrorRequired('ロゴ', EMessageErrorRequired.SELECT),
        },
      ],
    },
    {
      type: ETypeFieldForm.TEXT_FIELD,
      label: '動画フォルダID',
      name: 'folder_id',
      atomProps: {
        placeholder: messageErrorRequired('動画フォルダID'),
        maxLength: 255,
      },
      colProps: {
        span: COLDEF,
      },
      rules: [
        {
          required: true,
          whitespace: true,
          message: messageErrorRequired('動画フォルダID'),
        },
        {
          max: 255,
          message: messageErrorMaxCharacter(255),
        },
      ],
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
    {
      type: ETypeFieldForm.DATEPICKER,
      label: '公開開始日',
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
          message: messageErrorRequired('公開開始日', EMessageErrorRequired.SELECT),
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
    // {
    //   type: ETypeFieldForm.INPUT_NUMBER,
    //   label: '表示順',
    //   name: 'order',
    //   atomProps: {
    //     placeholder: '表示順.を入力してください',
    //     formControl,
    //   },
    //   colProps: {
    //     span: COLDEF,
    //   },
    //   rules: [
    //     {
    //       required: true,
    //       message: messageErrorRequired('表示順'),
    //     },
    //   ],
    // },
    {
      type: ETypeFieldForm.CHECKBOX,
      label: '表示タブ',
      name: 'list_active',
      atomProps: {
        options: optionsDisplayTabFacility,
      },
      colProps: {
        span: COL_HAFT,
      },
    },
  ];

  const handleSubmit = (values: IFacility) => {
    if (uploadImageCoverRef.current?.status !== EStatusFileUpload.SUCCESS) {
      message.warning('ロゴ画像をアップロードしていますので、少々お待ちください。');
      return;
    }

    try {
      const params = {
        ...values,
        img_cover_url: formControl.getFieldValue('img_cover_path'),
        start_date: convertDateToFormat(values.start_date),
        end_date: convertDateToFormat(values.end_date),
      };

      // handle checkbox is_active
      if (Array.isArray(params.list_active)) {
        optionsDisplayTabFacility.forEach((active) => {
          const key = active.value as keyof IIsActiveFacility;
          if (params.list_active?.includes(key)) {
            params[key] = true;
          } else params[key] = false;
        });
      }
      delete params.list_active;

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
            onNavigate: () => navigate(APP_ROUTE_URL.FACILITY.INDEX),
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
          navigate(APP_ROUTE_URL.FACILITY.INDEX);
        },
      });
    } else navigate(APP_ROUTE_URL.FACILITY.INDEX);
  };

  const handleDelete = () => {
    Modal.confirm({
      title: 'このカテゴリーを削除してもよろしいですか?',
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
          initialValues={isEdit ? initValues : { is_active: 0 }}
          onCancel={handleCancel}
          onDelete={handleDelete}
          onValuesChange={handleValuesChange}
          loading={loadingForm}
        />
      )}
    </div>
  );
}

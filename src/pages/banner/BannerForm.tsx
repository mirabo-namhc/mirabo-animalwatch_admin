import { Form, Spin } from 'antd';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '~/_lib/redux/hooks';
import { useGetDetail } from '~/hooks';
import useURLInfo from '~/hooks/useURLInfo';
import { ETypeFieldForm } from '~/types/enum.type';
import { TMappedFormItems } from '~/types/form.type';
import { APP_ROUTE_URL } from '~constants/endpoint';
import { COLDEF, COL_HAFT, isActiveFacilityOptions } from '~constants/form';
import OForm from '~organisms/o-form';
import { bannerActions } from '~store/banner/bannerSlice';
import { IBanner } from '~types';
import { convertDateToFormat } from '~utils/datetime';

export default function BannerForm() {
  const dispatch = useAppDispatch();
  const [ formControl ] = Form.useForm();
  const navigate = useNavigate();

  const { loadingForm } = useAppSelector((state) => state.banner);
  const { id, isEdit, isCreate } = useURLInfo();

  const { detailData, loading } = useGetDetail<IBanner | undefined>({
    action: bannerActions,
    nameState: 'banner',
    isGetApi: isEdit,
  });

  const initValues = {
    ...detailData,
    start_date: detailData?.start_date && dayjs(detailData?.start_date),
    end_date: detailData?.end_date && dayjs(detailData?.end_date),
  };

  const listFieldForm: TMappedFormItems[] = [
    {
      type: ETypeFieldForm.TEXT_FIELD,
      label: '施設名',
      name: 'order',
      atomProps: {
        placeholder: '',
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
      label: 'リンク',
      name: 'link',
      atomProps: {
        placeholder: '',
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
      label: 'クーポン写真',
      name: 'image_url',
      colProps: {
        span: COLDEF,
      },
      rules: [
        {
          required: true,
          message: 'Required',
        },
      ],
      length: 1,
    },
    {
      type: ETypeFieldForm.DATEPICKER,
      label: '公開日',
      name: 'start_date',
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
          message: 'Required',
        },
      ],
    },
  ];

  const handleSubmit = (values: IBanner) => {
    const params = {
      ...values,
      start_date: convertDateToFormat(values.start_date),
      end_date: convertDateToFormat(values.end_date),
  
      // mock image
      image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Example_image.svg/600px-Example_image.svg.png',
    };

    if (isCreate) {
      dispatch(
        bannerActions.create({
          params,
          onCreatedSuccess: () => {
            navigateToBannerList();
          },
        }),
      );
    } else if (isEdit) {
      dispatch(
        bannerActions.edit({
          id,
          ...params,
          onNavigate: () => navigate(`../${APP_ROUTE_URL.SETTING.INDEX}/${APP_ROUTE_URL.SETTING.BANNER.INDEX}`, { replace: true }),
        }),
      );
    }
  };
  
  const navigateToBannerList = () => {
    navigate(`../${APP_ROUTE_URL.SETTING.INDEX}/${APP_ROUTE_URL.SETTING.BANNER.INDEX}`, { replace: true });
  };
  
  const handleCancel = () => {
    if (isCreate) navigate(`${APP_ROUTE_URL.SETTING.INDEX}/${APP_ROUTE_URL.SETTING.BANNER.INDEX}`);
  };

  const handleValuesChange = (value: IBanner) => {
    if (!Object.keys(value).includes('start_date') || !value.start_date) return;
    formControl.setFieldValue('end_date', null);
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
          onValuesChange={handleValuesChange}
          loading={loadingForm}
        />
      )}
    </div>
  );
}

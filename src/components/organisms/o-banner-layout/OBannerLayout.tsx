import type { AnyObject } from 'antd/es/_util/type';
import React from 'react';
import './OBannerLayout.scss';
import { Image } from 'antd';
import AButton from '~atoms/a-button';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { EBannerTypeEnum, IBanner } from '~types';
import {
  APP_ROUTE_URL,
  ROUTE_COUPON_EDIT,
  ROUTE_EVENT_INFOR_EDIT,
  ROUTE_FACILITY_EDIT,
  ROUTE_QUIZ_EDIT,
} from '~constants/endpoint';

interface TOBannerLayout<T> {
  className?: string;
  banner: IBanner;
  handleEditBanner: React.MouseEventHandler<HTMLElement>;
  handleDeleteBanner: React.MouseEventHandler<HTMLElement>;
}

export function OBannerLayout<T extends AnyObject>({
  banner,
  handleEditBanner,
  handleDeleteBanner,
}: TOBannerLayout<T>) {
  const renderReferencesLink = (): React.ReactNode => {
    let pathname = '';
    const origin = window.location.origin;

    switch (banner.type) {
      case EBannerTypeEnum.FACILITY:
        pathname = `${ROUTE_FACILITY_EDIT}?id=${banner.reference_id}`;
        break;
      case EBannerTypeEnum.COUPON:
        pathname = `${ROUTE_FACILITY_EDIT}?id=${banner.reference_id}`;
        break;
      case EBannerTypeEnum.QUIZ:
        pathname = `${ROUTE_QUIZ_EDIT}?id=${banner.reference_id}`;
        break;

      case EBannerTypeEnum.EVENT:
        pathname = `${ROUTE_EVENT_INFOR_EDIT}?id=${banner.reference_id}`;
        break;
    }
    return (
      <a href={`${origin}${pathname}`} target="_blank">
        {String(banner.type).toUpperCase()}
      </a>
    );
  };

  return (
    <div className="dis-flex mb-40">
      <div className="banner-side-left">
        <span>画像{banner.order}</span>
      </div>
      <div className="banner-side-right">
        <div className="banner-side-right-content">
          <div>
            <Image width={600} height={250} src={banner.image_url} />
          </div>

          <div className="mt-6">
            <span className="banner-side-right-content-link">{renderReferencesLink()}</span>
          </div>

          <div className="mt-6">
            <span>開始日: {banner.start_date as string} </span>
            <span className="ml-40">終了日: {banner.end_date as string}</span>
          </div>

          <div className="mt-6">
            <span>非表示フラグ:</span>
            <span className="ml-20">{banner.is_active ? '表示' : '非表示'}</span>
          </div>
        </div>

        <div className="banner-side-right-button">
          <AButton
            size="small"
            onClick={handleEditBanner}
            type="primary"
            leftIcon={<EditOutlined />}
          >
            編集
          </AButton>

          <AButton
            size="small"
            onClick={handleDeleteBanner}
            type="primary"
            leftIcon={<DeleteOutlined />}
            className="mt-10"
            danger
          >
            消去
          </AButton>
        </div>
      </div>
    </div>
  );
}

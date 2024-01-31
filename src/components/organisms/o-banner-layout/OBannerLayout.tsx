import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Image } from 'antd';
import type { AnyObject } from 'antd/es/_util/type';
import React from 'react';
import AButton from '~atoms/a-button';
import { IBanner } from '~types';
import './OBannerLayout.scss';
import dayjs from 'dayjs';
import { getTextEActive } from '~utils/funcHelper';

interface TOBannerLayout<T> {
  className?: string;
  banner: IBanner;
  index: number;
  handleEditBanner: React.MouseEventHandler<HTMLElement>;
  handleDeleteBanner: React.MouseEventHandler<HTMLElement>;
}

export function OBannerLayout<T extends AnyObject>({
  banner,
  index,
  handleEditBanner,
  handleDeleteBanner,
}: TOBannerLayout<T>) {
  // const renderReferencesLink = (): React.ReactNode => {
  //   let pathname = '';
  //   const origin = window.location.origin;

  //   switch (banner.type) {
  //     case EBannerTypeEnum.FACILITY:
  //       pathname = `${ROUTE_FACILITY_EDIT}?id=${banner.reference_id}`;
  //       break;
  //     case EBannerTypeEnum.COUPON:
  //       pathname = `${ROUTE_FACILITY_EDIT}?id=${banner.reference_id}`;
  //       break;
  //     case EBannerTypeEnum.QUIZ:
  //       pathname = `${ROUTE_QUIZ_EDIT}?id=${banner.reference_id}`;
  //       break;

  //     case EBannerTypeEnum.EVENT:
  //       pathname = `${ROUTE_EVENT_INFOR_EDIT}?id=${banner.reference_id}`;
  //       break;
  //   }
  //   return (
  //     <a href={`${origin}${pathname}`} target="_blank">
  //       {String(banner.type).toUpperCase()}
  //     </a>
  //   );
  // };

  return (
    <div className="dis-flex mb-40">
      <div className="banner-side-left">
        {/* <span>画像{banner.order}</span> */}
        <span>画像{index}</span>
      </div>
      <div className="banner-side-right">
        <div className="banner-side-right-content">
          <Image
            width={600}
            src={banner.image_url}
            alt="My Image"
            style={{
              minHeight: '300px',
              maxHeight: '600px',
            }}
          />

          {/* 
          <div className="mt-6">
            <span className="banner-side-right-content-link">{renderReferencesLink()}</span>
          </div> */}

          <div className="mt-6">
            <span>公開日: {dayjs(banner.start_date).format('YYYY/MM/DD') as string} </span>

            {banner.end_date && (
              <span className="ml-40">
                公開終了日: {dayjs(banner.end_date).format('YYYY/MM/DD') as string}
              </span>
            )}
          </div>

          <div className="mt-6">
            <span>非表示フラグ:</span>
            <span className="ml-20">{getTextEActive(banner.is_active)}</span>
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

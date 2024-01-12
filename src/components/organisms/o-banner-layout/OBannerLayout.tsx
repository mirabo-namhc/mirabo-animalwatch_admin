import type { AnyObject } from 'antd/es/_util/type';
import React from 'react';

import './OBannerLayout.scss';
import { Image } from 'antd';
import AButton from '~atoms/a-button';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

interface TOBannerLayout<T> {
  className?: string;
  name: string;
  imageUrl: string;
  link: string;
  startDate: string;
  endDate: string;
  status: string;
  handleEditBanner: React.MouseEventHandler<HTMLElement>;
  handleDeleteBanner: React.MouseEventHandler<HTMLElement>;
}

export function OBannerLayout<T extends AnyObject>({
  name,
  imageUrl,
  link,
  startDate,
  endDate,
  status,
  handleEditBanner,
  handleDeleteBanner,
}: TOBannerLayout<T>) {
  return (
    <div className="dis-flex mb-40">
        <div className='banner-side-left'>
          <span>{name}</span>
        </div>
        <div className='banner-side-right'>
          <div className="banner-side-right-content">
            <div>
              <Image
                width={600}
                height={250}
                src={imageUrl}
              />
            </div>

            <div className='mt-6'>
              <span className='banner-side-right-content-link'>{link}</span>
            </div>

            <div className='mt-6'>
              <span>開始日: {startDate}</span>
              <span className='ml-40'>終了日: {endDate}</span>
            </div>

            <div className='mt-6'>
              <span>表示状態</span>
              <span className='ml-20'>{status}</span>
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
              className='mt-10'
              danger
            >
              消去
            </AButton>
          </div>
        </div>
      </div>
  );
}

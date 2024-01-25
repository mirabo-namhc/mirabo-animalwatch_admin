import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OBannerLayout from '~organisms/o-banner-layout';
import AButton from '~atoms/a-button';
import { PlusCircleOutlined } from '@ant-design/icons';
import { APP_ROUTE_URL } from '~constants/endpoint';
import { Modal, Spin } from 'antd';
import { useGetList } from '~/hooks';
import { IBanner, TFilterParams } from '~types';
import { bannerActions } from '~store/banner/bannerSlice';
import { useAppDispatch } from '~/_lib/redux/hooks';
import { eventActions } from '~store/event/eventSlice';
import { couponActions } from '~store/coupon/couponSlice';
import { facilityActions } from '~store/facility/facilitySlice';
import { quizActions } from '~store/quiz/quiz.slice';

export default function BannerList() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [paramsQuery] = useState<TFilterParams<IBanner>>({});

  const { listData: listBanner, loading } = useGetList({
    params: paramsQuery,
    action: bannerActions,
    nameState: 'banner',
  });

  const onNavigateCreate = () => {
    navigate(APP_ROUTE_URL.SETTING.BANNER.CREATE);
  };

  const handleEditBanner = (id?: number) => {
    navigate(`${APP_ROUTE_URL.SETTING.BANNER.EDIT}?id=${id}`);
  };

  const handleDeleteBanner = (id?: number) => {
    Modal.confirm({
      title: (
        <span>
          バナーを削除しますか。
          <br />
          よろしいでしょうか。
        </span>
      ),
      okText: 'はい',
      okType: 'danger',
      cancelText: 'いいえ',
      onOk() {
        dispatch(
          bannerActions.remove({
            id: Number(id),
            onNavigate: () => navigate(0),
          }),
        );
      },
    });
  };

  React.useEffect(() => {
    return () => {
      dispatch(eventActions.clearData());
      dispatch(couponActions.clearData());
      dispatch(facilityActions.clearData());
      dispatch(quizActions.clearData());
    };
  }, []);

  return (
    <div className="gray fs-20">
      <div className="dis-flex mb-10 ai-center jc-space-between mb-30">
        <AButton
          size="middle"
          onClick={onNavigateCreate}
          type="primary"
          leftIcon={<PlusCircleOutlined />}
        >
          新規登録
        </AButton>
      </div>

      {loading ? (
        <div className="mt-30 dis-flex jc-center">
          <Spin size="large" />
        </div>
      ) : (
        (listBanner as IBanner[]).map((item) => (
          <OBannerLayout
            key={item.id}
            banner={item}
            handleEditBanner={() => handleEditBanner(item.id)}
            handleDeleteBanner={() => handleDeleteBanner(item.id)}
          />
        ))
      )}
    </div>
  );
}

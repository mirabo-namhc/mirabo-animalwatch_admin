import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OBannerLayout from '~organisms/o-banner-layout';
import AButton from '~atoms/a-button';
import { PlusCircleOutlined } from '@ant-design/icons';
import { APP_ROUTE_URL } from '~constants/endpoint';
import { Card, Modal, Spin, Tooltip } from 'antd';
import { useGetList } from '~/hooks';
import { IBanner, TFilterParams } from '~types';
import { bannerActions } from '~store/banner/bannerSlice';
import { useAppDispatch } from '~/_lib/redux/hooks';
import { eventActions } from '~store/event/eventSlice';
import { couponActions } from '~store/coupon/couponSlice';
import { facilityActions } from '~store/facility/facilitySlice';
import { quizActions } from '~store/quiz/quiz.slice';
import { videoActions } from '~store/video/videoSlice';
import MCard from '~molecules/m-card';
import { getTextEActive } from '~utils/funcHelper';
import { convertOnlyDate } from '~utils/datetime';

const MAX_BANNER_SIZE = 5;
const MIN_BANNER_SIZE = 0;

const gridStyle: React.CSSProperties = {
  width: '330px',
  textAlign: 'center',
  borderTopLeftRadius: '8px',
  borderTopRightRadius: '8px',
  backgroundColor: 'unset',
  border: 'unset',
  boxShadow: 'unset',
};

export default function BannerList() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isActiveBtnCreateBanner, setIsActiveBtnCreateBanner] = useState(false);
  const [paramsQuery] = useState<TFilterParams<IBanner>>({
    current_page: 1,
    per_page: MAX_BANNER_SIZE,
  });

  const { listData: listBanner, loading } = useGetList<IBanner[]>({
    params: paramsQuery,
    action: bannerActions,
    nameState: 'banner',
  });

  const showListBanner = useMemo(
    () => (
      <Card style={{ background: 'unset', border: 'unset', flexWrap: 'wrap' }}>
        {listBanner.map((banner, index) => (
          <Card.Grid hoverable={false} style={gridStyle} key={index}>
            <MCard
              className="m-card-banner"
              thumbnailUrl={banner.image_url}
              onActionEdit={() => banner?.id && handleEditBanner(banner.id)}
              onActionDelete={() => handleDeleteBanner(banner.id)}
              description={
                <div
                  style={{
                    textAlign: 'left',
                  }}
                >
                  <p> 非表示フラグ: {getTextEActive(banner.is_active)}</p>
                  <p> 公開日: {convertOnlyDate(banner.start_date as string)}</p>
                  <p> 公開終了日: {convertOnlyDate(banner.end_date as string)}</p>
                </div>
              }
            />
          </Card.Grid>
        ))}
      </Card>
    ),
    [listBanner],
  );

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
            onDeleteSuccess: () => {
              dispatch(bannerActions.setReloadList(true));
            },
          }),
        );
      },
    });
  };

  React.useEffect(() => {
    if (
      Array.isArray(listBanner) &&
      !loading &&
      listBanner.length >= MIN_BANNER_SIZE &&
      listBanner.length < MAX_BANNER_SIZE
    ) {
      setIsActiveBtnCreateBanner(true);
    } else {
      setIsActiveBtnCreateBanner(false);
    }
  }, [listBanner, loading]);

  React.useEffect(() => {
    return () => {
      dispatch(eventActions.clearData());
      dispatch(couponActions.clearData());
      dispatch(facilityActions.clearData());
      dispatch(quizActions.clearData());
      dispatch(videoActions.clearData());
    };
  }, []);

  return (
    <div className="gray fs-20">
      <div className="dis-flex mb-10 ai-center jc-space-between mb-30">
        <AButton
          size="middle"
          onClick={onNavigateCreate}
          type="primary"
          disabled={!isActiveBtnCreateBanner}
          leftIcon={<PlusCircleOutlined />}
        >
          新規登録
        </AButton>
      </div>
      <div>
        {loading ? (
          <Card style={{ width: 300, marginTop: 16 }} loading={loading}></Card>
        ) : (
          <React.Fragment>{Array.isArray(listBanner) && showListBanner} </React.Fragment>
        )}
      </div>
    </div>
  );
}

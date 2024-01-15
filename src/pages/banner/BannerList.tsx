import { useNavigate } from 'react-router-dom';
import OBannerLayout from '~organisms/o-banner-layout';
import AButton from '~atoms/a-button';
import { PlusCircleOutlined } from '@ant-design/icons';
import { APP_ROUTE_URL } from '~constants/endpoint';
import { Modal } from 'antd';
import { useState } from 'react';

export default function BannerList() {
  const navigate = useNavigate();
  const [banners, setBanners] = useState([
    {
      key: 1,
      name: '画像1',
      imageUrl: 'https://www.shutterstock.com/image-photo/example-word-written-on-wooden-260nw-1765482248.jpg',
      link: 'https://www.shutterstock.com/',
      startDate: '2023/11/13',
      endDate: '2023/11/13',
      status: 'ON',
    },
    {
      key: 2,
      name: '画像2',
      imageUrl: 'https://st5.depositphotos.com/3003449/63896/i/380/depositphotos_638962942-stock-photo-examples-word-written-wood-block.jpg',
      link: 'https://www.shutterstock.com/',
      startDate: '2023/11/13',
      endDate: '2023/11/13',
      status: 'ON',
    },
    {
      key: 3,
      name: '画像3',
      imageUrl: 'https://st5.depositphotos.com/73724230/62419/i/450/depositphotos_624195698-stock-photo-wooden-blocks-example-text-concept.jpg',
      link: 'https://www.shutterstock.com/',
      startDate: '2023/11/13',
      endDate: '2023/11/13',
      status: 'OFF',
    },
  ]);

  const onNavigateCreate = () => {
    navigate(APP_ROUTE_URL.SETTING.BANNER.CREATE);
  };

  const handleEditBanner = (id: number) => {
    navigate(`${APP_ROUTE_URL.SETTING.BANNER.EDIT}/${id}`);
  };

  const handleDeleteBanner = (id: number) => {
    Modal.confirm({
      title: 'バナー削除の確​​認',
      content: 'このバナーを削除してもよろしいですか?',
      okText: 'はい',
      okType: 'danger',
      cancelText: 'いいえ',
      onOk() {
        console.log('delete ' + id);
        setBanners(banners.filter((banner) => banner.key != id));
      },
    });
  };

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

      {
        banners.map((item) =>
          <OBannerLayout
            key={item.key}
            name={item.name}
            imageUrl={item.imageUrl}
            link={item.link}
            startDate={item.startDate}
            endDate={item.endDate}
            status={item.status}
            handleEditBanner={() => handleEditBanner(item.key)}
            handleDeleteBanner={() => handleDeleteBanner(item.key)}
          />
        )
      }
    </div>
  );
}

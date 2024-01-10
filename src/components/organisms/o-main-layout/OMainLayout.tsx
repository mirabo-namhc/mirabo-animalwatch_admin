import { Layout } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import OFooter from '~organisms/o-footer';
import OHeader from '~organisms/o-header';
import OSideMenu from '~organisms/o-side-menu/OSideMenu';
import { itemsSideMenu, itemLogoutMenu } from './ItemSideMenu';
import './OMainLayout.scss';
import clsx from 'clsx';
import useURLInfo from '~/hooks/useURLInfo';

export default function OMainLayout() {
  const navigate = useNavigate();
  const { isFormPage } = useURLInfo();
  const onClickMenuItem = (key: string) => {
    navigate(key);
  };

  const classLayout = clsx('layout-content pos-relative px-20', {
    'px-100': isFormPage,
  });

  return (
    <Layout className="admin-layout">
      <OHeader />
      <Layout.Content className="py-16">
        <Layout hasSider>
          <OSideMenu
            items={itemsSideMenu}
            itemLogout={itemLogoutMenu}
            onSelectMenuItem={onClickMenuItem}
          />
          <Layout.Content className={classLayout}>
            <Outlet />
          </Layout.Content>
        </Layout>
      </Layout.Content>
      <OFooter />
    </Layout>
  );
}

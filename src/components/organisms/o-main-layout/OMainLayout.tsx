import { Layout } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import OFooter from '~organisms/o-footer';
import OHeader from '~organisms/o-header';
import OSideMenu from '~organisms/o-side-menu/OSideMenu';
import { itemsSideMenu, itemLogoutMenu } from './ItemSideMenu';
import './OMainLayout.scss';
import clsx from 'clsx';

export default function OMainLayout() {
  const navigate = useNavigate();
  const { pathname }: { pathname: string } = useLocation();
  const onClickMenuItem = (key: string) => {
    navigate(key);
  };

  const isFormPage =
    pathname.includes('/detail') || pathname.includes('/edit') || pathname.includes('/create');

  const classLayout = clsx('layout-content pos-relative px-20', {
    'px-60': isFormPage,
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

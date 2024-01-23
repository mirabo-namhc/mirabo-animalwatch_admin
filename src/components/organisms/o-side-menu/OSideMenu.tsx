import { Layout, Menu, Modal } from 'antd';
import type { MenuProps } from 'antd/lib';
import clsx from 'clsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '~/_lib/redux/hooks';
import { IconArrowNext, IconArrowPrev } from '~/assets/icon';
import { useURLInfo } from '~/hooks';
import AButton from '~atoms/a-button';
import { APP_ROUTE_URL } from '~constants/endpoint';
import { authActions } from '~store/auth/authSlice';
import './OSideMenu.scss';

export type MenuItem = Required<MenuProps>['items'][number];

interface IOSideMenu {
  items: MenuItem[];
  itemLogout: MenuItem[];
  onSelectMenuItem: (key: string, keyPath: string[]) => void;
}

function OSideMenu({ items, itemLogout, onSelectMenuItem }: IOSideMenu) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pageName, pathname } = useURLInfo();

  const [collapsed, setCollapsed] = useState(false);
  const classBtnExpand = clsx('dis-flex pt-12 px-12', {
    'jc-center': collapsed,
    'jc-flex-end': !collapsed,
  });
  const classSider = clsx('o-side-menu bg-gray-0 shadow-low rounded-8 ml-16', {
    'ant-layout-sider-expanded': !collapsed,
  });

  const onLogout = () => {
    Modal.confirm({
      title: 'Confirm Logout',
      content: 'Are you sure you want to logout?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        dispatch(
          authActions.logout({
            onNavigate: () => navigate(APP_ROUTE_URL.LOGIN),
          }),
        );
      },
    });
  };

  return (
    <Layout.Sider
      collapsible
      collapsed={collapsed}
      collapsedWidth={72}
      width={200}
      trigger={null}
      className={classSider}
    >
      <div className={classBtnExpand}>
        <AButton
          size="small"
          className="btn-expand w-24 h-24 mb-10"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <img src={IconArrowNext} alt="icon-menu" />
          ) : (
            <img src={IconArrowPrev} alt="icon-menu" />
          )}
        </AButton>
      </div>
      <Menu
        className="menu-list"
        mode="inline"
        onSelect={({ key, keyPath }) => onSelectMenuItem(key, keyPath)}
        expandIcon={null}
        selectedKeys={[pageName, pathname]}
        items={items}
        style={{ borderRight: 0 }}
      />
      <Menu
        className="menu-logout"
        mode="inline"
        expandIcon={null}
        selectable={false}
        items={itemLogout}
        style={{ borderRight: 0 }}
        onClick={() => onLogout()}
      />
    </Layout.Sider>
  );
}

export default OSideMenu;

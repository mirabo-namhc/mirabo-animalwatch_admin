import { Layout } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import OFooter from '~organisms/o-footer';
import OHeader from '~organisms/o-header';
import OSideMenu from '~organisms/o-side-menu/OSideMenu';
import { itemsSideMenu, itemLogoutMenu } from './ItemSideMenu';
import './OMainLayout.scss';

export default function OMainLayout() {
    const navigate = useNavigate();
    const onClickMenuItem = (key: string) => {
        navigate(key)
    };

    return (
        <Layout className="admin-layout">
            <OHeader />
            <Layout.Content className="py-16">
                <Layout hasSider>
                    <OSideMenu items={itemsSideMenu} itemLogout={itemLogoutMenu} onSelectMenuItem={onClickMenuItem} />
                    <Layout.Content className="layout-content pos-relative"><Outlet /></Layout.Content>
                </Layout>
            </Layout.Content>
            <OFooter />
        </Layout>
    )
}
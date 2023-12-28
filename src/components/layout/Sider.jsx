import React, { useEffect, useState } from "react";
import {
  BellOutlined,
  BookOutlined,
  CalendarOutlined,
  CheckSquareOutlined,
  DatabaseOutlined,
  DesktopOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
  GiftOutlined,
  MailOutlined,
  OrderedListOutlined,
  PieChartOutlined,
  TagOutlined,
  UserOutlined,
  UsergroupAddOutlined,
  FileImageOutlined,
  UpSquareOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import { t } from "i18next";
import Proptypes from "prop-types";
import { Link, useLocation } from "react-router-dom";

import { CCLogoMark } from "@assets/icons";
import logoCC from "@assets/imgs/CCLogo.png";
import PATH_URL from "@common/config/pathURL";

function Sider({ collapsed, setCollapsed }) {
  const { pathname } = useLocation();
  const page = pathname.split("/")[1];

  const [active, setActive] = useState("");
  const handleClick = (values) => {
    if (window.location.pathname === values) {
      window.location.reload();
    }
  };
  const { SubMenu } = Menu;

  // Function để tạo menu item với hoặc không có children
  function getItem(labelText, key, path, children) {
    if (children && children.length > 0) {
      const subMenuItems = children.map((child, index) => (
        <Menu.Item key={`${key}-${index + 1}`}>
          <Link to={child.path}>{child.label}</Link>
        </Menu.Item>
      ));

      return (
        <SubMenu key={key} title={labelText}>
          {subMenuItems}
        </SubMenu>
      );
    } else {
      return (
        <Menu.Item key={key}>
          <Link to={path}>{labelText}</Link>
        </Menu.Item>
      );
    }
  }

  const itemsActive = {
    dashboard: "1",
    "manager-user": "2",
    "manager-admin": "3",
    "manager-account": "4",
    "manager-collection": "5",
    "manager-event": "6",
    "manager-course": "7",
    posts: "8",
    "management-checkpoints": "9",
    "management-notification": "10",
    "gift-code": "11",
    badge: "12",
    "manager-sendmail": "13",
    "manager-data": "14",
    "manager-version": "15",
    "manager-group": "16",
    "manager-usertag": "17",
    "manager-result-image": "18",
    "manager-level": "19",
  };

  const handleToggleCollapse = () => {
    setCollapsed((curentState) => !curentState);
  };

  useEffect(() => {
    setActive(itemsActive[page]);
  }, [page]);

  return (
    <Layout.Sider
      breakpoint="lg"
      className="layout-sider"
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width={250}
    >
      <Menu selectedKeys={[active]} mode="inline">
        {getItem("カテゴリ一覧", "1", PATH_URL.DASHBOARD)}
        {getItem("クーポン一覧", "2", PATH_URL.MANAGER_USER.INDEX)}
        {getItem("写真一覧", "3", PATH_URL.MANAGER_ADMIN.INDEX)}
        {getItem("設定", "4", PATH_URL.MANAGER_ADMIN.INDEX)}
        {getItem("動画データ同期", "5", PATH_URL.MANAGER_ADMIN.INDEX)}
        {getItem("クイズ・豆知識", "6", PATH_URL.MANAGER_ADMIN.INDEX)}
        {getItem("施設情報", "7", PATH_URL.MANAGER_ACCOUNT.INDEX, [
          { label: "Child 1", path: "/child1" },
          { label: "Child 2", path: "/child2" },
        ])}
        {getItem("お知らせ一覧", "8", PATH_URL.MANAGER_ADMIN.INDEX)}
        {getItem("ログアウト", "9", PATH_URL.MANAGER_ADMIN.INDEX)}
      </Menu>
      {/* <Button
        type="text"
        className="btn-collapse"
        onClick={handleToggleCollapse}
      >
        {collapsed ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}
      </Button> */}
    </Layout.Sider>
  );
}

Sider.propTypes = {
  collapsed: Proptypes.bool,
  setCollapsed: Proptypes.func,
};

export default Sider;

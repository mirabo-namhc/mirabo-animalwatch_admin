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
  function getItem(labelText, key, icon, path) {
    const label = (
      <Link
        to={path}
        className="fw-500 fz-14 pt-10"
        onClick={() => handleClick(path)}
      >
        {labelText}
      </Link>
    );

    return {
      key,
      icon,
      label,
    };
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

  const items = [
    getItem(
      t("layout.sider.dashboard"),
      "1",
      <PieChartOutlined />,
      PATH_URL.DASHBOARD,
    ),
    getItem(
      t("layout.sider.managerUser"),
      "2",
      <DesktopOutlined />,
      PATH_URL.MANAGER_USER.INDEX,
    ),
    getItem(
      t("layout.sider.managerAdmin"),
      "3",
      <UserOutlined />,
      PATH_URL.MANAGER_ADMIN.INDEX,
    ),
    getItem(
      t("layout.sider.managerAccount"),
      "4",
      <UserOutlined />,
      PATH_URL.MANAGER_ACCOUNT.INDEX,
    ),
    getItem(
      t("layout.sider.managerCollection"),
      "5",
      <UserOutlined />,
      PATH_URL.MANAGER_COLLECTION.INDEX,
    ),
    getItem(
      t("layout.sider.managerEvent"),
      "6",
      <CalendarOutlined />,
      PATH_URL.MANAGER_EVENT.INDEX,
    ),
    getItem(
      t("layout.sider.managerCourse"),
      "7",
      <BookOutlined />,
      PATH_URL.MANAGER_COURSE.INDEX,
    ),
    getItem(
      t("layout.sider.managerCheckPoint"),
      "9",
      <CheckSquareOutlined />,
      PATH_URL.CHECKPOINT.INDEX,
    ),
    getItem(
      t("layout.sider.managerNotification"),
      "10",
      <BellOutlined />,
      PATH_URL.NOTIFICATION.INDEX,
    ),
    getItem(
      t("layout.sider.managerGiftCode"),
      "11",
      <GiftOutlined />,
      PATH_URL.GIFT_CODE.INDEX,
    ),
    getItem(
      t("layout.sider.managerBadge"),
      "12",
      <GiftOutlined />,
      PATH_URL.BADGE.INDEX,
    ),
    getItem(
      t("layout.sider.managerSendMail"),
      "13",
      <MailOutlined />,
      PATH_URL.SEND_MAIL.INDEX,
    ),
    getItem(
      t("layout.sider.managerData"),
      "14",
      <DatabaseOutlined />,
      PATH_URL.DATA_MANAGERMENT.INDEX,
    ),
    getItem(
      t("layout.sider.managerVersion"),
      "15",
      <OrderedListOutlined />,
      PATH_URL.VERSION_MANAGERMENT.INDEX,
    ),
    getItem(
      t("layout.sider.managerGroup"),
      "16",
      <UsergroupAddOutlined />,
      PATH_URL.GROUP_MANAGERMENT.INDEX,
    ),
    getItem(
      t("layout.sider.managerUsertag"),
      "17",
      <TagOutlined />,
      PATH_URL.USERTAG_MANAGERMENT.INDEX,
    ),
    getItem(
      t("layout.sider.managerResultImage"),
      "18",
      <FileImageOutlined />,
      PATH_URL.RESULT_IMAGE_MANAGERMENT.INDEX,
    ),
    getItem(
      t("layout.sider.levelManagement"),
      "19",
      <UpSquareOutlined />,
      PATH_URL.MANAGER_LEVEL.INDEX,
    ),
  ];

  return (
    <Layout.Sider
      breakpoint="lg"
      className="layout-sider"
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width={250}
    >
      <div className="flex jc-center">
        {collapsed ? (
          <div className="logo">
            <CCLogoMark />
          </div>
        ) : (
          <img className="logo" src={logoCC} alt="Logo" />
        )}
      </div>
      <hr />
      <Menu selectedKeys={active} mode="inline" items={items} />
      <Button
        type="text"
        className="btn-collapse"
        onClick={handleToggleCollapse}
      >
        {collapsed ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}
      </Button>
    </Layout.Sider>
  );
}

Sider.propTypes = {
  collapsed: Proptypes.bool,
  setCollapsed: Proptypes.func,
};

export default Sider;

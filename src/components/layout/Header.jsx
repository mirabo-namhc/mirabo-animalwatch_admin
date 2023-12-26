import React, { useEffect } from "react";
import { Badge, Col, Dropdown, Layout, Row, message, Avatar } from "antd";
import { BellOutlined, LogoutOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { t } from "i18next";

import { authStore, logoutSuccess, setData } from "@store/slices/authSlice";
import { authApi } from "@services/apis/auth";
import useFetch from "@common/hooks/useFetch";
import { IMAGE_URL } from "@common/config/endpoint";

function Header() {
  const dispatch = useDispatch();
  const { data } = useSelector(authStore);

  const handleLogout = () => {
    authApi
      .logout()
      .then(() => {
        dispatch(logoutSuccess());
        message.success(t("auth.message.logoutSuccess"));
      })
      .catch(() => {
        message.error(t("auth.message.logoutFailure"));
      });
  };

  const items = [
    {
      label: <span onClick={handleLogout}>ログアウト</span>,
      key: "logout",
      icon: <LogoutOutlined />,
    },
  ];

  return (
    <Layout.Header className="layout-header">
      <Row>
        <Col lg={6} xs={0} />
        <Col lg={18} xs={24}>
          <Row align="middle" justify="end">
            <Avatar
              // src={`${IMAGE_URL}${data?.avatar}/original.jpg`}
              alt=""
              className="avatar"
            />
            <Dropdown
              menu={{ items }}
              className="dropdown-menu"
              placement="bottomRight"
            >
              <Row className="cursor-pointer">
                {/* <span className="display-name">{data?.fullname}</span> */}
              </Row>
            </Dropdown>
          </Row>
        </Col>
      </Row>
    </Layout.Header>
  );
}

Header.propTypes = {};

export default Header;

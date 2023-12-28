import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Layout } from "antd";
import { breadcrumb } from "@common/constant/breadcumb";

import { authStore } from "@store/slices/authSlice";
import PATH_URL from "@common/config/pathURL";
import Sider from "./Sider";
import Header from "./Header";
import BreadcrumbComp from "./Breadcrumb";

const { Content } = Layout;
function LayoutComp({ children }) {
  const navigate = useNavigate();

  const { token } = useSelector(authStore);
  const [collapsed, setCollapsed] = useState(false);

  // useEffect(() => {
  //   if (!token) {
  //     navigate(PATH_URL.LOGIN);
  //   }
  // }, [token]);

  return (
    <Layout>
      <Sider collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout>
        <Header />
        <Content
          className={`layout-wraper-content ${
            collapsed ? "collapsed" : "uncollapsed"
          }`}
        >
          {/* <BreadcrumbComp breadcrumbNameData={breadcrumb} /> */}
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

LayoutComp.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default LayoutComp;

import PATH_URL from "@common/config/pathURL";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "antd";
import QuantityPurchasedBadge from "@components/badge/QuantityPurchasedBadge";
import UserBuyBadge from "@components/badge/UserBuyBadge";
import InfoBadge from "./InfoBadge";

function DashBoard() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [quantityNewUserThisMonth, setQuantityNewUserThisMonth] = useState(0);
  const [registeredUser, setRegisteredUser] = useState(0);

  const dataInfoBadge = [
    {
      title: t("home.quantityNewUserThisMonth"),
      borderColor: "#70AD47",
      data: quantityNewUserThisMonth,
      handleNavigate: () => navigate(PATH_URL.USER_MANAGEMENT),
    },
    {
      title: t("home.registeredUser"),
      borderColor: "#FFC000",
      data: registeredUser,
      handleNavigate: () => navigate(PATH_URL.USER_MANAGEMENT),
    },
  ];

  const renderInfoBadge = () => {
    const listInfoBadge = dataInfoBadge.map((infoItem, index) => {
      return (
        <InfoBadge
          key={index}
          data={infoItem.data}
          title={infoItem.title}
          borderColor={infoItem.borderColor}
          handleNavigate={infoItem.handleNavigate}
        />
      );
    });
    return listInfoBadge;
  };

  return (
    <div className="homepage layout-content">
      <Row className="rowgap-vbox" gutter={[24, 0]}>
        {renderInfoBadge()}
      </Row>
      {/* <Row gutter={[24, 0]}>
        <Col span={24} md={12} className="mb-24">
          <QuantityPurchasedBadge
            quantity={760}
            title={t("home.quantityNewUserThisMonth")}
          />
        </Col>
        <Col span={24} md={12} className="mb-24">
          <UserBuyBadge
            quantity={11760}
            title={t("home.registeredUser")}
            percent={50}
          />
        </Col>
      </Row> */}
    </div>
  );
}

export default DashBoard;

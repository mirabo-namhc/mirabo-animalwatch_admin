import { CalendarOutlined } from "@ant-design/icons";
import { Card, Col, Progress, Row, Typography } from "antd";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import React from "react";

function UserBuyBadge({ title, quantity, percent, ...props }) {
  const { Title } = Typography;
  const { t } = useTranslation();

  return (
    <Card bordered={false} className="criclebox mt-20 user-buy">
      <div className="number">
        <Row align="middle" gutter={[24, 0]}>
          <Col className="col-icon" xs={6}>
            <div className="icon-box">
              <CalendarOutlined className="icon-blue" />
            </div>
          </Col>
          <Col xs={18}>
            <Title className="" level={4}>
              {title}
            </Title>
            <span className="main-color-text fz-14">{quantity}</span>
            <Progress percent={percent} size="small" />
            <span className="main-color-text fz-14">
              {t("home.userBuy.percentInMonth", {
                percentInMonth: percent,
              })}
            </span>
          </Col>
        </Row>
      </div>
    </Card>
  );
}

UserBuyBadge.propTypes = {
  title: PropTypes.string,
  quantity: PropTypes.number,
  percent: PropTypes.number,
};

export default UserBuyBadge;

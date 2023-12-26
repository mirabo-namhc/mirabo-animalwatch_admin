import { Button, Card, Col, Row, Typography } from "antd";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import React from "react";

function InfoBadge({ borderColor, handleNavigate, data, title, ...props }) {
  const { Title } = Typography;
  const { t } = useTranslation();

  return (
    <Col xs={24} sm={24} md={12} lg={6} xl={6} className="mb-24 info-badge">
      <Card
        style={{ border: `5px solid ${borderColor}` }}
        bordered={false}
        className="criclebox "
      >
        <div className="number">
          <Row align="middle" gutter={[24, 0]}>
            <Col>
              <span className="total-item main-color-text fz-40">{data}</span>
              <Title className="main-color-text" level={3}>
                {title}
              </Title>
            </Col>
          </Row>
          {/* <Button
            onClick={handleNavigate}
            style={{ backgroundColor: borderColor, color: "#FFFFFF" }}
            className="full-width mt-10 button-redirect"
          >
            {t("home.moreInfo")}
          </Button> */}
        </div>
      </Card>
    </Col>
  );
}
InfoBadge.propTypes = {
  borderColor: PropTypes.string,
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.string,
  handleNavigate: PropTypes.func,
};

export default InfoBadge;

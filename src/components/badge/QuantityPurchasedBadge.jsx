import { ShoppingCartOutlined } from "@ant-design/icons";
import { Card, Col, Row, Typography } from "antd";
import PropTypes from "prop-types";
import React from "react";

function QuantityPurchasedBadge({ title, quantity, ...props }) {
  const { Title } = Typography;
  return (
    <Card
      bordered={false}
      className="criclebox main-bg-color mt-20 card-quantity"
    >
      <div className="number">
        <Row align="middle" gutter={[24, 0]}>
          <Col className="col-icon" xs={6}>
            <div className="icon-box">
              <ShoppingCartOutlined />
            </div>
          </Col>
          <Col xs={18}>
            <Title className="color-white" level={4}>
              {title}
            </Title>
            <span className="color-white fw-700 fz-20">{quantity}</span>
          </Col>
        </Row>
      </div>
    </Card>
  );
}

QuantityPurchasedBadge.propTypes = {
  title: PropTypes.string,
  quantity: PropTypes.number,
};

export default QuantityPurchasedBadge;

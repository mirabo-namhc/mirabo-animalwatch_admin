import React from "react";
import PropTypes from "prop-types";
import { Col, Divider, Image, Typography } from "antd";

export default function FormDetail({
  title,
  text,
  content,
  link,
  col,
  src,
  propertyImg,
  className,
}) {
  return (
    <Col span={col || 24} className={className}>
      <Typography.Title level={3} className="fz-12">
        {title}
      </Typography.Title>
      {text && (
        <Typography.Text className="fz-14">
          <div dangerouslySetInnerHTML={{ __html: text }} />
        </Typography.Text>
      )}
      {content && (
        <Typography className="fz-14">
          <div>{content}</div>
        </Typography>
      )}
      {link && <Typography.Text className="fz-14">{link}</Typography.Text>}
      {src && (
        <Image
          height={propertyImg?.height}
          width={propertyImg?.width}
          style={{ borderRadius: "6px" }}
          src={src}
        />
      )}
      <Divider />
    </Col>
  );
}

FormDetail.propTypes = {
  title: PropTypes.string,
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.node,
    PropTypes.func,
    PropTypes.array,
  ]),
  content: PropTypes.object,
  link: PropTypes.node,
  col: PropTypes.number,
  src: PropTypes.string,
  propertyImg: PropTypes.object,
  className: PropTypes.string,
};

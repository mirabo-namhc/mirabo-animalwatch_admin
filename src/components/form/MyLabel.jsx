import React from "react";
import PropTypes from "prop-types";
// import MyTag from "@components/common/MyTag";
import { Col, Row } from "antd";
import { useTranslation } from "react-i18next";

function LabelForm({ label, optional, isSubItem, labelCol = 6 }) {
  const { t } = useTranslation();
  return (
    <Col span={labelCol}>
      <Row align="middle" justify="space-between" className="mr-25 mt-5">
        <h3 className={`${isSubItem && "ml-20"} fw-600 mr-10 fz-14`}>
          {`${isSubItem ? "・" : ""}`}
          {label}
        </h3>
        {/* {optional && (
          <MyTag text={t("tag.required")} size="sm" type="required" />
        )} */}
      </Row>
    </Col>
  );
}

LabelForm.propTypes = {
  label: PropTypes.string,
  optional: PropTypes.bool,
  isSubItem: PropTypes.bool,
  labelCol: PropTypes.number,
};
export default LabelForm;

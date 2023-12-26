import React, { useState } from "react";
import PropTypes from "prop-types";
import { Col, Form, Upload } from "antd";
import { t } from "i18next";

function MyUploadFile({
  label,
  name,
  rules,
  maxFile,
  children,
  colwidth,
  messageError,
  disabled,
  allowFiles,
  allowFileWindow,
  beforeUpload,
  setDataCSV,
  processData,
  length = 1,
  accept,
  defaultFileList,
}) {
  const [fileList, setFileList] = useState([]);

  const handleChange = ({ fileList: newFileList }) => {
    const resultFileList = newFileList.filter((item) => item?.originFileObj);
    setFileList(resultFileList);
    if (setDataCSV) {
      setDataCSV(resultFileList);
    }
  };

  return (
    <Col xs={colwidth || 24}>
      <Form.Item label={label} name={name} rules={rules}>
        <Upload
          maxCount={maxFile}
          beforeUpload={(file) =>
            beforeUpload(t, file, messageError, allowFiles, allowFileWindow)
          }
          disabled={disabled}
          accept={accept || ".csv"}
          onChange={handleChange}
          defaultFileList={defaultFileList || []}
        >
          {fileList.length >= length ? null : children}
        </Upload>
      </Form.Item>
    </Col>
  );
}

MyUploadFile.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  messageError: PropTypes.string,
  rules: PropTypes.array,
  allowFiles: PropTypes.array,
  allowFileWindow: PropTypes.array,
  maxFile: PropTypes.number,
  colwidth: PropTypes.number,
  children: PropTypes.object,
  disabled: PropTypes.bool,
  beforeUpload: PropTypes.func,
  length: PropTypes.number,
  setDataCSV: PropTypes.func,
  processData: PropTypes.func,
  accept: PropTypes.string,
  defaultFileList: PropTypes.array,
};

export default MyUploadFile;

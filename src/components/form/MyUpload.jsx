import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { checkBeforeUpload } from "@validate/validate";
import { Col, Form, Image, Modal, Upload } from "antd";
import { t } from "i18next";
import PropTypes from "prop-types";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  });

function MyUpload({
  initialFileList,
  label,
  name,
  placeholder,
  length = 4,
  deletedArr,
  setAddedArr,
  setDeletedArr,
  rules,
  disabled,
  ...props
}) {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState(initialFileList || []);

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    );
  };

  const handleChange = ({ fileList: newFileList, file }) => {
    const resultFileList = newFileList.filter((item) => item?.originFileObj);
    setAddedArr(resultFileList);
    setFileList(newFileList);
    const uidArr = initialFileList.map((item) => item?.uid);
    if (uidArr.includes(file.uid) && file.status === "removed") {
      setDeletedArr([...deletedArr, file?.uid]);
    }
  };
  const uploadButton = (
    <div>
      <PlusOutlined className="fz-60 icon-upload" />
    </div>
  );

  return (
    <Col className="form-image-input" xs={24}>
      <Form.Item label={label} name={name} rules={rules}>
        <Upload
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          beforeUpload={(file) => checkBeforeUpload(t, file, 2)}
          accept="image/*"
          disabled={disabled}
        >
          {fileList.length >= length ? null : uploadButton}
        </Upload>
      </Form.Item>
      <Modal
        open={previewVisible}
        title={t("managementCourses.form.images")}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" className="full-width" src={previewImage} />
      </Modal>
    </Col>
  );
}

MyUpload.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  length: PropTypes.number,
  initialFileList: PropTypes.array,
  deletedArr: PropTypes.array,
  setAddedArr: PropTypes.func,
  setDeletedArr: PropTypes.func,
  rules: PropTypes.array,
  disabled: PropTypes.bool,
};

export default MyUpload;

import { PlusOutlined } from '@ant-design/icons';
import { Col, Form, Modal, Upload, UploadFile, UploadProps } from 'antd';
import { RcFile } from 'antd/lib/upload';
import React, { useState } from 'react';
import { useAppDispatch } from '~/_lib/redux/hooks';
import { ETypeFieldForm } from '~/types/enum.type';
import { IMFormItemProps } from '~/types/form.type';
import uploadAPI from '~services/api/upload.api';
import { IResponseApiUpload } from '~types';
import { checkBeforeUpload, handleAppendFormDataFile } from '~utils/funcHelper';
import './MFormUpload.scss';

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

function MFormUpload({
  colProps,
  atomProps,
  length = 1,
  ...formItemProps
}: IMFormItemProps<ETypeFieldForm.UPLOAD>) {
  const dispatch = useAppDispatch();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>(atomProps?.initialFileList || []);

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const fetchDataFile = async (file: FormData) => {
    try {
      if (file) {
        const response: IResponseApiUpload = await uploadAPI.image(file);
        atomProps?.setUrlFile(response?.data?.path);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);

    if (newFileList.length < 1) atomProps?.setUrlFile(undefined);
    if (newFileList[0]) {
      const paramFile = handleAppendFormDataFile(newFileList[0]);
      fetchDataFile(paramFile);
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div className="mt-8 fs-14">アップロード</div>
    </button>
  );

  React.useEffect(() => {
    if (atomProps?.initialFileList.length) setFileList(atomProps?.initialFileList);
  }, [atomProps?.initialFileList]);

  return (
    <Col className="form-image-input" {...colProps}>
      <Form.Item {...formItemProps}>
        <Upload
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          beforeUpload={(file) => checkBeforeUpload(file, 5)}
          accept="image/*"
          {...atomProps}
        >
          {fileList.length >= length ? null : uploadButton}
        </Upload>
      </Form.Item>
      <Modal
        open={previewVisible}
        title={'画像'}
        footer={null}
        onCancel={handleCancel}
        destroyOnClose
        className="modal-preview-img"
      >
        <img alt="example" className="full-width" src={previewImage} />
      </Modal>
    </Col>
  );
}

export default MFormUpload;

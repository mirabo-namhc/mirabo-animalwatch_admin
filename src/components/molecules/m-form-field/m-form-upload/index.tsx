import { PlusOutlined } from '@ant-design/icons';
import { Col, Form, Modal, Upload, UploadFile, UploadProps } from 'antd';
import { RcFile } from 'antd/lib/upload';
import { useState } from 'react';
import { ETypeFieldForm } from '~/types/enum.type';
import { IMFormItemProps } from '~/types/form.type';
import { checkBeforeUpload } from '~utils/funcHelper';

interface IMFormUploadProps extends IMFormItemProps<ETypeFieldForm.UPLOAD> {
  deletedArr?: string[];
  setAddedArr?: (files: RcFile[]) => void;
  setDeletedArr?: (deleted: string[]) => void;
  length?: number;
}

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
  //   deletedArr = [],
  //   setAddedArr,
  //   setDeletedArr,
  ...formItemProps
}: IMFormUploadProps) {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>(atomProps?.defaultFileList || []);

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <Col className="form-image-input" {...colProps}>
      <Form.Item {...formItemProps}>
        <Upload
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          beforeUpload={(file) => checkBeforeUpload(file, 2)}
          accept="image/*"
          {...atomProps}
        >
          {fileList.length >= length ? null : uploadButton}
        </Upload>
      </Form.Item>
      <Modal open={previewVisible} title={'image'} footer={null} onCancel={handleCancel}>
        <img alt="example" className="full-width" src={previewImage} />
      </Modal>
    </Col>
  );
}

export default MFormUpload;

import { ArrowLeftOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useURLInfo } from '~/hooks';
import AButton from '~atoms/a-button';
import { TITLE_HEADER } from '~constants/endpoint';
import './OHeader.scss';

export default function OHeader() {
  const { pathname, isCreate, isEdit } = useURLInfo();
  const navigate = useNavigate();

  const onBack = () => {
    if (pathname) {
      navigate(-1);
    }
  };

  return (
    <Layout.Header className="o-header h-50 dis-flex jc-center ai-center bg-gray-0 pos-sticky top-0 z-1 px-16 fw-700 fs-20 gray">
      {TITLE_HEADER[pathname]}
      {(isCreate || isEdit) && (
        <AButton className="button-back-header" leftIcon={<ArrowLeftOutlined />} onClick={onBack}>
          戻ってくる
        </AButton>
      )}
    </Layout.Header>
  );
}

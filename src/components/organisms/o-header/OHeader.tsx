import { Layout } from 'antd';
import { useURLInfo } from '~/hooks';
import { TITLE_HEADER } from '~constants/endpoint';
import './OHeader.scss';

export default function OHeader() {
  const { pathname } = useURLInfo();

  return (
    <Layout.Header className="o-header h-50 dis-flex jc-center ai-center bg-gray-0 pos-sticky top-0 z-1 px-16 fw-700 fs-20 gray">
      {TITLE_HEADER[pathname]}
    </Layout.Header>
  );
}

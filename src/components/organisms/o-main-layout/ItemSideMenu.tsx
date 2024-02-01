import {
  CloseCircleFilled,
  FileImageOutlined,
  HomeFilled,
  KeyOutlined,
  MoneyCollectFilled,
  QuestionCircleFilled,
  ScheduleFilled,
  SettingFilled,
  VideoCameraFilled,
} from '@ant-design/icons';
import { APP_ROUTE_URL } from '~constants/endpoint';
import { MenuItem } from '~organisms/o-side-menu/OSideMenu';
import { getItemSideMenu } from '~utils/funcHelper';

export const itemsSideMenu: MenuItem[] = [
  getItemSideMenu(
    'カテゴリ一覧',
    APP_ROUTE_URL.FACILITY.INDEX,
    <span>
      <HomeFilled />
    </span>,
  ),
  getItemSideMenu(
    'クーポン一覧',
    APP_ROUTE_URL.COUPON.INDEX,
    <span>
      <MoneyCollectFilled />
    </span>,
  ),
  getItemSideMenu(
    '設定',
    APP_ROUTE_URL.SETTING.INDEX,
    <span>
      <SettingFilled />
    </span>,
    [
      // getItemSideMenu(
      //   'ランキング設定',
      //   `${APP_ROUTE_URL.SETTING.INDEX}/${APP_ROUTE_URL.SETTING.RANK}`,
      //   <span>
      //     <BarChartOutlined />
      //   </span>,
      // ),
      getItemSideMenu(
        'バナー設定',
        `${APP_ROUTE_URL.SETTING.INDEX}/${APP_ROUTE_URL.SETTING.BANNER.INDEX}`,
        <span>
          <FileImageOutlined />
        </span>,
      ),
    ],
  ),
  getItemSideMenu(
    '動画データ同期',
    APP_ROUTE_URL.VIDEO,
    <span>
      <VideoCameraFilled />
    </span>,
  ),
  getItemSideMenu(
    'クイズ',
    APP_ROUTE_URL.QUIZ.INDEX,
    <span>
      <QuestionCircleFilled />
    </span>,
  ),
  getItemSideMenu(
    '施設情報',
    APP_ROUTE_URL.EVENT.INDEX,
    <span>
      <ScheduleFilled />
    </span>,
    [
      getItemSideMenu(
        'イベント情報',
        `${APP_ROUTE_URL.EVENT.INDEX}/${APP_ROUTE_URL.EVENT.INFOR.INDEX}`,
        <span>
          <ScheduleFilled />
        </span>,
      ),
      // getItemSideMenu(
      //   'プロモーション',
      //   `${APP_ROUTE_URL.SETTING.INDEX}/${APP_ROUTE_URL.SETTING.BANNER.INDEX}`,
      //   <span>
      //     <FileImageOutlined />
      //   </span>,
      // ),
    ],
  ),
  getItemSideMenu(
    'パスワード',
    APP_ROUTE_URL.RESET_PASSWORD,
    <span>
      <KeyOutlined />
    </span>,
  ),
];

export const itemLogoutMenu: MenuItem[] = [
  getItemSideMenu(
    'ログアウト',
    '',
    <span>
      <CloseCircleFilled />
    </span>,
  ),
];

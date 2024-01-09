import { MenuItem } from "~organisms/o-side-menu/OSideMenu";
import { getItemSideMenu } from "~utils/funcHelper";
import {
    SettingFilled,
    VideoCameraFilled,
    QuestionCircleFilled,
    HomeFilled,
    ScheduleFilled,
    MoneyCollectFilled,
    CloseCircleFilled
} from '@ant-design/icons';
import { APP_ROUTE_URL } from "~constants/endpoint";

export const itemsSideMenu: MenuItem[] = [
    getItemSideMenu(
        'カテゴリ一覧',
        APP_ROUTE_URL.FACILITY,
        <span>
            <HomeFilled />
        </span>,
    ),
    getItemSideMenu(
        'クーポン一覧',
        APP_ROUTE_URL.COUPON,
        <span>
            <MoneyCollectFilled />
        </span>,
    ),
    getItemSideMenu(
        '設定',
        APP_ROUTE_URL.SETTING,
        <span>
            <SettingFilled />
        </span>,
    ),
    getItemSideMenu(
        '動画データ同期',
        APP_ROUTE_URL.VIDEO,
        <span>
            <VideoCameraFilled />
        </span>,
    ),
    getItemSideMenu(
        'クイズ・豆知識',
        APP_ROUTE_URL.QUIZ,
        <span>
            <QuestionCircleFilled />
        </span>,
    ),
    getItemSideMenu(
        '施設情報',
        APP_ROUTE_URL.EVENT,
        <span>
            <ScheduleFilled />
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
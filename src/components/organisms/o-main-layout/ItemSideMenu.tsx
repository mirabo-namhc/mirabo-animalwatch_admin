import { IconHome } from "~/assets/icon";
import { MenuItem } from "~organisms/o-side-menu/OSideMenu";
import { getItemSideMenu } from "~utils/funcHelper";

export const itemsSideMenu: MenuItem[] = [
    getItemSideMenu(
        'カテゴリ一覧',
        '/',
        <span>
            <img src={IconHome} alt='icon-home' />
        </span>,
    ),
    getItemSideMenu(
        'クーポン一覧',
        '/categories',
        <span>
            <img src={IconHome} alt='icon-home' />
        </span>,
    ),
    getItemSideMenu(
        '写真一覧',
        '/categories',
        <span>
            <img src={IconHome} alt='icon-home' />
        </span>,
    ),
    getItemSideMenu(
        '設定',
        '/categories',
        <span>
            <img src={IconHome} alt='icon-home' />
        </span>,
    ),
    getItemSideMenu(
        '動画データ同期',
        '/categories',
        <span>
            <img src={IconHome} alt='icon-home' />
        </span>,
    ),
    getItemSideMenu(
        'クイズ・豆知識',
        '/categories',
        <span>
            <img src={IconHome} alt='icon-home' />
        </span>,
    ),
    getItemSideMenu(
        '施設情報',
        '/categories',
        <span>
            <img src={IconHome} alt='icon-home' />
        </span>,
    ),
    getItemSideMenu(
        'お知らせ一覧',
        '/categories',
        <span>
            <img src={IconHome} alt='icon-home' />
        </span>,
    ),
    getItemSideMenu(
        'ログアウト',
        '/categories',
        <span>
            <img src={IconHome} alt='icon-home' />
        </span>,
    ),
];
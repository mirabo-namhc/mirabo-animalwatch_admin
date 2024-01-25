export const BASE_URL = process.env.REACT_APP_API_URL;

export const APP_ROUTE_URL = {
  INDEX: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FACILITY: {
    INDEX: '/facility',
    TABLE: '',
    EDIT: 'edit',
    CREATE: 'create',
    DETAIL: 'detail',
  },
  COUPON: {
    INDEX: '/coupon',
    TABLE: '',
    EDIT: 'edit',
    CREATE: 'create',
    DETAIL: 'detail',
  },
  SETTING: {
    INDEX: '/setting',
    RANK: 'rank',
    BANNER: {
      INDEX: 'banner',
      TABLE: '',
      EDIT: 'edit',
      CREATE: 'create',
      DETAIL: 'detail',
    },
  },
  VIDEO: '/video',
  EVENT: {
    INDEX: '/event',
    INFOR: {
      INDEX: 'infor',
      TABLE: '',
      EDIT: 'edit',
      CREATE: 'create',
      DETAIL: 'detail',
    },
  },
  QUIZ: {
    INDEX: '/quiz',
    TABLE: '',
    EDIT: 'edit',
    CREATE: 'create',
    DETAIL: 'detail',
  },
};

//QUIZ
export const QUIZ_INDEX_SCREEN_NAME = 'クイズ';
//COUPON
export const COUPON_INDEX_SCREEN_NAME = 'クーポ';
//BANNER
export const BANNER_INDEX_SCREEN_NAME = 'バナー';

//Facility Route
export const ROUTE_FACILITY_INDEX = APP_ROUTE_URL.FACILITY.INDEX;
export const ROUTE_FACILITY_EDIT = `${APP_ROUTE_URL.FACILITY.INDEX}/${APP_ROUTE_URL.FACILITY.EDIT}`;
export const ROUTE_FACILITY_CREATE = `${APP_ROUTE_URL.FACILITY.INDEX}/${APP_ROUTE_URL.FACILITY.CREATE}`;

//Coupon Route
export const ROUTE_COUPON_INDEX = APP_ROUTE_URL.COUPON.INDEX;
export const ROUTE_COUPON_EDIT = `${APP_ROUTE_URL.COUPON.INDEX}/${APP_ROUTE_URL.COUPON.EDIT}`;
export const ROUTE_COUPON_CREATE = `${APP_ROUTE_URL.COUPON.INDEX}/${APP_ROUTE_URL.COUPON.CREATE}`;

//Event Route
export const ROUTE_EVENT_INDEX = APP_ROUTE_URL.EVENT.INDEX;
export const ROUTE_EVENT_INFOR_EDIT = `${APP_ROUTE_URL.EVENT.INDEX}/${APP_ROUTE_URL.EVENT.INFOR.INDEX}/${APP_ROUTE_URL.EVENT.INFOR.EDIT}`;
export const ROUTE_EVENT_INFOR_CREATE = `${APP_ROUTE_URL.EVENT.INDEX}/${APP_ROUTE_URL.EVENT.INFOR.INDEX}/${APP_ROUTE_URL.EVENT.INFOR.CREATE}`;

//Quiz Route
export const ROUTE_QUIZ_INDEX = APP_ROUTE_URL.QUIZ.INDEX;
export const ROUTE_QUIZ_EDIT = `${APP_ROUTE_URL.QUIZ.INDEX}/${APP_ROUTE_URL.QUIZ.EDIT}`;
export const ROUTE_QUIZ_CREATE = `${APP_ROUTE_URL.QUIZ.INDEX}/${APP_ROUTE_URL.QUIZ.CREATE}`;

//Setting Route
export const ROUTE_SETTING_RANK_INDEX = `${APP_ROUTE_URL.SETTING.INDEX}/${APP_ROUTE_URL.SETTING.RANK}`;
export const ROUTE_SETTING_BANNER_INDEX = `${APP_ROUTE_URL.SETTING.INDEX}/${APP_ROUTE_URL.SETTING.BANNER.INDEX}`;

//Video Route
export const ROUTE_VIDEO = APP_ROUTE_URL.VIDEO;

export const TITLE_HEADER = {
  [ROUTE_FACILITY_INDEX]: 'カテゴリ一覧',
  [ROUTE_FACILITY_EDIT]: 'カテゴリー詳細',
  [ROUTE_FACILITY_CREATE]: '新規カテゴリー',

  [ROUTE_COUPON_INDEX]: 'クーポン一覧',
  [ROUTE_COUPON_EDIT]: 'クーポン詳細',
  [ROUTE_COUPON_CREATE]: 'クーポン登録',

  [ROUTE_SETTING_RANK_INDEX]: 'ランキング設定',
  [ROUTE_SETTING_BANNER_INDEX]: 'バナー設定',

  [APP_ROUTE_URL.VIDEO]: '動画データ同期',

  [ROUTE_EVENT_INDEX]: 'イベント一覧',
  [ROUTE_EVENT_INFOR_EDIT]: 'イベント詳細',
  [ROUTE_EVENT_INFOR_CREATE]: '新規イベント',

  [ROUTE_QUIZ_INDEX]: QUIZ_INDEX_SCREEN_NAME,
  [ROUTE_QUIZ_EDIT]: 'クイズ詳細',
  [ROUTE_QUIZ_CREATE]: '新規クイズ',
};

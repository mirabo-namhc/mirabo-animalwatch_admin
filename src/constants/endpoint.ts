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

export const TITLE_HEADER = {
  [APP_ROUTE_URL.FACILITY.INDEX]: 'カテゴリ一覧',
  [`${APP_ROUTE_URL.FACILITY.INDEX}/${APP_ROUTE_URL.FACILITY.EDIT}`]: 'カテゴリー詳細',
  [`${APP_ROUTE_URL.FACILITY.INDEX}/${APP_ROUTE_URL.FACILITY.CREATE}`]: '新規カテゴリー',

  [APP_ROUTE_URL.COUPON.INDEX]: 'クーポン一覧',
  [`${APP_ROUTE_URL.COUPON.INDEX}/${APP_ROUTE_URL.COUPON.EDIT}`]: 'クーポン詳細',
  [`${APP_ROUTE_URL.COUPON.INDEX}/${APP_ROUTE_URL.COUPON.CREATE}`]: 'クーポン登録',

  [`${APP_ROUTE_URL.SETTING.INDEX}/${APP_ROUTE_URL.SETTING.RANK}`]: 'ランキング設定',
  [`${APP_ROUTE_URL.SETTING.INDEX}/${APP_ROUTE_URL.SETTING.BANNER.INDEX}`]: 'バナー設定',

  [APP_ROUTE_URL.VIDEO]: '動画データ同期',

  [`${APP_ROUTE_URL.EVENT.INDEX}/${APP_ROUTE_URL.EVENT.INFOR.INDEX}`]: 'イベント一覧',
  [`${APP_ROUTE_URL.EVENT.INDEX}/${APP_ROUTE_URL.EVENT.INFOR.INDEX}/${APP_ROUTE_URL.EVENT.INFOR.EDIT}`]: 'イベント詳細',
  [`${APP_ROUTE_URL.EVENT.INDEX}/${APP_ROUTE_URL.EVENT.INFOR.INDEX}/${APP_ROUTE_URL.EVENT.INFOR.CREATE}`]: '新規イベント',

  [APP_ROUTE_URL.QUIZ.INDEX]: QUIZ_INDEX_SCREEN_NAME,
  [`${APP_ROUTE_URL.QUIZ.INDEX}/${APP_ROUTE_URL.QUIZ.DETAIL}`]: 'クイズ詳細',
  [`${APP_ROUTE_URL.QUIZ.INDEX}/${APP_ROUTE_URL.QUIZ.EDIT}`]: 'クイズ詳細',
  [`${APP_ROUTE_URL.QUIZ.INDEX}/${APP_ROUTE_URL.QUIZ.CREATE}`]: '新規クイズ',
};

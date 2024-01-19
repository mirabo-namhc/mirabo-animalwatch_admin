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
    TABLE: '',
    EDIT: 'edit',
    CREATE: 'create',
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

  [APP_ROUTE_URL.COUPON.INDEX]: COUPON_INDEX_SCREEN_NAME,
  [`${APP_ROUTE_URL.COUPON.INDEX}/${APP_ROUTE_URL.COUPON.EDIT}`]: 'クーポン詳細',
  [`${APP_ROUTE_URL.COUPON.INDEX}/${APP_ROUTE_URL.COUPON.CREATE}`]: 'クーポン登録',

  [`${APP_ROUTE_URL.SETTING.INDEX}/${APP_ROUTE_URL.SETTING.RANK}`]: 'ランキング設定',
  [`${APP_ROUTE_URL.SETTING.INDEX}/${APP_ROUTE_URL.SETTING.BANNER.INDEX}`]: 'バナー設定',

  [APP_ROUTE_URL.VIDEO]: '動画データ同期',

  [APP_ROUTE_URL.EVENT.INDEX]: 'イベント情報',
  [`${APP_ROUTE_URL.EVENT.INDEX}/${APP_ROUTE_URL.EVENT.EDIT}`]: 'イベント詳細',
  [`${APP_ROUTE_URL.EVENT.INDEX}/${APP_ROUTE_URL.EVENT.CREATE}`]: '新規登録',

  [APP_ROUTE_URL.QUIZ.INDEX]: QUIZ_INDEX_SCREEN_NAME,
  [`${APP_ROUTE_URL.QUIZ.INDEX}/${APP_ROUTE_URL.QUIZ.DETAIL}`]: 'クイズ詳細',
  [`${APP_ROUTE_URL.QUIZ.INDEX}/${APP_ROUTE_URL.QUIZ.EDIT}`]: 'クーポン一覧',
  [`${APP_ROUTE_URL.QUIZ.INDEX}/${APP_ROUTE_URL.QUIZ.CREATE}`]: '新規クイズ',
};

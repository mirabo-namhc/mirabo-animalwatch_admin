export const BASE_URL = process.env.REACT_APP_API_URL;

export const APP_ROUTE_URL = {
  INDEX: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FACILITY: {
    INDEX: '/facility',
    TABLE: "",
    EDIT: "edit",
    CREATE: "create",
    DETAIL: "detail",
  },
  COUPON: '/coupon',
  SETTING: {
    INDEX: '/setting',
    RANK: 'rank',
    BANNER: 'banner',
  },
  VIDEO: '/video',
  QUIZ: '/quiz',
  EVENT: '/event',
};

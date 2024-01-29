import { EBannerTypeEnum } from '~types';

export const COLDEF = 24;
export const COL_HAFT = 12;

export const groupsFacilityOptions = [
  {
    label: '動物園',
    value: 1,
  },
  {
    label: '水族館',
    value: 2,
  },
  // {
  //     label: 'JCOM',
  //     value: 3,
  // },
  // {
  //     label: 'PET',
  //     value: 4,
  // },
  // {
  //     label: '世界の動物チャネル',
  //     value: 5,
  // },
];

export const isActiveFacilityOptions = [
  {
    label: 'ON',
    value: 0,
  },
  {
    label: 'OFF',
    value: 1,
  },
];

export const BANNER_REFERENCE_TYPE = [
  {
    label: 'FACILITY',
    value: EBannerTypeEnum.FACILITY,
  },
  {
    label: 'VIDEO',
    value: EBannerTypeEnum.VIDEO,
  },
  {
    label: 'QUIZ',
    value: EBannerTypeEnum.QUIZ,
  },
  {
    label: 'COUPON',
    value: EBannerTypeEnum.COUPON,
  },
  {
    label: 'EVENT',
    value: EBannerTypeEnum.EVENT,
  },
];

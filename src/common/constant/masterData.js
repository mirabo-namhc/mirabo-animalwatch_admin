export const TYPE_CHECKPOINT = [
  { key: 1, value: 0, label: "メンテナンス・修理" },
  { key: 2, value: 1, label: "フード・休憩" },
  { key: 3, value: 2, label: "景色・名所" },
  { key: 4, value: 3, label: "鉄道駅・駐車場" },
];

export const USER_TAG = [
  { key: 1, value: 1, label: "RIDE LEADER" },
  { key: 2, value: 2, label: "PRO" },
  { key: 3, value: 3, label: "TOP HELPER" },
  { key: 4, value: 4, label: "NEW STARTER" },
  { key: 5, value: null, label: "" },
];

export const USER_YELLOW_TICK = [
  {
    key: 1,
    value: 0,
    label: "なし",
  },
  { key: 2, value: 1, label: "イエロー" },
];

export const TYPE_EVENT = [
  { key: 0, value: "0", label: "サイクリング" },
  { key: 1, value: "1", label: "抽選" },
  { key: 2, value: "2", label: "アプリ外イベント" },
];

export const LEVEL_EVENT = [
  { key: 1, value: 0, label: "Beginner" },
  { key: 2, value: 1, label: "Intermediate" },
  { key: 3, value: 2, label: "Advanced" },
];

export const STATUS_DATE_EVENT = {
  Prepare: "未開催",
  Inprogress: "開催中",
  End: "終了",
};

export const STATUS_EVENT = [
  { key: 1, value: "1", label: "開催中" },
  { key: 2, value: "2", label: "未開催" },
  { key: 3, value: "3", label: "終了" },
];

export const HASH_TAG_EVENT = [
  { key: 3, value: "0", label: "SOCIAL RIDE" },
  { key: 2, value: "1", label: "OFF-BIKE" },
  { key: 1, value: "2", label: "RACE" },
  { key: 4, value: "3", label: "EVENT" },
];

export const STATUS_GIFT_CODE = [
  { key: 1, value: "true", label: "無効" },
  { key: 2, value: "false", label: "有効" },
];

export const TYPE_BADGE = [
  { key: 1, value: "0", label: "標高" },
  { key: 2, value: "1", label: "走行距離" },
  { key: 3, value: "3", label: "バッジ" },
  { key: 4, value: "4", label: "消費カロリー" },
  { key: 5, value: "5", label: "ライド回数" },
  { key: 6, value: "6", label: "ライド日数" },
];

export const UNIT_BADGE = [
  { key: 1, value: "0", label: "m" },
  { key: 2, value: "1", label: "km" },
  { key: 3, value: "3", label: "" },
  { key: 4, value: "4", label: "kcal" },
  { key: 5, value: "5", label: "回" },
  { key: 6, value: "6", label: "日" },
];

export const TYPE_SORT = {
  ascend: "asc",
  descend: "desc",
};

export const TYPE_NOTI = [
  { key: 1, value: 0, label: "全てのユーザ" },
  { key: 2, value: 1, label: "指定のユーザー" },
];

export const CONDITIONS_DATA = [
  {
    title: "ライド距離",
    value: 1,
    key: "1",
  },
  {
    title: "獲得標高",
    value: 2,
    key: "2",
  },
  {
    title: "平均時速",
    value: 3,
    key: "3",
  },
  {
    title: "ライド時間",
    value: 4,
    key: "4",
  },
  {
    title: "カロリー",
    value: 5,
    key: "5",
  },
];

export const DEVICE_DATA = [
  {
    title: "IOS",
    value: "IOS",
    key: "1",
  },
  {
    title: "ANDROID",
    value: "ANDROID",
    key: "2",
  },
];

export const UNIT_DATA = [
  {
    key: 1,
    value: 2,
    label: "ライド単位",
  },
  {
    key: 2,
    value: 1,
    label: "ユーザ単位",
  },
];

export const USER_TARGET = [
  {
    key: 1,
    value: 1,
    label: "全員",
  },
  {
    key: 2,
    value: 2,
    label: "グループ",
  },
  {
    key: 3,
    value: 3,
    label: "CSV",
  },
];

export const IMAGE_DEFAULT =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpThzhMB0Esd2PRg2vHdy8YdMQqD6C0daU8w&usqp=CAU";

export const TYPE_RESULT_IMG = [
  {
    key: 1,
    value: 1,
    label: "カロリー",
  },
  {
    key: 2,
    value: 2,
    label: "獲得標高",
  },
];

export const USER_TARGET_BADGE = [
  {
    key: 2,
    value: 2,
    label: "1人",
  },
  {
    key: 3,
    value: 3,
    label: "複数人",
  },
];

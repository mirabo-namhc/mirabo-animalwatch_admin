import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { message } from 'antd';
import { ICoupon, ICouponState } from '~/types/coupon.type';
import { IResponseApiList, TFilterParams } from '~types';
import { getPaginationInfo } from '~utils/funcHelper';

const initialState: ICouponState = {
  loading: false,
  reloadList: false,
  loadingCreate: false,
  loadingDelete: false,
  loadingUpdate: false,
  listData: [],
  pagination: {},
  detailData: null,
};

const couponSlice = createSlice({
  name: 'coupon',
  initialState,
  reducers: {
    // GET LIST
    fetchData(state, action: PayloadAction<TFilterParams>) {
      state.loading = true;
    },
    fetchDataSuccess(state, action: PayloadAction<IResponseApiList<ICoupon>>) {
      state.loading = false;
      state.listData = action?.payload?.data?.data || [];
      state.pagination = getPaginationInfo(action?.payload?.data);
    },
    fetchDataFalse(state, action) {
      state.loading = false;
      console.error(action.payload);
    },

    // GET DETAIL
    getDetail(state, action: PayloadAction<number>) {
      state.loading = true;
    },
    getDetailSuccess(state, action: PayloadAction<ICoupon>) {
      state.detailData = action.payload as ICoupon;
      state.loading = false;
    },
    getDetailFalse(state, action) {
      console.error(action.payload);
      state.loading = false;
    },
    clearData(state) {
      state.detailData = null;
      state.listData = [];
    },

    // CREATE
    create(state, action) {
      state.loadingCreate = true;
    },
    createSuccess(state, action: PayloadAction<string>) {
      state.loadingCreate = false;
      message.success(action.payload);
    },
    createFalse(state, action: PayloadAction<string>) {
      state.loadingCreate = false;
      message.error(action.payload);
    },
    // EDIT
    edit(state, action) {
      state.loadingUpdate = true;
    },
    editSuccess(state, action: PayloadAction<string>) {
      state.loadingUpdate = false;
      message.success(action.payload);
    },
    editFailed(state, action: PayloadAction<string>) {
      state.loadingUpdate = false;
      message.error(action.payload);
    },

    // DELETE
    delete(state, action) {
      state.loadingDelete = true;
    },
    deleteSuccess(state, action: PayloadAction<string>) {
      state.loadingDelete = false;
      message.success(action.payload);
    },
    deleteFailed(state, action: PayloadAction<string>) {
      state.loadingDelete = false;
      message.error(action.payload);
    },
  },
});

// Actions
export const couponActions = couponSlice.actions;

// Selectors

// Reducer
const couponReducer = couponSlice.reducer;
export default couponReducer;

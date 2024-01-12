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
  detailData: {},
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
      state.listData = action?.payload?.data || [];
      state.pagination = getPaginationInfo(action?.payload);
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
    clearData(state, action) {
      state.detailData = {};
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
      message.success('Update Coupon Successfully');
    },
    editFailed(state, action: PayloadAction<string>) {
      state.loadingUpdate = false;
      message.error('Update Coupon Failed');
    },

    // DELETE
    delete(state, action) {
      state.loadingDelete = true;
    },
    deleteSuccess(state, action: PayloadAction<string>) {
      state.loadingDelete = false;
      message.success('Delete Coupon Successfully');
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

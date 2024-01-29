import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { message } from 'antd';
import { IBanner, IBannerState } from '~/types/banner.type';
import { IRemovePayload, IResponseApiListWithoutPagination, TFilterParams } from '~types';

const initialState: IBannerState = {
  loading: false,
  reloadList: false,
  loadingForm: false,
  listData: [],
  pagination: {},
  detailData: null,
};

const bannerSlice = createSlice({
  name: 'banner',
  initialState,
  reducers: {
    // GET LIST
    fetchData(state, action: PayloadAction<TFilterParams>) {
      state.loading = true;
    },
    fetchDataSuccess(state, action: PayloadAction<IResponseApiListWithoutPagination<IBanner>>) {
      state.loading = false;
      state.reloadList = false;
      state.listData = action?.payload?.data || [];
    },
    fetchDataFalse(state, action) {
      state.loading = false;
      console.error(action.payload);
    },

    setReloadList(state, action) {
      state.reloadList = action.payload;
    },

    // GET DETAIL
    getDetail(state, action: PayloadAction<number>) {
      state.loading = true;
    },
    getDetailSuccess(state, action: PayloadAction<IBanner>) {
      state.detailData = action.payload as IBanner;
      state.loading = false;
    },
    getDetailFalse(state, action) {
      console.error(action.payload);
      state.loading = false;
    },
    clearData(state, action) {
      state.detailData = null;
    },

    // CREATE
    create(state, action) {
      state.loadingForm = true;
    },
    createSuccess(state, action: PayloadAction<string>) {
      state.loadingForm = false;
      message.success(action.payload);
    },
    createFalse(state, action: PayloadAction<string>) {
      state.loadingForm = false;
      message.error('');
    },

    // EDIT
    edit(state, action) {
      state.loadingForm = true;
    },
    editSuccess(state, action: PayloadAction<string>) {
      state.loadingForm = false;
      message.success(action.payload);
    },
    editFalse(state, action: PayloadAction<string>) {
      state.loadingForm = false;
      message.error(action.payload);
    },

    // REMOVE
    remove(state, action) {
      state.loading = true;
    },
    removeSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      message.success(action.payload);
    },
    removeFalse(state, action: PayloadAction<string>) {
      state.loading = false;
      message.success(action.payload);
    },
  },
});

// Actions
export const bannerActions = bannerSlice.actions;

// Selectors

// Reducer
const bannerReducer = bannerSlice.reducer;
export default bannerReducer;

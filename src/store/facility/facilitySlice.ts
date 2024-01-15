import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { message } from 'antd';
import { IFacility, IFacilityState } from '~/types/facility.type';
import { IRemovePayload, IResponseApiList, TFilterParams } from '~types';
import { getPaginationInfo } from '~utils/funcHelper';

const initialState: IFacilityState = {
  loading: false,
  reloadList: false,
  loadingForm: false,
  listData: [],
  pagination: {},
  detailData: {},
};

const facilitySlice = createSlice({
  name: 'facility',
  initialState,
  reducers: {
    // GET LIST
    fetchData(state, action: PayloadAction<TFilterParams>) {
      state.loading = true;
    },
    fetchDataSuccess(state, action: PayloadAction<IResponseApiList<IFacility>>) {
      state.loading = false;
      state.listData = action?.payload?.data || [];
      state.pagination = getPaginationInfo(action?.payload)
    },
    fetchDataFalse(state, action) {
      state.loading = false;
      console.error(action.payload);
    },

    // GET DETAIL
    getDetail(state, action: PayloadAction<number>) {
      state.loading = true;
    },
    getDetailSuccess(state, action: PayloadAction<IFacility>) {
      state.detailData = action.payload as IFacility;
      state.loading = false;
    },
    getDetailFalse(state, action) {
      console.error(action.payload);
      state.loading = false;
    },
    clearData(state, action) {
      state.detailData = {}
    },

    // CREATE
    create(state, action) {
      state.loadingForm = true;
    },
    createSuccess(state, action) {
      state.loadingForm = false;
      message.success("");
    },
    createFalse(state, action) {
      state.loadingForm = false;
      message.error("");
    },

    // EDIT
    edit(state, action) {
      state.loadingForm = true;
    },
    editSuccess(state, action) {
      state.loadingForm = false;
      message.success("");
    },
    editFalse(state, action) {
      state.loadingForm = false;
      message.error("");
    },

    // REMOVE
    remove(state, action: PayloadAction<IRemovePayload>) {
      state.loading = true;
    },
    removeSuccess(state) {
      state.loading = false;
      message.success("");
    },
    removeFalse(state) {
      state.loading = false;
      message.error("");
    },
  },
});

// Actions
export const facilityActions = facilitySlice.actions;

// Selectors

// Reducer
const facilityReducer = facilitySlice.reducer;
export default facilityReducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { message } from 'antd';
import { IFacility, IFacilityState } from '~/types/facility.type';
import { IResponseApiList, TFilterParams } from '~types';
import { getPaginationInfo } from '~utils/funcHelper';

const initialState: IFacilityState = {
  loading: false,
  reloadList: false,
  loadingCreate: false,
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
      state.loadingCreate = true;
    },
    createSuccess(state, action) {
      state.loadingCreate = false;
      message.success("");
    },
    createFalse(state, action) {
      state.loadingCreate = false;
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

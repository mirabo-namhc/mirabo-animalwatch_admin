import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { message } from 'antd';
import { IQuiz, IQuizState } from '~/types/quiz.type';
import { IResponseApiList, TFilterParams } from '~types';
import { getPaginationInfo } from '~utils/funcHelper';

const initialState: IQuizState = {
  loading: false,
  reloadList: false,
  loadingCreate: false,
  loadingDelete: false,
  loadingUpdate: false,
  listData: [],
  pagination: {},
  detailData: null,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    // GET LIST
    fetchData(state, action: PayloadAction<TFilterParams>) {
      state.loading = true;
    },
    fetchDataSuccess(state, action: PayloadAction<IResponseApiList<IQuiz>>) {
      state.loading = false;
      state.listData = action?.payload?.data?.data || [];
      state.pagination = getPaginationInfo(action?.payload?.data);
    },
    fetchDataFalse(state, action) {
      state.loading = false;
      message.error(action.payload);
    },

    // GET DETAIL
    getDetail(state, action: PayloadAction<number>) {
      state.loading = true;
    },
    getDetailSuccess(state, action: PayloadAction<IQuiz>) {
      state.detailData = action.payload as IQuiz;
      state.loading = false;
    },
    getDetailFalse(state, action) {
      state.loading = false;
      message.error(action.payload);
    },
    clearData(state) {
      state.detailData = {};
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
export const quizActions = quizSlice.actions;

// Selectors

// Reducer
const quizReducer = quizSlice.reducer;
export default quizReducer;

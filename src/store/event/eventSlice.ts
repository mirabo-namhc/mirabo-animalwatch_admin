import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { message } from 'antd';
import { IEvent, IEventState } from '~/types/event.type';
import { IRemovePayload, IResponseApiList, TFilterParams } from '~types';
import { getPaginationInfo } from '~utils/funcHelper';

const initialState: IEventState = {
    loading: false,
    reloadList: false,
    loadingForm: false,
    listData: [],
    pagination: {},
    detailData: {},
};

const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        // GET LIST
        fetchData(state, action: PayloadAction<TFilterParams>) {
            state.loading = true;
        },
        fetchDataSuccess(state, action: PayloadAction<IResponseApiList<IEvent>>) {
            state.loading = false;
            state.listData = action?.payload?.data?.data || [];
            state.pagination = getPaginationInfo(action?.payload?.data)
        },
        fetchDataFalse(state, action) {
            state.loading = false;
            console.error(action.payload);
        },

        // GET DETAIL
        getDetail(state, action: PayloadAction<number>) {
            state.loading = true;
        },
        getDetailSuccess(state, action: PayloadAction<IEvent>) {
            state.detailData = action.payload as IEvent;
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
export const eventActions = eventSlice.actions;

// Selectors

// Reducer
const eventReducer = eventSlice.reducer;
export default eventReducer;

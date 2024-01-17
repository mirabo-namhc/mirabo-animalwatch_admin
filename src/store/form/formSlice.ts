import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFormState } from '~/types/form.type';

const initialState: IFormState = {
    hasAtLeastOneValue: false,
};

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        getHasAtLeastOneValue(state, action: PayloadAction<boolean>) {
            state.hasAtLeastOneValue = action.payload;
        },
    },
});

// Actions
export const formActions = formSlice.actions;

// Selectors

// Reducer
const formReducer = formSlice.reducer;
export default formReducer;

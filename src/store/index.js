import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth-slice';
import { sheetSlice } from './sheet-slice';
import { stonesSlice } from './stones-slice';
import { toasterSlice } from './toaster-slice';

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        sheet: sheetSlice.reducer,
        stones: stonesSlice.reducer,
        toaster: toasterSlice.reducer,
    }
});

export default store;
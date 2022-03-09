import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth-slice';
import { sheetSlice } from './sheet-slice';

const store = configureStore({
    reducer: {
        sheet: sheetSlice.reducer,
        auth: authSlice.reducer,
    }
});

export default store;
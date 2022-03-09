import { createSlice } from "@reduxjs/toolkit";

const parse = val => val ? JSON.parse(val) : null;

const initialState = { 
  user: parse(localStorage.getItem('user')),
  token: parse(localStorage.getItem('auth-token')) 
};


export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('auth-token');
    }
  }
});

export const authActions = authSlice.actions;
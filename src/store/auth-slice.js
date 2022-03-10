import { createSlice } from "@reduxjs/toolkit";

const parse = val => val ? JSON.parse(val) : null;

const initialState = {
  user: parse(localStorage.getItem('user')),
  token: parse(localStorage.getItem('auth-token')),
  idToken: (localStorage.getItem('idToken') || null),
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    login(state, action) {
      const { token, user, idToken } = action.payload;
      state.user = user;
      state.token = token;
      state.idToken = idToken;
      localStorage.setItem('auth-token', JSON.stringify(token));
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('idToken', idToken);
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
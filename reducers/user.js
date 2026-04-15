import { createSlice } from '@reduxjs/toolkit';
import { act } from 'react';

const initialState = {
  value: { 
    token: null, 
    username: null,
    firstname: null,
    avatar: null
  },
};

export const userSlice = createSlice({
  name: 'username',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.username = action.payload.username;
      state.value.firstname = action.payload.firstname;
      state.value.avatar = action.payload.avatar
    },
    logout: (state) => {
      state.value.token = null;
      state.value.username = null;
      state.value.firstname = null;
      state.value.avatar = null
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
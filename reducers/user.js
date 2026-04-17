import { createSlice } from '@reduxjs/toolkit';
import { act } from 'react';

const initialState = {
  value: { 
    token: null, 
    username: null,
    firstname: null,
    avatar: null,
    id: null
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.username = action.payload.username;
      state.value.firstname = action.payload.firstname;
      state.value.avatar = action.payload.avatar;
      state.value.id = action.payload.id
    },
    logout: (state) => {
      state.value.token = null;
      state.value.username = null;
      state.value.firstname = null;
      state.value.avatar = null;
      state.value.id = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';
import { act } from 'react';

const initialState = {
  value: { 
    token: null, 
    username: null,
    firstname: null,
    avatar: null,
    id: null,
    likes: null
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
      state.value.likes = action.payload.likes
    },
    logout: (state) => {
      state.value.token = null;
      state.value.username = null;
      state.value.firstname = null;
      state.value.avatar = null;
      state.value.id = null;
      state.value.likes = [];
    },
    addLike : (state, action) => {
      if (state.value.likes == undefined) {
        state.value.likes = [action.payload]
      } else {
        state.value.likes.push(action.payload);
      }
      
    },
    delLike : (state, action) => {
      state.value.likes = state.value.likes.filter((tweet) => tweet !== action.payload)
    }
  },
});

export const { login, logout, addLike, delLike } = userSlice.actions;
export default userSlice.reducer;
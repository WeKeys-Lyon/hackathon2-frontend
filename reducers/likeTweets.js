import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: [],
};

export const likeTweetsSlice = createSlice({
 name: 'likeTweets',
 initialState,
 reducers: {
   likeTweet: (state, action) => {
     state.value.push(action.payload);
   },
   dislikeTweet: (state) => {
     state.value = [];
   }
 },
});

export const { dislikeTweet, likeTweet } = likeTweetsSlice.actions;
export default likeTweetsSlice.reducer;
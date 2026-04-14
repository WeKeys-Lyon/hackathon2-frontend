import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: [],
};

export const tweetsSlice = createSlice({
	name: 'tweets',
	initialState,
	reducers: {
		addTweet: (state, action) => {
			state.value.push(action.payload);
		},
		deleteTweet: (state, action) => {
			state.value = state.value.filter(tweet => tweet.username !== action.payload.username);
		},
	},
});

export const { addTweet, deleteTweet } = tweetsSlice.actions;
export default tweetsSlice.reducer;

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
		eraseAll: (state, action) => {
			state.value = []
		}
	},
});

export const { addTweet, deleteTweet, eraseAll } = tweetsSlice.actions;
export default tweetsSlice.reducer;

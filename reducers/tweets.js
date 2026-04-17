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
			state.value = state.value.filter(tweet => tweet._id !== action.payload._id);
			console.log(state.value)
		},
		eraseAll: (state, action) => {
			state.value = []
		}
	},
});

export const { addTweet, deleteTweet, eraseAll } = tweetsSlice.actions;
export default tweetsSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { fetchGames, createGame, makeBid } from '../actions/gamesActions';

const initialState = {
	games: [],
	isLoading: false,
	error: '',
	currentGameId: null,
	currentGame: null,
	gameLoading: false,
	gameSuccess: false,
	gameError: null,
	bidLoading: false,
	bidSuccess: false,
	bidError: null,
};

const gamesSlice = createSlice({
	name: 'games',
	initialState,
	reducers: {
		resetState: state => {
			return { ...state, gameSuccess: false };
		},
	},
	extraReducers: {
		[fetchGames.pending]: state => {
			state.isLoading = true;
		},
		[fetchGames.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.games = action.payload;
		},
		[fetchGames.rejected]: (state, action) => {
			state.isLoading = false;
			state.error = action.error.message;
		},
		[createGame.pending]: state => {
			state.gameLoading = true;
		},
		[createGame.fulfilled]: (state, action) => {
			state.gameSuccess = true;
			state.gameLoading = false;
			state.currentGameId = action.payload.game;
		},
		[createGame.rejected]: (state, action) => {
			state.gameLoading = false;
			state.gameError = action.error.message;
		},
		[makeBid.pending]: state => {
			state.bidLoading = true;
		},
		[makeBid.fulfilled]: (state, action) => {
			state.bidLoading = false;
			state.bidSuccess = true;
		},
		[makeBid.rejected]: (state, action) => {
			state.bidLoading = false;
			state.bidError = action.error.message;
		},
	},
});

export const { resetState: resetGame } = gamesSlice.actions;

export default gamesSlice.reducer;

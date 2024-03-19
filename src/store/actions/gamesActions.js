import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '@/api/index.js';

export const fetchGames = createAsyncThunk('games/all', async (_, { rejectWithValue }) => {
	try {
		const response = await api.fetchAllGamesAPI();
		return response.data;
	} catch (error) {
		return rejectWithValue(error.response);
	}
});

export const createGame = createAsyncThunk('games/new', async (data, { rejectWithValue }) => {
	try {
		const response = await api.createGameAPI(data);
		return response.data;
	} catch (error) {
		return rejectWithValue(error.response);
	}
});

export const makeBid = createAsyncThunk('games/bid', async (data, { rejectWithValue }) => {
	try {
		const response = await api.makeBidAPI(data);
		return response.data;
	} catch (error) {
		return rejectWithValue(error.response);
	}
});

export const getGame = createAsyncThunk('games/get', async (data, { rejectWithValue }) => {
	try {
		const response = await api.getGameAPI(data);
		return response.data;
	} catch (error) {
		return rejectWithValue(error.response);
	}
});

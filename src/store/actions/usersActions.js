import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '@/api/index.js';

function extractToken(response) {
	const tokenHeader = response.headers['Authorization'] || response.headers['authorization'];
	return tokenHeader ? tokenHeader.split(' ')[1] : null;
}

export const authUser = createAsyncThunk('user/auth', async (userData, { rejectWithValue }) => {
	try {
		const response = await api.authUserAPI(userData, userData.isLogin);
		const token = extractToken(response);
		return { user: response.data, token: token };
	} catch (error) {
		return rejectWithValue(error.response);
	}
});

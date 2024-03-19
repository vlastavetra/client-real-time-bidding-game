import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { authUser } from '../actions/usersActions';

const initialState = {
	currentUser: null,
	authLoading: false,
	authSuccess: false,
	authError: null,
};

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: { resetState: () => initialState },
	extraReducers: {
		[authUser.pending]: state => {
			state.authLoading = true;
			state.authError = null;
		},
		[authUser.fulfilled]: (state, action) => {
			state.authLoading = false;
			state.authSuccess = true;
			state.currentUser = action.payload.user;
			const { user, token } = action.payload;
			Cookies.set('token', token, { expires: 100, secure: true }); // i didn't use HttpOnly cookie for token, its not secure but for this project its ok
			localStorage.setItem('userInfo', JSON.stringify({ name: user.name, id: user.id }));
		},
		[authUser.rejected]: (state, action) => {
			state.authLoading = false;
			state.authError = action.error.message;
		},
	},
});

export const { resetState: resetUser } = usersSlice.actions;

export default usersSlice.reducer;

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/UserSlice';
import gameReducer from './reducers/GameSlice';

const rootReducer = combineReducers({
	userReducer,
	gameReducer,
});

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
		middleware: getDefaultMiddleware => getDefaultMiddleware().concat(),
	});
};

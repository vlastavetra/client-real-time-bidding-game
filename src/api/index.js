import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const authUserAPI = async (userData, isLogin) => {
	try {
		const path = isLogin ? '/user/login' : '/user/register';
		const response = await axios.post(`${API_URL}${path}`, userData);
		return response;
	} catch (error) {
		throw error;
	}
};

export const fetchAllGamesAPI = async () => {
	try {
		const token = Cookies.get('token'); // i didn't use HttpOnly cookie for token, its not secure but for this project its ok
		const response = await axios.get(`${API_URL}/game/`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response;
	} catch (error) {
		throw error;
	}
};

export const createGameAPI = async data => {
	try {
		const token = Cookies.get('token'); // i didn't use HttpOnly cookie for token, its not secure but for this project its ok
		const response = await axios.post(`${API_URL}/game/new`, data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response;
	} catch (error) {
		throw error;
	}
};

export const makeBidAPI = async data => {
	try {
		const token = Cookies.get('token'); // i didn't use HttpOnly cookie for token, its not secure but for this project its ok
		const response = await axios.post(`${API_URL}/game/bid`, data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response;
	} catch (error) {
		throw error;
	}
};

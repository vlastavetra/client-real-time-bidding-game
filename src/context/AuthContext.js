import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [isAuth, setIsAuth] = useState(false);
	const [userId, setUserId] = useState(null);

	useEffect(() => {
		const user = typeof window !== 'undefined' ? localStorage.getItem('userInfo') : null;
		const userInfo = user ? JSON.parse(user) : null;
		setIsAuth(!!userInfo);
		setUserId(userInfo ? userInfo.id : null);
	}, []);

	return (
		<AuthContext.Provider value={{ isAuth, userId, setIsAuth, setUserId }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);

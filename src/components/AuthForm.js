import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Box, TextField, Button, Typography, CircularProgress } from '@mui/material';
import { authUser } from '@/store/actions/usersActions';
import { useAuth } from '@/context/AuthContext';

export default function AuthForm() {
	const router = useRouter();
	const isLogin = router.pathname === '/login';

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		isLogin: isLogin,
	});

	const [formErrors, setFormErrors] = useState({
		name: '',
		email: '',
		password: '',
	});

	const { setIsAuth } = useAuth();

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const dispatch = useDispatch();
	const { authLoading, authSuccess, authError, currentUser } = useSelector(
		state => state.userReducer,
	);

	const validateName = name => name.length >= 2 && /^[A-Za-z ]+$/.test(name);
	const validateEmail = email => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
	const validatePassword = password => password.length >= 8 && !password.includes(' ');

	const handleFormChange = e => {
		const { name, value } = e.target;

		setFormData(prevData => ({ ...prevData, [name]: value }));
		setFormErrors(prevErrors => ({
			...prevErrors,
			[name]: (() => {
				if (name === 'name') return !validateName(value);
				if (name === 'email') return !validateEmail(value);
				if (name === 'password') return !validatePassword(value);
			})(),
		}));
	};

	const isFormInvalid = isLogin
		? !formData.email || !formData.password
		: !formData.name || !formData.email || !formData.password;

	const handleRegister = () => {
		!isFormInvalid && dispatch(authUser(formData));
	};

	useEffect(() => {
		if (authError) {
			setError(authError);
		}

		if (authLoading) {
			setLoading(true);
		} else {
			setLoading(false);
		}
	}, [authLoading, authError]);

	useEffect(() => {
		if (authSuccess) {
			setIsAuth(true);
			router.replace('/');
		}
	}, [authSuccess]);

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				width: '100%',
			}}
		>
			<Box
				component="form"
				sx={{
					display: 'flex',
					justifyContent: 'center',
					flexDirection: 'column',
					alignItems: 'center',
					gap: '20px',
					width: '300px',
				}}
			>
				<Typography variant="h5" component="h2">
					{isLogin ? 'Login' : 'Registration'}
				</Typography>
				{!isLogin && (
					<TextField
						required
						name="name"
						label="Name"
						type="text"
						value={formData.name}
						error={!!formErrors.name}
						size="small"
						onChange={handleFormChange}
						sx={{ width: '100%' }}
					/>
				)}
				<TextField
					required
					name="email"
					label="Email"
					type="email"
					value={formData.email}
					error={!!formErrors.email}
					size="small"
					onChange={handleFormChange}
					sx={{ width: '100%' }}
				/>
				<TextField
					required
					error={!!formErrors.password}
					name="password"
					label="Password"
					type="password"
					value={formData.password}
					size="small"
					onChange={handleFormChange}
					sx={{ width: '100%' }}
				/>
				<Button
					variant="contained"
					disabled={isFormInvalid || loading}
					onClick={handleRegister}
					sx={{ width: '100%' }}
				>
					Go
				</Button>
				{loading && <CircularProgress />}
				{error && <p>{error}</p>}
			</Box>
		</div>
	);
}

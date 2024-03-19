import axios from 'axios';
import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { useAuth } from '@/context/AuthContext';
import { resetUser } from '@/store/reducers/UserSlice';

export default function Header() {
	const router = useRouter();
	const { isAuth, setIsAuth } = useAuth();
	const dispatch = useDispatch();

	const buttonName = isAuth ? 'Logout' : 'Login';

	const handleAuth = async () => {
		if (isAuth) {
			setIsAuth(false);
			dispatch(resetUser());
			localStorage.removeItem('userInfo');
			Cookies.set('token', '', {});
			router.replace('/login');
			await axios.get('/api/logout');
		} else {
			router.replace('/login');
		}
	};

	return (
		<Box sx={{ flexGrow: 1, padding: '0 30px' }}>
			<AppBar position="fixed" sx={{}}>
				<Toolbar variant="dense" sx={{ display: 'flex', justifyContent: 'space-between' }}>
					<Link href="/" passHref>
						<Typography variant="h5" component="h1">
							Real Time Bidding Game
						</Typography>
					</Link>
					<div>
						{isAuth ? (
							<Link href="/game">
								<Button color="inherit">All games</Button>
							</Link>
						) : null}
						{router.pathname !== '/registration' && router.pathname !== '/login' ? (
							<Button color="inherit" onClick={handleAuth}>
								{buttonName}
							</Button>
						) : null}
					</div>
				</Toolbar>
			</AppBar>
		</Box>
	);
}

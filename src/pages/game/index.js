import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { CircularProgress } from '@mui/material';
import Header from '@/components/Header';
import BidForm from '@/components/NewGameForm';
import { fetchGames } from '@/store/actions/gamesActions';
import GamesTable from '@/components/GamesTable';

export default function Game({ isServerAuth }) {
	const router = useRouter();
	const dispatch = useDispatch();

	const { isLoading, games } = useSelector(state => state.gameReducer);

	useEffect(() => {
		if (!isServerAuth) {
			router.push('/login');
		}

		dispatch(fetchGames());
	}, [isServerAuth]);

	if (!isServerAuth) {
		return null;
	}

	return (
		<div>
			<Head>
				<title>Real time bidding game</title>
				<meta name="description" content="" />
			</Head>
			<Header />
			<main className="main-wrapper">
				<BidForm />
				{isLoading ? <CircularProgress /> : games && <GamesTable games={games} />}
			</main>
		</div>
	);
}

export const getServerSideProps = async context => {
	const cookies = context.req.headers.cookie || '';
	const token = parseCookie(cookies)['token'];

	const isServerAuth = token != null;

	return {
		props: {
			isServerAuth,
		},
	};
};

const parseCookie = cookieString =>
	cookieString
		.split(';')
		.map(v => v.split('='))
		.reduce((acc, v) => {
			acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1]?.trim());
			return acc;
		}, {});

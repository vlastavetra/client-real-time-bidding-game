import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Typography, Button } from '@mui/material';
import Header from '@/components/Header';
import { useAuth } from '@/context/AuthContext';

export default function Home({ isServerAuth }) {
	const { isAuth } = useAuth();
	const [gameAvailable, setGameAvailable] = useState(false);

	useEffect(() => {
		if (isAuth && isServerAuth) {
			setGameAvailable(true);
		}
	}, [isAuth]);
	return (
		<div>
			<Head>
				<title>Real time bidding game</title>
				<meta name="description" content="" />
			</Head>
			<Header />
			<main className="main-wrapper">
				<Typography variant="h6" component="h3">
					{gameAvailable ? 'Welcome to the game' : 'Please login to play the game'}
				</Typography>
				<Button
					variant="contained"
					color="secondary"
					disabled={!gameAvailable}
					style={{ marginTop: '20px' }}
				>
					<Link href="/game" passHref>
						Play game
					</Link>
				</Button>
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

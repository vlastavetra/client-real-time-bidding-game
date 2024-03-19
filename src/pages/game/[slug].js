import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import GameBoard from '@/components/GameBoard';
import Header from '@/components/Header';
import { resetGame } from '@/store/reducers/GameSlice';

export default function Game({ isServerAuth }) {
	const [game, setGame] = useState(null);
	const [websocket, setWebsocket] = useState(null);
	const router = useRouter();
	const gameId = router.query.slug;

	const WEBSOCKET_URL = process.env.NEXT_PUBLIC_WS_URL;
	let isFirstConnection = true;
	const token = Cookies.get('token'); // i didn't use HttpOnly cookie for token, its not secure but for this project its ok
	const dispatch = useDispatch();

	const firstConGameData = {
		game_id: gameId,
		token: token, // i tried to use wss with self-signed certificate for more security but my google chrome blocked it.
		//in real life i would use real certificate and would not transfer the token in this bad way - only in headers
		action: 'subscribe',
	};

	useEffect(() => {
		if (!isServerAuth) {
			router.push('/login');
		}
	}, [isServerAuth]);

	if (!isServerAuth) {
		return null;
	}

	useEffect(() => {
		dispatch(resetGame());
	}, []);

	useEffect(() => {
		const websocket = new WebSocket(WEBSOCKET_URL);
		websocket.onopen = () => {
			console.log('Connected to server');
			if (isFirstConnection) {
				websocket.send(JSON.stringify(firstConGameData));
				isFirstConnection = false;
			}
		};
		websocket.onmessage = event => {
			setGame(JSON.parse(event.data));
		};
		websocket.onclose = () => {
			console.log('Connection closed');
		};
		setWebsocket(websocket);
		return () => {
			websocket.close();
		};
	}, []);

	return (
		<div>
			<Head>
				<title>Real time bidding game</title>
				<meta name="description" content="" />
			</Head>
			<Header />
			<main className="main-wrapper">
				{game?.game_id && <GameBoard game={game} websocket={websocket} />}
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

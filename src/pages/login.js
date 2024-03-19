import Head from 'next/head';
import Link from 'next/link';
import { Button } from '@mui/material';
import AuthForm from '@/components/AuthForm';
import Header from '@/components/Header';

export default function Login() {
	return (
		<div>
			<Head>
				<title>Real time bidding game login</title>
				<meta name="description" content="" />
			</Head>
			<Header />
			<main className="main-wrapper">
				<AuthForm />
				<Link href="/registration" passHref style={{ marginTop: '20px' }}>
					<Button color="inherit" sx={{ textDecoration: 'underline' }}>
						Or Registration ?
					</Button>
				</Link>
			</main>
		</div>
	);
}

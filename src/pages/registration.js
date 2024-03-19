import Head from 'next/head';
import Link from 'next/link';
import { Button } from '@mui/material';
import AuthForm from '@/components/AuthForm';
import Header from '@/components/Header';

export default function Registration() {
	return (
		<div>
			<Head>
				<title>Real time bidding game registration</title>
				<meta name="description" content="" />
			</Head>
			<Header />
			<main className="main-wrapper">
				<AuthForm />
				<Link href="/login" passHref style={{ marginTop: '20px' }}>
					<Button color="inherit" sx={{ textDecoration: 'underline' }}>
						Or Login ?
					</Button>
				</Link>
			</main>
		</div>
	);
}

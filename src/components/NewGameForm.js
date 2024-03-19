import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Box, TextField, Button } from '@mui/material';
import { createGame } from '@/store/actions/gamesActions';

export default function BidForm() {
	const [formData, setFormData] = useState({
		bid_amount: '',
	});

	const router = useRouter();
	const dispatch = useDispatch();

	const { currentGameId, gameSuccess } = useSelector(state => state.gameReducer);

	const handleFormChange = e => {
		const { name, value } = e.target;
		if (name === 'bid_amount') {
			const reg = /^[0-9]*\.?[0-9]*$/;
			if (reg.test(value)) {
				setFormData(prevData => ({ ...prevData, [name]: value }));
			}
		} else {
			setFormData(prevData => ({ ...prevData, [name]: value }));
		}
	};

	const handleNewGame = () => {
		dispatch(createGame(formData));
	};

	useEffect(() => {
		if (gameSuccess) {
			router.push(`/game/${currentGameId}`);
		}
	}, [gameSuccess, currentGameId]);

	return (
		<Box
			component="form"
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				gap: '20px',
				width: '500px',
			}}
		>
			<TextField
				required
				name="bid_amount"
				label="Bid amount"
				type="number"
				value={formData.bid_amount}
				size="small"
				onChange={handleFormChange}
				sx={{ width: '30%' }}
			/>
			<Button
				variant="contained"
				color="secondary"
				disabled={formData.bid_amount.length === 0}
				onClick={handleNewGame}
			>
				Start new game
			</Button>
		</Box>
	);
}

import { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import Cookies from 'js-cookie';

export default function BidForm({ gameId, websocket, maxBid }) {
	const token = Cookies.get('token'); // i didn't use HttpOnly cookie for token, its not secure but for this project its ok
	const [formData, setFormData] = useState({
		bid_amount: maxBid ? maxBid + 1 : '',
		game_id: gameId,
		token: token,
	});

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

	const handleAddBid = () => {
		websocket.send(JSON.stringify(formData));
	};

	return (
		<Box
			component="form"
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				gap: '20px',
				width: '500px',
				marginTop: '20px',
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
				onClick={handleAddBid}
			>
				Add bid
			</Button>
		</Box>
	);
}

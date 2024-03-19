import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from '@mui/material';

export default function BidsTable({ bids }) {
	return (
		<TableContainer component={Paper} sx={{ width: '80%', marginTop: '20px' }}>
			<Table aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Bid amount</TableCell>
						<TableCell>Name</TableCell>
						<TableCell>Bid time</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{bids.map((row, index) => (
						<TableRow key={row.id}>
							<TableCell component="th" scope="row">
								{row.bid_amount}
							</TableCell>
							<TableCell>{row.name}</TableCell>
							<TableCell>{row.timestamp}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

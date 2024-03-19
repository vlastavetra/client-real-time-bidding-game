import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from '@mui/material';
import Link from 'next/link';

export default function GamesTable({ games }) {
	return (
		<TableContainer component={Paper} sx={{ width: '80%', marginTop: '20px' }}>
			<Table aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Bid amount</TableCell>
						<TableCell>Name</TableCell>
						<TableCell>Bid time</TableCell>
						<TableCell>Status</TableCell>
						<TableCell>Entrance</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{games?.map((row, index) => (
						<TableRow key={row.id}>
							<TableCell>{row.max_bid_amount}</TableCell>
							<TableCell>{row.user_name}</TableCell>
							<TableCell>{row.bid_timestamp}</TableCell>
							<TableCell>
								{new Date(row.end_time) > new Date() ? 'in progress' : 'finished'}
							</TableCell>
							<TableCell>
								{row.user_count < 2 && new Date(row.end_time) > new Date() ? (
									<Link
										href={`/game/${row.id}`}
										passHref
										style={{ textAlign: 'center', textDecoration: 'underline' }}
									>
										Join now
									</Link>
								) : (
									'not awailable'
								)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

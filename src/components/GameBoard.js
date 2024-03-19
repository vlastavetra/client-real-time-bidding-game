import { Typography } from '@mui/material';
import { useAuth } from '@/context/AuthContext';
import CountdownTimer from '@/components/CountdownTimer';
import BidForm from '@/components/BidForm';
import BidsTable from './BidsTable';

const getMaxBid = dataArray => {
	return dataArray.reduce((max, item) => {
		return item.bid_count > max.bid_count ? item : max;
	}, dataArray[0]);
};

const Game = ({ game, websocket }) => {
	const { userId } = useAuth();
	const usersGame = true;
	const sortedBids = game?.bids.sort((a, b) => b.bid_amount - a.bid_amount);
	const maxBid = sortedBids[0]?.bid_amount;
	const maxBidItem = getMaxBid(game?.users_data);
	const winner = game?.users_data.find(obj => obj.type === 'winner');

	return (
		<>
			<Typography variant="h5" component="h2">
				Game: {game.game_id}
			</Typography>
			<CountdownTimer targetDate={game.end} />
			{usersGame && <BidForm gameId={game.game_id} websocket={websocket} maxBid={maxBid} />}
			<Typography variant="h6" component="p" mt={2}>
				{winner ? 'Winner' : 'Leader'} : {winner ? winner.name : maxBidItem.name} with{' '}
				{winner ? winner.bid_count : maxBidItem.bid_count} bids
			</Typography>
			<BidsTable bids={sortedBids} />
		</>
	);
};

export default Game;

import './global.scss';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { AuthProvider } from '../context/AuthContext';
import { setupStore } from '../store';
import { theme } from '../theme';

const store = setupStore();

function MyApp({ Component, pageProps }) {
	return (
		<ThemeProvider theme={theme}>
			<Provider store={store}>
				<AuthProvider>
					<Component {...pageProps} />
				</AuthProvider>
			</Provider>
		</ThemeProvider>
	);
}

export default MyApp;

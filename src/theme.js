import { createTheme } from '@mui/material/styles';

const oswald = '"Oswald", "Arial", "sans-serif" !important';
const arimo = '"Arimo", "Arial", "sans-serif" !important';

export const GENERAL_COLOR = '#19425e';
export const SECOND_COLOR = '#385763';
export const ACCENT_COLOR = '#bd571e';
export const LIGHT_COLOR = '#ebeff0';
export const ERROR_COLOR = '#962936';
export const SUCCESS_COLOR = '#4e9152';
export const PENDING_COLOR = '#537982';
const WHITE_COLOR = '#fff';

export const theme = createTheme({
	components: {
		MuiLink: {
			root: {
				'&.MuiLink-underlineHover': {
					textDecoration: 'underline',
				},
				'&:hover': {
					color: '#184c51',
				},
			},
		},
		MuiCheckbox: {
			root: {
				'&.MuiCheckbox-colorSecondary.Mui-checked': {
					color: SECOND_COLOR,
				},
			},
		},
		MuiTooltip: {
			styleOverrides: {
				tooltip: {
					fontSize: '12px',
					padding: '8px 12px',
				},
			},
		},
	},
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 900,
			lg: 1280,
			xl: 1600,
		},
		unit: 'px',
		step: 1,
	},
	palette: {
		contrastText: '#db143f',
		background: {
			light: LIGHT_COLOR,
			tableHead: LIGHT_COLOR,
		},
		primary: {
			main: GENERAL_COLOR,
			light: LIGHT_COLOR,
			contrastText: WHITE_COLOR,
		},
		secondary: {
			main: SECOND_COLOR,
		},
		border: {
			main: SECOND_COLOR,
			secondary: '#db143f',
		},
		danger: {
			main: ERROR_COLOR,
			table: '#dd104b',
			tableSecondary: '#ffacc4',
		},
		success: {
			main: SUCCESS_COLOR,
			table: '#11a60a',
			tableSecondary: '#a0db9d',
		},
		grey: {
			900: '#25292e',
			100: '#a1a4a9',
			110: '#a1a4a9',
		},
	},
	typography: {
		h6: {
			fontFamily: oswald,
		},
		body1: {
			fontFamily: arimo,
		},
		body2: {
			fontFamily: arimo,
		},
		body3: {
			fontFamily: arimo,
			fontWeight: 700,
		},
		fontFamily: arimo,
		fontFamilyBold: oswald,
		fontWeightLight: 200,
		fontWeightRegular: 400,
		fontWeightMedium: 500,
		fontWeightBold: 700,
	},
});

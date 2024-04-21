import React from 'react';
import { DefaultTheme, PaperProvider } from 'react-native-paper';
import MainNavigator from './navigation';
import { theme } from './theme';

declare global {
	namespace ReactNativePaper {
		interface ThemeColors {
			myOwnColor: string;
		}

		interface Theme {
			myOwnProperty: boolean;
		}
	}
}

// const theme = {
// 	...DefaultTheme,
// 	// Specify custom property
// 	myOwnProperty: true,
// 	// Specify custom property in nested object
// 	colors: {
// 		primary: '#305EFF',
// 		secondary: '#0A1333',
// 		tertiary: '#9EA9D1',
// 		background: '#F5F7FF',
// 		error: '#F04438',
// 		sub_text: '#898E9D',
// 		success: '#00BE5F',
// 		text: '#0A1333',
// 		warning: '#FF7A19',
// 	},

// };

function App(): React.JSX.Element {
	return (
		<PaperProvider theme={theme}>
			<MainNavigator />
		</PaperProvider>
	);
}

export default App;

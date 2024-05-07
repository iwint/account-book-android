import React, { useEffect } from 'react';
import { PaperProvider, Text } from 'react-native-paper';
import MainNavigator from './navigation';
import { theme } from './theme';
import { NavigationContainer } from '@react-navigation/native';
import useAppStore from './store/app-store';
import { usePromiseTracker } from 'react-promise-tracker';
import { View } from 'react-native';

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
	const { checkIsAuthorized, isLoading, userToken } =
		useAppStore();

	useEffect(() => {
		console.log('App mounted');
		checkIsAuthorized();
	}, []);

	if (isLoading) {
		return (
			<View
				style={{
					flex: 1,
					height: '100%',
					position: 'absolute',
					width: '100%',
					backgroundColor: '#000',
				}}
			>
				<Text>Loading....</Text>
			</View>
		);
	}

	console.log('USERTOKEN', userToken);

	return (
		<PaperProvider
			theme={{
				...theme,
				dark: false,
			}}
		>
			<NavigationContainer>
				<MainNavigator />
			</NavigationContainer>
		</PaperProvider>
	);
}

export default App;

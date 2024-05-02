import {
	NavigationContainer,
	useFocusEffect,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import MainStack from './main/main-stack';
import AuthStack from './auth/auth-stack';
import { getAuthToken } from '../utils/storage-funtions';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {};

const MainNavigator = (props: Props) => {
	const { Navigator, Screen } = createNativeStackNavigator();
	let isAuthorized = true;
	const theme = useTheme();

	// useFocusEffect(
	// 	useCallback(() => {
	// 		getAuthToken().then((token) => {
	// 			console.log('TOKEN', token);

	// 			if (typeof token === 'string' && token.length > 0) {
	// 				setIsAuthorized(true);
	// 			}
	// 		});
	// 	}, []),
	// );

	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: theme.colors.background,
			}}
		>
			<Navigator
				initialRouteName={
					isAuthorized ? 'MainStack' : 'AuthStack'
				}
				screenOptions={{
					headerShown: false,
				}}
			>
				<Screen name="AuthStack" component={AuthStack} />
				<Screen name="MainStack" component={MainStack} />
			</Navigator>
		</SafeAreaView>
	);
};

export default MainNavigator;

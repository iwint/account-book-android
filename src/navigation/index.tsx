import {
	NavigationContainer,
	useFocusEffect,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import MainStack from './main/main-stack';
import AuthStack from './auth/auth-stack';
import { getAuthToken } from '../utils/storage-funtions';
import useAppStore from '../store/app-store';

type Props = {};

const MainNavigator = (props: Props) => {
	const { Navigator, Screen } = createNativeStackNavigator();
	const { isLoggedIn, userToken, checkIsAuthorized } =
		useAppStore();
	const theme = useTheme();

	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: theme.colors.background,
			}}
		>
			<Navigator
				initialRouteName={isLoggedIn ? 'MainStack' : 'AuthStack'}
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

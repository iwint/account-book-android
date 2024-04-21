import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import MainStack from './main/main-stack';

type Props = {};

const MainNavigator = (props: Props) => {
	const { Navigator, Screen } = createNativeStackNavigator();
	const theme = useTheme();
	return (
		<NavigationContainer>
			<SafeAreaView
				style={{
					flex: 1,
					backgroundColor: theme.colors.background,
				}}
			>
				<Navigator
					screenOptions={{
						headerShown: false,
					}}
				>
					<Screen name="MainStack" component={MainStack} />
				</Navigator>
			</SafeAreaView>
		</NavigationContainer>
	);
};

export default MainNavigator;

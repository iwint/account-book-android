import React from 'react';
import { createMaterialBottomTabNavigator } from 'react-native-paper/lib/typescript/react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeStack from './HomeStack';
import { IconButton, Text, useTheme } from 'react-native-paper';
import {
	BottomTabScreenProps,
	createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { View } from 'react-native';

const RenderTabBarIcon = ({
	focused,
	color,
	size,
	route,
}: any): JSX.Element => {
	let iconName = '';

	switch (route?.name) {
		case 'Home':
			iconName = focused ? 'home-circle' : 'home-circle-outline';
			break;
		case 'Account':
			iconName = focused
				? 'syllabary-katakana'
				: 'syllabary-katakana-halfwidth';
			break;
	}
	return (
		<IconButton
			icon={iconName}
			iconColor={color}
			size={size}
			selected={focused}
		/>
	);
};

const MainStack = () => {
	const { Navigator, Screen } = createBottomTabNavigator();
	const theme = useTheme();
	const tabNavProps = {
		screenOptions: ({ route }: BottomTabScreenProps<any>) => ({
			tabBarActiveTintColor: theme.colors.primary,
			tabBarInactiveTintColor: 'gray',
			headerShown: false,
			tabBarHideOnKeyboard: true,
			tabBarStyle: { height: 60 },
			tabBarIcon: (tabBarIconProps: any) =>
				RenderTabBarIcon({ ...tabBarIconProps, route }),
		}),
	};

	return (
		<Navigator {...tabNavProps}>
			<Screen name="Home" component={HomeStack} />
		</Navigator>
	);
};

export default MainStack;

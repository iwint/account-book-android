import {
	BottomTabScreenProps,
	createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { IconButton, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import useAppStore from '../../store/app-store';
import BillStack from './bills-stack';
import ItemStack from './items-stack';
import LoanStack from './loans-stack';
import MoreStack from './more-stack';
import PartiesStack from './parties-stack';

const DISABLED_ROUTES = ['Bills', 'Items', 'Loans', 'More'];

const RenderTabBarIcon = ({
	focused,
	color,
	size,
	route,
}: any): JSX.Element => {
	let iconName = '';

	switch (route?.name) {
		case 'Parties':
			iconName = focused ? 'people' : 'people-outline';
			break;
		case 'Bills':
			iconName = focused ? 'receipt' : 'receipt-outline';
			break;
		case 'Items':
			iconName = focused ? 'bag-handle' : 'bag-handle-outline';
			break;
		case 'Loans':
			iconName = focused ? 'card' : 'card-outline';
			break;
		case 'More':
			iconName = focused
				? 'ellipsis-horizontal'
				: 'ellipsis-horizontal-outline';
			break;
	}
	return <Icon name={iconName} color={color} size={size} />;
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
			tabBarStyle: {
				height: 70,
				paddingTop: 0,
				paddingBottom: 15,
				width: '100%',
			},
			tabBarAllowFontScaling: true,
			tabBarButton: (tabBarButtonProps: any) => {
				return (
					<IconButton
						disabled={DISABLED_ROUTES.includes(route.name)}
						{...tabBarButtonProps}
						style={{
							opacity: DISABLED_ROUTES.includes(route.name)
								? 0.5
								: 1,
							borderRadius: 10,
							height: '100%',
							borderTopWidth: tabBarButtonProps
								?.accessibilityState?.selected
								? 1.5
								: 0,
							width: '17%',
							borderTopColor: theme.colors.primary,
						}}
						icon={() => tabBarButtonProps.children}
					/>
				);
			},
			tabBarIcon: (tabBarIconProps: any) =>
				RenderTabBarIcon({ ...tabBarIconProps, route }),
		}),
	};
	const { getUserData } = useAppStore();

	useFocusEffect(
		useCallback(() => {
			getUserData();
		}, []),
	);

	return (
		<Navigator
			initialRouteName="Parties"
			{...(tabNavProps as any)}
		>
			<Screen name="Parties" component={PartiesStack} />
			<Screen name="Bills" component={BillStack} />
			<Screen name="Items" component={ItemStack} />
			<Screen name="Loans" component={LoanStack} />
			<Screen name="More" component={MoreStack} />
		</Navigator>
	);
};

export default MainStack;

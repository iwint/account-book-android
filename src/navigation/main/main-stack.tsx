import {
	BottomTabScreenProps,
	createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import React from 'react';
import { IconButton, useTheme } from 'react-native-paper';
import BillStack from './bills-stack';
import ItemStack from './items-stack';
import LoanStack from './loans-stack';
import MoreStack from './more-stack';
import PartiesStack from './parties-stack';
import Icon from 'react-native-vector-icons/Ionicons';

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
			tabBarStyle: { height: 70, paddingBottom: 15 },
			tabBarIcon: (tabBarIconProps: any) =>
				RenderTabBarIcon({ ...tabBarIconProps, route }),
		}),
	};

	return (
		<Navigator {...tabNavProps}>
			<Screen name="Parties" component={PartiesStack} />
			<Screen name="Bills" component={BillStack} />
			<Screen name="Items" component={ItemStack} />
			<Screen name="Loans" component={LoanStack} />
			<Screen name="More" component={MoreStack} />
		</Navigator>
	);
};

export default MainStack;

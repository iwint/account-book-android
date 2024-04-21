import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Items from '../../screens/main/items/items';

type Props = {};

const ItemStack = (props: Props) => {
	const { Navigator, Screen } = createNativeStackNavigator();

	return (
		<Navigator
			screenOptions={{ headerShown: false }}
			initialRouteName="AllItems"
		>
			<Screen name="AllItems" component={Items} />
		</Navigator>
	);
};

export default ItemStack;

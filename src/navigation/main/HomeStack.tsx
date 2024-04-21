import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Home from '../../screens/main/Home';

type Props = {};

const HomeStack = (props: Props) => {
	const { Navigator, Screen } = createNativeStackNavigator();

	return (
		<Navigator
			screenOptions={{ headerShown: false }}
			initialRouteName="Home"
		>
			<Screen name="Home" component={Home} />
		</Navigator>
	);
};

export default HomeStack;

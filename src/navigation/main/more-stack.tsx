import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import More from '../../screens/main/more/more';

type Props = {};

const MoreStack = (props: Props) => {
	const { Navigator, Screen } = createNativeStackNavigator();

	return (
		<Navigator
			screenOptions={{ headerShown: false }}
			initialRouteName="Extra"
		>
			<Screen name="Extra" component={More} />
		</Navigator>
	);
};

export default MoreStack;

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AllParties from '../../screens/main/parties/all-parties';

type Props = {};

const PartiesStack = (props: Props) => {
	const { Navigator, Screen } = createNativeStackNavigator();

	return (
		<Navigator
			screenOptions={{ headerShown: false }}
			initialRouteName="AllParties"
		>
			<Screen name="AllParties" component={AllParties} />
		</Navigator>
	);
};

export default PartiesStack;

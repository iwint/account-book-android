import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AllParties from '../../screens/main/parties/all-parties';
import AddParty from '../../screens/main/parties/add-party';
import SingleParty from '../../screens/main/parties/single-party';

type Props = {};

const PartiesStack = (props: Props) => {
	const { Navigator, Screen } = createNativeStackNavigator();

	return (
		<Navigator
			screenOptions={{ headerShown: false }}
			initialRouteName="AllParties"
		>
			<Screen name="AllParties" component={AllParties} />
			<Screen name="AddParty" component={AddParty} />
			<Screen name="SingleParty" component={SingleParty} />
		</Navigator>
	);
};

export default PartiesStack;

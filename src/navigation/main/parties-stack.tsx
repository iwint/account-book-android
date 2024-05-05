import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AllParties from '../../screens/main/parties/all-parties';
import AddParty from '../../screens/main/parties/add-party';
import SingleParty from '../../screens/main/parties/single-party';
import AddTransaction from '../../screens/main/parties/add-transaction';
import Profile from '../../screens/main/profile/profile';

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
			<Screen name="AddTransaction" component={AddTransaction} />
			<Screen name="Profile" component={Profile} />
		</Navigator>
	);
};

export default PartiesStack;

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Bills from '../../screens/main/bills/bills';

type Props = {};

const BillStack = (props: Props) => {
	const { Navigator, Screen } = createNativeStackNavigator();

	return (
		<Navigator
			screenOptions={{ headerShown: false }}
			initialRouteName="AllBills"
		>
			<Screen name="AllBills" component={Bills} />
		</Navigator>
	);
};

export default BillStack;

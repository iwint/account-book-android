import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Loans from '../../screens/main/loans/loans';

type Props = {};

const LoanStack = (props: Props) => {
	const { Navigator, Screen } = createNativeStackNavigator();

	return (
		<Navigator
			screenOptions={{ headerShown: false }}
			initialRouteName="AllLoans"
		>
			<Screen name="AllLoans" component={Loans} />
		</Navigator>
	);
};

export default LoanStack;

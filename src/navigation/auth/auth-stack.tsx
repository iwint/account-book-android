import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Register from '../../screens/auth/auth';
import Auth from '../../screens/auth/auth';

type Props = {};

const AuthStack = (props: Props) => {
	const { Navigator, Screen } = createNativeStackNavigator();
	return (
		<Navigator initialRouteName="Login">
			<Screen
				name="Login"
				options={{
					headerShown: false,
				}}
				component={Auth}
			/>
		</Navigator>
	);
};

export default AuthStack;

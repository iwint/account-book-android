import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Login from '../../screens/auth/Login';

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
				component={Login}
			/>
		</Navigator>
	);
};

export default AuthStack;

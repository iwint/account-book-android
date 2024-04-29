import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { ToastAndroid } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import BottomSection from '../../components/sections/auth-bottom-section';
import AuthTopSection from '../../components/sections/auth-top-section';
import {
	UserLoginPayload,
	UserRegisterPayload,
} from '../../@types/user';

interface RegisterScreenProps
	extends NativeStackScreenProps<any> {}

const Register: React.FC<RegisterScreenProps> = (props) => {
	const type = props.navigation
		.getState()
		.routes.find(
			(route) =>
				route?.params !== undefined &&
				route?.params.type !== undefined,
		)?.params?.type;
	console.log(type);

	const [authData, setAuthData] = useState<
		UserRegisterPayload | UserLoginPayload | any
	>();
	const Content = {
		title: type != 'sign_up' ? 'Welcome Back!' : 'Sign Up',
		description:
			type != 'sign_up'
				? 'Sign In to your account'
				: 'Create account and enjoy all services',
	};
	const signInData = {
		username: '',
		password: '',
	};
	const signUpData = {
		username: '',
		phone: '',
		shopname: '',
		password: '',
		image: '',
	};

	const handleChange = (key: string, val: string) => {
		setAuthData({
			...(authData as UserRegisterPayload | UserLoginPayload),
			[key]: val,
		});
	};

	useEffect(() => {
		if (type === 'sign_in') {
			setAuthData(signInData);
		} else {
			setAuthData(signUpData);
		}
	}, [type]);

	const signInForm = [
		{
			label: 'Username',
			placeholder: 'Enter your username',
			icon: 'person-outline',
			type: 'text',
			value: authData?.username,
			onChange: (val: string) => handleChange('username', val),
		},
		{
			label: 'Password',
			placeholder: 'Enter your password',
			icon: 'eye-outline',
			type: 'text',
			value: authData?.password,
			onChange: (val: string) => handleChange('password', val),
		},
	];
	const signUpForm = [
		{
			label: 'Username',
			placeholder: 'Enter your username',
			icon: 'person-outline',
			type: 'text',
			value: authData?.username,
			onChange: (val: string) => handleChange('username', val),
		},
		{
			label: 'Password',
			placeholder: 'Enter your password',
			icon: 'eye-outline',
			type: 'text',
			value: authData?.password,
			onChange: (val: string) => handleChange('password', val),
		},
		{
			label: 'Shop Name',
			placeholder: 'Enter your shop name',
			icon: 'home-outline',
			value: authData?.shopname,
			type: 'email',
			onChange: (val: string) => {
				setAuthData({
					...(authData as UserRegisterPayload),
					shopname: val,
				});
			},
		},
		{
			label: 'Mobile',
			placeholder: 'Enter your mobile number',
			icon: 'call-outline',
			type: 'numeric',
			value: authData?.phone,
			onChange: (val: string) => {
				setAuthData({
					...authData,
					mobile: val,
				});
			},
		},
	];

	const handleSubmit = async () => {
		// if (
		// 	(type === 'sign_up' &&
		// 		authData?.name != '' &&
		// 		authData?.email != '' &&
		// 		authData?.mobile != '') ||
		// 	(type === 'sign_in' && authData?.mobile != '')
		// ) {
		// 	ToastAndroid.show(
		// 		`${
		// 			type === 'sign_in'
		// 				? 'Sign in sucessfully done'
		// 				: 'Sign up sucessfully done'
		// 		}`,
		// 		ToastAndroid.SHORT,
		// 	);
		// 	props.navigation.navigate({
		// 		name: 'Otp',
		// 		params: {
		// 			mobile: authData?.mobile,
		// 		},
		// 	});
		// 	console.log(props.navigation);
		// } else {
		// 	ToastAndroid.show(
		// 		'Please fill all fields',
		// 		ToastAndroid.SHORT,
		// 	);
		// }
	};

	return (
		<View style={styles.container}>
			<View style={styles.wrapperContainer}>
				<AuthTopSection Content={Content} type={type} />
				<BottomSection
					type={type}
					handleNavigation={props.navigation}
					handleSubmit={handleSubmit}
					formData={type === 'sign_up' ? signUpForm : signInForm}
				/>
			</View>
		</View>
	);
};

export default Register;

const styles = StyleSheet.create({
	container: {
		gap: 5,
		padding: 20,
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%',
	},
	wrapperContainer: {
		backgroundColor: '#fff',
		borderRadius: 20,
		width: '100%',
	},
});

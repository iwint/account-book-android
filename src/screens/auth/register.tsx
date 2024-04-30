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
import useAppStore from '../../store/app-store';
import {
	FieldValues,
	SubmitHandler,
	useForm,
} from 'react-hook-form';

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

	const { authenticateUser, user } = useAppStore();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<
		UserRegisterPayload | UserLoginPayload | FieldValues
	>({
		defaultValues: type === 'sign_up' ? signUpData : signInData,
	});

	const Content = {
		title: type != 'sign_up' ? 'Welcome Back!' : 'Sign Up',
		description:
			type != 'sign_up'
				? 'Sign In to your account'
				: 'Create account and enjoy all services',
	};

	const signInForm = [
		{
			label: 'Username',
			placeholder: 'Enter your username',
			icon: 'person-outline',
			type: 'text',
		},
		{
			label: 'Password',
			placeholder: 'Enter your password',
			icon: 'eye-outline',
			type: 'text',
		},
	];
	const signUpForm = [
		{
			label: 'Username',
			placeholder: 'Enter your username',
			icon: 'person-outline',
			type: 'text',
		},
		{
			label: 'Password',
			placeholder: 'Enter your password',
			icon: 'eye-outline',
			type: 'text',
		},
		{
			label: 'Shop Name',
			placeholder: 'Enter your shop name',
			icon: 'home-outline',
			type: 'email',
		},
		{
			label: 'Mobile',
			placeholder: 'Enter your mobile number',
			icon: 'call-outline',
			type: 'numeric',
		},
	];

	const OnSubmit: SubmitHandler<FieldValues> = async (
		data,
	) => {};
	return (
		<View style={styles.container}>
			<View style={styles.wrapperContainer}>
				<AuthTopSection Content={Content} type={type} />
				<BottomSection
					control={control}
					errors={errors}
					type={type}
					handleSubmit={handleSubmit(OnSubmit)}
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

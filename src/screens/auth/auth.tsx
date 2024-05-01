import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import {
	FieldValues,
	SubmitHandler,
	useForm,
} from 'react-hook-form';
import { StyleSheet, ToastAndroid, View } from 'react-native';
import {
	UserLoginPayload,
	UserRegisterPayload,
} from '../../@types/user';
import BottomSection from '../../components/sections/auth-bottom-section';
import AuthTopSection from '../../components/sections/auth-top-section';
import useAppStore from '../../store/app-store';

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
interface AuthScreenProps extends NativeStackScreenProps<any> {}

const Auth: React.FC<AuthScreenProps> = (props) => {
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
		register,
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
			name: 'phone',
			label: 'Mobile',
			placeholder: 'Enter your mobile number',
			icon: 'call-outline',
			type: 'numeric',
			required: true,
		},
		{
			name: 'password',
			label: 'Password',
			placeholder: 'Enter your password',
			icon: 'eye-outline',
			type: 'text',
			required: true,
		},
	];
	const signUpForm = [
		{
			name: 'username',
			label: 'Username',
			placeholder: 'Enter your username',
			icon: 'person-outline',
			type: 'text',
			required: true,
		},
		{
			name: 'password',
			label: 'Password',
			placeholder: 'Enter your password',
			icon: 'eye-outline',
			type: 'password',
			required: true,
		},
		{
			name: 'shopname',
			label: 'Shop Name',
			placeholder: 'Enter your shop name',
			icon: 'home-outline',
			type: 'email',
			required: true,
		},
		{
			name: 'phone',
			label: 'Mobile',
			placeholder: 'Enter your mobile number',
			icon: 'call-outline',
			type: 'numeric',
			required: true,
		},
	];

	const OnSubmit: SubmitHandler<FieldValues> = async (data) => {
		await authenticateUser(
			type === 'sign_up' ? 'auth/register' : 'auth/login',
			data as UserRegisterPayload | UserLoginPayload,
		).then((res: any) => {
			console.log('RESSS', res);
		});
		props.navigation.reset({
			index: 0,
			routes: [{ name: 'MainStack' }],
		});
	};
	return (
		<View style={styles.container}>
			<View style={styles.wrapperContainer}>
				<AuthTopSection Content={Content} type={type} />
				<BottomSection
					register={register}
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

export default Auth;

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

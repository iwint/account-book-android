import React from 'react';
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { theme } from '../../theme';
import Button from '../buttons/button';
import Input from '../inputs/text-input';
import { Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

interface BottomSectionProps {
	register: any;
	formData: any;
	type: string;
	handleSubmit: any;
	control: any;
	errors: any;
}

const BottomSection: React.FC<BottomSectionProps> = ({
	formData,
	type,
	handleSubmit,
	control,
	errors,
	register,
}) => {
	const navigation = useNavigation();
	return (
		<View style={styles.container}>
			{/* {type === 'sign_in' ? <Onboard2 /> : null} */}
			{formData?.map((inputField: any, index: number) => {
				return (
					<Controller
						key={index}
						name={inputField?.name || ''}
						control={control}
						render={({ field: { onChange, onBlur, value } }) => {
							return (
								<Input
									{...register(inputField.name, {
										required: inputField.required ? true : false,
									})}
									secureTextEntry={
										inputField.name === 'password' ? true : false
									}
									error={errors[inputField?.name]}
									key={index}
									icon={{
										name: inputField?.icon,
										size: 20,
									}}
									label={inputField?.label}
									onChange={(val) => {
										onChange(val.nativeEvent.text);
									}}
									onBlur={onBlur}
									placeholder={inputField?.placeholder}
									value={value}
								/>
							);
						}}
					/>
				);
			})}
			<Button
				style={{ marginTop: '8%', width: '100%' }}
				onPress={handleSubmit}
				title={type === 'sign_up' ? 'Register' : 'Sign in'}
			/>
			<View style={styles.bottomSectionWrapper}>
				<Text>Don't have account ?</Text>
				<TouchableOpacity
					onPressIn={() => {
						console.log('SIGN IN');
						navigation.getParent()?.navigate('Login', {
							type: type === 'sign_up' ? 'sign_in' : 'sign_up',
						});
					}}
				>
					<Text
						style={[
							{
								fontSize: 14,
								color: theme.colors.primary,
							},
						]}
					>
						{type === 'sign_up' ? 'Sign in' : 'Sign up'}
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default BottomSection;

const styles = StyleSheet.create({
	container: {
		width: '100%',
		gap: 5,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 20,
		paddingBottom: 20,
	},
	bottomSectionWrapper: {
		gap: 5,
		width: '100%',
		marginTop: '2%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

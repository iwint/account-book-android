import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Pressable } from 'react-native';
import Input from '../inputs/text-input';
import Button from '../buttons/button';
import { theme } from '../../theme';

const BottomSection = ({
	formData,
	type,
	handleSubmit,
	handleNavigation,
}: any) => {
	return (
		<View
			style={{
				width: '100%',
				gap: 5,
				alignItems: 'center',
				justifyContent: 'center',
				paddingHorizontal: 20,
				paddingBottom: 20,
			}}
		>
			{/* {type === 'sign_in' ? <Onboard2 /> : null} */}
			{formData?.map((inputField: any, index: number) => {
				return (
					<Input
						key={index}
						icon={{
							name: inputField?.icon,
							size: 20,
						}}
						label={inputField?.label}
						onChange={(val) => {
							inputField?.onChange(val);
						}}
						placeholder={inputField?.placeholder}
						value={inputField?.value}
					/>
				);
			})}
			<Button
				style={{ marginTop: '8%', width: '100%' }}
				onPress={handleSubmit}
				title={type === 'sign_up' ? 'Register' : 'Sign in'}
			/>
			<View
				style={[
					{
						gap: 5,
						width: '100%',
						marginTop: '2%',
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'center',
					},
				]}
			>
				<Text>Don't have account ?</Text>
				<TouchableOpacity
					onPressIn={() => {
						console.log('SIGN IN');
						handleNavigation.navigate('Login', {
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

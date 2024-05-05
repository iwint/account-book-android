import {
	StyleSheet,
	Text,
	ToastAndroid,
	View,
} from 'react-native';
import React, { useState } from 'react';
import Header from '../../../components/common/header';
import { TextInput, useTheme } from 'react-native-paper';
import { useHideBottomBar } from '../../../hooks/use-hide-bottom-bar';
import Button from '../../../components/buttons/button';
import RadioButton from '../../../components/buttons/radio-button';
import { FieldValues, useForm } from 'react-hook-form';
import useAppStore from '../../../store/app-store';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

interface AddPartyProps extends NativeStackScreenProps<any> {}

const AddParty: React.FC<AddPartyProps> = (props) => {
	const theme = useTheme();
	const data = props.route.params?.data;

	useHideBottomBar();
	const { getStaticId, addParty, user, updateParty } =
		useAppStore();
	const [values, setValue] = useState({
		type: data?.type || '',
		partyname: data?.partyname || '',
		phone: data?.phone || '',
		...data,
	});
	const handleSetValue = (name: string, value: string) => {
		setValue({ ...values, [name]: value });
	};
	const handleSubmit = async () => {
		let payload = {
			...values,
			staticsID: await getStaticId(
				values.type as 'CUSTOMER' | 'SUPPLIER',
			),
		};
		if (data != undefined) {
			await updateParty(
				data?._id,
				user?._id,
				payload,
				values.type as 'CUSTOMER' | 'SUPPLIER',
			).then((res) => {
				ToastAndroid.show(res?.message, ToastAndroid.SHORT);
				props.navigation.reset({
					index: 0,
					routes: [{ name: 'AllParties' }],
				});
			});
		} else {
			await addParty(user?._id, payload).then((res) => {
				ToastAndroid.show(res?.message, ToastAndroid.SHORT);
				props.navigation.goBack();
			});
		}
	};

	return (
		<View style={styles.container}>
			<Header
				backgroundColor={theme.colors.primary}
				color="white"
				title={data != undefined ? 'Update Party' : 'Add Party'}
				showBackAction
			/>
			<View style={styles.contentWrapper}>
				<TextInput
					onChangeText={(text) =>
						handleSetValue('partyname', text)
					}
					value={values.partyname}
					mode="outlined"
					label={'Party Name'}
				/>
				<TextInput
					onChangeText={(text) => handleSetValue('phone', text)}
					inputMode="numeric"
					mode="outlined"
					label={'Phone Number'}
					value={values.phone.toString()}
				/>
				<View style={styles.radioButtonWrapper}>
					<Text>Who are they ?</Text>
					<RadioButton
						label="Customer"
						status={
							values.type === 'CUSTOMER'
								? 'checked'
								: 'unchecked'
						}
						onPress={() => {
							handleSetValue('type', 'CUSTOMER');
						}}
						value="CUSTOMER"
					/>
					<RadioButton
						onPress={() => {
							handleSetValue('type', 'SUPPLIER');
						}}
						status={
							values.type === 'SUPPLIER'
								? 'checked'
								: 'unchecked'
						}
						label="Supplier"
						value="SUPPLIER"
					/>
				</View>
			</View>
			<View style={styles.buttonWrapper}>
				<Button
					onPress={handleSubmit}
					title={data != undefined ? 'Update' : 'Add'}
				/>
			</View>
		</View>
	);
};

export default AddParty;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: '100%',
	},
	radioButtonWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
	contentWrapper: {
		padding: 15,
		gap: 10,
	},
	buttonWrapper: {
		paddingHorizontal: 15,
		paddingBottom: 15,
		position: 'absolute',
		bottom: 0,
		width: '100%',
	},
});

import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Header from '../../../components/common/header';
import { TextInput, useTheme } from 'react-native-paper';
import { useHideBottomBar } from '../../../hooks/use-hide-bottom-bar';
import Button from '../../../components/buttons/button';
import RadioButton from '../../../components/buttons/radio-button';
import { FieldValues, useForm } from 'react-hook-form';

type Props = {};

const AddParty = (props: Props) => {
	const theme = useTheme();
	useHideBottomBar();
	const [values, setValue] = useState({
		who_are_they: '',
		party_name: '',
		phone_number: '',
	});
	const handleSetValue = (name: string, value: string) => {
		setValue({ ...values, [name]: value });
	};
	const handleSubmit = () => {
		console.log(values);
	};

	return (
		<View style={styles.container}>
			<Header
				backgroundColor={theme.colors.primary}
				color="white"
				title="Add Party"
				showBackAction
			/>
			<View style={styles.contentWrapper}>
				<TextInput
					onChangeText={(text) =>
						handleSetValue('party_name', text)
					}
					mode="outlined"
					label={'Party Name'}
				/>
				<TextInput
					onChangeText={(text) =>
						handleSetValue('phone_number', text)
					}
					inputMode="numeric"
					mode="outlined"
					label={'Phone Number'}
				/>
				<View style={styles.radioButtonWrapper}>
					<Text>Who are they ?</Text>
					<RadioButton
						label="Customer"
						status={
							values.who_are_they === 'customer'
								? 'checked'
								: 'unchecked'
						}
						onPress={() => {
							handleSetValue('who_are_they', 'customer');
						}}
						value="customer"
					/>
					<RadioButton
						onPress={() => {
							handleSetValue('who_are_they', 'supplier');
						}}
						status={
							values.who_are_they === 'supplier'
								? 'checked'
								: 'unchecked'
						}
						label="Supplier"
						value="supplier"
					/>
				</View>
			</View>
			<View style={styles.buttonWrapper}>
				<Button onPress={handleSubmit} title={`Add Customer`} />
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

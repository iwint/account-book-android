import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import Button from '../../../components/buttons/button';
import Header from '../../../components/common/header';
import { DatePicker } from '../../../components/inputs/date-picker';
import Input from '../../../components/inputs/text-input';
import { useHideBottomBar } from '../../../hooks/use-hide-bottom-bar';
import useAppStore from '../../../store/app-store';
import { theme } from '../../../theme';
interface AddTransactionProps
	extends NativeStackScreenProps<any> {}

const AddTransaction: React.FC<AddTransactionProps> = (
	props,
) => {
	useHideBottomBar();
	const { data, type }: any = props.route.params;
	console.log(data, type);
	const { user, addCollections, collections } = useAppStore();
	const [values, setValue] = useState({
		expensetype: type,
		amount: 0,
		date: new Date(),
		details: '',
	});
	const handleSetValue = (
		name: string,
		value: string | number,
	) => {
		setValue({ ...values, [name]: value });
	};
	const handleSubmit = async () => {
		let payload = {
			partyID: data?._id,
			...values,
		};
		await addCollections(payload, user?._id).then((res) => {
			if (res.status === 'ok') {
				props.navigation.goBack();
			}
		});
	};

	const renderContentBasedOnType = () => {
		switch (type) {
			case 'CREDIT':
				return {
					title: `You got ₹${values.amount} from ${data?.partyname}`,
					color: theme.colors?.success,
				};
				break;
			case 'DEBIT':
				return {
					title: `You gave ₹${values.amount} to ${data?.partyname}`,
					color: theme.colors?.error,
				};
				break;
			default:
				break;
		}
	};

	return (
		<View style={styles.container}>
			<Header
				elevation={5}
				backgroundColor={theme.colors.background}
				color={renderContentBasedOnType()?.color}
				title={
					<Text
						style={{
							fontSize: 16,
							color: renderContentBasedOnType()?.color,
						}}
					>
						{renderContentBasedOnType()?.title}
					</Text>
				}
				showBackAction
			/>
			<View style={styles.contentWrapper}>
				<Input
					onChangeText={(text) =>
						handleSetValue('amount', parseInt(text))
					}
					placeholder="Enter Amount"
					inputMode="numeric"
					icon={'₹'}
					textColor={renderContentBasedOnType()?.color}
				/>
				{values.amount != 0 && (
					<>
						<Input
							onChangeText={(text) =>
								handleSetValue('details', text)
							}
							icon={{
								name: 'reader-outline',
							}}
							textColor={renderContentBasedOnType()?.color}
							placeholder="Enter details"
						/>
						<DatePicker
							date={values.date}
							onChange={(date) =>
								handleSetValue('date', date as any)
							}
						/>
					</>
				)}

				<View style={styles.radioButtonWrapper}></View>
			</View>
			<View style={styles.buttonWrapper}>
				<Button
					disabled={values.amount === 0}
					style={{
						opacity: values.amount === 0 ? 0.5 : 1,
						backgroundColor: renderContentBasedOnType()?.color,
						borderRadius: 0,
					}}
					onPress={handleSubmit}
					title={`Save`}
				/>
			</View>
		</View>
	);
};

export default AddTransaction;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: '100%',
		backgroundColor: theme.colors.background,
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

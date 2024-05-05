import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
	StyleSheet,
	Text,
	ToastAndroid,
	View,
} from 'react-native';
import Button from '../../../components/buttons/button';
import Header from '../../../components/common/header';
import { DatePicker } from '../../../components/inputs/date-picker';
import Input from '../../../components/inputs/text-input';
import { CenteredModal } from '../../../components/modals/center-modal';
import DeleteModal from '../../../components/modals/delete-modal';
import { useHideBottomBar } from '../../../hooks/use-hide-bottom-bar';
import useAppStore from '../../../store/app-store';
import { theme } from '../../../theme';
interface AddTransactionProps
	extends NativeStackScreenProps<any> {}

const AddTransaction: React.FC<AddTransactionProps> = (
	props,
) => {
	useHideBottomBar();
	const { data, type, collectionData }: any = props.route.params;
	const [isVisible, setIsVisible] = useState(false);
	console.log('DATAA', data, type);
	const {
		user,
		addCollections,
		updateCollection,
		deleteCollection,
	} = useAppStore();
	const [values, setValue] = useState({
		expensetype: type,
		amount: collectionData?.amount || 0,
		date: collectionData?.date || new Date(),
		details: collectionData?.details || '',
		...collectionData,
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
		if (collectionData != undefined) {
			await updateCollection(
				collectionData?._id,
				user?._id,
				payload,
			).then((res) => {
				if (res?.status === 'ok') {
					props.navigation.goBack();
					ToastAndroid.show(res?.message, ToastAndroid.SHORT);
				}
			});
		} else {
			await addCollections(payload, user?._id).then((res) => {
				console.log('RES', res);

				if (res?.status === 'ok') {
					console.log('OK');

					props.navigation.goBack();
					ToastAndroid.show(res?.message, ToastAndroid.SHORT);
				}
			});
		}
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

	const handleDeleteTransaction = async () => {
		console.log();

		await deleteCollection(
			collectionData?._id,
			user?._id,
			data?._id,
		).then((res) => {
			ToastAndroid.show(res?.message, ToastAndroid.SHORT);
			if (res?.status === 'ok') {
				props.navigation.goBack();
			}
		});
	};

	return (
		<View style={styles.container}>
			<Header
				elevation={5}
				backgroundColor={theme.colors.background}
				color={renderContentBasedOnType()?.color}
				rightActionIcon={
					collectionData === undefined
						? undefined
						: 'trash-outline'
				}
				rightIconColor={theme.colors.error}
				rightActionOnPress={() => setIsVisible(true)}
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
			<CenteredModal
				children={
					<DeleteModal
						onClose={() => setIsVisible(false)}
						onPressDelete={handleDeleteTransaction}
					/>
				}
				onClose={() => setIsVisible(false)}
				isVisible={isVisible}
				size="xs"
				title="Are you sure you want to delete this transaction?"
			/>
			<View style={styles.contentWrapper}>
				<Input
					onChangeText={(text) =>
						handleSetValue(
							'amount',
							text != '' ? parseInt(text) : '0',
						)
					}
					placeholder="Enter Amount"
					inputMode="numeric"
					icon={'₹'}
					value={values?.amount.toString()}
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
							value={values.details}
							textColor={renderContentBasedOnType()?.color}
							placeholder="Enter details"
						/>
						<DatePicker
							date={
								typeof values.date === 'string'
									? new Date(values.date)
									: values.date
							}
							onChange={(date) =>
								handleSetValue('date', date as any)
							}
						/>
					</>
				)}
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
					title={collectionData != undefined ? 'Update' : `Save`}
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

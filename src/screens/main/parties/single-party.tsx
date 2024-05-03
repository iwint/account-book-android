import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useHideBottomBar } from '../../../hooks/use-hide-bottom-bar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Header from '../../../components/common/header';
import { theme } from '../../../theme';
import TotalAmountStat from '../../../components/sections/single-party-total-stat';
import Button from '../../../components/buttons/button';
import TransactionTimeline from '../../../components/sections/transaction-timeline';

interface SinglePartyProps extends NativeStackScreenProps<any> {}

const SingleParty: React.FC<SinglePartyProps> = (props) => {
	const data = props.route.params?.data;

	useHideBottomBar();
	return (
		<View style={styles.container}>
			<Header
				title={
					<View>
						<Text style={styles.title}>{data.partyname}</Text>
						<Text style={styles.subTitle}>{data.phone}</Text>
					</View>
				}
				backgroundColor={theme.colors.primary}
				color={'white'}
				rightActionIcon="trash"
				rightActionOnPress={() => {}}
				showBackAction
				rightIconColor={'#fff'}
				profileData={data}
			/>
			<View style={styles.topWrapper}>
				<TotalAmountStat
					type="CREDIT"
					totalAmount={data?.totalAmount || 0}
				/>
			</View>
			<TransactionTimeline />
			<View style={styles.buttonWrapper}>
				<Button
					title="You gave ₹"
					style={{
						backgroundColor: theme.colors.error,
						width: '49%',
						borderRadius: 4,
					}}
					onPress={() =>
						props.navigation.navigate('AddTransaction', {
							data: data,
							type: 'DEBIT',
						})
					}
				/>
				<Button
					title="You got ₹"
					style={{
						backgroundColor: theme.colors.success,
						width: '49%',
						borderRadius: 4,
					}}
					onPress={() =>
						props.navigation.navigate('AddTransaction', {
							data: data,
							type: 'CREDIT',
						})
					}
				/>
			</View>
		</View>
	);
};

export default SingleParty;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: '100%',
	},
	title: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#fff',
	},
	subTitle: {
		fontSize: 10,
		color: '#fff',
	},
	topWrapper: {
		backgroundColor: theme.colors.primary,
		paddingVertical: 15,
		paddingHorizontal: 20,
	},
	buttonWrapper: {
		paddingHorizontal: 25,
		paddingVertical: 15,
		bottom: 0,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		gap: 10,
	},
});

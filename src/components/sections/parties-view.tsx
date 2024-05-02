import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useCallback } from 'react';
import AnalyticsView from './analytics-view';
import { ThemeProp } from 'react-native-paper/lib/typescript/types';
import { useTheme } from 'react-native-paper';
import FloatingActionButton from '../buttons/floating-action-button';
import {
	useFocusEffect,
	useNavigation,
} from '@react-navigation/native';
import PartyCard from '../cards/party-card';
import Input from '../inputs/text-input';
import EmptyResult from './empty-result';
import useAppStore from '../../store/app-store';

interface PartiesViewProps {
	type: 'CUSTOMER' | 'SUPPLIER';
}

const dummyData = [
	{
		_id: '662504f2f666253badc9c15a',
		staticsID: '6624f30b3e532641072e0f16',
		customername: 'Paul',
		phone: 9003790558,
		type: 'SUPPLIER',
		expensetype: 'DEBIT',
		amount: '0',
		createdAt: '2024-04-21T12:22:10.475Z',
		updatedAt: '2024-04-21T12:22:10.475Z',
		__v: 0,
	},
	{
		_id: '6625080b88f831180ac996a3',
		staticsID: '6624f30b3e532641072e0f16',
		customername: 'Paul',
		phone: 9003690558,
		type: 'SUPPLIER',
		expensetype: 'CREDIT',
		amount: '0',
		createdAt: '2024-04-21T12:35:23.969Z',
		updatedAt: '2024-04-21T12:35:23.969Z',
		__v: 0,
	},
];
const PartiesView: React.FC<PartiesViewProps> = ({ type }) => {
	const theme = useTheme();
	const styles = makeStyles(theme);
	const navigation = useNavigation();
	const {
		getAllStatistics,
		statistics,
		user,
		parties,
		getUserData,
		getAllParties,
	} = useAppStore();
	const handleAddParty = () => {
		navigation.getParent()?.navigate('AddParty', { type });
	};

	const navigateToSingleParty = (data: string) => {
		navigation.getParent()?.navigate('SingleParty', { data });
	};

	useFocusEffect(
		useCallback(() => {
			getUserData().then((payload) => {
				getAllStatistics(payload?.data._id, type);
				getAllParties(payload?.data._id, type);
			});
		}, [type]),
	);

	return (
		<View style={styles.container}>
			<View style={styles.analyticsViewWrapper}>
				<AnalyticsView
					data={
						statistics[
							type === 'CUSTOMER'
								? 'customers_statistics'
								: 'suppliers_statistics'
						]
					}
				/>
			</View>
			<FloatingActionButton
				title={
					type === 'CUSTOMER' ? 'Add Customer' : 'Add Supplier'
				}
				icon={'add-outline'}
				onPress={handleAddParty}
			/>
			<View style={styles.searchAndFilterWrapper}>
				<View style={{ width: '100%' }}>
					<Input
						placeholder={`Search ${
							type === 'CUSTOMER' ? 'customers' : 'suppliers'
						}`}
						icon={{
							name: 'search-outline',
						}}
					/>
				</View>
			</View>
			<View style={styles.cardListWrapper}>
				<FlatList
					ListEmptyComponent={<EmptyResult />}
					data={
						parties[
							type === 'CUSTOMER' ? 'customer' : 'supplier'
						]
					}
					contentContainerStyle={{
						gap: 5,
						paddingHorizontal: 5,
						paddingBottom: 60,
					}}
					renderItem={({ item, index }) => {
						console.log('ITEM', item, parties);
						return (
							<PartyCard
								key={index}
								status={item.expensetype as any}
								onPress={() =>
									navigateToSingleParty(item as any)
								}
								data={{
									party_name: item?.partyname,
									date: item?.createdAt,
									amount: item?.amount,
								}}
							/>
						);
					}}
				/>
			</View>
		</View>
	);
};

export default PartiesView;

const makeStyles = (theme: ThemeProp) =>
	StyleSheet.create({
		container: {
			flex: 1,
			height: '100%',
		},
		analyticsViewWrapper: {
			backgroundColor: theme.colors?.primary,
			paddingHorizontal: 15,
			paddingVertical: 10,
		},
		cardListWrapper: {
			height: '78%',
			paddingHorizontal: 10,
			paddingVertical: 10,
		},
		searchAndFilterWrapper: {
			paddingHorizontal: 15,
			width: '100%',
			flexDirection: 'row',
		},
	});

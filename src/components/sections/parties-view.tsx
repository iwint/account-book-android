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
import { usePromiseTracker } from 'react-promise-tracker';
import { Skeleton } from '@rneui/base';

interface PartiesViewProps {
	type: 'CUSTOMER' | 'SUPPLIER';
}

const PartiesView: React.FC<PartiesViewProps> = ({ type }) => {
	const theme = useTheme();
	const styles = makeStyles(theme);
	const navigation = useNavigation();
	const { promiseInProgress } = usePromiseTracker();
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

	const navigateToSingleParty = (data: any) => {
		navigation
			.getParent()
			?.navigate('SingleParty', { id: data?._id });
	};

	useFocusEffect(
		useCallback(() => {
			getUserData().then((payload) => {
				getAllStatistics(payload?.data._id, type).then((res) => {
					console.log(res, 'STATISTICS');
					getAllParties(payload?.data._id, type);
				});
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
				disablePromiseLoading
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
				{promiseInProgress ? (
					<View style={{ gap: 5, paddingHorizontal: 10 }}>
						<Skeleton height={80} animation="wave" />
						<Skeleton height={80} animation="wave" />
						<Skeleton height={80} animation="wave" />
						<Skeleton height={80} animation="wave" />
					</View>
				) : (
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
							return (
								<PartyCard
									key={index}
									status={item.expensetype as any}
									onPress={() => navigateToSingleParty(item)}
									data={{
										party_name: item?.partyname,
										date: item?.createdAt,
										amount: item?.amount,
									}}
								/>
							);
						}}
					/>
				)}
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

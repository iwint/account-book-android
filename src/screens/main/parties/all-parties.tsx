import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { MD3Theme, useTheme } from 'react-native-paper';
import Header from '../../../components/common/header';
import PartiesView from '../../../components/sections/parties-view';
import TabView from '../../../components/sections/tab-view';
import useAppStore from '../../../store/app-store';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { usePromiseTracker } from 'react-promise-tracker';
import { Skeleton } from '@rneui/base';

interface AllPartiesProps extends NativeStackScreenProps<any> {}

const routes = [
	{
		key: 'customers',
		title: 'Customers',
		component: () => <PartiesView type="CUSTOMER" />,
	},
	{
		key: 'suppliers',
		title: 'Suppliers',
		component: () => <PartiesView type="SUPPLIER" />,
	},
];

const AllParties: React.FC<AllPartiesProps> = (props) => {
	const theme = useTheme();
	const styles = makeStyles(theme);
	const { promiseInProgress } = usePromiseTracker();
	const { user } = useAppStore();
	const navigateToProfile = () => {
		props.navigation.navigate('Profile');
	};
	return (
		<View style={styles.container}>
			<Header
				title={user.shopname}
				backgroundColor={theme.colors.primary}
				color={'white'}
				profileData={user}
				onAvatarPress={navigateToProfile}
			/>
			<TabView tabData={routes} />
		</View>
	);
};

export default AllParties;

const makeStyles = (theme: MD3Theme) =>
	StyleSheet.create({
		container: {
			flex: 1,
			height: '100%',
		},
		searchAndFilterWrapper: {
			paddingHorizontal: 10,
			width: '100%',
			flexDirection: 'row',
		},
		button: {
			width: '100%',
			backgroundColor: 'transparent',
		},
		cardListWrapper: {
			height: '83%',
			paddingHorizontal: 10,
			paddingVertical: 10,
		},
	});

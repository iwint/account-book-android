import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MD3Theme, Text, useTheme } from 'react-native-paper';
import Header from '../../../components/common/header';
import TabView from '../../../components/sections/tab-view';
import PartiesView from '../../../components/sections/parties-view';

type Props = {};

const routes = [
	{
		key: 'customers',
		title: 'Customers',
		component: () => <PartiesView type="customers" />,
	},
	{
		key: 'suppliers',
		title: 'Suppliers',
		component: () => <PartiesView type="suppliers" />,
	},
];
const AllParties = (props: Props) => {
	const theme = useTheme();
	const styles = makeStyles(theme);
	console.log(theme.fonts);

	return (
		<View style={styles.container}>
			<Header
				title="Peniel"
				backgroundColor={theme.colors.primary}
				color={'white'}
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

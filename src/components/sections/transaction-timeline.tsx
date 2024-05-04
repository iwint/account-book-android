import {
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import React from 'react';
import Timeline from 'react-native-timeline-flatlist';
import { theme } from '../../theme';
import TransactionCard from '../cards/transaction-card';
import EmptyResult from './empty-result';

interface TransactionTimelineProps {
	data: Array<any>;
}

const TransactionTimeline: React.FC<
	TransactionTimelineProps
> = ({ data }) => {
	return (
		<ScrollView style={styles.container}>
			<View>
				<Timeline
					options={
						{
							ListEmptyComponent: () => <EmptyResult />,
						} as any
					}
					circleSize={12}
					circleColor="red"
					lineColor="blue"
					lineWidth={1}
					data={
						data?.length > 0 &&
						data?.map((item) => {
							return {
								...item,
								time: item?.date,
							};
						})
					}
					renderDetail={(rowData) => {
						return <TransactionCard data={rowData} />;
					}}
					onEventPress={() => {}}
					columnFormat="single-column-left"
					descriptionStyle={styles.descriptionStyle}
					timeContainerStyle={styles.timeContainerStyle}
					timeStyle={styles.timeStyle}
					circleStyle={styles.circleStyle}
					titleStyle={styles.titleStyle}
				/>
			</View>
		</ScrollView>
	);
};

export default TransactionTimeline;

const styles = StyleSheet.create({
	container: {
		paddingTop: 15,
		paddingHorizontal: 20,
		backgroundColor: theme.colors.background,
	},
	circleStyle: {
		backgroundColor: theme.colors.primary,
	},
	descriptionStyle: {
		color: '#000',
	},
	timeContainerStyle: {
		backgroundColor: '#fff',
		elevation: 2,
		alignItems: 'flex-start',
		paddingHorizontal: 10,
		justifyContent: 'center',
		borderRadius: 5,
		width: 90,
	},
	timeStyle: {
		color: theme.colors.text,
		fontSize: 11,
	},
	titleStyle: {
		color: '#000',
		fontSize: 18,
	},
	text: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#000',
		marginVertical: 20,
	},
});

import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { theme } from '../../theme';

interface AnalyticsDataProps {
	totalcredit: number;
	totaldebit: number;
}

interface AnalyticsViewProps {
	data: AnalyticsDataProps;
}

const AnalyticsView: React.FC<AnalyticsViewProps> = (props) => {
	return (
		<View style={styles.container}>
			<View style={styles.amountWrapper}>
				<Text
					style={{
						...styles.title,
						color: theme.colors.success,
					}}
				>
					₹0
				</Text>
				<Text style={styles.subTitle}>You will give</Text>
			</View>
			<View>
				<Text
					style={{ ...styles.title, color: theme.colors.error }}
				>
					₹0
				</Text>
				<Text style={styles.subTitle}>You will give</Text>
			</View>
		</View>
	);
};

export default AnalyticsView;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		width: '100%',
		borderRadius: 10,
		padding: 10,
		flexDirection: 'row',
	},
	amountWrapper: {
		width: '50%',
	},
	subTitle: {
		fontSize: 12,
		color: theme.colors.sub_text,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
});

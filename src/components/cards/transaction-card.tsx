import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { theme } from '../../theme';

interface TransactionCardProps {
	data: any;
}

const TransactionCard: React.FC<TransactionCardProps> = ({
	data,
}) => {
	console.log(data);

	return (
		<View style={styles.container}>
			<View style={styles.leftSection}>
				<Text style={styles.text}>{data?.createdAt}</Text>
				<Text
					style={{
						...styles.text,
					}}
				>
					Bal.₹{data?.amount}
				</Text>
				{data?.details && (
					<Text style={styles.text}>{data?.details}</Text>
				)}
			</View>
			<View style={styles.rightSection}>
				<Text
					style={{
						color:
							data?.expensetype === 'CREDIT'
								? theme.colors.success
								: theme.colors.error,
					}}
				>
					₹{data?.amount}
				</Text>
			</View>
		</View>
	);
};

export default TransactionCard;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		width: '100%',
		padding: 10,
		borderRadius: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	leftSection: {
		gap: 5,
	},
	text: {
		fontSize: 12,
		color: theme.colors.text,
	},
	price: {
		fontSize: 20,
		color: theme.colors.text,
	},
	rightSection: {
		flexDirection: 'row',
		alignItems: 'center',
	},
});

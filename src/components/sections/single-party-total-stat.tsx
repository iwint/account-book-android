import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { theme } from '../../theme';

interface TotalAmountStatProps {
	type: 'CREDIT' | 'DEBIT';
	totalAmount: number;
}

const TotalAmountStat: React.FC<TotalAmountStatProps> = ({
	type,
	totalAmount,
}) => {
	return (
		<View style={styles.container}>
			<Text style={styles.label}>
				{type === 'CREDIT' ? 'You will give' : 'You will get'}
			</Text>
			<Text
				style={{
					...styles.amount,
					color:
						type === 'CREDIT'
							? theme.colors.success
							: theme.colors.error,
				}}
			>
				₹{totalAmount}
			</Text>
		</View>
	);
};

export default TotalAmountStat;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: 15,
		backgroundColor: '#fff',
		elevation: 5,
		borderRadius: 10,
	},
	label: {
		fontSize: 14,
		color: '#000',
	},
	amount: {
		fontSize: 18,
		fontWeight: 'bold',
	},
});

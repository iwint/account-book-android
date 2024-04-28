import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';

type Props = {};

const EmptyResult = (props: Props) => {
	return (
		<View style={styles.container}>
			<Image
				source={require('../../assets/images/no-results.png')}
				style={{ width: 100, height: 100 }}
			/>
		</View>
	);
};

export default EmptyResult;

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 50,
	},
});

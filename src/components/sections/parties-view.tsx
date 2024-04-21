import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

interface PartiesViewProps {
	type: 'customers' | 'suppliers';
}

const PartiesView: React.FC<PartiesViewProps> = ({ type }) => {
	return (
		<View>
			<Text style={{ color: 'red' }}>{type}</Text>
		</View>
	);
};

export default PartiesView;

const styles = StyleSheet.create({});

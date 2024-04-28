import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useHideBottomBar } from '../../../hooks/use-hide-bottom-bar';

type Props = {};

const SingleParty = (props: Props) => {
	useHideBottomBar();
	return (
		<View>
			<Text>SingleParty</Text>
		</View>
	);
};

export default SingleParty;

const styles = StyleSheet.create({});

import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const AuthTopSection = ({
	Content,
	dark,
	titleStyle,
	contentStyle,
}: any) => {
	console.log(Content);

	return (
		<View style={styles.container}>
			<Text
				style={{
					fontWeight: 'bold',
					fontSize: 20,
					color: '#000',
					...titleStyle,
				}}
			>
				{Content.title}
			</Text>
			<Text
				style={[
					{
						fontSize: 16,
						lineHeight: 30,
						color: '#000',
					},
				]}
			>
				{Content.description}
			</Text>
		</View>
	);
};

export default AuthTopSection;

const styles = StyleSheet.create({
	container: {
		width: '100%',
		justifyContent: 'center',
		alignItems: 'flex-start',
		paddingHorizontal: 20,
		paddingTop: 20,
		height: 'auto',
		borderRadius: 20,
	},
});

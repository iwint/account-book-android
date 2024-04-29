import { View, Text } from 'react-native';
import React from 'react';

const AuthTopSection = ({
	Content,
	dark,
	titleStyle,
	contentStyle,
}: any) => {
	console.log(Content);

	return (
		<View
			style={[
				{
					width: '100%',
					justifyContent: 'center',
					alignItems: 'flex-start',
					paddingHorizontal: 20,
					paddingTop: 20,
					backgroundColor: dark ? '#000' : '#fff',
					height: 'auto',
					borderRadius: 20,
				},
			]}
		>
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
					},
				]}
			>
				{Content.description}
			</Text>
		</View>
	);
};

export default AuthTopSection;

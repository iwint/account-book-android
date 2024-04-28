import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {
	RadioButton as RNRadioButton,
	RadioButtonProps as RNRadioButtonProps,
} from 'react-native-paper';
import { theme } from '../../theme';

interface RadioButtonProps extends RNRadioButtonProps {
	label: string;
}

const RadioButton: React.FC<RadioButtonProps> = (props) => {
	return (
		<View style={styles.radioButtonWrapper}>
			<RNRadioButton {...props} />
			<Text
				style={{
					color:
						props.status === 'checked'
							? theme.colors.primary
							: '#000',
				}}
			>
				{props.label}
			</Text>
		</View>
	);
};

export default RadioButton;

const styles = StyleSheet.create({
	radioButtonWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
	},
});

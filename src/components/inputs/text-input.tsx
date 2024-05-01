import {
	View,
	Text,
	StyleSheet,
	Dimensions,
} from 'react-native';
import React from 'react';
import {
	TextInputProps,
	useTheme,
	TextInput,
} from 'react-native-paper';
import { theme, ThemeProps } from '../../theme';
import Icon from 'react-native-vector-icons/Ionicons';
import { IconProps } from 'react-native-vector-icons/Icon';

interface InputProps extends TextInputProps {
	icon?: IconProps | string;
	centeredValue?: boolean;
}

const { height, width } = Dimensions.get('window');

const Input: React.FC<InputProps> = ({
	label,
	icon,
	placeholder,
	value,
	centeredValue,
	...props
}) => {
	const styles = makeStyles(theme);
	return (
		<View style={{ width: 'auto', height: 'auto' }}>
			{label && <Text style={styles.label}>{label}</Text>}
			<View
				style={{
					...styles.inputWrapper,
					height: props.multiline ? 'auto' : 45,
				}}
			>
				{icon ? (
					typeof icon === 'string' ? (
						<Text style={styles.iconText}>{icon}</Text>
					) : (
						<Icon
							{...(icon as IconProps)}
							color={theme.colors.sub_text}
							size={24}
							style={{ paddingLeft: 15 }}
						/>
					)
				) : null}
				<TextInput
					placeholderTextColor={theme.colors.sub_text}
					{...props}
					style={{
						...styles.input,
						textAlign: centeredValue ? 'center' : 'left',
					}}
					textContentType="password"
					cursorColor={theme.colors.text}
					placeholder={placeholder}
					value={value}
					textColor={theme.colors.text}
					activeUnderlineColor="transparent"
				/>
			</View>
		</View>
	);
};

export default Input;

const makeStyles = (theme: ThemeProps) =>
	StyleSheet.create({
		iconText: {
			color: theme.colors.sub_text,
			fontSize: 18,
			paddingLeft: 15,
		},
		label: {
			marginTop: 10,
			color: theme.colors.sub_text,
			fontWeight: 'bold',
		},
		inputWrapper: {
			alignItems: 'center',
			flexDirection: 'row',
			borderColor: theme.colors.tertiary,
			borderWidth: 1,
			borderRadius: 15,
			marginTop: 5,
		},
		input: {
			width: '90%',
			zIndex: 1,
			color: theme.colors.text,
		},
	});

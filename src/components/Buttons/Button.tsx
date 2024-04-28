import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
	ButtonProps,
	IconButton,
	Button as RNPButton,
} from 'react-native-paper';
import { theme, ThemeProps } from '../../theme';
import Icon from 'react-native-vector-icons/Ionicons';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';

export type CustomButtonProps = {
	title?: string;
	backgroundColor?: string;
	height?: number;
	isIconButton?: boolean;
	icon?: string | IconSource;
} & Omit<ButtonProps, 'children'> &
	Partial<Pick<ButtonProps, 'children'>>;

const Button: React.FC<CustomButtonProps> = ({
	icon,
	...props
}) => {
	const styles = makeStyles(theme);
	const iconOptions = (iconName: string) => ({
		width: 25,
		direction: 'ltr',
		source: (props: any) => (
			<Icon {...props} size={16} name={iconName} />
		),
	});
	return props.isIconButton ? (
		<View
			style={{
				elevation: 2,
				backgroundColor: props.backgroundColor,
				borderRadius: 10,
				width: 42,
				alignItems: 'center',
				justifyContent: 'center',
				height: 38,
			}}
		>
			<IconButton
				iconColor={props.textColor}
				icon={
					typeof icon === 'string' && icon
						? iconOptions(icon as string)
						: (icon as any)
				}
				onPress={props.onPress}
				selected
				style={{
					borderRadius: 10,
					height: '100%',
					width: '100%',
					margin: 0,
				}}
			/>
		</View>
	) : (
		<RNPButton
			style={[
				{
					...styles.button,
					backgroundColor: props.backgroundColor
						? props.backgroundColor
						: theme.colors.primary,
				},
				props.style,
			]}
			icon={
				typeof icon === 'string'
					? iconOptions(icon as string)
					: icon
			}
			contentStyle={{
				minHeight: props.height ? props.height : 40,
			}}
			{...props}
			mode="contained"
			textColor={props.textColor ? props.textColor : '#ffff'}
		>
			{props.title}
		</RNPButton>
	);
};

export default Button;

const makeStyles = (theme: ThemeProps) =>
	StyleSheet.create({
		button: {
			borderRadius: 12,
			color: '#fff',
		},
	});

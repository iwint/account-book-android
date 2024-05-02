import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
	ActivityIndicator,
	ButtonProps,
	IconButton,
	Button as RNPButton,
} from 'react-native-paper';
import { theme, ThemeProps } from '../../theme';
import Icon from 'react-native-vector-icons/Ionicons';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';
import { usePromiseTracker } from 'react-promise-tracker';

export type CustomButtonProps = {
	title?: string;
	backgroundColor?: string;
	height?: number;
	isIconButton?: boolean;
	icon?: string | IconSource;
	disablePromiseLoading?: boolean;
} & Omit<ButtonProps, 'children'> &
	Partial<Pick<ButtonProps, 'children'>>;

const Button: React.FC<CustomButtonProps> = ({
	icon,
	disablePromiseLoading,
	...props
}) => {
	const { promiseInProgress } = usePromiseTracker();
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
				backgroundColor: props.backgroundColor,
				...styles.iconContainer,
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
				style={styles.icon}
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
				!disablePromiseLoading && promiseInProgress
					? undefined
					: typeof icon === 'string'
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
			{!disablePromiseLoading && promiseInProgress ? (
				<ActivityIndicator
					color="#fff"
					animating={promiseInProgress}
				/>
			) : (
				props.title
			)}
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
		iconContainer: {
			elevation: 2,
			borderRadius: 10,
			width: 42,
			alignItems: 'center',
			justifyContent: 'center',
			height: 38,
		},
		icon: {
			borderRadius: 10,
			height: '100%',
			width: '100%',
			margin: 0,
		},
	});

import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Appbar, Avatar } from 'react-native-paper';
import { theme } from '../../theme';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
	showBackAction?: boolean;
	rightActionIcon?: string;
	title: string | React.ReactNode;
	rightActionOnPress?: () => void;
	headerAction?: 'settings' | string;
	rightSectionComponent?: React.ReactNode;
	leftActionOnPress?: () => void;
	leftActionIcon?: string;
	backgroundColor?: string;
	color?: string;
	profileData?: any;
	rightIconColor?: string;
	elevation?: number;
	onAvatarPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({
	showBackAction,
	rightActionIcon,
	title,
	elevation,
	leftActionOnPress,
	leftActionIcon,
	rightActionOnPress,
	headerAction,
	rightSectionComponent,
	backgroundColor,
	color,
	profileData,
	rightIconColor,
	onAvatarPress,
}) => {
	const navigation = useNavigation();

	const handleRightAction = () => {
		if (headerAction === 'settings') {
			navigation.navigate({ name: 'Settings' } as never);
		} else if (rightActionOnPress) {
			rightActionOnPress();
		}
	};

	const handleLeftAction = () => {
		if (leftActionOnPress) {
			leftActionOnPress();
		} else {
			navigation.goBack();
		}
	};

	return (
		<Appbar.Header
			style={{
				backgroundColor: backgroundColor,
				gap: 10,
				elevation: elevation,
			}}
		>
			{(leftActionIcon || showBackAction) && (
				<Appbar.Action
					icon={(props) => (
						<Icon
							{...props}
							color={color ? color : theme.colors.text}
							name={
								leftActionIcon
									? leftActionIcon
									: 'arrow-back-outline'
							}
						/>
					)}
					onPress={handleLeftAction}
				/>
			)}
			{profileData &&
				(profileData?.image != null ||
				profileData?.image?.url != null ? (
					<Pressable onPress={onAvatarPress}>
						<Avatar.Image
							source={{
								uri: profileData?.image?.url,
							}}
							style={{ backgroundColor: '#fff', marginLeft: 10 }}
							size={38}
						/>
					</Pressable>
				) : (
					<Avatar.Icon
						icon={(props) => (
							<Icon
								onPress={onAvatarPress}
								{...props}
								size={24}
								color={theme.colors.text}
								name={'person-outline'}
							/>
						)}
						style={{ backgroundColor: '#fff', marginLeft: 10 }}
						size={38}
					/>
				))}

			<Appbar.Content
				titleStyle={{
					color: color ? color : theme.colors.text,
					fontWeight: 'bold',
					fontSize: showBackAction ? 18 : 20,
				}}
				title={title as string}
			/>
			{rightActionIcon && (
				<Appbar.Action
					icon={(props) => (
						<Icon
							{...props}
							color={
								rightIconColor
									? rightIconColor
									: theme.colors.text
							}
							name={rightActionIcon}
						/>
					)}
					onPress={handleRightAction}
				/>
			)}
			{rightSectionComponent && (
				<View style={styles.rightSectionComponent}>
					{rightSectionComponent}
				</View>
			)}
		</Appbar.Header>
	);
};

export default Header;

const styles = StyleSheet.create({
	rightSectionComponent: {
		paddingHorizontal: 10,
	},
});

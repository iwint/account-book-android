import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Appbar, Avatar } from 'react-native-paper';
import { theme } from '../../theme';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
	showBackAction?: boolean;
	rightActionIcon?: string;
	title: string;
	rightActionOnPress?: () => void;
	headerAction?: 'settings' | string;
	rightSectionComponent?: React.ReactNode;
	leftActionOnPress?: () => void;
	leftActionIcon?: string;
	backgroundColor?: string;
	color?: string;
	profileData?: any;
}

const Header: React.FC<HeaderProps> = ({
	showBackAction,
	rightActionIcon,
	title,
	leftActionOnPress,
	leftActionIcon,
	rightActionOnPress,
	headerAction,
	rightSectionComponent,
	backgroundColor,
	color,
	profileData,
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
			style={{ backgroundColor: backgroundColor, gap: 10 }}
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
				(profileData?.image != null ? (
					<Avatar.Image
						source={profileData?.image}
						style={{ backgroundColor: '#fff', marginLeft: 10 }}
						size={35}
					/>
				) : (
					<Avatar.Icon
						icon={(props) => (
							<Icon
								onPress={() => {}}
								{...props}
								size={24}
								color={theme.colors.text}
								name={'person-outline'}
							/>
						)}
						style={{ backgroundColor: '#fff', marginLeft: 10 }}
						size={35}
					/>
				))}

			<Appbar.Content
				titleStyle={{
					color: color ? color : theme.colors.text,
					fontWeight: 'bold',
					fontSize: showBackAction ? 18 : 20,
				}}
				title={title}
			/>
			{rightActionIcon && (
				<Appbar.Action
					icon={(props) => (
						<Icon
							{...props}
							color={theme.colors.text}
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

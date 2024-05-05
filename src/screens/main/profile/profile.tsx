import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import { Avatar } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import useAppStore from '../../../store/app-store';
import Header from '../../../components/common/header';
import { theme } from '../../../theme';
import Button from '../../../components/buttons/button';
import { useHideBottomBar } from '../../../hooks/use-hide-bottom-bar';
import { CenteredModal } from '../../../components/modals/center-modal';
import DeleteModal from '../../../components/modals/delete-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ProfileProps extends NativeStackScreenProps<any> {}

const Profile: React.FC<ProfileProps> = (props) => {
	const [visible, setVisible] = useState(false);
	const { logOutUser } = useAppStore();
	useHideBottomBar();
	const { user } = useAppStore();
	const generateAvatarText = (name: string) => {
		const nameArray = name?.split(' ');
		if (nameArray?.length > 1) {
			return nameArray[0][0] + nameArray[1][0];
		} else {
			return nameArray[0][0];
		}
	};
	const handleLogOut = useCallback(() => {
		console.log(props.route.name);

		logOutUser().then(() => {
			props.navigation.reset({
				index: 0,
				routes: [{ name: 'AuthStack' }],
			});
		});
	}, []);

	return (
		<View style={styles.container}>
			<CenteredModal
				children={
					<DeleteModal
						onClose={() => setVisible(false)}
						onPressDelete={handleLogOut}
						buttonName="Logout"
					/>
				}
				size="xs"
				onClose={() => setVisible(false)}
				isVisible={visible}
				title={'Are you sure you want to logout?'}
			/>
			<Header
				color={'#fff'}
				title={'Profile'}
				showBackAction
				backgroundColor={theme.colors.primary}
			/>
			<View style={styles.profileContainer}>
				<View style={styles.leftContainer}>
					{user?.image ? (
						<Avatar.Image
							size={70}
							style={styles.avatarImage}
							source={{
								uri: user.image?.url,
							}}
						/>
					) : (
						<Avatar.Text
							label={
								user?.username
									? generateAvatarText(user?.username)
									: ''
							}
							labelStyle={styles.avatarText}
							color={theme.colors.primary}
							size={70}
							style={styles.avatar}
						/>
					)}

					<View style={styles.profileTextWrapper}>
						<Text style={styles.profileText}>
							{user?.username}
						</Text>
						<Text style={styles.profileSubText}>
							{user?.shopname}
						</Text>
					</View>
				</View>
				<View style={styles.rightContainer}>
					<Button
						labelStyle={styles.button}
						title="Edit"
						backgroundColor="transparent"
					/>
				</View>
			</View>
			<View
				style={{
					height: '75%',
					padding: 10,
					paddingHorizontal: 15,
					justifyContent: 'flex-end',
				}}
			>
				<Button
					title="Log out"
					backgroundColor={theme.colors.error}
					onPress={() => setVisible(true)}
				/>
			</View>
		</View>
	);
};

export default Profile;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: '100%',
	},
	profileContainer: {
		display: 'flex',
		height: '15%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: theme.colors.background,
	},
	leftContainer: {
		padding: 20,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
	rightContainer: {
		padding: 20,
	},
	avatar: {
		backgroundColor: '#E4D7FF',
	},
	avatarText: {
		fontSize: 24,
		fontWeight: 'bold',
		fontFamily: 'Gilroy',
	},
	profileTextWrapper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
		gap: 5,
	},
	profileText: {
		fontFamily: 'Gilroy',
		fontSize: 20,
		color: '#191C32',
		fontWeight: 'bold',
	},
	profileSubText: {
		fontFamily: 'Gilroy',
		fontSize: 15,
		color: '#8C8D98',
	},
	button: {
		fontSize: 18,
		color: '#2962FF',
	},
	avatarImage: {
		width: 70,
		height: 70,
	},
});

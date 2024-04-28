import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Avatar, useTheme } from 'react-native-paper';
import { ThemeProp } from 'react-native-paper/lib/typescript/types';
import Icon from 'react-native-vector-icons/Ionicons';
import { theme, ThemeProps } from '../../theme';

interface PartyCardProps {
	data: any;
	status: 'DEBIT' | 'CREDIT';
	onPress: () => void;
}

const PartyCard: React.FC<PartyCardProps> = ({
	data,
	status,
	onPress,
}) => {
	const styles = makeStyles(theme);

	return (
		<Pressable onPress={onPress} style={styles.container}>
			<View style={styles.leftSection}>
				{data?.image != null ? (
					<Avatar.Image
						source={data?.image}
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
						style={{
							backgroundColor: theme.colors.background,
							marginLeft: 10,
						}}
						size={40}
					/>
				)}
				<View>
					<Text style={styles.title}>{data?.party_name}</Text>
					<Text style={styles.subTitle}>{data?.date}</Text>
				</View>
			</View>
			<View
				style={{
					...styles.rightSection,
					backgroundColor:
						theme.colors[
							status === 'CREDIT' ? 'success_bg' : 'error_bg'
						],
				}}
			>
				<Text
					style={{
						...styles.title,
						color:
							theme.colors[
								status === 'CREDIT' ? 'success' : 'error'
							],
					}}
				>
					₹300
				</Text>
			</View>
		</Pressable>
	);
};

export default PartyCard;

const makeStyles = (theme: ThemeProps) =>
	StyleSheet.create({
		container: {
			width: '100%',
			backgroundColor: '#fff',
			flexDirection: 'row',
		},
		title: {
			color: theme.colors.text,
			fontSize: 16,
			fontWeight: '600',
		},
		subTitle: {
			color: theme.colors.sub_text,
			fontSize: 12,
		},
		leftSection: {
			width: '70%',
			flexDirection: 'row',
			alignItems: 'center',
			gap: 10,
			padding: 10,
		},
		rightSection: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'flex-end',
			width: '30%',
			paddingHorizontal: 10,
		},
	});

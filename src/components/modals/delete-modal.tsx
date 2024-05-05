import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Button from '../buttons/button';
import { theme } from '../../theme';
import LottieView from 'lottie-react-native';

interface DeleteModalProps {
	onClose: () => void;
	onPressDelete: () => void;
	buttonName?: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
	onPressDelete,
	onClose,
	buttonName,
}) => {
	return (
		<View
			style={{
				width: '100%',
				height: '100%',
				justifyContent: 'space-between',
				alignItems: 'center',
			}}
		>
			<View style={styles.buttonWrapper}>
				<Button
					disablePromiseLoading
					title="Cancel"
					style={{
						...styles.button,
						backgroundColor: theme.colors.background,
						borderWidth: 1,
						borderColor: theme.colors.sub_text,
					}}
					textColor={theme.colors.text}
					onPress={onClose}
				/>
				<Button
					disablePromiseLoading
					style={{
						...styles.button,
						backgroundColor: theme.colors.error,
					}}
					title={buttonName ? buttonName : 'Delete'}
					onPress={onPressDelete}
				/>
			</View>
		</View>
	);
};

export default DeleteModal;

const styles = StyleSheet.create({
	buttonWrapper: {
		flexDirection: 'row',
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		gap: 10,
		alignItems: 'center',
	},
	button: {
		width: '40%',
		borderRadius: 4,
	},
});

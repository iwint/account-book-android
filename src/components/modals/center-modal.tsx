import React from 'react';
import {
	Dimensions,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { theme, ThemeProps } from '../../theme';
import Icon from 'react-native-vector-icons/Ionicons';
import { ModalProps } from './modal.type';

interface CenteredModalModalProps extends ModalProps {
	showCloseButton?: boolean;
	onClose: () => void;
}

const { height, width } = Dimensions.get('window');

export const CenteredModal: React.FC<
	CenteredModalModalProps
> = ({
	children,
	title,
	size = 'md',
	isVisible,
	showCloseButton,
	onClose,
}) => {
	const getHeight = () => {
		switch (size) {
			case 'lg':
				return height / 1.2;
			case 'md':
				return height / 2;
			case 'sm':
				return height / 3;
			default:
				return 'auto';
		}
	};
	const styles = makeStyle(theme, getHeight());
	return (
		<ReactNativeModal
			style={styles.modal}
			useNativeDriver
			isVisible={isVisible}
		>
			<View style={styles.container}>
				<View
					style={{
						...styles.modalSubContainer,
						justifyContent: showCloseButton
							? 'space-between'
							: 'center',
					}}
				>
					{typeof title === 'string' ? (
						<Text style={styles.title}>{title}</Text>
					) : (
						title
					)}
					{showCloseButton && (
						<TouchableOpacity onPress={onClose}>
							<Icon
								name="close"
								color={theme.colors.text}
								size={20}
							/>
						</TouchableOpacity>
					)}
				</View>
				<View>{children}</View>
			</View>
		</ReactNativeModal>
	);
};

const makeStyle = (theme: ThemeProps, height: number | 'auto') =>
	StyleSheet.create({
		modal: {
			margin: 0,
			backgroundColor: 'transparent',
			padding: 20,
		},
		modalSubContainer: {
			flexDirection: 'row',
			alignItems: 'center',
			paddingHorizontal: 20,
		},
		container: {
			backgroundColor: '#ffffff',
			height: height,
			width: '100%',
			bottom: 0,
			borderRadius: 10,
			paddingVertical: 20,
		},
		line: {
			height: 4,
			width: 35,
			backgroundColor: '#000',
			opacity: 0.4,
			alignSelf: 'center',
			borderRadius: 50,
		},
		inputContainer: {
			marginTop: 35,
			// backgroundColor: 'grey',
			height: '65%',
			justifyContent: 'space-between',
		},
		title: {
			fontFamily: 'Poppins-Semibold',
			fontSize: 20,
			color: theme.colors.text,
			textAlign: 'center',
			fontWeight: 'bold',
		},
		message: {
			fontFamily: 'Poppins-SemiBold',
			fontSize: 14,
			color: '#000000',
			textAlign: 'center',
			marginVertical: 20,
			opacity: 0.6,
		},
	});

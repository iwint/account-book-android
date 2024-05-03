import {
	Button,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker, {
	DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { theme } from '../../theme';
import Icon from 'react-native-vector-icons/Ionicons';

interface DataPickProps {
	date: Date;
	onChange: (data: string) => void;
}

export const DatePicker: React.FC<DataPickProps> = ({
	date,
	onChange,
}) => {
	const [mode, setMode] = useState('date');
	const [show, setShow] = useState(false);

	const handleChange = (
		event: DateTimePickerEvent,
		selectedDate?: Date,
	) => {
		const currentDate = selectedDate ? selectedDate : new Date();
		setShow(false);
		onChange(currentDate.toDateString());
	};

	const showMode = (currentMode: any) => {
		setShow(true);
		setMode(currentMode);
	};

	const showDatepicker = () => {
		showMode('date');
	};

	return (
		<SafeAreaView>
			<Pressable
				style={styles.inputContainer}
				onPress={showDatepicker}
			>
				<Icon
					color={theme.colors.sub_text}
					name="calendar-outline"
					size={24}
				/>
				<Text style={styles.input}>
					{typeof date === 'string' ? date : date.toDateString()}
				</Text>
			</Pressable>
			{show && (
				<DateTimePicker
					testID="dateTimePicker"
					value={date}
					mode={'date'}
					is24Hour={true}
					onChange={handleChange}
				/>
			)}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	inputContainer: {
		padding: 12,
		borderColor: theme.colors.tertiary,
		borderWidth: 1,
		borderRadius: 15,
		alignItems: 'center',
		flexDirection: 'row',
		display: 'flex',
		gap: 10,
	},
	input: {
		color: theme.colors.text,
	},
});

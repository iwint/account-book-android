import * as React from 'react';
import { StyleSheet } from 'react-native';
import { ButtonProps, FAB } from 'react-native-paper';
import { theme } from '../../theme';
import Button, { CustomButtonProps } from './button';

type FloatingActionButtonProps = {} & CustomButtonProps;

const FloatingActionButton: React.FC<
	FloatingActionButtonProps
> = (props) => <Button {...props} style={styles.fab} />;

const styles = StyleSheet.create({
	fab: {
		position: 'absolute',
		margin: 16,
		right: 0,
		bottom: 0,
		zIndex: 20,
	},
});

export default FloatingActionButton;

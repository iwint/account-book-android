import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useCallback } from 'react';
import { useHideBottomBar } from '../../../hooks/use-hide-bottom-bar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Header from '../../../components/common/header';
import { theme } from '../../../theme';
import TotalAmountStat from '../../../components/sections/single-party-total-stat';
import Button from '../../../components/buttons/button';
import TransactionTimeline from '../../../components/sections/transaction-timeline';
import useAppStore from '../../../store/app-store';
import { useFocusEffect } from '@react-navigation/native';
import { CenteredModal } from '../../../components/modals/center-modal';
import DeleteModal from '../../../components/modals/delete-modal';
import {
	Divider,
	IconButton,
	List,
	Menu,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {
	trackPromise,
	usePromiseTracker,
} from 'react-promise-tracker';
import { Skeleton } from '@rneui/base';

interface SinglePartyProps extends NativeStackScreenProps<any> {}

const SingleParty: React.FC<SinglePartyProps> = (props) => {
	useHideBottomBar();
	const partyId = props.route.params?.id;
	const [showModal, setShowModal] = React.useState(false);
	const [showMenu, setShowMenu] = React.useState(false);
	const { promiseInProgress } = usePromiseTracker();
	const {
		getAllCollections,
		collections,
		user,
		party,
		deleteParty,
		getPartyById,
	} = useAppStore();
	useFocusEffect(
		useCallback(() => {
			trackPromise(
				getPartyById(partyId, user._id).then(() => {
					getAllCollections(partyId, user._id);
				}),
			);
		}, []),
	);
	const handleMenu = useCallback(
		() => setShowMenu(!showMenu),
		[],
	);
	const navigateToUpdateParty = () => {
		setShowMenu(false);
		props.navigation.navigate('AddParty', { data: party });
	};
	const navigateToUpdateTransaction = (collectionData: any) => {
		props.navigation.navigate('AddTransaction', {
			data: party,
			type: collectionData.expensetype,
			collectionData: collectionData,
		});
	};
	const toggleModal = () => setShowModal(!showModal);
	const handleDelete = useCallback(() => {
		deleteParty(party._id, user._id, party?.type).then((res) => {
			if (res.status === 'ok') {
				toggleModal();
				props.navigation.navigate('AllParties');
			}
		});
	}, []);
	console.log(party, 'PARTY');

	return (
		<View style={styles.container}>
			<CenteredModal
				children={
					<DeleteModal
						onClose={toggleModal}
						onPressDelete={handleDelete}
					/>
				}
				onClose={toggleModal}
				isVisible={showModal}
				title="Are you sure you want to delete this party?"
				size="xs"
			/>
			<Header
				title={
					<View>
						<Text style={styles.title}>{party?.partyname}</Text>
						{party?.phone && (
							<Text style={styles.subTitle}>{party?.phone}</Text>
						)}
					</View>
				}
				backgroundColor={theme.colors.primary}
				color={'white'}
				rightSectionComponent={
					<Menu
						contentStyle={{ backgroundColor: '#fff' }}
						visible={showMenu}
						onDismiss={() => setShowMenu(false)}
						style={styles.menuContainer}
						theme={{ isV3: false }}
						anchor={
							<IconButton
								onPress={handleMenu}
								icon={(props) => (
									<Icon
										{...props}
										size={24}
										color={'#fff'}
										name="ellipsis-vertical-outline"
									/>
								)}
								style={{
									margin: 0,
								}}
							/>
						}
					>
						<Menu.Item
							titleStyle={styles.menuItem}
							onPress={navigateToUpdateParty}
							title="Edit"
						/>
						<Menu.Item
							titleStyle={styles.menuItem}
							onPress={toggleModal}
							title="Delete"
						/>
					</Menu>
				}
				showBackAction
				rightIconColor={'#fff'}
				profileData={party}
			/>

			<View style={styles.topWrapper}>
				<TotalAmountStat
					type={party?.expensetype}
					totalAmount={party?.amount || 0}
				/>
			</View>
			{promiseInProgress ? (
				<View
					style={{
						gap: 5,
						padding: 10,
						height: '70%',
					}}
				>
					<Skeleton height={80} animation="wave" />
					<Skeleton height={80} animation="wave" />
					<Skeleton height={80} animation="wave" />
					<Skeleton height={80} animation="wave" />
					<Skeleton height={80} animation="wave" />
					<Skeleton height={80} animation="wave" />
				</View>
			) : (
				<TransactionTimeline
					onTransactionPress={(collectionData) =>
						navigateToUpdateTransaction(collectionData)
					}
					data={collections[party?._id]}
				/>
			)}
			<View style={styles.buttonWrapper}>
				<Button
					title="You gave ₹"
					style={{
						backgroundColor: theme.colors.error,
						width: '49%',
						borderRadius: 4,
					}}
					onPress={() =>
						props.navigation.navigate('AddTransaction', {
							data: party,
							type: 'DEBIT',
						})
					}
					disablePromiseLoading
				/>
				<Button
					title="You got ₹"
					style={{
						backgroundColor: theme.colors.success,
						width: '49%',
						borderRadius: 4,
					}}
					onPress={() =>
						props.navigation.navigate('AddTransaction', {
							data: party,
							type: 'CREDIT',
						})
					}
					disablePromiseLoading
				/>
			</View>
		</View>
	);
};

export default SingleParty;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: '100%',
	},
	title: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#fff',
	},
	subTitle: {
		fontSize: 10,
		color: '#fff',
	},
	topWrapper: {
		backgroundColor: theme.colors.primary,
		paddingVertical: 15,
		paddingHorizontal: 20,
	},
	buttonWrapper: {
		paddingHorizontal: 25,
		paddingVertical: 15,
		bottom: 0,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		gap: 10,
	},
	menuContainer: {
		backgroundColor: '#fff',
		top: '8%',
		right: '6%',
		elevation: 10,
		left: 'auto',
	},
	menuItem: {
		fontSize: 14,
	},
});

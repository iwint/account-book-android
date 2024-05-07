import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

export function useHideBottomBar() {
	const navigation = useNavigation();

	useEffect(() => {
		navigation.addListener('focus', () => {
			navigation.getParent()?.setOptions({
				tabBarStyle: { display: 'none' },
				tabBarVisible: true,
			});
		});
		navigation.addListener('blur', () => {
			navigation.getParent()?.setOptions({
				tabBarStyle: {
					height: 70,
					paddingTop: 0,
					paddingBottom: 15,
					width: '100%',
				},
				tabBarVisible: false,
			});
		});
	}, [navigation]);
}

import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

export function useHideBottomBar() {
	const navigation = useNavigation();

	useEffect(() => {
		navigation.getParent()?.setOptions({
			tabBarStyle: { display: 'none' },
			tabBarVisible: true,
		});
		return () =>
			navigation.getParent()?.setOptions({
				tabBarStyle: {
					height: 75,
					paddingTop: 10,
					paddingBottom: 15,
				},
			});
	}, [navigation]);
}

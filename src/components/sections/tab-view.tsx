import React from 'react';
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	useWindowDimensions,
	View,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import {
	TabView as RNTabView,
	SceneMap,
} from 'react-native-tab-view';
import { makeRenderScene } from '../../utils/make-render-scene';

export interface TabDataProps {
	key: string;
	title: string;
	component: () => JSX.Element;
}

interface TabViewProps {
	tabData: Array<TabDataProps>;
}

const TabView = ({ tabData }: TabViewProps) => {
	const theme = useTheme();
	const [index, setIndex] = React.useState(0);
	const [routes] = React.useState(tabData);
	const layout = useWindowDimensions();
	const renderScene = SceneMap(makeRenderScene(tabData));

	return (
		<RNTabView
			tabBarPosition="top"
			animationEnabled
			renderTabBar={(props) => {
				console.log(props.navigationState);

				return (
					<View
						style={{
							backgroundColor: theme.colors.primary,
							width: '100%',
							height: 50,
							flexDirection: 'row',
							alignItems: 'center',
							gap: 10,
							paddingHorizontal: 15,
						}}
					>
						{props.navigationState.routes.map((item, index) => (
							<TouchableOpacity
								style={{ marginRight: 10, gap: 5 }}
								onPress={() => props.jumpTo(item.key)}
							>
								<Text
									style={{
										fontSize: 14,
										fontFamily: 'Poppins-Regular',
										fontWeight: '700',
										textTransform: 'uppercase',
										color: '#fff',
									}}
								>
									{item.title}
								</Text>
								<View
									style={{
										width: '100%',
										height: 3,
										borderTopEndRadius: 20,
										borderTopStartRadius: 20,
										backgroundColor:
											props.navigationState.index === index
												? theme.colors.warning
												: 'transparent',
									}}
								/>
							</TouchableOpacity>
						))}
					</View>
				);
			}}
			navigationState={{ index, routes }}
			renderScene={renderScene}
			onIndexChange={setIndex}
			initialLayout={{ width: layout.width }}
		/>
	);
};

export default TabView;

const styles = StyleSheet.create({});

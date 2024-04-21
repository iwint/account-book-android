import React from 'react';
import { PaperProvider } from 'react-native-paper';
import MainNavigator from './navigation';
import { theme } from './theme';

function App(): React.JSX.Element {
	return (
		<PaperProvider theme={theme}>
			<MainNavigator />
		</PaperProvider>
	);
}

export default App;

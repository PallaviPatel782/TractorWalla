import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from '@store';
import RootNavigator from '@navigation/RootNavigator';
import '@localization'; // Initialize i18n
import {ThemeProvider} from '@theme';
import {StatusBar} from 'react-native';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <SafeAreaProvider>
            <StatusBar barStyle="dark-content" />
            <RootNavigator />
          </SafeAreaProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;

import React from 'react';
import { SafeAreaProvider, initialWindowMetrics, SafeAreaView } from 'react-native-safe-area-context';
import RootNavigator from '@navigation/RootNavigator';
import '@localization';
import { ThemeProvider } from '@theme';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@api';
import { Snackbar } from '@components';
import { useNetworkMonitor } from '@hooks';

function App(): React.JSX.Element {
  useNetworkMonitor();

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <ThemeProvider>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
            <SafeAreaView
              style={{ flex: 1, backgroundColor: 'transparent' }}
              edges={['bottom']}
            >
              <RootNavigator />
            </SafeAreaView>
            <Snackbar />
          </ThemeProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}

export default App;

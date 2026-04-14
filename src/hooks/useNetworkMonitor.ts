import { useEffect, useRef } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { useSnackbarStore } from '@store';

const useNetworkMonitor = () => {
  const showSnackbar = useSnackbarStore(state => state.showSnackbar);
  const wasOffline = useRef(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      const isOffline =
        state.isConnected === false || state.isInternetReachable === false;
      const isOnline =
        state.isConnected === true && state.isInternetReachable === true;

      if (isOffline && !wasOffline.current) {
        // If we transition to offline or start offline
        wasOffline.current = true;
        showSnackbar({
          type: 'error',
          title: 'No Internet Connection',
          description: 'Please check your network settings.',
        });
      } else if (isOnline && wasOffline.current) {
        // Only show 'Back Online' if we were previously offline
        wasOffline.current = false;
        showSnackbar({
          type: 'success',
          title: 'Back Online',
          description: 'Your internet connection was restored.',
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, [showSnackbar]);
};

export default useNetworkMonitor;

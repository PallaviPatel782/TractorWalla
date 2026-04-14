import { useCallback, useState } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { AppStackParamList } from '@types';
import { useSubscriptionStore, useSnackbarStore } from '@store';

export const useSubscriptionGuard = () => {
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();
  const [isChecking, setIsChecking] = useState(false);
  const showSnackbar = useSnackbarStore(state => state.showSnackbar);
  const fetchSubscriptionStatus = useSubscriptionStore(state => state.fetchSubscriptionStatus);

  const checkSubscriptionAndProceed = useCallback(
    async (onSuccess?: () => void) => {
      try {
        setIsChecking(true);
        const sub = await fetchSubscriptionStatus();

        if (sub.hasAccess) {
          if (onSuccess) {
            onSuccess();
          } else {
            navigation.navigate('PostPropertyFlow' as any);
          }
        } else {
          if (sub.rejectReason === 'limit_reached') {
            showSnackbar({
              title: 'Limit Exceeded',
              description: 'You have reached the maximum properties allowed for your plan. Please upgrade.',
              type: 'error',
            });
          } else if (sub.rejectReason === 'expired') {
            showSnackbar({
              title: 'Plan Expired',
              description: 'Your subscription plan has expired. Please renew to continue.',
              type: 'warning',
            });
          } else {
            showSnackbar({
              title: 'Subscription Required',
              description: 'Please select a plan to post a property.',
              type: 'warning',
            });
          }

          navigation.navigate('SubscriptionFlow' as any);
        }
      } catch (error: any) {
        showSnackbar({
          type: 'error',
          title: 'Error',
          description: 'Could not verify subscription. Please try again.',
        });
      } finally {
        setIsChecking(false);
      }
    },
    [navigation, showSnackbar, fetchSubscriptionStatus],
  );

  return { checkSubscriptionAndProceed, isChecking };
};


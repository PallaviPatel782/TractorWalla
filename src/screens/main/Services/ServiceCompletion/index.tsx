import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@theme';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  Text,
  ScreenWrapper,
  View,
  ScrollView,
  GlobalBottomSheet,
  Button,
} from '@components';
import { createStyles } from './styles';
import { SucessIcon, CheckedIcon } from '@assets/icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/NavigationTypes';

const ServiceCompletion = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<any>();
  const { bookingId = 'ID1234' } = route.params || {};

  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const otp = ['4', '5', '7', '3', '2', '8'];

  useEffect(() => {
    const timer = setTimeout(() => {
      setBottomSheetVisible(true);
    }, 3000); // 3 seconds delay

    return () => clearTimeout(timer);
  }, []);

  const handleGoToSummary = () => {
    setBottomSheetVisible(false);
    navigation.navigate('ServiceInvoiceSummary', { bookingId });
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.successContainer}>
            <SucessIcon size={100} color={theme.colors.DeepGreen} />
            <Text variant="bold" size={20} style={styles.thankYouText}>
              {t('main.serviceFlow.thankYou')}
            </Text>
            <Text variant="medium" size={14} style={styles.successSubText}>
              {t('main.serviceFlow.paymentSuccess')}
            </Text>
          </View>

          <View style={styles.otpSection}>
            <Text variant="regular" size={12} style={styles.otpLabel}>
              {t('main.serviceFlow.shareOtp')}
            </Text>
            <View style={styles.otpRow}>
              {otp.map((digit, index) => (
                <View key={index} style={styles.otpBox}>
                  <Text style={styles.otpDigit}>{digit}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>

      <GlobalBottomSheet
        visible={bottomSheetVisible}
        onClose={() => setBottomSheetVisible(false)}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalIconContainer}>
             <CheckedIcon size={60} color={theme.colors.DeepGreen} />
          </View>
          <Text variant="bold" size={18} style={styles.modalTitle}>
            {t('main.serviceFlow.serviceCompleted')}
          </Text>
          <Text variant="regular" size={12} style={styles.modalSubText}>
            {t('main.serviceFlow.verifiedMsg')}
          </Text>
          <Button
            title={t('main.serviceFlow.downloadInvoice')}
            onPress={handleGoToSummary}
            backgroundColor={theme.colors.DeepGreen}
          />
        </View>
      </GlobalBottomSheet>
    </ScreenWrapper>
  );
};

export default ServiceCompletion;

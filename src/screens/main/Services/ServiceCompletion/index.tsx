import React from 'react';
import { Linking } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@theme';
import {
  Text,
  ScreenWrapper,
  View,
  ScrollView,
  TouchableOpacity,
} from '@components';
import { createStyles } from './styles';
import { CheckedIcon, DownloadIcon, PhoneIcon } from '@assets/icons';

const ServiceCompletion = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const otp = ['4', '5', '7', '3', '2', '8'];

  const onDownloadInvoice = () => {

  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.successContainer}>
            <View style={styles.iconCircle}>
              <CheckedIcon size={60} color={theme.colors.DeepGreen} />
            </View>
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

          <View style={styles.infoCard}>
            <View style={styles.completionBadge}>
              <CheckedIcon size={30} color={theme.colors.DeepGreen} />
            </View>
            <Text variant="semiBold" size={16} style={styles.completionText}>
              {t('main.serviceFlow.serviceCompleted')}
            </Text>
            <Text variant="regular" size={12} style={styles.completionSubText}>
              {t('main.serviceFlow.verifiedMsg')}
            </Text>

            <TouchableOpacity
              style={styles.downloadBtn}
              onPress={onDownloadInvoice}
            >
              <DownloadIcon size={18} color={theme.colors.white} />
              <Text style={styles.downloadText}>{t('main.serviceFlow.downloadInvoice')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.supportRow}
              onPress={() => Linking.openURL('tel:1234567890')}
            >
              <PhoneIcon size={16} color={theme.colors.gray500} />
              <Text style={styles.supportText}>Need Help? Call Support</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

export default ServiceCompletion;

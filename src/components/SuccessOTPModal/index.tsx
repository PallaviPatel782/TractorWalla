import React from 'react';
import { Modal, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme, AppTheme } from '@theme';
import { View, Text, TouchableOpacity } from '@components';
import { SucessIcon } from '@assets/icons';

interface SuccessOTPModalProps {
  visible: boolean;
  onClose: () => void;
  otp: string;
}

const SuccessOTPModal: React.FC<SuccessOTPModalProps> = ({
  visible,
  onClose,
  otp,
}) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  // Split OTP into individual digits
  const otpDigits = otp.split('');

  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity
          style={styles.content}
          activeOpacity={1}
        >
          <View style={styles.successIconCircle}>
            <SucessIcon size={50} color={theme.colors.DeepGreen} />
          </View>

          <Text variant="medium" size={20} color={theme.colors.black} style={styles.thankYouText}>
            {t('main.serviceFlow.thankYou', 'Thank You!')}
          </Text>
          <Text variant="medium" size={14} color={theme.colors.DeepGreen} style={styles.successSubTitle}>
            {t('main.serviceFlow.paymentSuccess', 'Payment done Successfully')}
          </Text>

          <Text size={12} color={theme.colors.gray600} align="center" style={styles.otpLabel}>
            {t('main.serviceFlow.shareOTP', 'Share this OTP with mechanic for completion Status')}
          </Text>

          <View style={styles.otpRow}>
            {otpDigits.map((digit, index) => (
              <View key={index} style={styles.otpBox}>
                <Text variant="medium" size={20} color={theme.colors.black}>{digit}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.continueBtn} onPress={onClose}>
            <Text variant="medium" size={16} color={theme.colors.white}>
              {t('common.continue', 'Continue')}
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const createStyles = (theme: AppTheme) => StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: theme.colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: theme.colors.white,
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    width: '85%',
  },
  successIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.DeepGreen + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  thankYouText: {
    marginBottom: 5,
  },
  successSubTitle: {
    marginBottom: 15,
  },
  otpLabel: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 25,
  },
  otpBox: {
    width: 40,
    height: 45,
    borderWidth: 1,
    borderColor: theme.colors.gray200,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    // Add subtle shadow
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  continueBtn: {
    backgroundColor: theme.colors.DeepGreen,
    width: '100%',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default SuccessOTPModal;


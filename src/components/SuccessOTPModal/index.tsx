import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@theme';
import { SucessIcon } from '@assets/icons';
import { SW, SH, SF } from '@utils/Dimensions';
import { AppTheme } from '@theme';

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

          <Text style={styles.thankYouText}>{t('main.serviceFlow.thankYou', 'Thank You!')}</Text>
          <Text style={styles.successSubTitle}>
            {t('main.serviceFlow.paymentSuccess', 'Payment done Successfully')}
          </Text>

          <Text style={styles.otpLabel}>
            {t('main.serviceFlow.shareOTP', 'Share this OTP with mechanic for completion Status')}
          </Text>

          <View style={styles.otpRow}>
            {otpDigits.map((digit, index) => (
              <View key={index} style={styles.otpBox}>
                <Text style={styles.otpText}>{digit}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.continueBtn} onPress={onClose}>
            <Text style={styles.continueBtnText}>{t('common.continue', 'Continue')}</Text>
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
    padding: SW(20),
    borderRadius: SW(20),
    alignItems: 'center',
    width: '85%',
  },
  successIconCircle: {
    width: SW(80),
    height: SW(80),
    borderRadius: SW(40),
    backgroundColor: theme.colors.DeepGreen + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SH(15),
  },
  thankYouText: {
    fontSize: SF(20),
    fontFamily: theme.fontfamily.poppinsMedium,
    color: theme.colors.black,
    marginBottom: SH(5),
  },
  successSubTitle: {
    fontSize: SF(14),
    fontFamily: theme.fontfamily.poppinsMedium,
    color: theme.colors.DeepGreen,
    marginBottom: SH(15),
  },
  otpLabel: {
    fontSize: SF(12),
    fontFamily: theme.fontfamily.poppinsRegular,
    color: theme.colors.gray600,
    textAlign: 'center',
    marginBottom: SH(20),
    paddingHorizontal: SW(10),
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: SH(25),
  },
  otpBox: {
    width: SW(40),
    height: SW(45),
    borderWidth: 1,
    borderColor: theme.colors.gray200,
    borderRadius: SW(8),
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
  otpText: {
    fontSize: SF(20),
    fontFamily: theme.fontfamily.poppinsMedium,
    color: theme.colors.black,
  },
  continueBtn: {
    backgroundColor: theme.colors.DeepGreen,
    width: '100%',
    paddingVertical: SH(5),
    borderRadius: SW(10),
    alignItems: 'center',
  },
  continueBtnText: {
    color: theme.colors.white,
    fontSize: SF(16),
    fontFamily: theme.fontfamily.poppinsMedium,
  },
});

export default SuccessOTPModal;

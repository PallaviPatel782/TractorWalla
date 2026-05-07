import React, { useState } from 'react';
import { Modal, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme, AppTheme } from '@theme';
import { GlobalBottomSheet, Button, View, Text, TouchableOpacity } from '@components';
import { SucessIcon } from '@assets/icons';

interface PaymentModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  amount?: number | string;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  visible,
  onClose,
  onConfirm,
}) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleConfirm = () => {
    // Simulate payment processing
    setTimeout(() => {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onConfirm();
      }, 2000);
    }, 1000);
  };

  const styles = createStyles(theme);

  return (
    <>
      <GlobalBottomSheet
        visible={visible && !showSuccess}
        onClose={onClose}
        title={t('main.serviceFlow.paymentOptions')}
      >
        <View style={styles.modalContent}>
          <Text color={theme.colors.gray500} size={15} style={styles.payLabel}>
            {t('main.serviceFlow.payRazorpay')}
          </Text>

          <TouchableOpacity style={styles.paymentMethodItem} activeOpacity={0.8}>
            <View style={styles.paymentMethodInfo}>
              <View style={styles.razorpayIconPlaceholder}>
                <Text color={theme.colors.white} variant="medium" size={15}>R</Text>
              </View>
              <Text size={15} color={theme.colors.black} style={styles.paymentMethodName}>Razorpay</Text>
            </View>
            <View style={[styles.radioOuterActive, { borderColor: theme.colors.DeepGreen }]}>
              <View style={[styles.radioInnerActive, { backgroundColor: theme.colors.DeepGreen }]} />
            </View>
          </TouchableOpacity>

          <View style={styles.modalActionRow}>
            <Button
              title={t('common.cancel')}
              onPress={onClose}
              backgroundColor={theme.colors.gray}
              style={{ flex: 1 }}
              textStyle={{ color: theme.colors.textSecondary }}
            />
            <Button
              title={t('main.serviceFlow.proceed')}
              onPress={handleConfirm}
              backgroundColor={theme.colors.DeepGreen}
              style={{ flex: 1 }}
            />
          </View>
        </View>
      </GlobalBottomSheet>

      <Modal visible={showSuccess} transparent animationType="fade">
        <View style={styles.successOverlay}>
          <View style={styles.successContent}>
            <View style={[styles.successIconCircle, { backgroundColor: theme.colors.DeepGreen + '20' }]}>
              <SucessIcon size={50} color={theme.colors.DeepGreen} />
            </View>
            <Text variant="medium" size={22} color={theme.colors.black} style={styles.successTitle}>
              {t('main.serviceFlow.thankYou')}
            </Text>
            <Text variant="medium" size={16} color={theme.colors.DeepGreen} align="center" style={styles.successSubTitle}>
              {t('main.serviceFlow.paymentSuccess')}
            </Text>
          </View>
        </View>
      </Modal>
    </>
  );
};

const createStyles = (theme: AppTheme) => StyleSheet.create({
  modalContent: {
    padding: 10,
    paddingVertical: 0
  },
  payLabel: {
    marginBottom: 10,
  },
  paymentMethodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 1,
    borderColor: theme.colors.success,
    borderRadius: 12,
    marginBottom: 30,
  },
  paymentMethodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  razorpayIconPlaceholder: {
    width: 30,
    height: 30,
    backgroundColor: theme.colors.AzureBlue,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  paymentMethodName: {
  },
  radioOuterActive: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInnerActive: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  modalActionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  successOverlay: {
    flex: 1,
    backgroundColor: theme.colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successContent: {
    backgroundColor: theme.colors.white,
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    width: '80%',
  },
  successIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  successTitle: {
  },
  successSubTitle: {
  },
});

export default PaymentModal;
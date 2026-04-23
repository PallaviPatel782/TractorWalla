import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Modal, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@theme';
import { GlobalBottomSheet } from '@components';
import { SucessIcon } from '@assets/icons';
import { SW, SH, SF } from '@utils/Dimensions';
import { AppTheme } from '@theme';

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
          <Text style={styles.payLabel}>{t('main.serviceFlow.payRazorpay')}</Text>

          <TouchableOpacity style={styles.paymentMethodItem} activeOpacity={0.8}>
            <View style={styles.paymentMethodInfo}>
              <View style={styles.razorpayIconPlaceholder}>
                <Text style={styles.razorpayText}>R</Text>
              </View>
              <Text style={styles.paymentMethodName}>Razorpay</Text>
            </View>
            <View style={[styles.radioOuterActive, { borderColor: theme.colors.DeepGreen }]}>
              <View style={[styles.radioInnerActive, { backgroundColor: theme.colors.DeepGreen }]} />
            </View>
          </TouchableOpacity>

          <View style={styles.modalActionRow}>
            <TouchableOpacity
              style={styles.modalCancelBtn}
              onPress={onClose}
            >
              <Text style={styles.modalCancelText}>{t('common.cancel')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalProceedBtn, { backgroundColor: theme.colors.DeepGreen }]}
              onPress={handleConfirm}
            >
              <Text style={styles.modalProceedText}>{t('main.serviceFlow.proceed')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </GlobalBottomSheet>

      <Modal visible={showSuccess} transparent animationType="fade">
        <View style={styles.successOverlay}>
          <View style={styles.successContent}>
            <View style={[styles.successIconCircle, { backgroundColor: theme.colors.DeepGreen + '20' }]}>
              <SucessIcon size={50} color={theme.colors.DeepGreen} />
            </View>
            <Text style={styles.successTitle}>{t('main.serviceFlow.thankYou')}</Text>
            <Text style={[styles.successSubTitle, { color: theme.colors.DeepGreen }]}>
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
    padding: SW(10),
    paddingVertical: 0
  },
  payLabel: {
    fontSize: SF(16),
    color: theme.colors.gray500,
    marginBottom: SH(10),
    fontFamily: theme.fontfamily.robotoRegular,
  },
  paymentMethodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SW(10),
    borderWidth: 1,
    borderColor: theme.colors.success,
    borderRadius: SW(12),
    marginBottom: SH(30),
  },
  paymentMethodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  razorpayIconPlaceholder: {
    width: SW(30),
    height: SW(30),
    backgroundColor: theme.colors.AzureBlue,
    borderRadius: SW(8),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SW(12),
  },
  razorpayText: {
    color: theme.colors.white,
    fontSize: SF(15),
    fontFamily: theme.fontfamily.robotoMedium,
  },
  paymentMethodName: {
    fontSize: SF(18),
    color: theme.colors.black,
    fontFamily: theme.fontfamily.robotoMedium,
  },
  radioOuterActive: {
    width: SW(22),
    height: SW(22),
    borderRadius: SW(11),
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInnerActive: {
    width: SW(12),
    height: SW(12),
    borderRadius: SW(6),
  },
  modalActionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SW(15),
  },
  modalCancelBtn: {
    flex: 1,
    height: SH(40),
    backgroundColor: theme.colors.gray,
    borderRadius: SW(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCancelText: {
    fontSize: SF(18),
    color: theme.colors.textSecondary,
    fontFamily: theme.fontfamily.robotoRegular,
  },
  modalProceedBtn: {
    flex: 1,
    height: SH(40),
    borderRadius: SW(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalProceedText: {
    fontSize: SF(18),
    color: theme.colors.white,
    fontFamily: theme.fontfamily.robotoRegular,
  },
  successOverlay: {
    flex: 1,
    backgroundColor: theme.colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successContent: {
    backgroundColor: theme.colors.white,
    padding: SW(30),
    borderRadius: SW(20),
    alignItems: 'center',
    width: '80%',
  },
  successIconCircle: {
    width: SW(80),
    height: SW(80),
    borderRadius: SW(40),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SH(20),
  },
  successTitle: {
    fontSize: SF(22),
    fontFamily: theme.fontfamily.robotoBold,
    color: theme.colors.black,
    marginBottom: SH(10),
  },
  successSubTitle: {
    fontSize: SF(16),
    fontFamily: theme.fontfamily.robotoMedium,
    textAlign: 'center',
  },
});

export default PaymentModal;

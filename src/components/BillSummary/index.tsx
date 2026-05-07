import React from 'react';
import { ViewStyle, StyleSheet } from 'react-native';
import { View, Text } from '@components';
import { useTheme, AppTheme } from '@theme';
import { useTranslation } from 'react-i18next';
import { BillIcon } from '@assets/icons';

interface BillSummaryProps {
  itemTotal: number;
  serviceFee?: number;
  discount?: number;
  couponCode?: string;
  partialPayment?: number;
  totalEstimate: number;
  containerStyle?: ViewStyle;
  itemLabel?: string;
  serviceFeeLabel?: string;
}

const BillSummary: React.FC<BillSummaryProps> = ({
  itemTotal,
  serviceFee,
  discount,
  couponCode,
  partialPayment,
  totalEstimate,
  containerStyle,
  itemLabel,
  serviceFeeLabel,
}) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = createStyles(theme);

  return (
    <View style={[styles.card, containerStyle]}>
      <View style={styles.header}>
        <BillIcon size={20} color={theme.colors.textPrimary} />
        <Text variant="medium" size={15} style={styles.title}>
          {t('main.home.services.billSummary')}
        </Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.row}>
        <Text style={styles.label}>
          {itemLabel || t('main.bookings.invoice.itemTotal')}
        </Text>
        <Text variant="medium" style={styles.value}>
          ₹{itemTotal.toFixed(2)}
        </Text>
      </View>

      {serviceFee !== undefined && serviceFee > 0 && (
        <View style={styles.row}>
          <Text style={styles.label}>
            {serviceFeeLabel || t('main.bookings.invoice.serviceFee')}
          </Text>
          <Text variant="medium" style={styles.value}>
            ₹{serviceFee.toFixed(2)}
          </Text>
        </View>
      )}

      {discount !== undefined && discount > 0 && (
        <View style={styles.row}>
          <Text variant="medium" color={theme.colors.success} style={styles.label}>
            {couponCode || t('common.discount')}
          </Text>
          <Text variant="semiBold" color={theme.colors.success} style={styles.value}>
            -₹{discount.toFixed(2)}
          </Text>
        </View>
      )}

      {partialPayment !== undefined && partialPayment > 0 && (
        <View style={styles.row}>
          <Text variant="medium" color={theme.colors.success} style={styles.label}>
            {t('main.home.services.partialPayment', 'Partial Payment')}
          </Text>
          <Text variant="semiBold" color={theme.colors.success} style={styles.value}>
            -₹{partialPayment.toFixed(2)}
          </Text>
        </View>
      )}

      <View style={styles.row}>
        <Text size={12} color={theme.colors.gray500} style={styles.taxNote}>
          {t('main.bookings.invoice.taxNotice')}
        </Text>
        <Text size={12} color={theme.colors.gray500} style={styles.taxNote}>
          {t('common.included')}
        </Text>
      </View>

      <View style={styles.dividerDashed} />

      <View style={styles.totalRow}>
        <Text variant="medium" size={15} style={styles.totalLabel}>
          {t('main.bookings.invoice.totalEstimate')}
        </Text>
        <Text variant="semiBold" size={16} style={styles.totalValue}>
          ₹{totalEstimate.toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.colors.white,
      padding: 16,
      marginBottom: 16,
      borderRadius: 12,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    title: {
      marginLeft: 8,
      color: theme.colors.textPrimary,
    },
    divider: {
      height: 1,
      backgroundColor: theme.colors.gray200,
      marginBottom: 12,
    },
    dividerDashed: {
      height: 1,
      borderTopWidth: 1,
      borderColor: theme.colors.gray200,
      borderStyle: 'dashed',
      marginVertical: 12,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    label: {
      fontSize: 14,
      fontFamily: theme.fontfamily.poppinsRegular,
      color: theme.colors.textSecondary,
    },
    value: {
      fontSize: 14,
      fontFamily: theme.fontfamily.poppinsMedium,
      color: theme.colors.textPrimary,
    },
    taxNote: {
      fontSize: 12,
      fontFamily: theme.fontfamily.poppinsRegular,
    },
    totalRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    totalLabel: {
      fontSize: 15,
      fontFamily: theme.fontfamily.poppinsMedium,
      color: theme.colors.textPrimary,
    },
    totalValue: {
      fontSize: 15,
      fontFamily: theme.fontfamily.poppinsMedium,
      color: theme.colors.textPrimary,
    },
  });

export default BillSummary;
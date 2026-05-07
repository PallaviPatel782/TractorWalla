import { StyleSheet } from 'react-native';
import { AppTheme } from '@theme';

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flexGrow: 1,
      backgroundColor: theme.colors.backgroundTertiary,
    },
    headerSection: {
      backgroundColor: theme.colors.white,
      padding: 16,
      marginBottom: 8,
    },
    bookingId: {
      color: theme.colors.gray600,
      fontFamily: theme.fontfamily.poppinsSemiBold,
      fontSize: 14,
      textDecorationLine: 'underline',
      marginBottom: 12,
    },
    tractorRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
      gap: 8,
    },
    tractorName: {
      color: theme.colors.gray900,
      fontFamily: theme.fontfamily.poppinsSemiBold,
      fontSize: 14,
    },
    serviceTypeTitle: {
      color: theme.colors.danger,
      fontFamily: theme.fontfamily.poppinsSemiBold,
      fontSize: 15,
      marginBottom: 16,
    },
    sectionCard: {
      backgroundColor: theme.colors.white,
      padding: 16,
      marginBottom: 8,
    },
    sectionTitle: {
      color: theme.colors.gray900,
      fontFamily: theme.fontfamily.poppinsSemiBold,
      fontSize: 16,
      marginBottom: 16,
    },
    billSummaryCard: {
      marginBottom: 32,
      borderRadius: 12,
      marginHorizontal: 12,
    },
    footer: {
      padding: 16,
      backgroundColor: theme.colors.white,
      borderTopWidth: 1,
      borderTopColor: theme.colors.borderFaint,
    },
    invoiceButton: {
      backgroundColor: theme.colors.brandGreen,
    },
  });

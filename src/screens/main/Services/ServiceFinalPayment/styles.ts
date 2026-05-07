import { StyleSheet } from 'react-native';
import { AppTheme } from '@theme';

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      paddingHorizontal: 16,
      paddingTop: 12,
      paddingBottom: 10,
    },
    bookingId: {
      fontSize: 14,
      fontFamily: theme.fontfamily.poppinsMedium,
      color: theme.colors.textSecondary,
      marginBottom: 8,
      textDecorationLine: 'underline',
    },
    sectionTitle: {
      fontSize: 16,
      fontFamily: theme.fontfamily.poppinsSemiBold,
      color: theme.colors.textPrimary,
      marginBottom: 12,
    },
    ratingText: {
      fontSize: 14,
      fontFamily: theme.fontfamily.poppinsMedium,
      color: theme.colors.GoldenYellow,
      marginRight: 8,
    },
    price: {
      fontSize: 15,
      fontFamily: theme.fontfamily.poppinsMedium,
      color: theme.colors.textPrimary,
    },
    mrp: {
      fontSize: 14,
      fontFamily: theme.fontfamily.poppinsRegular,
      color: theme.colors.textMuted,
      textDecorationLine: 'line-through',
      marginLeft: 4,
    },
    imageContainer: {
      alignItems: 'center',
    },
    serviceImage: {
      borderRadius: 10,
    },
    addedBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 5,
      marginTop: -15,
    },
    addedText: {
      color: theme.colors.white,
      fontSize: 12,
      fontFamily: theme.fontfamily.poppinsMedium,
      marginLeft: 4,
    },
    billCard: {
      backgroundColor: theme.colors.white,
      borderRadius: 15,
      paddingHorizontal: 20,
      paddingVertical: 20,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    billHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    billTitle: {
      fontSize: 15,
      fontFamily: theme.fontfamily.poppinsMedium,
      color: theme.colors.textPrimary,
      marginLeft: 8,
    },
    divider: {
      height: 1,
      backgroundColor: theme.colors.gray100,
      marginVertical: 12,
    },
    billRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    billLabel: {
      fontSize: 14,
      fontFamily: theme.fontfamily.poppinsRegular,
      color: theme.colors.textSecondary,
    },
    billValue: {
      fontSize: 14,
      fontFamily: theme.fontfamily.poppinsMedium,
      color: theme.colors.textPrimary,
    },
    dividerDashed: {
      height: 1,
      borderWidth: 1,
      borderColor: theme.colors.gray100,
      borderStyle: 'dashed',
      marginVertical: 16,
    },
    taxNote: {
      fontSize: 14,
      fontFamily: theme.fontfamily.poppinsRegular,
      color: theme.colors.textMuted,
    },
    totalRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 8,
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
    footer: {
      padding: 20,
      backgroundColor: theme.colors.white,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
    },
  });

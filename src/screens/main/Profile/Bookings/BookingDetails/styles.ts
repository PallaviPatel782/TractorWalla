import { StyleSheet } from 'react-native';
import { AppTheme } from '@theme';
import { SW, SH, SF } from '@utils/Dimensions';

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
      padding: SW(16),
      marginBottom: SH(8),
    },
    bookingId: {
      color: theme.colors.gray600,
      fontFamily: theme.fontfamily.poppinsSemiBold,
      fontSize: SF(14),
      textDecorationLine: 'underline',
      marginBottom: SH(12),
    },
    tractorRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: SH(12),
      gap: SW(8),
    },
    tractorName: {
      color: theme.colors.gray900,
      fontFamily: theme.fontfamily.poppinsSemiBold,
      fontSize: SF(14),
    },
    serviceTypeTitle: {
      color: theme.colors.danger,
      fontFamily: theme.fontfamily.poppinsSemiBold,
      fontSize: SF(15),
      marginBottom: SH(16),
    },
    sectionCard: {
      backgroundColor: theme.colors.white,
      padding: SW(16),
      marginBottom: SH(8),
    },
    sectionTitle: {
      color: theme.colors.gray900,
      fontFamily: theme.fontfamily.poppinsSemiBold,
      fontSize: SF(16),
      marginBottom: SH(16),
    },
    serviceItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: SH(24),
    },
    itemDetails: {
      flex: 1,
      paddingRight: SW(16),
    },
    itemTitle: {
      color: theme.colors.gray900,
      fontFamily: theme.fontfamily.poppinsSemiBold,
      fontSize: SF(15),
      marginBottom: SH(8),
    },
    featureRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: SH(4),
      gap: SW(6),
    },
    featureText: {
      color: theme.colors.gray800,
      fontFamily: theme.fontfamily.poppinsRegular,
      fontSize: SF(14),
    },
    priceRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: SH(8),
      gap: SW(6),
    },
    starIcon: {
      color: theme.colors.GoldenYellow,
    },
    ratingText: {
      color: theme.colors.gray600,
      fontFamily: theme.fontfamily.poppinsBold,
      fontSize: SF(14),
    },
    priceText: {
      color: theme.colors.gray900,
      fontFamily: theme.fontfamily.poppinsSemiBold,
      fontSize: SF(15),
    },
    strikePrice: {
      color: theme.colors.gray500,
      fontFamily: theme.fontfamily.poppinsRegular,
      fontSize: SF(14),
      textDecorationLine: 'line-through',
    },
    imageContainer: {
      position: 'relative',
      alignItems: 'center',
    },
    itemImage: {
      width: SW(115),
      height: SW(105),
      borderRadius: SW(12),
    },
    addedBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(30, 99, 63, 0.08)',
      paddingHorizontal: SW(10),
      paddingVertical: SH(5),
      borderRadius: SW(20),
      borderWidth: 1.2,
      borderColor: theme.colors.successDeep,
    },
    addedText: {
      fontSize: SF(13),
      fontFamily: theme.fontfamily.poppinsRegular,
      color: theme.colors.successDeep,
      marginLeft: SW(4),
    },
    billSummaryCard: {
      marginBottom: SH(32),
      borderRadius: SW(12),
      marginHorizontal: SW(15)
    },
    billTitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: SH(12),
      gap: SW(8),
    },
    billDivider: {
      height: 1,
      backgroundColor: theme.colors.gray200,
      marginBottom: SH(12),
    },
    billDividerDashed: {
      height: 1,
      borderTopWidth: 1,
      borderColor: theme.colors.gray200,
      borderStyle: 'dashed',
      marginVertical: SH(12),
    },
    billRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: SH(10),
    },
    billLabel: {
      color: theme.colors.gray700,
      fontFamily: theme.fontfamily.poppinsRegular,
      fontSize: SF(14),
    },
    billValue: {
      color: theme.colors.gray900,
      fontFamily: theme.fontfamily.poppinsMedium,
      fontSize: SF(14),
    },
    billDiscountLabel: {
      color: theme.colors.success,
      fontFamily: theme.fontfamily.poppinsMedium,
      fontSize: SF(14),
    },
    billDiscountValue: {
      color: theme.colors.success,
      fontFamily: theme.fontfamily.poppinsSemiBold,
      fontSize: SF(14),
    },
    billTaxLabel: {
      color: theme.colors.gray500,
      fontFamily: theme.fontfamily.poppinsRegular,
      fontSize: SF(12),
    },
    billTotalRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    billTotalLabel: {
      color: theme.colors.gray900,
      fontFamily: theme.fontfamily.poppinsSemiBold,
      fontSize: SF(16),
    },
    billTotalValue: {
      color: theme.colors.gray900,
      fontFamily: theme.fontfamily.poppinsSemiBold,
      fontSize: SF(16),
    },
    footer: {
      padding: SW(16),
      backgroundColor: theme.colors.white,
      borderTopWidth: 1,
      borderTopColor: theme.colors.borderFaint,
    },
    invoiceButton: {
      backgroundColor: theme.colors.brandGreen,
    },
  });

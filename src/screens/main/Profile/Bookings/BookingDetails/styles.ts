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
      fontFamily: theme.fontfamily.robotoSemiBold,
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
      fontFamily: theme.fontfamily.robotoSemiBold,
      fontSize: SF(14),
    },
    serviceTypeTitle: {
      color: theme.colors.danger,
      fontFamily: theme.fontfamily.robotoSemiBold,
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
      fontFamily: theme.fontfamily.robotoSemiBold,
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
      fontFamily: theme.fontfamily.robotoSemiBold,
      fontSize: SF(14),
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
      fontFamily: theme.fontfamily.robotoRegular,
      fontSize: SF(12),
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
      fontFamily: theme.fontfamily.robotoRegular,
      fontSize: SF(12),
    },
    priceText: {
      color: theme.colors.gray900,
      fontFamily: theme.fontfamily.robotoSemiBold,
      fontSize: SF(14),
    },
    strikePrice: {
      color: theme.colors.gray500,
      fontFamily: theme.fontfamily.robotoRegular,
      fontSize: SF(12),
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
      position: 'absolute',
      bottom: SH(40),
      backgroundColor: theme.colors.lightgreen,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: SW(6),
      paddingVertical: SH(2),
      borderRadius: SW(5),
      gap: SW(4),
      zIndex: 10,
      elevation: 4,
      shadowColor: theme.colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 3,
    },
    addedText: {
      color: theme.colors.DeepGreen,
      fontFamily: theme.fontfamily.robotoSemiBold,
      fontSize: SF(10),
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
      fontFamily: theme.fontfamily.robotoRegular,
      fontSize: SF(14),
    },
    billValue: {
      color: theme.colors.gray900,
      fontFamily: theme.fontfamily.robotoMedium,
      fontSize: SF(14),
    },
    billDiscountLabel: {
      color: theme.colors.success,
      fontFamily: theme.fontfamily.robotoMedium,
      fontSize: SF(14),
    },
    billDiscountValue: {
      color: theme.colors.success,
      fontFamily: theme.fontfamily.robotoSemiBold,
      fontSize: SF(14),
    },
    billTaxLabel: {
      color: theme.colors.gray500,
      fontFamily: theme.fontfamily.robotoRegular,
      fontSize: SF(12),
    },
    billTotalRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    billTotalLabel: {
      color: theme.colors.gray900,
      fontFamily: theme.fontfamily.robotoSemiBold,
      fontSize: SF(16),
    },
    billTotalValue: {
      color: theme.colors.gray900,
      fontFamily: theme.fontfamily.robotoSemiBold,
      fontSize: SF(16),
    },
  });

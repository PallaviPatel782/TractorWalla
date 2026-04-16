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
      backgroundColor: theme.colors.backgroundTertiary || '#F4F6F8',
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
      color: theme.colors.danger || '#D92D20',
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
      fontFamily: theme.fontfamily.poppinsRegular,
      fontSize: SF(12),
    },
    priceRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: SH(8),
      gap: SW(6),
    },
    starIcon: {
      color: '#FFB800',
    },
    ratingText: {
      color: theme.colors.gray600,
      fontFamily: theme.fontfamily.poppinsRegular,
      fontSize: SF(12),
    },
    priceText: {
      color: theme.colors.gray900,
      fontFamily: theme.fontfamily.poppinsSemiBold,
      fontSize: SF(14),
    },
    strikePrice: {
      color: theme.colors.gray500,
      fontFamily: theme.fontfamily.poppinsRegular,
      fontSize: SF(12),
      textDecorationLine: 'line-through',
    },
    imageContainer: {
      position: 'relative',
      alignItems: 'center',
    },
    itemImage: {
      width: SW(100),
      height: SW(100),
      borderRadius: SW(8),
      backgroundColor: theme.colors.gray100,
    },
    addedBadge: {
      position: 'absolute',
      bottom: -SH(10),
      backgroundColor: theme.colors.success || '#10B981',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: SW(12),
      paddingVertical: SH(4),
      borderRadius: SW(6),
      gap: SW(4),
    },
    addedText: {
      color: theme.colors.white,
      fontFamily: theme.fontfamily.poppinsMedium,
      fontSize: SF(12),
    },
  });

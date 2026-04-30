import { StyleSheet } from 'react-native';
import { SW, SH, SF } from '@utils/Dimensions';
import { AppTheme } from '@theme';

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    serviceCard: {
      flexDirection: 'row',
      backgroundColor: theme.colors.white,
      marginBottom: SH(10),
      // borderRadius: SW(12),
      padding: SW(12),
      borderWidth: 1,
      borderColor: theme.colors.borderFaint,
    },
    serviceLeft: {
      flex: 1,
      paddingRight: SW(10),
    },
    serviceTitle: {
      fontSize: SF(15),
      fontFamily: theme.fontfamily.robotoBold,
      color: theme.colors.textPrimary,
      marginBottom: SH(8),
    },
    bulletRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: SH(4),
    },
    bulletText: {
      fontSize: SF(12),
      fontFamily: theme.fontfamily.robotoRegular,
      color: theme.colors.textSecondary,
      flex: 1,
      marginLeft: SW(10),
    },
    serviceFooter: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: SH(10),
    },
    ratingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: SW(12),
    },
    starIcon: {
      fontSize: SF(12),
      color: theme.colors.GoldenYellow,
      marginRight: SW(4),
    },
    ratingText: {
      fontSize: SF(12),
      fontFamily: theme.fontfamily.robotoBold,
      color: theme.colors.textSecondary,
    },
    price: {
      fontSize: SF(15),
      fontFamily: theme.fontfamily.robotoBold,
      color: theme.colors.textPrimary,
    },
    mrp: {
      fontSize: SF(12),
      fontFamily: theme.fontfamily.robotoRegular,
      color: theme.colors.textMuted,
      textDecorationLine: 'line-through',
      marginLeft: SW(6),
    },
    serviceRight: {
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    serviceImage: {
      width: SW(100),
      height: SW(85),
      borderRadius: SW(8),
      marginBottom: SH(8),
    },
    bookBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(30, 99, 63, 0.1)', // Light green bg
      paddingHorizontal: SW(12),
      paddingVertical: SH(6),
      borderRadius: SW(15),
      borderWidth: 1,
      borderColor: theme.colors.successDeep,
    },
    bookText: {
      fontSize: SF(11),
      fontFamily: theme.fontfamily.robotoBold,
      color: theme.colors.successDeep,
    },
  });

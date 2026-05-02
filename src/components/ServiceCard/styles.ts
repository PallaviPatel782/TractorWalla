import { StyleSheet } from 'react-native';
import { SW, SH, SF } from '@utils/Dimensions';
import { AppTheme } from '@theme';

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    serviceCard: {
      flexDirection: 'row',
      backgroundColor: theme.colors.white,
      marginBottom: SH(10),
      borderRadius: SW(12),
      padding: SW(12),
      borderWidth: 1,
      borderColor: theme.colors.borderFaint,
    },
    serviceLeft: {
      flex: 1,
      paddingRight: SW(10),
      marginLeft: SW(10),
    },
    serviceTitle: {
      fontSize: SF(15),
      fontFamily: theme.fontfamily.poppinsMedium,
      color: theme.colors.textPrimary,
      marginBottom: SH(8),
    },
    bulletRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: SH(4),
    },
    bulletText: {
      fontSize: SF(13),
      fontFamily: theme.fontfamily.poppinsRegular,
      color: theme.colors.textSecondary,
      flex: 1,
      marginLeft: SW(10),
    },
    kitFooter: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: SH(10),
    },
    ratingText: {
      fontSize: SF(13),
      fontFamily: theme.fontfamily.poppinsBold,
      color: theme.colors.GoldenYellow,
      marginRight: SW(8),
    },
    price: {
      fontSize: SF(15),
      fontFamily: theme.fontfamily.poppinsBold,
      color: theme.colors.textPrimary,
    },
    mrp: {
      fontSize: SF(13),
      fontFamily: theme.fontfamily.poppinsRegular,
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
      height: SW(90),
      borderRadius: SW(8),
      marginBottom: SH(8),
    },
    bookBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(30, 99, 63, 0.08)', // Slightly lighter green
      paddingHorizontal: SW(10),
      paddingVertical: SH(5),
      borderRadius: SW(20),
      borderWidth: 1.2,
      borderColor: theme.colors.successDeep,
    },
    bookText: {
      fontSize: SF(13),
      fontFamily: theme.fontfamily.poppinsRegular,
      color: theme.colors.successDeep,
      marginLeft: SW(4),
    },
  });

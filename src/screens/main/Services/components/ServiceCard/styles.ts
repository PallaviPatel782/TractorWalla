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
      borderColor: theme.colors.borderFaint || '#F1F1F1',
    },
    serviceLeft: {
      flex: 1,
      paddingRight: SW(10),
    },
    serviceTitle: {
      fontSize: SF(15),
      fontFamily: theme.fontfamily.robotoBold,
      color: theme.colors.textPrimary || '#111827',
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
      color: theme.colors.textSecondary || '#666666',
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
      color: theme.colors.GoldenYellow || '#F4C542',
      marginRight: SW(4),
    },
    ratingText: {
      fontSize: SF(12),
      fontFamily: theme.fontfamily.robotoBold,
      color: theme.colors.textSecondary || '#666666',
    },
    price: {
      fontSize: SF(15),
      fontFamily: theme.fontfamily.robotoBold,
      color: theme.colors.textPrimary || '#111827',
    },
    mrp: {
      fontSize: SF(12),
      fontFamily: theme.fontfamily.robotoRegular,
      color: theme.colors.textMuted || '#9CA3AF',
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
      position: 'absolute',
      bottom: SH(25),
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
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 3,
    },
    bookText: {
      fontSize: SF(11),
      fontFamily: theme.fontfamily.robotoBold,
      color: theme.colors.DeepGreen,
    },
  });

import { StyleSheet } from 'react-native';
import { AppTheme } from '@theme';

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      padding: 16,
    },
    headerContainer: {
      backgroundColor: theme.colors.YellowLight,
      paddingBottom: 15,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
    searchContainer: {
      flexDirection: 'row',
      backgroundColor: theme.colors.white,
      borderRadius: 12,
      paddingHorizontal: 15,
      paddingVertical: 2,
      alignItems: 'center',
      marginHorizontal: 16,
      marginTop: 5,
      shadowColor: theme.colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      elevation: 2,
    },
    searchInput: {
      flex: 1,
      fontSize: 14,
      fontFamily: theme.fontfamily.poppinsRegular,
      color: theme.colors.textPrimary,
      paddingVertical: 8,
    },
    applyBtn: {
      marginLeft: 10,
    },
    applyBtnText: {
      fontSize: 14,
      fontFamily: theme.fontfamily.poppinsBold,
      color: theme.colors.DeepGreen,
    },
    sectionTitle: {
      fontSize: 16,
      fontFamily: theme.fontfamily.poppinsBold,
      color: theme.colors.textPrimary,
      marginBottom: 16,
    },
    couponCard: {
      backgroundColor: theme.colors.white,
      borderRadius: 12,
      flexDirection: 'row',
      marginBottom: 16,
      overflow: 'hidden',
      shadowColor: theme.colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    redTag: {
      width: 40,
      backgroundColor: theme.colors.danger,
      justifyContent: 'center',
      alignItems: 'center',
    },
    tagText: {
      fontSize: 14,
      fontFamily: theme.fontfamily.poppinsBold,
      color: theme.colors.white,
      transform: [{ rotate: '-90deg' }],
      width: 80,
      textAlign: 'center',
    },
    couponInfo: {
      flex: 1,
      padding: 16,
      justifyContent: 'center',
    },
    couponCode: {
      fontSize: 15,
      fontFamily: theme.fontfamily.poppinsBold,
      color: theme.colors.textPrimary,
      marginBottom: 4,
    },
    couponTitle: {
      fontSize: 14,
      fontFamily: theme.fontfamily.poppinsMedium,
      color: theme.colors.textSecondary,
      marginBottom: 2,
    },
    couponDesc: {
      fontSize: 11,
      fontFamily: theme.fontfamily.poppinsRegular,
      color: theme.colors.textMuted,
    },
    cardApplyBtn: {
      paddingHorizontal: 16,
      justifyContent: 'center',
      borderLeftWidth: 1,
      borderLeftColor: theme.colors.gray100,
    },
    cardApplyText: {
      fontSize: 14,
      fontFamily: theme.fontfamily.poppinsBold,
      color: theme.colors.DeepGreen,
    },
  });

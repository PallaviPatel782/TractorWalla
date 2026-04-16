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
    },
    logoContainer: {
      backgroundColor: theme.colors.DeepGreen,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: SH(40),
    },
    logoTextContainer: {
      alignItems: 'center',
      marginTop: SH(10),
    },
    logoTitle: {
      color: theme.colors.white,
      fontFamily: theme.fontfamily.poppinsBold,
      fontSize: SF(28),
      letterSpacing: 1,
      lineHeight: SF(34),
    },
    textContent: {
      paddingHorizontal: SW(20),
      paddingVertical: SH(20),
    },
    description: {
      color: theme.colors.gray700,
      fontFamily: theme.fontfamily.poppinsRegular,
      fontSize: SF(13),
      lineHeight: SH(20),
      marginBottom: SH(20),
    },
    whyChooseTitle: {
      color: theme.colors.primary,
      fontFamily: theme.fontfamily.poppinsSemiBold,
      fontSize: SF(14),
      marginBottom: SH(12),
      flexDirection: 'row',
      alignItems: 'center',
    },
    listItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: SH(10),
    },
    listIcon: {
      marginRight: SW(8),
    },
    listText: {
      color: theme.colors.gray800,
      fontFamily: theme.fontfamily.poppinsRegular,
      fontSize: SF(13),
    },
  });

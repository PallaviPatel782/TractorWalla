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
    },
    logoContainer: {
      backgroundColor: theme.colors.DeepGreen,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 20,
    },
    logoTextContainer: {
      alignItems: 'center',
      marginTop: 10,
    },
    logoTitle: {
      color: theme.colors.white,
      fontFamily: theme.fontfamily.poppinsBold,
      fontSize: 28,
      letterSpacing: 1,
      lineHeight: 34,
    },
    textContent: {
      paddingHorizontal: 20,
      paddingTop: 10,
      paddingBottom: 20,
    },
    description: {
      color: theme.colors.gray700,
      fontFamily: theme.fontfamily.poppinsRegular,
      fontSize: 14,
      lineHeight: 20,
      marginBottom: 20,
    },
    whyChooseTitle: {
      color: theme.colors.primary,
      fontFamily: theme.fontfamily.poppinsSemiBold,
      fontSize: 14,
      marginBottom: 12,
      flexDirection: 'row',
      alignItems: 'center',
    },
    listItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    listIcon: {
      marginRight: 8,
    },
    listText: {
      color: theme.colors.gray800,
      fontFamily: theme.fontfamily.poppinsRegular,
      fontSize: 14,
    },
  });

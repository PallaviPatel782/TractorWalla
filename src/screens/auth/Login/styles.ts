import { StyleSheet, Platform } from 'react-native';
import { AppTheme } from '@theme';

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    gradientHeader: {
      ...StyleSheet.absoluteFill,
    },
    content: {
      flex: 1,
      paddingHorizontal: 24,
      paddingBottom: 20,
    },
    illustrationContainer: {
      marginTop: 60,
      alignItems: 'center',
      justifyContent: 'center',
    },

    textSection: {
      marginTop: 30,
      alignItems: 'center',
    },
    title: {
      color: theme.colors.black,
      fontSize: 16
    },
    subText: {
      fontFamily: theme.fontfamily.poppinsSemiBold,
      color: theme.colors.gray500,
      paddingHorizontal: 20,
      fontSize: 12
    },
    inputCard: {
      width: '100%',
      paddingHorizontal: 24,
      paddingVertical: 25,
      borderRadius: 24,
      backgroundColor: theme.colors.white,
      marginTop: 30,
      marginBottom: 10,
      ...Platform.select({
        ios: {
          shadowColor: theme.colors.black,
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.08,
          shadowRadius: 20,
        },
        android: {
          elevation: 1,
        },
      }),
      borderWidth: 1,
      borderColor: theme.colors.borderFaint,
    },
    button: {
      borderRadius: 12,
    },
    footerContainer: {
      marginTop: 180,
      paddingBottom: 20,
      alignItems: 'center',
    },
    agreementText: {
      lineHeight: 18,
    },
    linkText: {
      color: theme.colors.AzureBlue,
      textDecorationLine: 'underline',
    },
  });

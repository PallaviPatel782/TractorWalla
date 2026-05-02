import { StyleSheet, Platform } from 'react-native';
import { AppTheme } from '@theme';
import { SW, SH, SF } from '@utils/Dimensions';

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
      paddingHorizontal: SW(24),
      paddingBottom: SH(20),
    },
    illustrationContainer: {
      marginTop: SH(60),
      alignItems: 'center',
      justifyContent: 'center',
    },

    textSection: {
      marginTop: SH(30),
      alignItems: 'center',
    },
    title: {
      color: theme.colors.textPrimary,

      fontSize: SF(16)
    },
    subText: {
      fontFamily: theme.fontfamily.poppinsRegular,
      color: theme.colors.gray500,
      paddingHorizontal: SW(20),
      fontSize: SF(12)
    },
    inputCard: {
      width: '100%',
      paddingHorizontal: SW(24),
      paddingTop: SH(24),
      paddingBottom: SH(30),
      borderRadius: SW(24),
      backgroundColor: theme.colors.white,
      marginTop: SH(30),
      marginBottom: SH(10),
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
    inputWrapper: {
      marginBottom: SH(20),
    },
    button: {
      // marginTop: SH(5),
      borderRadius: SW(12),
    },
    footerContainer: {
      marginTop: 'auto',
      paddingBottom: SH(20),
      alignItems: 'center',
    },
    agreementText: {
      lineHeight: SH(18),
    },
    linkText: {
      color: theme.colors.AzureBlue,
      textDecorationLine: 'underline',
    },
  });

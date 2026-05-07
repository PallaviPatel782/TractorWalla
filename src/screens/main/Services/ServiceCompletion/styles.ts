import { StyleSheet } from 'react-native';
import { AppTheme } from '@theme';

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.white,
    },
    content: {
      flexGrow: 1,
      paddingHorizontal: 20,
      alignItems: 'center',
      justifyContent: "center",
      paddingBottom: 10,
    },
    successContainer: {
      alignItems: 'center',
    },
    thankYouText: {
      color: theme.colors.black,
    },
    successSubText: {
      color: theme.colors.DeepGreen,
      marginVertical: 10
    },
    otpSection: {
      width: '100%',
      alignItems: 'center',
      marginBottom: 40,
    },
    otpLabel: {
      color: theme.colors.gray500,
      marginBottom: 16,
      textAlign: 'center',
    },
    otpRow: {
      flexDirection: 'row',
      gap: 10,
    },
    otpBox: {
      width: 44,
      height: 54,
      borderRadius: 8,
      backgroundColor: theme.colors.gray50,
      borderWidth: 1,
      borderColor: theme.colors.gray200,
      alignItems: 'center',
      justifyContent: 'center',
    },
    otpDigit: {
      fontSize: 18,
      fontFamily: theme.fontfamily.poppinsMedium,
      color: theme.colors.black,
    },
    modalContent: {
      padding: 20,
      alignItems: 'center',
      paddingBottom: 30,
    },
    modalIconContainer: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: theme.colors.DeepGreen + '15',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    },
    modalTitle: {
      color: theme.colors.black,
      marginBottom: 8,
      textAlign: 'center',
    },
    modalSubText: {
      color: theme.colors.gray500,
      textAlign: 'center',
      marginBottom: 24,
      paddingHorizontal: 20,
      lineHeight: 18,
    },
  });

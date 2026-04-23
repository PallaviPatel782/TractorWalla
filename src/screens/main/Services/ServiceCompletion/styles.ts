import { StyleSheet } from 'react-native';
import { AppTheme } from '@theme';
import { SW, SH, SF } from '@utils/Dimensions';

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.white,
    },
    content: {
      flexGrow: 1,
      paddingHorizontal: SW(20),
      alignItems: 'center',
      justifyContent: "center"
    },
    successContainer: {
      alignItems: 'center',
    },
    thankYouText: {
      color: theme.colors.black,
    },
    successSubText: {
      color: theme.colors.DeepGreen,
      marginVertical: SH(10)
    },
    otpSection: {
      width: '100%',
      alignItems: 'center',
      marginBottom: SH(40),
    },
    otpLabel: {
      color: theme.colors.gray500,
      marginBottom: SH(16),
      textAlign: 'center',
    },
    otpRow: {
      flexDirection: 'row',
      gap: SW(10),
    },
    otpBox: {
      width: SW(44),
      height: SH(54),
      borderRadius: SW(8),
      backgroundColor: theme.colors.gray50,
      borderWidth: 1,
      borderColor: theme.colors.gray200,
      alignItems: 'center',
      justifyContent: 'center',
    },
    otpDigit: {
      fontSize: SF(18),
      fontFamily: theme.fontfamily.robotoBold,
      color: theme.colors.black,
    },
    modalContent: {
      padding: SW(20),
      alignItems: 'center',
      paddingBottom: SH(30),
    },
    modalIconContainer: {
      width: SW(80),
      height: SW(80),
      borderRadius: SW(40),
      backgroundColor: theme.colors.DeepGreen + '15',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: SH(20),
    },
    modalTitle: {
      color: theme.colors.black,
      marginBottom: SH(8),
      textAlign: 'center',
    },
    modalSubText: {
      color: theme.colors.gray500,
      textAlign: 'center',
      marginBottom: SH(24),
      paddingHorizontal: SW(20),
      lineHeight: SH(18),
    },
  });

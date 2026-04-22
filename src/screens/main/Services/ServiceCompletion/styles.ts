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
    },
    successContainer: {
      alignItems: 'center',
      marginTop: SH(20),
      marginBottom: SH(40),
    },
    iconCircle: {
      width: SW(100),
      height: SW(100),
      borderRadius: SW(50),
      backgroundColor: theme.colors.DeepGreen + '10',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: SH(20),
    },
    thankYouText: {
      color: theme.colors.black,
      marginBottom: SH(4),
    },
    successSubText: {
      color: theme.colors.DeepGreen,
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
    infoCard: {
      width: '100%',
      backgroundColor: theme.colors.white,
      borderRadius: SW(16),
      padding: SW(20),
      alignItems: 'center',
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      marginBottom: SH(40),
    },
    completionBadge: {
      marginBottom: SH(12),
    },
    completionText: {
      color: theme.colors.black,
      textAlign: 'center',
      marginBottom: SH(8),
    },
    completionSubText: {
      color: theme.colors.gray500,
      textAlign: 'center',
      marginBottom: SH(24),
      paddingHorizontal: SW(10),
    },
    downloadBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.DeepGreen,
      paddingHorizontal: SW(24),
      paddingVertical: SH(12),
      borderRadius: SW(10),
      gap: SW(10),
    },
    downloadText: {
      color: theme.colors.white,
      fontSize: SF(14),
      fontFamily: theme.fontfamily.robotoMedium,
    },
    supportRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: SW(8),
      marginTop: SH(20),
      paddingVertical: SH(10),
    },
    supportText: {
      fontSize: SF(14),
      color: theme.colors.gray500,
      fontFamily: theme.fontfamily.robotoRegular,
      textDecorationLine: 'underline',
    },
    footer: {
      padding: SW(20),
      paddingBottom: SH(30),
    },
  });

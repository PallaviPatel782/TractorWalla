import { StyleSheet, Dimensions, Platform } from 'react-native';
import { AppTheme } from '@theme';
import { SW, SH, SF } from '@utils/Dimensions';

const { width } = Dimensions.get('window');

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
    sliderSection: {
      height: SH(160),
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: SH(50),
    },
    slide: {
      width: width - SW(48),
      alignItems: 'center',
      justifyContent: 'center',
    },
    serviceText: {
      marginVertical: SH(15),
      color: theme.colors.textPrimary,
      textAlign: 'center',
      paddingHorizontal: SW(40),
      lineHeight: SH(22),
    },
    paginationDots: {
      flexDirection: 'row',
      marginTop: SH(10),
      alignItems: 'center',
      justifyContent: 'center',
    },
    dot: {
      height: SW(6),
      borderRadius: SW(3),
      marginHorizontal: SW(4),
    },
    inputCard: {
      width: '100%',
      padding: SW(24),
      borderRadius: SW(24),
      backgroundColor: theme.colors.white,
      marginTop: SH(20),
      ...Platform.select({
        ios: {
          shadowColor: theme.colors.black,
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.08,
          shadowRadius: 20,
        },
        android: {
          elevation: 8,
        },
      }),
      borderWidth: 1,
      borderColor: theme.colors.borderFaint,
    },
    textSection: {
      marginTop: SH(10),
      alignItems: 'center',
    },
    title: {
      color: theme.colors.textPrimary,
      marginBottom: SH(8),
      fontSize: SF(16)
    },
    subText: {
      marginTop: SH(4),
      color: theme.colors.gray500,
      lineHeight: SH(18),
      paddingHorizontal: SW(20),
      fontSize: SF(12)
    },
    otpWrapper: {
      height: SH(80),
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: SH(10),
    },
    timerSection: {
      alignItems: 'center',
      marginBottom: SH(20),
    },
    timerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.backgroundTertiary,
      paddingHorizontal: SW(12),
      paddingVertical: SH(6),
      borderRadius: SW(20),
    },
    resendBtn: {
      marginTop: SH(5),
    },
    footer: {
      position: 'absolute',
      bottom: SH(30),
      left: SW(24),
      right: SW(24),
    },
  });

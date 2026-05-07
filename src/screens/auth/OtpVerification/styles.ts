import { StyleSheet, Dimensions, Platform } from 'react-native';
import { AppTheme } from '@theme';

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
      paddingHorizontal: 24,
      paddingBottom: 20,
    },
    sliderSection: {
      height: 160,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 50,
    },
    slide: {
      width: width - 48,
      alignItems: 'center',
      justifyContent: 'center',
    },
    serviceText: {
      marginVertical: 15,
      color: theme.colors.textPrimary,
      textAlign: 'center',
      paddingHorizontal: 40,
      lineHeight: 22,
    },
    paginationDots: {
      flexDirection: 'row',
      marginTop: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    dot: {
      height: 6,
      borderRadius: 3,
      marginHorizontal: 4,
    },
    inputCard: {
      width: '100%',
      padding: 24,
      borderRadius: 24,
      backgroundColor: theme.colors.white,
      marginVertical: 20,
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
      marginTop: 10,
      alignItems: 'center',
    },
    title: {
      color: theme.colors.black,
      marginBottom: 8,
      fontSize: 16
    },
    subText: {
      marginTop: 4,
      color: theme.colors.gray500,
      lineHeight: 18,
      paddingHorizontal: 20,
      fontSize: 12
    },
    otpWrapper: {
      height: 80,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 10,
    },
    timerSection: {
      alignItems: 'center',
      marginBottom: 20,
    },
    timerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.backgroundTertiary,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
    },
    resendBtn: {
      marginTop: 5,
    },
    footer: {
      position: 'absolute',
      bottom: 30,
      left: 24,
      right: 24,
    },
  });

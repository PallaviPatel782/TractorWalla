import { StyleSheet, Dimensions } from 'react-native';
import { AppTheme } from '@theme';
import { SW, SH } from '@utils/Dimensions';

const { width } = Dimensions.get('window');

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flex: 1,
      paddingHorizontal: SW(20),
      paddingBottom: SH(10),
    },
    sliderSection: {
      height: SH(190),
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: SH(25),
      marginBottom: SH(25),
    },
    slide: {
      width: width - SW(40),
      alignItems: 'center',
      justifyContent: 'center',
    },
    serviceText: {
      marginTop: SH(10),
      color: theme.colors.textPrimary,
      textAlign: 'center',
      fontFamily: theme.fontfamily.robotoRegular,
    },
    paginationDots: {
      flexDirection: 'row',
      marginTop: SH(5),
      alignItems: 'center',
      justifyContent: 'center',
    },
    dot: {
      width: SW(6),
      height: SW(6),
      borderRadius: SW(3),
      marginHorizontal: SW(3),
    },
    inputCard: {
      width: '100%',
      padding: SW(20),
      borderWidth: 1,
      borderRadius: SW(20),
      backgroundColor: theme.colors.white,
      borderColor: theme.colors.borderLight,
      // Shadow for iOS
      shadowColor: theme.colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 10,
      // Elevation for Android
      elevation: 5,
      marginTop: SH(30)
    },
    subText: {
      marginTop: SH(8),
      lineHeight: SH(18),
      fontFamily: theme.fontfamily.robotoRegular,
    },
    otpWrapper: {
      height: SH(70),
      justifyContent: 'center',
      marginVertical: SH(5),
    },
    timerSection: {
      alignItems: 'center',
      marginBottom: SH(15),
    },
    timerRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    resendBtn: {
      marginTop: SH(5),
    },
    button: {
      width: '100%',
    },
  });

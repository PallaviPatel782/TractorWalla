import { StyleSheet } from 'react-native';
import { AppTheme } from '@theme';
import { SW, SH } from '@utils/Dimensions';

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    headerBanner: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.primary,
      paddingVertical: SH(12),
      paddingHorizontal: SW(20),
    },
    headerIconContainer: {
      width: SW(24),
      height: SW(24),
      borderRadius: SW(12),
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: SW(12),
    },
    headerBannerText: {
      color: theme.colors.white,
      fontFamily: theme.fontfamily.poppinsSemiBold,
    },
    content: {
      flex: 1,
      paddingHorizontal: SW(20),
      paddingTop: SH(20),
    },
    formContainer: {
      backgroundColor: theme.colors.white,
      borderRadius: SW(16),
      padding: SW(16),
      borderWidth: 1,
      borderColor: theme.colors.borderLight,
      // Shadow for iOS/Android
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 5,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    halfWidth: {
      width: '48%',
    },
    button: {
      backgroundColor: theme.colors.brandGreen,
      borderRadius: SW(10),
      marginVertical: SH(80),
    },
  });

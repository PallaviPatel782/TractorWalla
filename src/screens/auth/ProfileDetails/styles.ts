import { StyleSheet } from 'react-native';
import { AppTheme } from '@theme';


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
      paddingVertical: 12,
      paddingHorizontal: 20,
    },
    headerIconContainer: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: theme.colors.white + '33',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    headerBannerText: {
      color: theme.colors.white,
      fontFamily: theme.fontfamily.poppinsSemiBold,
    },
    content: {
      flexGrow: 1,
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 40,
    },
    formContainer: {
      backgroundColor: theme.colors.white,
      borderRadius: 16,
      padding: 16,
      borderWidth: 1,
      borderColor: theme.colors.borderLight,
      // Shadow for iOS/Android
      elevation: 3,
      shadowColor: theme.colors.black,
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
      borderRadius: 10,
      marginVertical: 80,
    },
  });

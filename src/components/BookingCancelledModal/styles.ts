import { StyleSheet } from 'react-native';
import { AppTheme } from '@theme';

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      backgroundColor: theme.colors.white,
      padding: 24,
      borderRadius: 16,
      alignItems: 'center',
      width: '85%',
      shadowColor: theme.colors.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 5,
    },
    cancelIconCircle: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: theme.colors.red || '#D92D20',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
    },
    cancelledText: {
      color: theme.colors.black,
      marginBottom: 6,
      textAlign: 'center',
      fontFamily: theme.fontfamily.poppinsSemiBold,
    },
    cancelledSubText: {
      color: theme.colors.successDeep || '#1E633F',
      marginBottom: 20,
      textAlign: 'center',
      fontFamily: theme.fontfamily.poppinsRegular,
    },
    bookAgainBtn: {
      backgroundColor: theme.colors.DeepGreen || '#1E633F',
      width: '100%',
      paddingVertical: 8,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

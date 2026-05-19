import { StyleSheet, Platform } from 'react-native';
import { AppTheme } from '@theme';

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flexGrow: 1,
      paddingHorizontal: 20,
    },
    description: {
      color: theme.colors.gray600,
      fontFamily: theme.fontfamily.poppinsRegular,
      fontSize: 14,
      marginBottom: 10,
      lineHeight: 22,
    },
    inputContainer: {
      backgroundColor: theme.colors.white,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.colors.gray200,
      minHeight: 120,
      padding: 16,
      flexDirection: 'row',
    },
    input: {
      flex: 1,
      fontFamily: theme.fontfamily.poppinsRegular,
      fontSize: 14,
      color: theme.colors.gray900,
      marginTop: Platform.OS === 'ios' ? 0 : -10,
      marginLeft: 8,
    },
    iconWrapper: {
      marginTop: 2,
    },
    bottomContainer: {
      paddingHorizontal: 20,
      paddingBottom: 30,
      paddingTop: 10,
    },
    starsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      marginVertical: 10,
    },
    star: {
      fontSize: 36,
    },
    experienceLabel: {
      fontFamily: theme.fontfamily.poppinsMedium,
      fontSize: 14,
      color: theme.colors.textPrimary,
      marginTop: 10,
    },
  });

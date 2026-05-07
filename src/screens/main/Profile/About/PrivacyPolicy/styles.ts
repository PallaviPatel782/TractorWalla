import { StyleSheet } from 'react-native';
import { AppTheme } from '@theme';

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flexGrow: 1,
    },
    textContent: {
      paddingHorizontal: 20,
      paddingTop: 10,
      paddingBottom: 20,
    },
  });

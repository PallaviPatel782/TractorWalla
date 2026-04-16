import { StyleSheet } from 'react-native';
import { AppTheme } from '@theme';
import { SH, SW } from '@utils/Dimensions';

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
    langButton: {
      marginTop: SH(20),
      padding: SW(10),
      borderWidth: 1,
      borderRadius: SW(5),
      borderColor: theme.colors.primary,
    },
    buttonStyle: {
      width: SW(200),
      marginTop: SH(30),
    },
  });

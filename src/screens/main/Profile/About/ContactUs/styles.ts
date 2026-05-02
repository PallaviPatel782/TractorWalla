import { StyleSheet } from 'react-native';
import { AppTheme } from '@theme';
import { SW, SH } from '@utils/Dimensions';

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
      paddingHorizontal: SW(20),
      paddingTop: SH(10),
      paddingBottom: SH(20),
    },
    footer: {
      padding: SW(20),
      backgroundColor: theme.colors.white,
      borderTopWidth: 1,
      borderTopColor: theme.colors.borderFaint || '#E5E7EB',
    },
    photoSection: {
      marginTop: SH(20),
    },
    dropdownButton: {
      backgroundColor: theme.colors.white,
      borderColor: theme.colors.borderLight || '#E5E7EB',
      borderWidth: 1.5,
      paddingVertical: SH(10),
      borderRadius: SW(12),
    },
  });

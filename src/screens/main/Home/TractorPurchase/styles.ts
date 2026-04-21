import { StyleSheet } from 'react-native';
import { AppTheme } from '@theme';
import { SW, SH, SF } from '@utils/Dimensions';

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flex: 1,
      paddingHorizontal: SW(16),
      paddingTop: SH(20),
    },
    searchContainer: {
      marginBottom: SH(10),
    },
    dropdown: {
      backgroundColor: theme.colors.white,
      borderColor: theme.colors.borderLight,
      borderWidth: 1.5,
      padding: SH(10),
      borderRadius: SW(12),
    },
    brandGrid: {
      paddingHorizontal: SW(10),
      paddingTop: SH(10),
    },
    brandItem: {
      flex: 1,
      alignItems: 'center',
      marginBottom: SH(20),
      padding: SW(8),
    },
    selectedBrand: {
      backgroundColor: '#E9F5ED',
      borderRadius: SW(12),
    },
    brandImageWrap: {
      width: SW(64),
      height: SW(64),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.white,
      borderRadius: SW(32),
      marginBottom: SH(8),
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      borderWidth: 1,
      borderColor: theme.colors.borderLight,
    },
    brandName: {
      fontSize: SF(12),
      color: theme.colors.text,
      textAlign: 'center',
    },
    footer: {
      padding: SW(16),
      backgroundColor: theme.colors.white,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
    },
  });

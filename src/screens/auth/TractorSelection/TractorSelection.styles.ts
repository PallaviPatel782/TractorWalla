import { StyleSheet } from 'react-native';
import { AppTheme } from '@theme';
import { SW, SH, SF } from '@utils/Dimensions';

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flex: 1,
      paddingHorizontal: SW(20),
    },
    title: {
      marginTop: SH(10),
      marginBottom: SH(15),
      color: theme.colors.textPrimary,
    },
    searchBar: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.white,
      height: SH(44),
      borderRadius: SW(8),
      paddingHorizontal: SW(12),
      borderWidth: 1,
      borderColor: theme.colors.borderLight,
      marginBottom: SH(20),
    },
    searchInput: {
      flex: 1,
      fontSize: SF(14),
      color: theme.colors.textPrimary,
      padding: 0,
    },
    listContent: {
      paddingBottom: SH(20),
    },
    modelItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: SH(16),
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.borderLight,
    },
    modelName: {
      color: theme.colors.textPrimary,
    },
    radioButton: {
      width: SW(20),
      height: SW(20),
      borderRadius: SW(10),
      borderWidth: 1.5,
      borderColor: theme.colors.gray300,
      justifyContent: 'center',
      alignItems: 'center',
    },
    radioButtonSelected: {
      borderColor: theme.colors.brandRed,
    },
    radioInner: {
      width: SW(10),
      height: SW(10),
      borderRadius: SW(5),
      backgroundColor: theme.colors.brandRed,
    },
  });

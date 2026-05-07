import { StyleSheet } from 'react-native';
import { AppTheme } from '@theme';


export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flex: 1,
      paddingHorizontal: 16,
      paddingTop: 20,
    },
    searchContainer: {
      marginBottom: 10,
    },
    dropdown: {
      backgroundColor: theme.colors.white,
      borderColor: theme.colors.borderLight,
      borderWidth: 1.5,
      padding: 10,
      borderRadius: 12,
    },
    brandGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      marginTop: 10,
    },
    brandItem: {
      width: '25%',
      alignItems: 'center',
      marginBottom: 20,
    },
    brandImageWrap: {
      width: 64,
      height: 64,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.white,
      borderRadius: 12,
      marginBottom: 8,
      elevation: 2,
      shadowColor: theme.colors.black,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      borderWidth: 1,
      borderColor: theme.colors.borderLight,
    },
    brandName: {
      fontSize: 12,
      color: theme.colors.text,
      textAlign: 'center',
    },
  });

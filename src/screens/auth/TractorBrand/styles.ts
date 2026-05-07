import { StyleSheet } from 'react-native';
import { AppTheme } from '@theme';


export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
    content: {
      flex: 1,
    },
    searchContainer: {
      paddingHorizontal: 16,
      marginTop: 10,
    },
    brandGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      marginTop: 20,
      marginHorizontal: 12
    },
    brandItem: {
      width: '25%',
      alignItems: 'center',
      marginBottom: 20,
    },
    logoContainer: {
      width: 64,
      height: 64,
      borderRadius: 8,
      backgroundColor: theme.colors.white,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.borderLight,
      marginBottom: 8,
      // Shadow
      elevation: 2,
      shadowColor: theme.colors.black,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    brandName: {
      textAlign: 'center',
      color: theme.colors.textPrimary,
      fontFamily: theme.fontfamily.poppinsMedium,
      fontSize: 11,
    },
  });

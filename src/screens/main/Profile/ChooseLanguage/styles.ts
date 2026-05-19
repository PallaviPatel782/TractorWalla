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
      paddingHorizontal: 20,
      // paddingTop: 20,
    },
    optionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.gray100,
    },
    radioCircle: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: theme.colors.gray300,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 16,
    },
    radioCircleSelected: {
      borderColor: theme.colors.brandGreen,
    },
    radioInner: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: theme.colors.brandGreen,
    },
    languageText: {
      color: theme.colors.gray900,
      fontFamily: theme.fontfamily.poppinsRegular,
      fontSize: 16,
    },
    bottomContainer: {
      paddingHorizontal: 20,
      paddingBottom: 30,
      paddingTop: 10,
    },
  });

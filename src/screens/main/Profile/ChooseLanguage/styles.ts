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
      flexGrow: 1,
      paddingHorizontal: SW(20),
      paddingTop: SH(20),
    },
    optionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: SH(16),
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.gray100,
    },
    radioCircle: {
      width: SW(20),
      height: SW(20),
      borderRadius: SW(10),
      borderWidth: 2,
      borderColor: theme.colors.gray300,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: SW(16),
    },
    radioCircleSelected: {
      borderColor: theme.colors.brandGreen,
    },
    radioInner: {
      width: SW(10),
      height: SW(10),
      borderRadius: SW(5),
      backgroundColor: theme.colors.brandGreen,
    },
    languageText: {
      color: theme.colors.gray900,
      fontFamily: theme.fontfamily.robotoRegular,
      fontSize: SF(16),
    },
    bottomContainer: {
      paddingHorizontal: SW(20),
      paddingBottom: SH(30),
      paddingTop: SH(10),
    },
  });

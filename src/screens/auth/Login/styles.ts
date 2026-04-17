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
      flex: 1,
      paddingHorizontal: SW(20),
      paddingBottom: SH(20),
    },
    illustrationContainer: {
      marginTop: SH(70),
      alignItems: 'center',
      marginVertical: SH(20),
    },
    textSection: {
      marginBottom: SH(30),
    },
    subText: {
      marginTop: SH(4),
      fontFamily: theme.fontfamily.robotoRegular,
    },
    inputCard: {
      width: '100%',
      padding: SW(20),
      borderRadius: SW(20),
      backgroundColor: theme.colors.white,
      fontFamily: theme.fontfamily.robotoRegular,
      marginTop: SH(40),
      marginBottom: SH(10),
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 5,
    },

    button: {
      marginTop: SH(10),
    },
    footerContainer: {
      marginTop: SH(40),
      alignItems: 'center',
    },
  });

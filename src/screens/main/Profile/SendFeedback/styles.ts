import { StyleSheet, Platform } from 'react-native';
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
    description: {
      color: theme.colors.gray600,
      fontFamily: theme.fontfamily.poppinsRegular,
      fontSize: SF(14),
      marginBottom: SH(24),
      lineHeight: SH(22),
    },
    inputContainer: {
      backgroundColor: theme.colors.white,
      borderRadius: SW(12),
      borderWidth: 1,
      borderColor: theme.colors.gray200,
      minHeight: SH(120),
      padding: SW(16),
      flexDirection: 'row',
    },
    input: {
      flex: 1,
      fontFamily: theme.fontfamily.poppinsRegular,
      fontSize: SF(14),
      color: theme.colors.gray900,
      marginTop: Platform.OS === 'ios' ? 0 : -SH(10),
      marginLeft: SW(8),
    },
    iconWrapper: {
      marginTop: SH(2),
    },
    bottomContainer: {
      paddingHorizontal: SW(20),
      paddingBottom: SH(30),
      paddingTop: SH(10),
    },
  });

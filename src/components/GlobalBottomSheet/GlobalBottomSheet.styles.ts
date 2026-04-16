import { StyleSheet } from 'react-native';
import { AppTheme } from '@theme';
import { SW, SH, SF } from '@utils/Dimensions';

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    container: {
      backgroundColor: theme.colors.white,
      borderTopLeftRadius: SW(20),
      borderTopRightRadius: SW(20),
      paddingTop: SH(16),
      paddingBottom: SH(32), // extra padding for bottom safe area
      paddingHorizontal: SW(20),
      minHeight: SH(200),
      maxHeight: SH(600),
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: SH(16),
    },
    title: {
      fontSize: SF(18),
      color: theme.colors.gray900,
      fontFamily: theme.fontfamily.poppinsSemiBold,
    },
    closeButton: {
      padding: SW(4),
      backgroundColor: theme.colors.neutral100,
      borderRadius: SW(20),
    },
  });

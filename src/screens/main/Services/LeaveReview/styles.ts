import { StyleSheet } from 'react-native';
import { AppTheme } from '@theme';
import { SW, SH, SF } from '@utils/Dimensions';

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.white,
    },
    content: {
      paddingHorizontal: SW(20),
      paddingBottom: SH(100),
    },
    illustrationContainer: {
      alignItems: 'center',
      marginVertical: SH(20),
    },
    formCard: {
      backgroundColor: theme.colors.white,
    },
    label: {
      fontSize: SF(14),
      fontFamily: theme.fontfamily.robotoBold,
      color: theme.colors.black,
      marginBottom: SH(12),
    },
    textInput: {
      height: SH(120),
      textAlignVertical: 'top',
      padding: SW(12),
      borderRadius: SW(12),
      fontSize: SF(14),
      color: theme.colors.black,
    },
    experienceLabel: {
      fontSize: SF(14),
      fontFamily: theme.fontfamily.robotoMedium,
      color: theme.colors.black,
      marginTop: SH(24),
      marginBottom: SH(8),
    },
    ratingValueText: {
      fontFamily: theme.fontfamily.robotoBold,
      color: theme.colors.DeepGreen,
    },
    starsRow: {
      flexDirection: 'row',
      gap: SW(8),
    },
    star: {
      fontSize: SF(32),
    },
    footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: SW(20),
      backgroundColor: theme.colors.white,
      borderTopWidth: 1,
      borderTopColor: theme.colors.gray100,
    },
  });

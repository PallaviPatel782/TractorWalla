import { StyleSheet } from 'react-native';
import { AppTheme } from '@theme';

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.white,
    },
    content: {
      paddingHorizontal: 20,
      paddingBottom: 10,
    },
    illustrationContainer: {
      alignItems: 'center',
      marginVertical: 20,
    },
    formCard: {
      backgroundColor: theme.colors.white,
    },
    label: {
      fontSize: 14,
      fontFamily: theme.fontfamily.poppinsMedium,
      color: theme.colors.black,
      marginBottom: 12,
    },
    textInput: {
      height: 120,
      textAlignVertical: 'top',
      paddingVertical: 12,
      paddingHorizontal: 5,
      borderRadius: 12,
      fontSize: 14,
      color: theme.colors.black,
    },
    experienceLabel: {
      fontSize: 14,
      fontFamily: theme.fontfamily.poppinsMedium,
      color: theme.colors.black,
      marginTop: 24,
      marginBottom: 8,
    },
    ratingValueText: {
      fontFamily: theme.fontfamily.poppinsMedium,
      color: theme.colors.DeepGreen,
    },
    starsRow: {
      flexDirection: 'row',
      gap: 8,
    },
    star: {
      fontSize: 32,
    },
    successOverlay: {
      flex: 1,
      backgroundColor: theme.colors.overlay,
      justifyContent: 'center',
      alignItems: 'center',
    },
    successContent: {
      backgroundColor: theme.colors.white,
      padding: 30,
      borderRadius: 20,
      alignItems: 'center',
      width: '80%',
    },
    successIconCircle: {
      width: 80,
      height: 80,
      borderRadius: 40,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
    successTitle: {
      fontSize: 22,
      fontFamily: theme.fontfamily.poppinsMedium,
      color: theme.colors.black,
    },
    successSubTitle: {
      fontSize: 16,
      fontFamily: theme.fontfamily.poppinsMedium,
      textAlign: 'center',
      marginTop: 5,
    },
  });

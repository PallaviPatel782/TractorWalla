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
      paddingBottom: 40,
    },
    faqItem: {
      marginBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.gray100,
      paddingBottom: 12,
    },
    questionRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 8,
    },
    questionText: {
      flex: 1,
      color: theme.colors.gray900,
      fontFamily: theme.fontfamily.poppinsMedium,
      fontSize: 14,
      paddingRight: 16,
    },
    arrowIcon: {
      color: theme.colors.gray500,
      fontSize: 18,
    },
    answerContainer: {
      marginTop: 8,
      paddingRight: 20,
    },
    answerText: {
      color: theme.colors.gray600,
      fontFamily: theme.fontfamily.poppinsRegular,
      fontSize: 14,
      lineHeight: 20,
    },
  });

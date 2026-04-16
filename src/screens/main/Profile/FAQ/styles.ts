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
      paddingBottom: SH(40),
    },
    faqItem: {
      marginBottom: SH(12),
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.gray100,
      paddingBottom: SH(12),
    },
    questionRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: SH(8),
    },
    questionText: {
      flex: 1,
      color: theme.colors.gray900,
      fontFamily: theme.fontfamily.poppinsMedium,
      fontSize: SF(14),
      paddingRight: SW(16),
    },
    arrowIcon: {
      color: theme.colors.gray500,
      fontSize: SF(18),
    },
    answerContainer: {
      marginTop: SH(8),
      paddingRight: SW(20),
    },
    answerText: {
      color: theme.colors.gray600,
      fontFamily: theme.fontfamily.poppinsRegular,
      fontSize: SF(13),
      lineHeight: SH(20),
    },
  });

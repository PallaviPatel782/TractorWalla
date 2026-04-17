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
      flex: 1,
      paddingHorizontal: SW(20),
      paddingTop: SH(30),
      alignItems: 'center',
    },
    avatarContainer: {
      position: 'relative',
      marginBottom: SH(40),
    },
    avatarImage: {
      width: SW(90),
      height: SW(90),
      borderRadius: SW(45),
      backgroundColor: theme.colors.gray100,
    },
    editBadge: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: SW(28),
      height: SW(28),
      borderRadius: SW(14),
      backgroundColor: theme.colors.danger || '#D92D20',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: theme.colors.white,
    },
    formContainer: {
      width: '100%',
      backgroundColor: theme.colors.white,
      borderRadius: SW(12),
      padding: SW(16),
      borderWidth: 1,
      borderColor: theme.colors.gray100,
      gap: SH(16),
    },
    inputLabelRow: {
      flexDirection: 'row',
      marginBottom: SH(4),
    },
    inputLabel: {
      fontFamily: theme.fontfamily.robotoSemiBold,
      fontSize: SF(12),
      color: theme.colors.gray900,
    },
    asterisk: {
      color: theme.colors.danger || '#D92D20',
      fontFamily: theme.fontfamily.robotoSemiBold,
      fontSize: SF(12),
    },
    inputWrapper: {
      // Input component handles its own borders, we just wrap if needed
    },
    footer: {
      paddingHorizontal: SW(20),
      paddingBottom: SH(30),
      paddingTop: SH(10),
    },
    updateButton: {
      backgroundColor: theme.colors.brandGreen,
      width: '100%',
    },
  });

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
      paddingHorizontal: SW(20)
    },
    formContainer: {
      backgroundColor: theme.colors.white,
      borderRadius: SW(16),
      padding: SW(16),
      borderWidth: 1,
      borderColor: theme.colors.borderLight,
      // Shadow for iOS/Android
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 5,
    },
    button: {
      marginTop: SH(70),
      backgroundColor: theme.colors.brandGreen,
      borderRadius: SW(10),
      marginBottom: SH(20),
    },
    // Selection Group Styles
    typeTriggerButton: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: theme.colors.white,
      borderColor: theme.colors.borderLight,
      borderWidth: 1.5,
      paddingHorizontal: SW(12),
      paddingVertical: SH(10),
      borderRadius: SW(10),
      marginTop: SH(8),
    },
    typeTriggerText: {
      color: theme.colors.textPrimary,
      fontFamily: theme.fontfamily.robotoRegular,
    },
    bottomSheetItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: SH(16),
      borderBottomWidth: 1.5,
      borderBottomColor: theme.colors.gray300,
      paddingHorizontal: SW(8),
    },
    bottomSheetItemText: {
      color: theme.colors.textPrimary,
      fontFamily: theme.fontfamily.robotoRegular,
    },
    bottomSheetItemTextActive: {
      color: theme.colors.brandGreen,
      fontFamily: theme.fontfamily.robotoSemiBold,
    },
    radioCircle: {
      width: SW(16),
      height: SW(16),
      borderRadius: SW(8),
      borderWidth: 1.5,
      borderColor: theme.colors.gray300,
      justifyContent: 'center',
      alignItems: 'center',
    },
    radioCircleActive: {
      borderColor: theme.colors.brandGreen,
    },
    radioInner: {
      width: SW(8),
      height: SW(8),
      borderRadius: SW(4),
      backgroundColor: theme.colors.brandGreen,
    },
    label: {
      marginBottom: SH(8),
      color: theme.colors.textPrimary,
      fontFamily: theme.fontfamily.robotoMedium,
    },
    brandDisplayContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: SW(12),

    },
    brandLogoBox: {
      width: SW(60),
      height: SW(60),
      justifyContent: 'center',
      alignItems: 'center',
    },
    brandDisplayName: {
      color: theme.colors.textPrimary,
      fontFamily: theme.fontfamily.robotoSemiBold,
    },
    dropdownButton: {
      backgroundColor: theme.colors.white,
      borderColor: theme.colors.borderLight,
      borderWidth: 1.5,
      padding: SH(10),
      borderRadius: SW(12),
    },
  });



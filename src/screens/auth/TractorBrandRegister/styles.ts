import { StyleSheet } from 'react-native';
import { AppTheme } from '@theme';


export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flex: 1,
      paddingHorizontal: 20
    },
    formContainer: {
      backgroundColor: theme.colors.white,
      borderRadius: 16,
      padding: 16,
      borderWidth: 1,
      borderColor: theme.colors.borderLight,
      // Shadow for iOS/Android
      elevation: 3,
      shadowColor: theme.colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 5,
      marginVertical: 5
    },
    button: {
      marginTop: 70,
      backgroundColor: theme.colors.brandGreen,
      borderRadius: 10,
      marginBottom: 20,
    },
    // Selection Group Styles
    typeTriggerButton: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: theme.colors.white,
      borderColor: theme.colors.borderLight,
      borderWidth: 1.5,
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 8,
    },
    typeTriggerText: {
      color: theme.colors.textPrimary,
      fontFamily: theme.fontfamily.poppinsRegular,
    },
    bottomSheetItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 16,
      borderBottomWidth: 1.5,
      borderBottomColor: theme.colors.gray100,
      paddingHorizontal: 8,
    },
    bottomSheetItemText: {
      color: theme.colors.textPrimary,
      fontFamily: theme.fontfamily.poppinsRegular,
    },
    bottomSheetItemTextActive: {
      color: theme.colors.brandGreen,
      fontFamily: theme.fontfamily.poppinsSemiBold,
    },
    radioCircle: {
      width: 16,
      height: 16,
      borderRadius: 8,
      borderWidth: 1.5,
      borderColor: theme.colors.gray300,
      justifyContent: 'center',
      alignItems: 'center',
    },
    radioCircleActive: {
      borderColor: theme.colors.brandGreen,
    },
    radioInner: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: theme.colors.brandGreen,
    },
    label: {
      marginBottom: 8,
      color: theme.colors.textPrimary,
      fontFamily: theme.fontfamily.poppinsMedium,
    },
    brandDisplayContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 12,
    },
    brandLogoBox: {
      width: 60,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
    },
    brandDisplayName: {
      color: theme.colors.textPrimary,
      fontFamily: theme.fontfamily.poppinsSemiBold,
    },
    dropdownButton: {
      backgroundColor: theme.colors.white,
      borderColor: theme.colors.borderLight,
      borderWidth: 1.5,
      padding: 10,
      borderRadius: 12,
    },
  });



import { StyleSheet } from 'react-native';
import { AppTheme } from '@theme';

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 40,
    },
    dropdownButton: {
      backgroundColor: theme.colors.white,
      borderColor: theme.colors.borderLight,
      borderWidth: 1.5,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 12,
    },
    brandDisplayContainer: {
      flexDirection: 'row',
      gap: 12,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 10,
      marginBottom: 20,
    },
    brandLogoBox: {
      width: 60,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
    },
    brandInfo: {
      alignItems: 'flex-start',
    },
    brandDisplayName: {
      color: theme.colors.textPrimary,
      fontFamily: theme.fontfamily.poppinsBold,
      fontSize: 18,
    },
    formContainer: {
      backgroundColor: theme.colors.white,
      borderRadius: 16,
      padding: 16,
      borderWidth: 1,
      borderColor: theme.colors.borderLight,
      elevation: 3,
      shadowColor: theme.colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 5,
    },
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
      color: theme.colors.DeepGreen,
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
      borderColor: theme.colors.DeepGreen,
    },
    radioInner: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: theme.colors.DeepGreen,
    },
    submitButton: {
      marginTop: 30,
      backgroundColor: theme.colors.DeepGreen,
      borderRadius: 10,
    },
    label: {
      color: theme.colors.textPrimary,
      fontFamily: theme.fontfamily.poppinsSemiBold,
    },
  });

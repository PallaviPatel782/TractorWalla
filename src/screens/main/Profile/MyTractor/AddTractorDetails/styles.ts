import { StyleSheet } from 'react-native';
import { AppTheme } from '@theme';

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      paddingHorizontal: 20,
      // paddingTop: 20,
      paddingBottom: 80,
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
    },
    button: {
      marginTop: 40,
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
      marginTop: 5,
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
      borderBottomColor: theme.colors.gray300,
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
      color: theme.colors.textPrimary,
      fontFamily: theme.fontfamily.poppinsSemiBold,
    },
    topSection: {
      alignItems: 'center',
      marginBottom: 10
    },
    largeImageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    largeLogo: {
      width: 40,
      height: 33
    },
    brandInfo: {
      alignItems: 'center',
      marginTop: 10
    },
    formCard: {
      backgroundColor: theme.colors.white,
      borderRadius: 20,
      paddingHorizontal: 20,
      paddingVertical: 20,
      borderWidth: 1,
      borderColor: theme.colors.borderFaint,
      // Shadow
      shadowColor: theme.colors.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.05,
      shadowRadius: 10,
      elevation: 3,
      gap: 8,
    },
    footer: {
      paddingHorizontal: 20,
      paddingVertical: 16,
      backgroundColor: theme.colors.background, // Match screen background
      paddingBottom: 30, // Extra space for home indicator
    }
  });

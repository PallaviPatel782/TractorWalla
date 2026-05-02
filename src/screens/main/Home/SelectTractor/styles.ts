import { StyleSheet } from 'react-native';
import { AppTheme } from '@theme';
import { SW, SH } from '@utils/Dimensions';

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      paddingHorizontal: SW(20),
      paddingTop: SH(20),
      paddingBottom: SH(40),
    },
    dropdownButton: {
      backgroundColor: theme.colors.white,
      borderColor: theme.colors.borderLight,
      borderWidth: 1.5,
      paddingHorizontal: SH(10),
      paddingVertical: SH(5),
      borderRadius: SW(12),
    },
    brandDisplayContainer: {
      flexDirection: 'row',
      gap: SW(12),
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: SW(10),
      marginBottom: SH(20),
    },
    brandLogoBox: {
      width: SW(60),
      height: SW(60),
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
      borderRadius: SW(16),
      padding: SW(16),
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
      paddingHorizontal: SW(12),
      paddingVertical: SH(10),
      borderRadius: SW(10),
      marginTop: SH(8),
    },
    typeTriggerText: {
      color: theme.colors.textPrimary,
      fontFamily: theme.fontfamily.poppinsRegular,
    },
    bottomSheetItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: SH(16),
      borderBottomWidth: 1.5,
      borderBottomColor: theme.colors.gray100,
      paddingHorizontal: SW(8),
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
      width: SW(16),
      height: SW(16),
      borderRadius: SW(8),
      borderWidth: 1.5,
      borderColor: theme.colors.gray300,
      justifyContent: 'center',
      alignItems: 'center',
    },
    radioCircleActive: {
      borderColor: theme.colors.DeepGreen,
    },
    radioInner: {
      width: SW(8),
      height: SW(8),
      borderRadius: SW(4),
      backgroundColor: theme.colors.DeepGreen,
    },
    submitButton: {
      marginTop: SH(30),
      backgroundColor: theme.colors.DeepGreen,
      borderRadius: SW(10),
    },
    label: {
      // marginBottom: SH(4),
      color: theme.colors.textPrimary,
      fontFamily: theme.fontfamily.poppinsSemiBold,
    },
  });

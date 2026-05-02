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
      paddingHorizontal: SW(20),
      paddingTop: SH(20),
      paddingBottom: SH(40),
    },
    formContainer: {
      backgroundColor: theme.colors.white,
      borderRadius: SW(16),
      padding: SW(16),
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
      marginTop: SH(40),
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
      marginTop: SH(5),
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
      borderBottomColor: theme.colors.gray300,
      paddingHorizontal: SW(8),
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
      // marginBottom: SH(4),
      color: theme.colors.textPrimary,
      fontFamily: theme.fontfamily.poppinsSemiBold,
    },
    topSection: {
      alignItems: 'center',
      marginBottom: SH(20),
    },
    largeImageContainer: {
      width: SW(90),
      height: SH(90),
      justifyContent: 'center',
      alignItems: 'center',
    },
    largeLogo: {
      width: SW(90),
      height: SH(90)
    },
    brandInfo: {
      alignItems: 'center',
      marginTop: SH(10)
    },
    formCard: {
      backgroundColor: theme.colors.white,
      borderRadius: SW(20),
      paddingHorizontal: SW(20),
      paddingVertical: SH(20),
      borderWidth: 1,
      borderColor: theme.colors.borderFaint,
      // Shadow
      shadowColor: theme.colors.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.05,
      shadowRadius: 10,
      elevation: 3,
      gap: SH(8),
    },
    footer: {
      position: 'absolute',
      bottom: SH(30),
      left: SW(20),
      right: SW(20),
    }
  });

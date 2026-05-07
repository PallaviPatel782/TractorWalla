import { StyleSheet } from 'react-native';
import { AppTheme } from '@theme';

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    headerContainer: {
      backgroundColor: theme.colors.backgroundExtraLight,
    },
    content: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    sectionTitle: {
      marginBottom: 16,
      color: theme.colors.textPrimary,
      fontFamily: theme.fontfamily.poppinsSemiBold,
    },
    listContent: {
      paddingBottom: 20,
    },
    addressCard: {
      backgroundColor: theme.colors.white,
      borderRadius: 12,
      padding: 16,
      marginBottom: 10,
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: theme.colors.borderLight,
      elevation: 2,
      shadowColor: theme.colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      marginHorizontal: 1
    },
    addressCardSelected: {
      borderColor: theme.colors.gray900,
      borderWidth: 1.5,
    },
    radioContainer: {
      marginRight: 12,
      marginTop: 4,
    },
    radioOuter: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: theme.colors.gray300,
      alignItems: 'center',
      justifyContent: 'center',
    },
    radioOuterSelected: {
      borderColor: theme.colors.gray900,
    },
    radioInner: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: theme.colors.gray900,
    },
    addressInfo: {
      flex: 1,
    },
    labelRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
    },
    addressLabel: {
      fontFamily: theme.fontfamily.poppinsRegular,
      color: theme.colors.gray500,
      fontSize: 13
    },
    addressText: {
      lineHeight: 18,
      color: theme.colors.gray900,
      marginBottom: 12,
    },
    actionRow: {
      flexDirection: 'row',
      gap: 12,
    },
    actionButton: {
      paddingHorizontal: 16,
      paddingVertical: 6,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.colors.borderLight,
      backgroundColor: theme.colors.white,
    },
    actionText: {
      fontFamily: theme.fontfamily.poppinsMedium,
      color: theme.colors.gray900,
    },
    footerContainer: {
      paddingHorizontal: 20,
      paddingTop: 10,
      backgroundColor: theme.colors.background,
      borderTopWidth: 0,
    },
    addNewFooter: {
      backgroundColor: theme.colors.brandGreen,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      gap: 10,
      borderRadius: 12,
      paddingHorizontal: 20,
      // marginBottom: 10,
    },
    footerText: {
      color: theme.colors.white,
      fontFamily: theme.fontfamily.poppinsSemiBold,
    },
    defaultBadge: {
      marginLeft: 8,
      backgroundColor: theme.colors.DeepGreen,
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 10,
    },
    defaultBadgeText: {
      color: theme.colors.white,
    },
    confirmButton: {
      backgroundColor: theme.colors.DeepGreen,
      borderRadius: 12,
      paddingVertical: 14,
      alignItems: 'center',
      elevation: 4,
      shadowColor: theme.colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      marginBottom: 12,
    },
    confirmFooterText: {
      color: theme.colors.white,
      fontFamily: theme.fontfamily.poppinsSemiBold,
    },
  });

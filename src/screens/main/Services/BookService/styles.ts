import { StyleSheet } from 'react-native';
import { AppTheme } from '@theme';

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      backgroundColor: theme.colors.DeepGreen,
      paddingBottom: 15,
    },
    searchContainer: {
      paddingHorizontal: 16,
      marginTop: 10,
    },
    tabsContainer: {
      flexDirection: 'row',
      paddingHorizontal: 16,
      marginBottom: 5,
      backgroundColor: theme.colors.YellowLight,
      paddingVertical: 10,
    },
    tabPill: {
      paddingHorizontal: 16,
      paddingVertical: 5,
      borderRadius: 10,
      backgroundColor: theme.colors.white,
      borderWidth: 1,
      borderColor: theme.colors.border,
      marginRight: 10,
    },
    tabPillActive: {
      backgroundColor: theme.colors.DeepGreen,
      borderColor: theme.colors.DeepGreen,
    },
    tabText: {
      fontSize: 14,
      fontFamily: theme.fontfamily.poppinsMedium,
      color: theme.colors.textSecondary,
    },
    tabTextActive: {
      color: theme.colors.white,
    },
    sectionTitle: {
      fontSize: 14,
      fontFamily: theme.fontfamily.poppinsBold,
      color: theme.colors.danger,
      marginBottom: 15,
      paddingHorizontal: 16,
    },
    modalContainer: {
      backgroundColor: theme.colors.white,
      padding: 20,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      position: 'relative',
    },
    modalCloseBtn: {
      position: 'absolute',
      top: 20,
      right: 20,
      zIndex: 10,
    },
    modalHeaderTitle: {
      fontSize: 18,
      fontFamily: theme.fontfamily.poppinsBold,
      color: theme.colors.DeepGreen,
      marginTop: 5,
      marginBottom: 10,
    },
    modalMsg: {
      fontSize: 14,
      fontFamily: theme.fontfamily.poppinsRegular,
      color: theme.colors.textSecondary,
      lineHeight: 20,
      marginBottom: 25,
    },
    modalImageWrapper: {
      alignItems: 'center',
      marginBottom: 30,
    },
  });

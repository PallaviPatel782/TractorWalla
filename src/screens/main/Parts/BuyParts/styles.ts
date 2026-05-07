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
      paddingBottom: 15
    },
    searchContainer: {
      paddingHorizontal: 16,
      marginTop: 10,
      borderRadius: 50
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
    sectionHeader: {
      paddingHorizontal: 16,
      paddingVertical: 15,
    },
    sectionTitle: {
      fontSize: 15,
      fontFamily: theme.fontfamily.poppinsMedium,
      color: theme.colors.danger, // Red from SS
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
      fontSize: 16,
      fontFamily: theme.fontfamily.poppinsMedium,
      color: theme.colors.successDeep,
      marginTop: 5,
      marginBottom: 20,
    },
    modalMsg: {
      fontSize: 15,
      fontFamily: theme.fontfamily.poppinsMedium,
      color: theme.colors.textPrimary,
      marginBottom: 20,
    },
    modalImageWrapper: {
      borderRadius: 8,
      padding: 10,
      alignItems: 'center',
      marginBottom: 30,
    },
  });

import { StyleSheet } from 'react-native';
import { AppTheme } from '@theme';

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flex: 1,
      paddingHorizontal: 24,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyContainer: {
      alignItems: 'center',
      textAlign: 'center',
    },
    iconWrapper: {
      marginBottom: 32,
    },
    locationCircle: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: theme.colors.danger,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    closeBadge: {
      position: 'absolute',
      right: 5,
      top: 5,
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: theme.colors.gray500,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: theme.colors.white,
    },
    title: {
      fontSize: 22,
      fontWeight: '700',
      color: theme.colors.text,
      textAlign: 'center',
      lineHeight: 28,
      marginBottom: 16,
    },
    description: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      lineHeight: 20,
    },
    footer: {
      padding: 20,
    },
    voteButton: {
      backgroundColor: theme.colors.successDeep,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: theme.colors.overlay,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 24,
    },
    popupCard: {
      backgroundColor: theme.colors.white,
      borderRadius: 20,
      padding: 24,
      alignItems: 'center',
      width: '100%',
    },
    successIconWrapper: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: theme.colors.greenBtn,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
    popupTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: theme.colors.text,
      marginBottom: 10,
    },
    popupDesc: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      marginBottom: 20,
    },
    popupFooter: {
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      paddingTop: 15,
      width: '100%',
    },
    popupFooterText: {
      fontSize: 12,
      color: theme.colors.textSecondary,
      textAlign: 'center',
    },
  });

import { StyleSheet } from 'react-native';
import { AppTheme } from '@theme';

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 16,
      justifyContent: 'space-between',
    },
    headerTitle: {
      flex: 1,
      textAlign: 'center',
      marginRight: 24,
    },
    content: {
      flex: 1,
      paddingHorizontal: 16,
    },
    listContent: {
      paddingBottom: 100,
      paddingTop: 10,
    },
    emptyContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 100,
    },
    emptyText: {
      marginTop: 16,
      textAlign: 'center',
      paddingHorizontal: 40,
    },
    footer: {
      position: 'absolute',
      bottom: 30,
      left: 16,
      right: 16,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: theme.colors.overlay,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    modalContent: {
      backgroundColor: theme.colors.white,
      borderRadius: 16,
      padding: 24,
      width: '100%',
    },
    modalTitle: {
      marginBottom: 8,
      textAlign: 'center',
    },
    modalSubtitle: {
      marginBottom: 24,
      textAlign: 'center',
      lineHeight: 20,
    },
    modalButtons: {
      flexDirection: 'row',
      gap: 12,
    },
    cancelButton: {
      flex: 1,
      paddingVertical: 5,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.colors.gray300,
      alignItems: 'center',
      fontFamily: theme.fontfamily.poppinsRegular
    },
    deleteButton: {
      flex: 1,
      paddingVertical: 5,
      borderRadius: 8,
      backgroundColor: theme.colors.danger,
      alignItems: 'center',
      fontFamily: theme.fontfamily.poppinsRegular
    },
  });

import { StyleSheet } from 'react-native';
import { AppTheme } from '@theme';
import { SW, SH, SF } from '@utils/Dimensions';

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: SW(16),
      paddingVertical: SH(16),
      justifyContent: 'space-between',
    },
    headerTitle: {
      flex: 1,
      textAlign: 'center',
      marginRight: SW(24),
    },
    content: {
      flex: 1,
      paddingHorizontal: SW(16),
    },
    listContent: {
      paddingBottom: SH(100),
      paddingTop: SH(10),
    },
    emptyContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: SH(100),
    },
    emptyText: {
      marginTop: SH(16),
      textAlign: 'center',
      paddingHorizontal: SW(40),
    },
    footer: {
      position: 'absolute',
      bottom: SH(30),
      left: SW(16),
      right: SW(16),
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: theme.colors.overlay,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: SW(20),
    },
    modalContent: {
      backgroundColor: theme.colors.white,
      borderRadius: SW(16),
      padding: SW(24),
      width: '100%',
    },
    modalTitle: {
      marginBottom: SH(8),
      textAlign: 'center',
    },
    modalSubtitle: {
      marginBottom: SH(24),
      textAlign: 'center',
      lineHeight: SH(20),
    },
    modalButtons: {
      flexDirection: 'row',
      gap: SW(12),
    },
    cancelButton: {
      flex: 1,
      paddingVertical: SH(5),
      borderRadius: SW(8),
      borderWidth: 1,
      borderColor: theme.colors.gray300,
      alignItems: 'center',
      fontFamily: theme.fontfamily.poppinsRegular
    },
    deleteButton: {
      flex: 1,
      paddingVertical: SH(5),
      borderRadius: SW(8),
      backgroundColor: theme.colors.danger,
      alignItems: 'center',
      fontFamily: theme.fontfamily.poppinsRegular
    },
  });

import { StyleSheet } from 'react-native';
import { AppTheme } from '@theme';
import { SW, SH, SF } from '@utils/Dimensions';

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flex: 1,
      paddingHorizontal: SW(24),
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyContainer: {
      alignItems: 'center',
      textAlign: 'center',
    },
    iconWrapper: {
      marginBottom: SH(32),
    },
    locationCircle: {
      width: SW(100),
      height: SW(100),
      borderRadius: SW(50),
      backgroundColor: '#CF2C3E',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    closeBadge: {
      position: 'absolute',
      right: SW(5),
      top: SW(5),
      width: SW(24),
      height: SW(24),
      borderRadius: SW(12),
      backgroundColor: '#8C8C8C',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: theme.colors.white,
    },
    title: {
      fontSize: SF(22),
      fontWeight: '700',
      color: theme.colors.text,
      textAlign: 'center',
      lineHeight: SH(28),
      marginBottom: SH(16),
    },
    description: {
      fontSize: SF(14),
      color: theme.colors.textSecondary,
      textAlign: 'center',
      lineHeight: SH(20),
    },
    footer: {
      padding: SW(20),
    },
    voteButton: {
      backgroundColor: '#1E633F',
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: SW(24),
    },
    popupCard: {
      backgroundColor: theme.colors.white,
      borderRadius: SW(20),
      padding: SW(24),
      alignItems: 'center',
      width: '100%',
    },
    successIconWrapper: {
      width: SW(80),
      height: SW(80),
      borderRadius: SW(40),
      backgroundColor: '#41A863',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: SH(20),
    },
    popupTitle: {
      fontSize: SF(20),
      fontWeight: '700',
      color: theme.colors.text,
      marginBottom: SH(10),
    },
    popupDesc: {
      fontSize: SF(14),
      color: theme.colors.textSecondary,
      textAlign: 'center',
      marginBottom: SH(20),
    },
    popupFooter: {
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      paddingTop: SH(15),
      width: '100%',
    },
    popupFooterText: {
      fontSize: SF(12),
      color: theme.colors.textSecondary,
      textAlign: 'center',
    },
  });

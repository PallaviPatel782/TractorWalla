import { StyleSheet } from 'react-native';
import { AppTheme } from '@theme';
import { SW, SH, SF } from '@utils/Dimensions';

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'transparent',
    },
    content: {
      paddingBottom: SH(40),
    },
    profileBanner: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: SH(100),
      backgroundColor: theme.colors.DeepGreen, // Very light brand green
      borderBottomLeftRadius: SW(50),
      borderBottomRightRadius: SW(50),
    },
    avatarSection: {
      alignItems: 'center',
      marginTop: SH(20),
      marginBottom: SH(20),
      zIndex: 1,
    },
    avatarWrapper: {
      position: 'relative',
      padding: SW(4),
      backgroundColor: theme.colors.white,
      borderRadius: SW(55),
      elevation: 10,
      shadowColor: theme.colors.black,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.15,
      shadowRadius: 15,
    },
    avatarImage: {
      width: SW(100),
      height: SW(100),
      borderRadius: SW(50),
      backgroundColor: theme.colors.gray50,
    },
    editBadge: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: SW(32),
      height: SW(32),
      borderRadius: SW(16),
      backgroundColor: theme.colors.DeepGreen,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: theme.colors.white,
      elevation: 4,
    },
    formCard: {
      backgroundColor: theme.colors.white, // Glassy look
      borderRadius: SW(20),
      paddingHorizontal: SW(16),
      elevation: 3,
      shadowColor: theme.colors.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.06,
      shadowRadius: 10,
      borderWidth: 1.5,
      borderColor: theme.colors.white,
      marginBottom: SH(20),
      marginHorizontal: SW(16),
      zIndex: 2,
      paddingVertical: SH(20)
    },
    inputField: {
      paddingVertical: SH(18),
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.gray50,
    },
    inputLabel: {
      color: theme.colors.gray500,
      fontSize: SF(12),
      fontFamily: theme.fontfamily.poppinsMedium,
      marginBottom: SH(6),
    },
    input: {
      color: theme.colors.textPrimary,
      fontSize: SF(15),
      fontFamily: theme.fontfamily.poppinsRegular,
      padding: 0,
      height: SH(24),
    },
    footer: {
      padding: SW(20),
      backgroundColor: 'transparent',
      gap: SH(15),
      paddingBottom: SH(30),
    },
    saveButton: {
      backgroundColor: theme.colors.DeepGreen,
      borderRadius: SW(12),
      height: SH(54),
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 3,
      shadowColor: theme.colors.DeepGreen,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
    },
    saveButtonText: {
      color: theme.colors.white,
      fontFamily: theme.fontfamily.poppinsMedium,
      fontSize: SF(16),
      letterSpacing: 0.5,
    },
    deleteButton: {
      height: SH(54),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.brandRedLight,
      borderRadius: SW(12),
      borderWidth: 1.5,
      borderColor: theme.colors.error,
    },
    deleteButtonText: {
      color: theme.colors.error,
      fontFamily: theme.fontfamily.poppinsMedium,
      fontSize: SF(14),
    },
    // Modal Styles
    modalContent: {
      padding: SW(20),
      alignItems: 'center',
    },
    modalIcon: {
      width: SW(50),
      height: SW(50),
      borderRadius: SW(25),
      backgroundColor: theme.colors.brandRedLight,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: SH(16),
    },
    modalTitle: {
      marginBottom: SH(8),
      textAlign: 'center',
    },
    modalDesc: {
      marginBottom: SH(24),
      textAlign: 'center',
      lineHeight: SH(20),
    },
    modalActions: {
      width: '100%',
      gap: SH(12),
    },
    confirmDeleteBtn: {
      backgroundColor: theme.colors.error,
      height: SH(48),
      borderRadius: SW(10),
      justifyContent: 'center',
      alignItems: 'center',
    },
    cancelBtn: {
      backgroundColor: theme.colors.gray50,
      height: SH(48),
      borderRadius: SW(10),
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

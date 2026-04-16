import { StyleSheet } from 'react-native';
import { AppTheme } from '@theme';
import { SW, SH, SF } from '@utils/Dimensions';

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flexGrow: 1,
      paddingHorizontal: SW(20),
      paddingTop: SH(20),
    },
    formContainer: {
      gap: SH(16),
      marginBottom: SH(24),
    },
    photoSection: {
      marginTop: SH(8),
    },
    addPhotoLabelContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: SW(8),
      marginBottom: SH(12),
    },
    addPhotoLabel: {
      color: theme.colors.gray900,
      fontFamily: theme.fontfamily.poppinsMedium,
      fontSize: SF(14),
    },
    photoBox: {
      width: SW(60),
      height: SW(60),
      borderRadius: SW(8),
      overflow: 'hidden',
      position: 'relative',
      borderWidth: 1,
      borderColor: theme.colors.gray200,
    },
    photoImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    removePhotoButton: {
      position: 'absolute',
      top: -SH(6),
      right: -SW(6),
      backgroundColor: theme.colors.white,
      borderRadius: SW(10),
      padding: SW(2),
    },
    supportContainer: {
      alignItems: 'center',
      marginBottom: SH(20),
    },
    supportText: {
      color: theme.colors.gray600,
      fontFamily: theme.fontfamily.poppinsRegular,
      fontSize: SF(12),
      marginBottom: SH(4),
    },
    supportEmailContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: SW(6),
    },
    supportEmailText: {
      color: theme.colors.brandGreen,
      fontFamily: theme.fontfamily.poppinsMedium,
      fontSize: SF(12),
    },
    bottomContainer: {
      paddingHorizontal: SW(20),
      paddingBottom: SH(30),
    },
  });

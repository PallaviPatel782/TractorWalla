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
      // paddingTop: SH(20),
    },
    formContainer: {
      gap: SH(16),
      // marginBottom: SH(24),
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
      fontFamily: theme.fontfamily.robotoMedium,
      fontSize: SF(14),
    },
    photoBox: {
      width: SW(72),
      height: SW(72),
      borderRadius: SW(10),
      position: 'relative',
      borderWidth: 1,
      borderColor: theme.colors.gray200,
      marginRight: SW(10),
    },
    photoImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
      borderRadius: SW(10),
    },
    removePhotoButton: {
      position: 'absolute',
      top: -SH(8),
      right: -SW(8),
      backgroundColor: theme.colors.gray700,
      borderRadius: SW(12),
      width: SW(20),
      height: SW(20),
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10,
    },
    photosRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: SW(10),
      marginTop: SH(8),
    },
    supportContainer: {
      alignItems: 'center',
      marginBottom: SH(20),
    },
    supportText: {
      color: theme.colors.gray600,
      fontFamily: theme.fontfamily.robotoRegular,
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
      fontFamily: theme.fontfamily.robotoMedium,
      fontSize: SF(12),
    },
    bottomContainer: {
      paddingHorizontal: SW(20),
      paddingBottom: SH(30),
    },
    dropdownButton: {
      backgroundColor: theme.colors.white,
      borderColor: theme.colors.borderLight,
      borderWidth: 1.5,
      paddingVertical: SH(10),
      borderRadius: SW(12),
    },
  });

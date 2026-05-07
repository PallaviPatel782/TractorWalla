import { StyleSheet } from 'react-native';
import { AppTheme } from '@theme';

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flexGrow: 1,
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 40,
    },
    formContainer: {
      gap: 16,
    },
    photoSection: {
      marginTop: 8,
    },
    addPhotoLabelContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginBottom: 12,
    },
    addPhotoLabel: {
      color: theme.colors.gray900,
      fontFamily: theme.fontfamily.poppinsMedium,
      fontSize: 14,
    },
    photoBox: {
      width: 72,
      height: 72,
      borderRadius: 10,
      position: 'relative',
      borderWidth: 1,
      borderColor: theme.colors.gray200,
      marginRight: 10,
    },
    photoImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
      borderRadius: 10,
    },
    removePhotoButton: {
      position: 'absolute',
      top: -8,
      right: -8,
      backgroundColor: theme.colors.gray700,
      borderRadius: 12,
      width: 20,
      height: 20,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10,
    },
    photosRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
      marginTop: 8,
    },
    supportContainer: {
      alignItems: 'center',
      marginBottom: 20,
    },
    supportText: {
      color: theme.colors.gray600,
      fontFamily: theme.fontfamily.poppinsRegular,
      fontSize: 12,
      marginBottom: 4,
    },
    supportEmailContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    supportEmailText: {
      color: theme.colors.brandGreen,
      fontFamily: theme.fontfamily.poppinsMedium,
      fontSize: 12,
    },
    bottomContainer: {
      paddingHorizontal: 20,
      paddingBottom: 30,
    },
    dropdownButton: {
      backgroundColor: theme.colors.white,
      borderColor: theme.colors.borderLight,
      borderWidth: 1.5,
      paddingVertical: 10,
      borderRadius: 12,
    },
  });

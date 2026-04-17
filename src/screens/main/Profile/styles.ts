import { StyleSheet } from 'react-native';
import { AppTheme } from '@theme';
import { SW, SH } from '@utils/Dimensions';

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    profileSection: {
      alignItems: 'center',
      marginTop: SH(20),
      marginBottom: SH(24),
    },
    imageContainer: {
      width: SW(100),
      height: SW(100),
      borderRadius: SW(50),
      position: 'relative',
      borderWidth: 2,
      borderColor: theme.colors.borderExtraLight,
      padding: SW(2),
    },
    profileImage: {
      width: '100%',
      height: '100%',
      borderRadius: SW(50),
    },
    editButton: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      backgroundColor: theme.colors.primary,
      width: SW(28),
      height: SW(28),
      borderRadius: SW(14),
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: theme.colors.background,
    },
    userInfo: {
      alignItems: 'center',
      marginTop: SH(12),
    },
    userName: {
      fontFamily: theme.fontfamily.robotoSemiBold,
    },
    userEmail: {
      marginVertical: SH(2),
      fontFamily: theme.fontfamily.robotoRegular,
    },
    sectionContainer: {
      marginBottom: SH(16),
      marginHorizontal: SW(16),
      borderRadius: SW(12),
      backgroundColor: theme.colors.background,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: theme.colors.borderFaint,
    },
    sectionTitle: {
      paddingHorizontal: SW(16),
      paddingVertical: SH(12),
      backgroundColor: theme.colors.backgroundFaint,
      borderLeftWidth: 3,
      borderLeftColor: theme.colors.primary,
    },
    socialSection: {
      marginTop: SH(20),
      paddingHorizontal: SW(16),
      paddingBottom: SH(40),
    },
    socialTitle: {
      marginBottom: SH(16),
    },
    socialIconsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    socialItem: {
      alignItems: 'center',
      gap: SH(6),
    },
    socialIconWrapper: {
      width: SW(48),
      height: SW(48),
      borderRadius: SW(12),
      backgroundColor: theme.colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
    },
    myTractorButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginHorizontal: SW(16),
      marginBottom: SH(16),
      paddingHorizontal: SW(16),
      paddingVertical: SH(5),
      borderRadius: SW(12),
      borderBottomWidth: 2,
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.white,
    },
    myTractorLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: SW(12),
    },
    tractorIconContainer: {
      width: SW(40),
      height: SW(40),
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

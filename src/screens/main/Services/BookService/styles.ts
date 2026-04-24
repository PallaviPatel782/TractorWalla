import { StyleSheet } from 'react-native';
import { SW, SH, SF } from '@utils/Dimensions';
import { AppTheme } from '@theme';

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      backgroundColor: theme.colors.DeepGreen,
      paddingBottom: SH(15),
    },
    searchContainer: {
      paddingHorizontal: SW(16),
      marginTop: SH(10),
    },
    tabsContainer: {
      flexDirection: 'row',
      paddingHorizontal: SW(16),
      marginBottom: SH(5),
      backgroundColor: theme.colors.YellowLight,
      paddingVertical: SH(10),
    },
    tabPill: {
      paddingHorizontal: SW(16),
      paddingVertical: SH(5),
      borderRadius: SW(10),
      backgroundColor: theme.colors.white,
      borderWidth: 1,
      borderColor: theme.colors.border,
      marginRight: SW(10),
    },
    tabPillActive: {
      backgroundColor: theme.colors.DeepGreen,
      borderColor: theme.colors.DeepGreen,
    },
    tabText: {
      fontSize: SF(13),
      fontFamily: theme.fontfamily.robotoMedium,
      color: theme.colors.textSecondary,
    },
    tabTextActive: {
      color: theme.colors.white,
    },
    listContent: {
      // paddingHorizontal: SW(16),
      paddingTop: SH(15),
      paddingBottom: SH(40),
    },
    sectionTitle: {
      fontSize: SF(14),
      fontFamily: theme.fontfamily.robotoBold,
      color: theme.colors.danger,
      marginBottom: SH(15),
      // marginTop: SH(5),
      paddingHorizontal: SW(16),
    },
    // Modal Styles (copied from BuyParts for consistency)
    modalContainer: {
      backgroundColor: theme.colors.white,
      padding: SW(20),
      borderTopLeftRadius: SW(24),
      borderTopRightRadius: SW(24),
      position: 'relative',
    },
    modalCloseBtn: {
      position: 'absolute',
      top: SH(20),
      right: SW(20),
      zIndex: 10,
    },
    modalHeaderTitle: {
      fontSize: SF(18),
      fontFamily: theme.fontfamily.robotoBold,
      color: theme.colors.DeepGreen,
      marginTop: SH(5),
      marginBottom: SH(10),
    },
    modalMsg: {
      fontSize: SF(14),
      fontFamily: theme.fontfamily.robotoRegular,
      color: theme.colors.textSecondary,
      lineHeight: SH(20),
      marginBottom: SH(25),
    },
    modalImageWrapper: {
      alignItems: 'center',
      marginBottom: SH(30),
    },
  });

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
      paddingBottom: SH(15)
    },
    searchContainer: {
      paddingHorizontal: SW(16),
      marginTop: SH(10),
      borderRadius: SW(50)
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
      paddingBottom: SH(40),
    },
    sectionHeader: {
      paddingHorizontal: SW(16),
      paddingVertical: SH(15),
    },
    sectionTitle: {
      fontSize: SF(14),
      fontFamily: theme.fontfamily.robotoBold,
      color: theme.colors.danger, // Red from SS
    },
    kitCard: {
      flexDirection: 'row',
      backgroundColor: theme.colors.white,
      // marginHorizontal: SW(16),
      marginBottom: SH(10),
      borderRadius: SW(12),
      padding: SW(12),
      borderWidth: 1,
      borderColor: theme.colors.borderFaint,
    },
    kitLeft: {
      flex: 1,
      paddingRight: SW(10),
      marginLeft: SW(10)
    },
    kitTitle: {
      fontSize: SF(15),
      fontFamily: theme.fontfamily.robotoBold,
      color: theme.colors.textPrimary,
      marginBottom: SH(8),
    },
    bulletRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: SH(4),
    },
    bulletText: {
      fontSize: SF(12),
      fontFamily: theme.fontfamily.robotoRegular,
      color: theme.colors.textSecondary,
      flex: 1,
      marginLeft: SW(10)
    },
    kitFooter: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: SH(10),
    },
    ratingText: {
      fontSize: SF(12),
      fontFamily: theme.fontfamily.robotoBold,
      color: theme.colors.GoldenYellow,
      marginRight: SW(8),
    },
    price: {
      fontSize: SF(15),
      fontFamily: theme.fontfamily.robotoBold,
      color: theme.colors.textPrimary,
    },
    mrp: {
      fontSize: SF(12),
      fontFamily: theme.fontfamily.robotoRegular,
      color: theme.colors.textMuted,
      textDecorationLine: 'line-through',
      marginLeft: SW(6),
    },
    kitRight: {
      alignItems: 'center',
    },
    kitImage: {
      width: SW(100),
      height: SW(90),
      borderRadius: SW(8),
      marginBottom: SH(8),
    },
    purchaseBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(30, 99, 63, 0.1)', // Light green bg
      paddingHorizontal: SW(12),
      paddingVertical: SH(6),
      borderRadius: SW(15),
      borderWidth: 1,
      borderColor: theme.colors.successDeep,
    },
    purchaseText: {
      fontSize: SF(11),
      fontFamily: theme.fontfamily.robotoBold,
      color: theme.colors.successDeep,
    },
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
      fontSize: SF(16),
      fontFamily: theme.fontfamily.robotoBold,
      color: theme.colors.successDeep,
      marginTop: SH(5),
      marginBottom: SH(20),
    },
    modalMsg: {
      fontSize: SF(15),
      fontFamily: theme.fontfamily.robotoMedium,
      color: theme.colors.textPrimary,
      marginBottom: SH(20),
    },
    modalImageWrapper: {
      borderRadius: SW(8),
      padding: SW(10),
      alignItems: 'center',
      marginBottom: SH(30),
    },
  });

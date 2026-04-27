import { StyleSheet } from 'react-native';
import { SW, SH, SF } from '@utils/Dimensions';
import { AppTheme } from '@theme';

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollContent: {
      paddingBottom: SH(100),
    },
    heroSection: {
      height: SH(280),
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.white,
    },
    headerRow: {
      position: 'absolute',
      top: SH(20),
      left: SW(16),
      right: SW(16),
      flexDirection: 'row',
      justifyContent: 'space-between',
      zIndex: 10,
    },
    iconCircle: {
      width: SW(36),
      height: SW(36),
      borderRadius: SW(18),
      backgroundColor: theme.colors.white,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: theme.colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      elevation: 3,
    },
    heroImage: {
      resizeMode: 'contain',
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: SH(15),
    },
    contentCard: {
      backgroundColor: theme.colors.white,
      marginTop: SH(-30),
      marginHorizontal: SW(10),
      borderRadius: SW(20),
      paddingHorizontal: SW(20),
      paddingVertical: SH(15),
      shadowColor: theme.colors.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      elevation: 5,
    },
    budgeSection: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: SH(5)
    },
    badgePill: {
      backgroundColor: theme.colors.DeepGreen,
      paddingHorizontal: SW(10),
      paddingVertical: SH(4),
      borderRadius: SW(6),
    },
    badgeText: {
      fontSize: SF(11),
      fontFamily: theme.fontfamily.robotoBold,
      color: theme.colors.white,
      textTransform: 'uppercase',
    },
    title: {
      fontSize: SF(20),
      fontFamily: theme.fontfamily.robotoBold,
      color: theme.colors.textPrimary,
      marginBottom: SH(10),
    },
    ratingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: SH(15),
    },
    ratingText: {
      fontSize: SF(14),
      fontFamily: theme.fontfamily.robotoBold,
      color: theme.colors.textPrimary,
      marginLeft: SW(4),
    },
    priceRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: SH(20),
    },
    price: {
      fontSize: SF(22),
      fontFamily: theme.fontfamily.robotoBold,
      color: theme.colors.textPrimary,
    },
    mrp: {
      fontSize: SF(14),
      fontFamily: theme.fontfamily.robotoRegular,
      color: theme.colors.textMuted,
      textDecorationLine: 'line-through',
      marginLeft: SW(10),
    },
    highlights: {

      borderRadius: SW(12),
      paddingBottom: SH(15),

    },
    highlightItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: SH(8),
    },
    highlightText: {
      fontSize: SF(12),
      fontFamily: theme.fontfamily.robotoMedium,
      color: theme.colors.textPrimary,
      marginLeft: SW(10),
    },
    sectionHeading: {
      fontSize: SF(16),
      fontFamily: theme.fontfamily.robotoBold,
      color: theme.colors.textPrimary,
      marginBottom: SH(15),
      marginHorizontal: SW(12)
    },
    includesGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    detailBulletRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      width: '48%',
      marginBottom: SH(20),
      paddingRight: SW(4),
    },
    detailBulletText: {
      fontSize: SF(11),
      fontFamily: theme.fontfamily.robotoMedium,
      color: theme.colors.gray600,
      flex: 1,
      marginLeft: SW(10),
    },
    otherServicesSection: {
      marginTop: SH(10),
      marginBottom: SH(20)
    },
    footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: theme.colors.white,
      paddingHorizontal: SW(20),
      paddingVertical: SH(15),
      borderTopWidth: 1,
      borderTopColor: theme.colors.borderFaint,
    },
  });

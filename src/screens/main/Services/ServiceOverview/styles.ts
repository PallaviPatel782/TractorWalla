import { StyleSheet } from 'react-native';
import { SW, SH, SF } from '@utils/Dimensions';
import { AppTheme } from '@theme';

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background || '#F8F9FB',
    },
    scrollContent: {
      paddingBottom: SH(100),
    },
    heroSection: {
      height: SH(280),
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#042C21',
    },
    headerRow: {
      position: 'absolute',
      top: SH(50),
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
      shadowColor: '#000',
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
      borderTopLeftRadius: SW(30),
      borderTopRightRadius: SW(30),
      marginTop: SH(-30),
      padding: SW(20),
      minHeight: SH(500),
    },
    budgeSection: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: SH(5)
    },
    badgePill: {
      backgroundColor: '#FEF3F2',
      paddingHorizontal: SW(10),
      paddingVertical: SH(4),
      borderRadius: SW(4),
      alignSelf: 'flex-start',
    },
    badgeText: {
      fontSize: SF(10),
      fontFamily: theme.fontfamily.robotoBold,
      color: theme.colors.danger || '#D11C3D',
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
      backgroundColor: theme.colors.backgroundExtraLight || '#FAF5F0',
      borderRadius: SW(12),
      padding: SW(15),
      marginBottom: SH(25),
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
    },
    includesGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginBottom: SH(25),
    },
    detailBulletRow: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '48%',
      marginBottom: SH(10),
    },
    detailBulletText: {
      fontSize: SF(12),
      fontFamily: theme.fontfamily.robotoRegular,
      color: theme.colors.textSecondary,
      marginLeft: SW(8),
    },
    otherServicesSection: {
      marginTop: SH(10),
      marginBottom: SH(20),
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

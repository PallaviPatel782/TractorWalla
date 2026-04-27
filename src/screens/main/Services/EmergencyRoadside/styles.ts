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
      height: SH(240),
      width: '100%',
      position: 'relative',
      backgroundColor: theme.colors.background,
      overflow: 'hidden',
    },
    heroImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
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
      width: SW(32),
      height: SW(32),
      borderRadius: SW(16),
      backgroundColor: 'rgba(0,0,0,0.3)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    contentCard: {
      backgroundColor: theme.colors.white,
      marginTop: SH(-40),
      marginHorizontal: SW(16),
      borderRadius: SW(24),
      paddingHorizontal: SW(20),
      paddingVertical: SH(15),
      shadowColor: theme.colors.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      elevation: 5,
    },
    otherServicesSection: {
      marginTop: SH(10),
      marginBottom: SH(20),
      paddingHorizontal: SW(16),
    },
    budgeSection: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: SH(5)
    },
    priorityBadge: {
      backgroundColor: theme.colors.danger,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: SW(12),
      paddingVertical: SH(4),
      borderRadius: SW(100),
      gap: SW(6),
    },
    priorityText: {
      fontSize: SF(12),
      fontFamily: theme.fontfamily.robotoBold,
      color: theme.colors.white,
    },
    ratingText: {
      fontSize: SF(14),
      fontFamily: theme.fontfamily.robotoBold,
      color: theme.colors.textPrimary,
      marginLeft: SW(4),
    },

    title: {
      fontSize: SF(13),
      fontFamily: theme.fontfamily.robotoRegular,
      color: theme.colors.textPrimary,
      marginBottom: SH(15),
    },
    highlights: {
      marginBottom: SH(10),
    },
    highlightItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: SH(3),
    },
    highlightIconWrap: {
      width: SW(24),
      alignItems: 'center',
    },
    highlightText: {
      fontSize: SF(14),
      fontFamily: theme.fontfamily.robotoRegular,
      color: theme.colors.textSecondary,
      marginLeft: SW(10),
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
    bulletRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      width: '48%',
      paddingRight: SW(4),
    },
    bulletText: {
      fontSize: SF(11),
      fontFamily: theme.fontfamily.robotoMedium,
      color: theme.colors.gray600,
      flex: 1,
      marginLeft: SW(10),
    },
    warrantySection: {
      marginTop: SH(20),
      paddingTop: SH(20),
      borderTopWidth: 1,
      borderTopColor: theme.colors.gray100,
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

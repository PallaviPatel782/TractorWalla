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
      height: SH(320),
      width: '100%',
      position: 'relative',
    },
    heroImage: {
      width: '100%',
      height: "100%",
      resizeMode: "cover"
    },
    heroOverlay: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.6)',
      padding: SW(20),
      paddingBottom: SH(40),
      alignItems: 'center',
    },
    instantBadge: {
      backgroundColor: theme.colors.primary,
      paddingHorizontal: SW(12),
      paddingVertical: SH(6),
      borderRadius: SW(4),
      marginBottom: SH(15),
    },
    instantBadgeText: {
      fontSize: SF(13),
      fontFamily: theme.fontfamily.robotoBold,
      color: theme.colors.white,
    },
    heroBullets: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    heroBulletItem: {
      fontSize: SF(13),
      fontFamily: theme.fontfamily.robotoMedium,
      color: theme.colors.white,
      marginHorizontal: SW(5),
      marginBottom: SH(5),
    },
    backBtn: {
      position: 'absolute',
      top: SH(60),
      left: SW(20),
      backgroundColor: 'rgba(255,255,255,0.8)',
      padding: SW(8),
      borderRadius: SW(20),
      zIndex: 10,
    },
    shareBtn: {
      position: 'absolute',
      top: SH(60),
      right: SW(20),
      backgroundColor: 'rgba(255,255,255,0.8)',
      padding: SW(8),
      borderRadius: SW(20),
      zIndex: 10,
    },
    contentCard: {
      backgroundColor: theme.colors.white,
      borderTopLeftRadius: SW(24),
      borderTopRightRadius: SW(24),
      marginTop: SH(-30),
      padding: SW(20),
      minHeight: SH(400),
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
      marginBottom: SH(10),
    },
    price: {
      fontSize: SF(13),
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
      fontSize: SF(13),
      fontFamily: theme.fontfamily.robotoBold,
      color: theme.colors.textPrimary,
      marginBottom: SH(15),
    },
    bulletRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: SH(5),
    },
    bulletText: {
      fontSize: SF(14),
      fontFamily: theme.fontfamily.robotoRegular,
      color: theme.colors.textSecondary,
      marginLeft: SW(12),
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

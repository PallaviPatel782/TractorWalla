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
      width: '100%',
      position: 'relative',
    },
    heroImage: {
      width: '100%',
      height: '100%',
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
    benefitsBadge: {
      backgroundColor: theme.colors.primary,
      paddingHorizontal: SW(10),
      paddingVertical: SH(4),
      borderRadius: SW(4),
      alignSelf: 'center',
      marginBottom: SH(15),
    },
    benefitsBadgeText: {
      fontSize: SF(12),
      fontFamily: theme.fontfamily.robotoBold,
      color: theme.colors.white,
    },
    heroBullets: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    heroBulletItem: {
      fontSize: SF(13),
      fontFamily: theme.fontfamily.robotoMedium,
      color: theme.colors.white,
      marginHorizontal: SW(10),
    },
    backBtn: {
      position: 'absolute',
      top: SH(50),
      left: SW(20),
      backgroundColor: 'rgba(255,255,255,0.8)',
      padding: SW(8),
      borderRadius: SW(20),
      zIndex: 10,
    },
    shareBtn: {
      position: 'absolute',
      top: SH(50),
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
      fontSize: SF(18),
      fontFamily: theme.fontfamily.robotoBold,
      color: theme.colors.textPrimary,
      marginBottom: SH(15),
    },
    highlights: {
      marginBottom: SH(20),
    },
    highlightItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: SH(10),
    },
    highlightText: {
      fontSize: SF(13),
      fontFamily: theme.fontfamily.robotoRegular,
      color: theme.colors.textSecondary,
      marginLeft: SW(10),
    },
    priceRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: SH(20),
    },
    ratingText: {
      fontSize: SF(14),
      fontFamily: theme.fontfamily.robotoBold,
      color: theme.colors.textPrimary,
      marginRight: SW(8),
    },
    price: {
      fontSize: SF(20),
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
    },
    bulletRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: SH(12),
    },
    bulletText: {
      fontSize: SF(14),
      fontFamily: theme.fontfamily.robotoRegular,
      color: theme.colors.textSecondary,
      marginLeft: SW(12),
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

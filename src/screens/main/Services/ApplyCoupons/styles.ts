import { StyleSheet } from 'react-native';
import { SW, SH, SF } from '@utils/Dimensions';
import { AppTheme } from '@theme';

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F8F9FA',
    },
    content: {
      padding: SW(16),
    },
    searchContainer: {
      flexDirection: 'row',
      backgroundColor: theme.colors.white,
      borderRadius: SW(8),
      paddingHorizontal: SW(12),
      paddingVertical: SH(6),
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.border || '#E5E7EB',
      marginBottom: SH(24),
    },
    searchInput: {
      flex: 1,
      fontSize: SF(14),
      fontFamily: theme.fontfamily.robotoRegular,
      color: theme.colors.textPrimary,
      paddingVertical: SH(8),
    },
    applyBtn: {
      marginLeft: SW(10),
    },
    applyBtnText: {
      fontSize: SF(14),
      fontFamily: theme.fontfamily.robotoBold,
      color: theme.colors.DeepGreen || '#105D38',
    },
    sectionTitle: {
      fontSize: SF(16),
      fontFamily: theme.fontfamily.robotoBold,
      color: theme.colors.textPrimary,
      marginBottom: SH(16),
    },
    couponCard: {
      backgroundColor: theme.colors.white,
      borderRadius: SW(12),
      flexDirection: 'row',
      marginBottom: SH(16),
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    redTag: {
      width: SW(40),
      backgroundColor: theme.colors.danger || '#D11C3D',
      justifyContent: 'center',
      alignItems: 'center',
    },
    tagText: {
      fontSize: SF(16),
      fontFamily: theme.fontfamily.robotoBold,
      color: theme.colors.white,
      transform: [{ rotate: '-90deg' }],
      width: SH(80),
      textAlign: 'center',
    },
    couponInfo: {
      flex: 1,
      padding: SW(16),
      justifyContent: 'center',
    },
    couponCode: {
      fontSize: SF(15),
      fontFamily: theme.fontfamily.robotoBold,
      color: theme.colors.textPrimary,
      marginBottom: SH(4),
    },
    couponTitle: {
      fontSize: SF(13),
      fontFamily: theme.fontfamily.robotoMedium,
      color: theme.colors.textSecondary,
      marginBottom: SH(2),
    },
    couponDesc: {
      fontSize: SF(11),
      fontFamily: theme.fontfamily.robotoRegular,
      color: theme.colors.textMuted,
    },
    cardApplyBtn: {
      paddingHorizontal: SW(16),
      justifyContent: 'center',
      borderLeftWidth: 1,
      borderLeftColor: '#F3F4F6',
    },
    cardApplyText: {
      fontSize: SF(14),
      fontFamily: theme.fontfamily.robotoBold,
      color: theme.colors.DeepGreen || '#105D38',
    },
  });

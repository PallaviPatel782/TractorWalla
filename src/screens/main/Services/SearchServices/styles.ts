import { StyleSheet } from 'react-native';
import { AppTheme } from '@theme';
import { SW, SH, SF } from '@utils/Dimensions';

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: SW(16),
      paddingTop: SH(10),
      backgroundColor: theme.colors.white,
      paddingBottom: SH(10),
    },
    backButton: {
      marginRight: SW(10),
    },
    searchContainer: {
      flex: 1,
      marginBottom: 0,
    },
    section: {
      paddingHorizontal: SW(16),
      marginTop: SH(20),
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: SH(12),
    },
    sectionTitle: {
      fontSize: SF(18),
      fontWeight: '700',
      color: theme.colors.text,
    },
    clearText: {
      fontSize: SF(14),
      color: theme.colors.textSecondary,
    },
    recentRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: SW(10),
    },
    recentItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.darkBg,
      paddingHorizontal: SW(12),
      paddingVertical: SH(8),
      borderRadius: SW(20),
    },
    clockIcon: {
      fontSize: SF(12),
      marginRight: SW(4),
    },
    recentText: {
      fontSize: SF(14),
      color: theme.colors.white,
    },
    listContent: {
      gap: SH(16),
      paddingBottom: SH(20),
      marginTop: SH(12),
    },
    serviceCard: {
      flexDirection: 'row',
      backgroundColor: theme.colors.white,
      borderRadius: SW(12),
      padding: SW(12),
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    serviceInfo: {
      flex: 1,
      marginRight: SW(12),
    },
    serviceTitle: {
      fontSize: SF(16),
      fontWeight: '700',
      color: theme.colors.black,
      marginBottom: SH(8),
    },
    bulletRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: SH(4),
    },
    bulletText: {
      fontSize: SF(12),
      color: theme.colors.textSecondary,
      marginLeft: SW(6),
    },
    ratingPriceRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: SH(12),
    },
    ratingRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    starText: {
      color: theme.colors.GoldenYellow,
      fontSize: SF(14),
      marginRight: SW(4),
    },
    ratingText: {
      fontSize: SF(14),
      fontWeight: '600',
      color: theme.colors.text,
    },
    priceRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    priceText: {
      fontSize: SF(16),
      fontWeight: '700',
      color: theme.colors.black,
      marginRight: SW(6),
    },
    mrpText: {
      fontSize: SF(12),
      color: theme.colors.textSecondary,
      textDecorationLine: 'line-through',
    },
    imageSection: {
      alignItems: 'center',
    },
    serviceImage: {
      borderRadius: SW(8),
      marginBottom: SH(8),
    },
    bookButton: {
      backgroundColor: theme.colors.paleGreen,
      paddingHorizontal: SW(12),
      paddingVertical: SH(6),
      borderRadius: SW(20),
      borderWidth: 1,
      borderColor: theme.colors.greenBtn,
    },
    bookButtonText: {
      fontSize: SF(14),
      color: theme.colors.greenBtn,
      fontWeight: '600',
    },
  });

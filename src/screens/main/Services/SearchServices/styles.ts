import { StyleSheet } from 'react-native';
import { AppTheme } from '@theme';

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingTop: 10,
      backgroundColor: theme.colors.white,
      paddingBottom: 10,
    },
    backButton: {
      marginRight: 10,
    },
    searchContainer: {
      flex: 1,
      marginBottom: 0,
    },
    section: {
      marginTop: 20,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.colors.text,
      paddingHorizontal: 16,
    },
    clearText: {
      fontSize: 14,
      color: theme.colors.textSecondary,
    },
    recentRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
    },
    recentItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.darkBg,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 20,
    },
    clockIcon: {
      fontSize: 12,
      marginRight: 4,
    },
    recentText: {
      fontSize: 14,
      color: theme.colors.white,
    },
    listContent: {
      marginTop: 12,
    },
    serviceCard: {
      flexDirection: 'row',
      backgroundColor: theme.colors.white,
      borderRadius: 12,
      padding: 12,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    serviceInfo: {
      flex: 1,
      marginRight: 12,
    },
    serviceTitle: {
      fontSize: 15,
      fontWeight: '700',
      color: theme.colors.black,
      marginBottom: 8,
    },
    bulletRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
    },
    bulletText: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      marginLeft: 6,
    },
    ratingPriceRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 12,
    },
    ratingRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    starText: {
      color: theme.colors.GoldenYellow,
      fontSize: 14,
      marginRight: 4,
    },
    ratingText: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.text,
    },
    priceRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    priceText: {
      fontSize: 15,
      fontWeight: '700',
      color: theme.colors.black,
      marginRight: 6,
    },
    mrpText: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      textDecorationLine: 'line-through',
    },
    imageSection: {
      alignItems: 'center',
    },
    serviceImage: {
      borderRadius: 8,
      marginBottom: 8,
    },
    bookButton: {
      backgroundColor: theme.colors.paleGreen,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: theme.colors.greenBtn,
    },
    bookButtonText: {
      fontSize: 14,
      color: theme.colors.greenBtn,
      fontWeight: '600',
    },
  });

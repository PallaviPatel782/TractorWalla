import { StyleSheet } from 'react-native';
import { AppTheme } from '@theme';

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    heroSection: {
      height: 280,
      alignItems: 'center',
      overflow: 'hidden',
    },
    headerRow: {
      position: 'absolute',
      top: 20,
      left: 16,
      right: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      zIndex: 10,
    },
    iconCircle: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: theme.colors.white,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: theme.colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      elevation: 3,
    },
    heroImage: {
      width: '100%',
      height: '100%',
    },
    contentCard: {
      backgroundColor: theme.colors.white,
      marginTop: -30,
      marginHorizontal: 8,
      borderRadius: 20,
      paddingHorizontal: 20,
      paddingVertical: 16,
      shadowColor: theme.colors.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      elevation: 5,
    },
    budgeSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 4,
    },
    badgePill: {
      backgroundColor: theme.colors.DeepGreen,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
    },
    badgeText: {
      fontSize: 11,
      fontFamily: theme.fontfamily.poppinsMedium,
      color: theme.colors.white,
      textTransform: 'uppercase',
    },
    title: {
      fontSize: 15,
      fontFamily: theme.fontfamily.poppinsMedium,
      color: theme.colors.textPrimary,
      marginBottom: 8,
    },
    highlights: {
      borderRadius: 12,
      paddingBottom: 16,
    },
    highlightItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
    },
    highlightText: {
      fontSize: 14,
      fontFamily: theme.fontfamily.poppinsRegular,
      color: theme.colors.textPrimary,
      marginLeft: 16,
    },
    sectionHeading: {
      fontSize: 16,
      fontFamily: theme.fontfamily.poppinsMedium,
      color: theme.colors.textPrimary,
      marginVertical: 8,
      marginHorizontal: 12,
    },
    includesGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    detailBulletRow: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '48%',
      marginBottom: 20,
    },
    detailBulletText: {
      fontSize: 12,
      fontFamily: theme.fontfamily.poppinsRegular,
      color: theme.colors.gray600,
      flex: 1,
      marginLeft: 4,
    },
    otherServicesSection: {
      marginTop: 8,
    },
  });

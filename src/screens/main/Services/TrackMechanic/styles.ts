import { StyleSheet } from 'react-native';
import { AppTheme } from '@theme';

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.white,
    },
    mapContainer: {
      flex: 1,
    },
    mechanicMarker: {
      backgroundColor: theme.colors.white,
      padding: 5,
      borderRadius: 20,
      elevation: 5,
      shadowColor: theme.colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
    },
    userMarker: {
      alignItems: 'center',
    },
    storeBadge: {
      backgroundColor: theme.colors.white,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
      elevation: 3,
      marginBottom: 4,
      borderWidth: 1,
      borderColor: theme.colors.gray200,
    },
    storeText: {
      fontSize: 10,
      color: theme.colors.black,
      fontFamily: theme.fontfamily.poppinsMedium,
    },
    bottomCard: {
      position: 'absolute',
      bottom: 30,
      left: 20,
      right: 20,
      backgroundColor: theme.colors.white,
      borderRadius: 16,
      padding: 16,
      elevation: 10,
      shadowColor: theme.colors.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 10,
    },
    cardContent: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
    },
    textContainer: {
      flex: 1,
    },
    etaBadge: {
      backgroundColor: theme.colors.success,
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    etaText: {
      color: theme.colors.white,
      fontSize: 14,
      fontFamily: theme.fontfamily.poppinsBold,
    },
    etaUnit: {
      color: theme.colors.white,
      fontSize: 8,
    },
    callBtn: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: theme.colors.white,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: theme.colors.gray200,
      marginTop: 8
    },
  });


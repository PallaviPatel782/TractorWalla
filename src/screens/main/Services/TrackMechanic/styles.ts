import { StyleSheet } from 'react-native';
import { AppTheme } from '@theme';
import { SW, SH, SF } from '@utils/Dimensions';

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
      padding: SW(5),
      borderRadius: SW(20),
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
      paddingHorizontal: SW(8),
      paddingVertical: SH(4),
      borderRadius: SW(4),
      elevation: 3,
      marginBottom: SH(4),
      borderWidth: 1,
      borderColor: theme.colors.gray200,
    },
    storeText: {
      fontSize: SF(10),
      color: theme.colors.black,
      fontFamily: theme.fontfamily.poppinsMedium,
    },
    bottomCard: {
      position: 'absolute',
      bottom: SH(30),
      left: SW(20),
      right: SW(20),
      backgroundColor: theme.colors.white,
      borderRadius: SW(16),
      padding: SW(16),
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
      paddingHorizontal: SW(10),
      paddingVertical: SH(6),
      borderRadius: SW(8),
      alignItems: 'center',
      justifyContent: 'center',
    },
    etaText: {
      color: theme.colors.white,
      fontSize: SF(14),
      fontFamily: theme.fontfamily.poppinsBold,
    },
    etaUnit: {
      color: theme.colors.white,
      fontSize: SF(8),
    },
    callBtn: {
      width: SW(36),
      height: SW(36),
      borderRadius: SW(18),
      backgroundColor: theme.colors.white,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: theme.colors.gray200,
      marginTop: SH(8)
    },
  });


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
      shadowColor: '#000',
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
      fontFamily: theme.fontfamily.robotoMedium,
    },
    bottomCard: {
      position: 'absolute',
      bottom: SH(30),
      left: SW(20),
      right: SW(20),
      backgroundColor: theme.colors.white,
      borderRadius: SW(16),
      padding: SW(16),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      elevation: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 10,
    },
    infoRow: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: SW(12),
    },
    textContainer: {
      flex: 1,
    },
    statusText: {
      color: theme.colors.black,
      marginBottom: SH(2),
    },
    nameText: {
      color: theme.colors.gray500,
    },
    etaBadge: {
      backgroundColor: theme.colors.DeepGreen,
      paddingHorizontal: SW(10),
      paddingVertical: SH(6),
      borderRadius: SW(10),
      alignItems: 'center',
      justifyContent: 'center',
    },
    etaText: {
      color: theme.colors.white,
      fontSize: SF(14),
      fontFamily: theme.fontfamily.robotoBold,
    },
    etaUnit: {
      color: theme.colors.white,
      fontSize: SF(8),
    },
    callBtn: {
      width: SW(44),
      height: SW(44),
      borderRadius: SW(22),
      backgroundColor: theme.colors.gray50,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: theme.colors.gray200,
      margin: SW(5)
    },
    callIcon: {
      fontSize: SF(20),
    },
    viewDetailsBtn: {
      backgroundColor: theme.colors.DeepGreen,
      paddingHorizontal: SW(12),
      paddingVertical: SH(8),
      borderRadius: SW(8),
    },
    viewDetailsText: {
      color: theme.colors.white,
      fontSize: SF(12),
      fontFamily: theme.fontfamily.robotoMedium,
    },
  });


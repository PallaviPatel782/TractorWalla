import { StyleSheet, Platform } from 'react-native';
import { SH } from '@utils/Dimensions';
import { AppTheme } from '@theme';

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.white,
      paddingBottom: SH(30),
    },
    currentLocRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 11,
      backgroundColor: theme.colors.white,
    },
    currentLocIcon: {
      fontSize: 18,
      color: theme.colors.cyan,
      marginRight: 8,
      lineHeight: 22,
    },
    currentLocText: {
      fontSize: 14,
      color: theme.colors.cyan,
      fontWeight: '500',
    },
    mapWrapper: {
      flex: 1,
    },
    pinAnchor: {
      position: 'absolute',
      left: '51%',
      top: '55%',
      transform: [{ translateX: -16 }, { translateY: -42 }],
    },
    addressCard: {
      backgroundColor: theme.colors.teal,
      paddingHorizontal: 16,
      paddingVertical: 14,
    },
    addressInner: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    addressPinIcon: {
      fontSize: 22,
      marginRight: 10,
      marginTop: 1,
    },
    addressTextWrap: {
      flex: 1,
    },
    addressTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: theme.colors.white,
      marginBottom: 3,
    },
    addressLoadRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    addressLoadText: {
      fontSize: 13,
      color: theme.colors.white + 'BF',
    },
    addressSubtitle: {
      fontSize: 13,
      color: theme.colors.white + 'E0',
      lineHeight: 18,
    },
    confirmWrapper: {
      paddingHorizontal: 14,
      paddingTop: 12,
      paddingBottom: Platform.OS === 'ios' ? 34 : 14,
      backgroundColor: theme.colors.white,
    },
  });

import { StyleSheet, Platform } from 'react-native';
import { SH, SW, SF } from '@utils/Dimensions';
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
      paddingHorizontal: SW(16),
      paddingVertical: SH(11),
      backgroundColor: theme.colors.white,
    },
    currentLocIcon: {
      fontSize: SF(18),
      color: theme.colors.cyan,
      marginRight: SW(8),
      lineHeight: SH(22),
    },
    currentLocText: {
      fontSize: SF(14),
      color: theme.colors.cyan,
      fontFamily: theme.fontfamily.poppinsMedium,
    },
    mapWrapper: {
      flex: 1,
    },
    pinAnchor: {
      position: 'absolute',
      left: '51%',
      top: '55%',
      transform: [{ translateX: SW(-16) }, { translateY: SH(-42) }],
    },
    addressCard: {
      backgroundColor: theme.colors.teal,
      paddingHorizontal: SW(16),
      paddingVertical: SH(14),
    },
    addressInner: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    addressPinIcon: {
      fontSize: SF(22),
      marginRight: SW(10),
      marginTop: SH(1),
    },
    addressTextWrap: {
      flex: 1,
    },
    addressTitle: {
      fontSize: SF(16),
      fontFamily: theme.fontfamily.poppinsSemiBold,
      color: theme.colors.white,
      marginBottom: SH(3),
    },
    addressLoadRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: SW(6),
    },
    addressLoadText: {
      fontSize: SF(13),
      fontFamily: theme.fontfamily.poppinsRegular,
      color: theme.colors.white + 'BF',
    },
    addressSubtitle: {
      fontSize: SF(13),
      fontFamily: theme.fontfamily.poppinsRegular,
      color: theme.colors.white + 'E0',
      lineHeight: SH(18),
    },
    confirmWrapper: {
      paddingHorizontal: SW(14),
      paddingTop: SH(40),
      paddingBottom: Platform.OS === 'ios' ? SH(34) : SH(14),
      backgroundColor: theme.colors.white,
    },
  });

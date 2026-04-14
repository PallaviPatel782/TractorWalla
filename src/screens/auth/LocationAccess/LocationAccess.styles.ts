import { StyleSheet, Platform } from 'react-native';
import { AppTheme } from '@theme';
import { SW, SH, SF } from '@utils/Dimensions';

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.white,
    },
    // Search
    searchContainer: {
      paddingHorizontal: SW(16),
      paddingTop: SH(10),
      paddingBottom: SH(5),
      backgroundColor: theme.colors.white,
    },
    searchBox: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1.5,
      borderColor: theme.colors.borderLight,
      borderRadius: SW(8),
      paddingHorizontal: SW(12),
      height: SH(48),
      backgroundColor: theme.colors.white,
    },
    searchIcon: {
      marginRight: SW(10),
    },
    searchInput: {
      flex: 1,
      fontSize: SF(14),
      color: theme.colors.textPrimary,
      padding: 0,
    },
    // Current Location
    currentLocRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: SW(16),
      paddingVertical: SH(12),
      backgroundColor: theme.colors.white,
    },
    currentLocIcon: {
      marginRight: SW(10),
    },
    currentLocText: {
      fontSize: SF(14),
      color: theme.colors.AzureBlue,
      fontWeight: '500',
    },
    // Map
    mapWrapper: {
      flex: 1,
      position: 'relative',
    },
    map: {
      ...StyleSheet.absoluteFill,
    },
    pinAnchor: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: [{ translateX: -SW(12) }, { translateY: -SH(24) }],
      zIndex: 1,
    },
    // Address Card
    addressCard: {
      backgroundColor: theme.colors.brandGreen,
      paddingHorizontal: SW(16),
      paddingVertical: SH(16),
    },
    addressInner: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    addressPinIcon: {
      marginRight: SW(12),
      marginTop: SH(2),
    },
    addressTextWrap: {
      flex: 1,
    },
    addressTitle: {
      fontSize: SF(16),
      fontWeight: '700',
      color: theme.colors.white,
      marginBottom: SH(4),
    },
    addressLoadRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    addressLoadText: {
      fontSize: SF(13),
      color: 'rgba(255,255,255,0.8)',
      marginLeft: SW(6),
    },
    addressSubtitle: {
      fontSize: SF(13),
      color: 'rgba(255,255,255,0.9)',
      lineHeight: SH(18),
    },
    // Confirm
    confirmWrapper: {
      paddingHorizontal: SW(16),
      paddingTop: SH(12),
      paddingBottom: Platform.OS === 'ios' ? SH(34) : SH(16),
      backgroundColor: theme.colors.white,
    },
    confirmButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: SW(10),
      height: SH(54),
    },
  });

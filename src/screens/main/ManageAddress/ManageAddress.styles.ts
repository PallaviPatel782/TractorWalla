import { StyleSheet } from 'react-native';
import { AppTheme } from '@theme';
import { SW, SH, SF } from '@utils/Dimensions';

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    headerContainer: {
      backgroundColor: theme.colors.backgroundExtraLight || '#FAF5F0',
    },
    content: {
      flex: 1,
      paddingHorizontal: SW(20),
      paddingTop: SH(20),
    },
    sectionTitle: {
      marginBottom: SH(16),
      color: theme.colors.textPrimary,
      fontFamily: theme.fontfamily.poppinsSemiBold,
    },
    listContent: {
      paddingBottom: SH(100),
    },
    addressCard: {
      backgroundColor: theme.colors.white,
      borderRadius: SW(12),
      padding: SW(16),
      marginBottom: SH(16),
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: theme.colors.borderLight,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
    },
    addressCardSelected: {
      borderColor: theme.colors.gray900,
      borderWidth: 1.5,
    },
    radioContainer: {
      marginRight: SW(12),
      marginTop: SH(4),
    },
    radioOuter: {
      width: SW(20),
      height: SW(20),
      borderRadius: SW(10),
      borderWidth: 2,
      borderColor: theme.colors.gray300,
      alignItems: 'center',
      justifyContent: 'center',
    },
    radioOuterSelected: {
      borderColor: theme.colors.gray900,
    },
    radioInner: {
      width: SW(10),
      height: SW(10),
      borderRadius: SW(5),
      backgroundColor: theme.colors.gray900,
    },
    addressInfo: {
      flex: 1,
    },
    labelRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: SH(4),
    },
    addressLabel: {
      fontFamily: theme.fontfamily.poppinsSemiBold,
      color: theme.colors.gray500,
    },
    addressText: {
      lineHeight: SH(18),
      color: theme.colors.gray900,
      marginBottom: SH(12),
    },
    actionRow: {
      flexDirection: 'row',
      gap: SW(12),
    },
    actionButton: {
      paddingHorizontal: SW(16),
      paddingVertical: SH(6),
      borderRadius: SW(8),
      borderWidth: 1,
      borderColor: theme.colors.borderLight,
      backgroundColor: theme.colors.white,
    },
    actionText: {
      fontFamily: theme.fontfamily.poppinsMedium,
      color: theme.colors.gray900,
    },
    footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: theme.colors.brandGreen,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: SH(16),
      gap: SW(10),
      marginBottom: SH(20),
      paddingHorizontal: SW(20)
    },
    footerText: {
      color: theme.colors.white,
      fontFamily: theme.fontfamily.poppinsSemiBold,
    },
  });

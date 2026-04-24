import { StyleSheet } from 'react-native';
import { AppTheme } from '@theme';
import { SW, SH, SF } from '@utils/Dimensions';

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.white,
    },
    header: {
      paddingHorizontal: SW(20),
      paddingTop: SH(10),
      backgroundColor: theme.colors.white,
    },
    backBtn: {
      width: SW(40),
      height: SW(40),
      justifyContent: 'center',
    },
    content: {
      paddingHorizontal: SW(20),
      paddingBottom: SH(100),
    },
    bannerContainer: {
      alignItems: 'center',
      marginVertical: SH(20),
    },
    detailsCard: {
      backgroundColor: theme.colors.white,
      borderRadius: SW(16),
      padding: SW(16),
      borderWidth: 1,
      borderColor: theme.colors.gray100,
    },
    bookingId: {
      fontSize: SF(13),
      fontFamily: theme.fontfamily.robotoMedium,
      color: theme.colors.gray600,
      marginBottom: SH(16),
    },
    engineerCard: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: SW(12),
      borderRadius: SW(12),
      marginBottom: SH(20),
    },
    engineerInfo: {
      flex: 1,
      marginLeft: SW(12),
    },
    engineerLabel: {
      fontSize: SF(11),
      fontFamily: theme.fontfamily.robotoRegular,
      color: theme.colors.gray500,
    },
    engineerName: {
      fontSize: SF(14),
      fontFamily: theme.fontfamily.robotoBold,
      color: theme.colors.black,
    },
    statusContainer: {
      alignItems: 'flex-end',
    },
    statusText: {
      flexDirection: 'row',
      alignItems: 'center',
      fontSize: SF(12),
      fontFamily: theme.fontfamily.robotoBold,
      color: theme.colors.DeepGreen,
      gap: SW(4),
    },
    timeText: {
      fontSize: SF(11),
      fontFamily: theme.fontfamily.robotoRegular,
      color: theme.colors.gray500,
      marginTop: SH(2),
    },
    amountRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderTopWidth: 1,
      borderTopColor: theme.colors.gray100,
      paddingTop: SH(16),
    },
    amountLabel: {
      fontSize: SF(12),
      fontFamily: theme.fontfamily.robotoMedium,
      color: theme.colors.gray500,
    },
    amountValue: {
      fontSize: SF(18),
      fontFamily: theme.fontfamily.robotoBold,
      color: theme.colors.black,
    },
    invoiceButton: {
      backgroundColor: theme.colors.DeepGreen,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: SW(12),
      paddingVertical: SH(8),
      borderRadius: SW(6),
      gap: SW(6),
    },
    invoiceText: {
      color: theme.colors.white,
      fontSize: SF(12),
      fontFamily: theme.fontfamily.robotoMedium,
    },
    invoiceMenuBody: {
      position: 'absolute',
      bottom: '100%',
      right: 0,
      marginBottom: SH(4),
      backgroundColor: theme.colors.white,
      borderRadius: SW(8),
      borderWidth: 1,
      borderColor: theme.colors.gray100,
      elevation: 3,
      shadowColor: theme.colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      zIndex: 100,
      width: SW(140),
    },
    invoiceMenuItem: {
      paddingVertical: SH(10),
      paddingHorizontal: SW(12),
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.gray50,
    },
    invoiceMenuItemText: {
      fontSize: SF(12),
      fontFamily: theme.fontfamily.robotoMedium,
      color: theme.colors.gray800,
    },
    footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: SW(20),
      backgroundColor: theme.colors.white,
      borderTopWidth: 1,
      borderTopColor: theme.colors.gray100,
    },
  });

import { StyleSheet } from 'react-native';
import { AppTheme } from '@theme';

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.white,
    },
    header: {
      paddingHorizontal: 20,
      paddingTop: 10,
      backgroundColor: theme.colors.white,
    },
    backBtn: {
      width: 40,
      height: 40,
      justifyContent: 'center',
    },
    content: {
      paddingHorizontal: 20,
      paddingBottom: 10,
      overflow: 'visible',
    },
    bannerContainer: {
      alignItems: 'center',
      marginVertical: 20,
    },
    detailsCard: {
      backgroundColor: theme.colors.white,
      borderRadius: 16,
      padding: 16,
      borderWidth: 1,
      borderColor: theme.colors.gray100,
      overflow: 'visible',
    },
    bookingId: {
      fontSize: 14,
      fontFamily: theme.fontfamily.poppinsMedium,
      color: theme.colors.gray600,
      marginBottom: 16,
    },
    engineerCard: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
      borderRadius: 12,
      marginBottom: 20,
    },
    engineerInfo: {
      flex: 1,
      marginLeft: 12,
    },
    engineerLabel: {
      fontSize: 11,
      fontFamily: theme.fontfamily.poppinsRegular,
      color: theme.colors.gray500,
    },
    engineerName: {
      fontSize: 14,
      fontFamily: theme.fontfamily.poppinsMedium,
      color: theme.colors.black,
    },
    statusContainer: {
      alignItems: 'flex-end',
    },
    statusText: {
      flexDirection: 'row',
      alignItems: 'center',
      fontSize: 12,
      fontFamily: theme.fontfamily.poppinsMedium,
      color: theme.colors.DeepGreen,
      gap: 4,
    },
    timeText: {
      fontSize: 11,
      fontFamily: theme.fontfamily.poppinsRegular,
      color: theme.colors.gray500,
      marginTop: 2,
    },
    amountRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 20,
    },
    invoiceButton: {
      backgroundColor: theme.colors.DeepGreen,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 6,
      gap: 6,
    },
    invoiceText: {
      color: theme.colors.white,
      fontSize: 12,
      fontFamily: theme.fontfamily.poppinsMedium,
    },
    invoiceMenuBody: {
      position: 'absolute',
      top: '100%',
      right: 0,
      marginTop: 4,
      backgroundColor: theme.colors.white,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.colors.gray100,
      elevation: 3,
      shadowColor: theme.colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      zIndex: 100,
      width: 140,
    },
    invoiceMenuItem: {
      paddingVertical: 10,
      paddingHorizontal: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.gray50,
    },
    invoiceMenuItemText: {
      fontSize: 12,
      fontFamily: theme.fontfamily.poppinsMedium,
      color: theme.colors.gray800,
    },
    footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: 20,
      backgroundColor: theme.colors.white,
      borderTopWidth: 1,
      borderTopColor: theme.colors.gray100,
    },
    modalBackdrop: {
      flex: 1,
      backgroundColor: 'transparent',
    },
  });

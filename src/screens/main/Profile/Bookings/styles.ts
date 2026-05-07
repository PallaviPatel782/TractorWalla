import { StyleSheet } from 'react-native';
import { AppTheme } from '@theme';

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.backgroundTertiary,
    },
    content: {
      flex: 1,
      paddingHorizontal: 16,
      overflow: 'visible',
    },
    listContent: {
      paddingTop: 10,
      paddingBottom: 30,
      overflow: 'visible',
    },
    bookingCard: {
      backgroundColor: theme.colors.white,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      elevation: 2,
      shadowColor: theme.colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      overflow: 'visible',
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    bookingId: {
      fontFamily: theme.fontfamily.poppinsMedium,
      color: theme.colors.gray500,
      fontSize: 11,
    },
    optionsIcon: {
      padding: 4,
      borderColor: theme.colors.gray100,
      borderWidth: 1,
      borderRadius: 50,
    },
    engineerSection: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    engineerInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      flex: 1,
      marginRight: 10,
    },
    avatar: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: theme.colors.gray100,
      justifyContent: 'center',
      alignItems: 'center',
    },
    assignedLabel: {
      color: theme.colors.gray500,
    },
    engineerName: {
      color: theme.colors.gray900,
    },
    statusContainer: {
      alignItems: 'flex-end',
      flexShrink: 0,
      minWidth: 80,
    },
    statusLabel: {
      color: theme.colors.gray500,
      marginBottom: 2,
    },
    statusValueRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    statusValue: {
      fontFamily: theme.fontfamily.poppinsMedium,
    },
    divider: {
      height: 1,
      backgroundColor: theme.colors.borderFaint,
      marginBottom: 12,
    },
    cardFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    amountSection: {
      gap: 2,
    },
    amountLabel: {
      color: theme.colors.gray500,
      textTransform: 'uppercase',
    },
    amountValue: {
      color: theme.colors.gray900,
    },
    viewDetailsButton: {
      backgroundColor: theme.colors.iconBgYellow,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 6,
    },
    viewDetailsText: {
      color: theme.colors.gray900,
    },
    invoiceButton: {
      backgroundColor: theme.colors.brandGreen,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 6,
      gap: 6,
    },
    invoiceText: {
      color: theme.colors.white,
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
    reasonChipsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    reasonChip: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: theme.colors.gray300,
      backgroundColor: theme.colors.white,
    },
    reasonChipSelected: {
      borderColor: theme.colors.brandGreen,
      backgroundColor: theme.colors.white, // In Figma it's a green outline
    },
    modalBackdrop: {
      flex: 1,
      backgroundColor: 'transparent',
    },
  });

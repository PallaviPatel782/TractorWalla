import { StyleSheet } from 'react-native';
import { AppTheme } from '@theme';
import { SW, SH, SF } from '@utils/Dimensions';

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.backgroundTertiary || '#F4F6F8',
    },
    content: {
      flex: 1,
      paddingHorizontal: SW(16),
    },
    listContent: {
      paddingTop: SH(16),
      paddingBottom: SH(30),
    },
    bookingCard: {
      backgroundColor: theme.colors.white,
      borderRadius: SW(12),
      padding: SW(16),
      marginBottom: SH(16),
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: SH(12),
    },
    bookingId: {
      fontFamily: theme.fontfamily.poppinsMedium,
      color: theme.colors.gray500,
      fontSize: SF(11),
    },
    optionsIcon: {
      padding: SW(4),
      borderColor: theme.colors.gray100,
      borderWidth: 1,
      borderRadius: 20,
      elevation: 0.5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 0.5 },
      shadowOpacity: 0.05,
      shadowRadius: 0.5,
    },
    engineerSection: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: SH(16),
    },
    engineerInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: SW(10),
    },
    avatar: {
      width: SW(36),
      height: SW(36),
      borderRadius: SW(18),
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
    },
    statusLabel: {
      color: theme.colors.gray500,
      marginBottom: SH(2),
    },
    statusValueRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: SW(4),
    },
    statusValue: {
      fontFamily: theme.fontfamily.poppinsMedium,
    },
    divider: {
      height: 1,
      backgroundColor: theme.colors.borderFaint,
      marginBottom: SH(12),
    },
    cardFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    amountSection: {
      gap: SH(2),
    },
    amountLabel: {
      color: theme.colors.gray500,
      textTransform: 'uppercase',
    },
    amountValue: {
      color: theme.colors.gray900,
    },
    viewDetailsButton: {
      backgroundColor: theme.colors.iconBgYellow || '#FDF4DF',
      paddingHorizontal: SW(16),
      paddingVertical: SH(8),
      borderRadius: SW(6),
    },
    viewDetailsText: {
      color: theme.colors.gray900,
    },
    invoiceButton: {
      backgroundColor: theme.colors.brandGreen,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: SW(12),
      paddingVertical: SH(8),
      borderRadius: SW(6),
      gap: SW(6),
    },
    invoiceText: {
      color: theme.colors.white,
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
      shadowColor: '#000',
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
    reasonChipsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: SW(8),
    },
    reasonChip: {
      paddingVertical: SH(6),
      paddingHorizontal: SW(12),
      borderRadius: SW(20),
      borderWidth: 1,
      borderColor: theme.colors.gray300,
      backgroundColor: theme.colors.white,
    },
    reasonChipSelected: {
      borderColor: theme.colors.brandGreen,
      backgroundColor: theme.colors.white, // In Figma it's a green outline
    },
  });

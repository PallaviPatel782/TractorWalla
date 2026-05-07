import { StyleSheet } from 'react-native';
import { AppTheme } from '@theme';

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flexGrow: 1,
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 30,
    },
    invoiceCard: {
      backgroundColor: theme.colors.YellowLight, // Match the light beige background from design
      borderRadius: 16,
      padding: 20,
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 24,
    },
    invoiceTitleBlock: {
      flex: 1,
    },
    invoiceCompanyBlock: {
      flex: 1,
      alignItems: 'flex-end',
    },
    invoiceMainTitle: {
      fontFamily: theme.fontfamily.poppinsSemiBold,
      fontSize: 20,
      color: theme.colors.gray900,
      letterSpacing: 0.5,
    },
    divider: {
      height: 1,
      backgroundColor: theme.colors.gray200,
      marginBottom: 20,
    },
    tractorInfoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 24,
      gap: 12,
    },
    billingContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 24,
    },
    billingColumn: {
      flex: 1,
    },
    billingColumnRight: {
      flex: 1,
      alignItems: 'flex-end',
    },
    billSummaryHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginBottom: 12,
    },
    tableHeaderRow: {
      flexDirection: 'row',
      backgroundColor: theme.colors.brandGreen,
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 6,
      marginBottom: 10,
    },
    tableRow: {
      flexDirection: 'row',
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.beigeBorder,
    },
    colProduct: { flex: 4 },
    colQty: { flex: 1, alignItems: 'center' },
    colPrice: { flex: 2, alignItems: 'flex-end' },
    colTotal: { flex: 2, alignItems: 'flex-end' },
    tableTextWhite: {
      color: theme.colors.white,
      fontFamily: theme.fontfamily.poppinsMedium,
      fontSize: 12,
    },
    tableText: {
      color: theme.colors.gray800,
      fontFamily: theme.fontfamily.poppinsRegular,
      fontSize: 12,
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 6,
    },
    taxNotice: {
      color: theme.colors.gray400,
      fontFamily: theme.fontfamily.poppinsRegular,
      fontSize: 10,
      marginTop: 8,
      marginBottom: 16,
    },
    totalEstimateContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderTopWidth: 1,
      borderTopColor: theme.colors.beigeBorder,
      paddingTop: 16,
      marginBottom: 32,
    },
  });

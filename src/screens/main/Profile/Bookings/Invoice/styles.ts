import { StyleSheet } from 'react-native';
import { AppTheme } from '@theme';
import { SW, SH, SF } from '@utils/Dimensions';

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flexGrow: 1,
      paddingHorizontal: SW(20),
      paddingTop: SH(20),
      paddingBottom: SH(30),
    },
    invoiceCard: {
      backgroundColor: theme.colors.YellowLight, // Match the light beige background from design
      borderRadius: SW(16),
      padding: SW(20),
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: SH(24),
    },
    invoiceTitleBlock: {
      flex: 1,
    },
    invoiceCompanyBlock: {
      flex: 1,
      alignItems: 'flex-end',
    },
    invoiceMainTitle: {
      fontFamily: theme.fontfamily.robotoSemiBold,
      fontSize: SF(20),
      color: theme.colors.gray900,
      letterSpacing: 0.5,
    },
    divider: {
      height: 1,
      backgroundColor: theme.colors.gray200,
      marginBottom: SH(20),
    },
    tractorInfoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: SH(24),
      gap: SW(12),
    },
    billingContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: SH(24),
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
      gap: SW(8),
      marginBottom: SH(12),
    },
    tableHeaderRow: {
      flexDirection: 'row',
      backgroundColor: theme.colors.brandGreen,
      paddingVertical: SH(8),
      paddingHorizontal: SW(12),
      borderRadius: SW(6),
      marginBottom: SH(10),
    },
    tableRow: {
      flexDirection: 'row',
      paddingVertical: SH(8),
      paddingHorizontal: SW(12),
      borderBottomWidth: 1,
      borderBottomColor: '#f0e5da',
    },
    colProduct: { flex: 4 },
    colQty: { flex: 1, alignItems: 'center' },
    colPrice: { flex: 2, alignItems: 'flex-end' },
    colTotal: { flex: 2, alignItems: 'flex-end' },
    tableTextWhite: {
      color: theme.colors.white,
      fontFamily: theme.fontfamily.robotoMedium,
      fontSize: SF(12),
    },
    tableText: {
      color: theme.colors.gray800,
      fontFamily: theme.fontfamily.robotoRegular,
      fontSize: SF(12),
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: SH(6),
    },
    taxNotice: {
      color: theme.colors.gray400,
      fontFamily: theme.fontfamily.robotoRegular,
      fontSize: SF(10),
      marginTop: SH(8),
      marginBottom: SH(16),
    },
    totalEstimateContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderTopWidth: 1,
      borderTopColor: '#f0e5da',
      paddingTop: SH(16),
      marginBottom: SH(32),
    },
  });

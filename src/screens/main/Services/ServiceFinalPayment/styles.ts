import { StyleSheet } from 'react-native';
import { SW, SH, SF } from '@utils/Dimensions';
import { AppTheme } from '@theme';

export const createStyles = (theme: AppTheme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: SW(20),
  },
  bookingId: {
    fontSize: SF(16),
    color: theme.colors.textPrimary,
    fontFamily: theme.fontfamily.robotoMedium,
    marginBottom: SH(15),
  },
  sectionTitle: {
    fontSize: SF(18),
    color: theme.colors.primary,
    fontFamily: theme.fontfamily.robotoBold,
    marginBottom: SH(15),
  },
  serviceCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.white,
    borderRadius: SW(15),
    padding: SW(15),
    marginBottom: SH(20),
    elevation: 2,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: SF(16),
    fontFamily: theme.fontfamily.robotoBold,
    color: theme.colors.black,
    marginBottom: SH(10),
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SH(5),
  },
  bulletText: {
    fontSize: SF(13),
    color: theme.colors.textSecondary,
    fontFamily: theme.fontfamily.robotoRegular,
    marginLeft: SW(8),
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SH(10),
  },
  rating: {
    fontSize: SF(14),
    color: theme.colors.GoldenYellow,
    fontFamily: theme.fontfamily.robotoMedium,
    marginRight: SW(10),
  },
  price: {
    fontSize: SF(16),
    fontFamily: theme.fontfamily.robotoBold,
    color: theme.colors.black,
    marginRight: SW(8),
  },
  mrp: {
    fontSize: SF(14),
    color: theme.colors.gray400,
    fontFamily: theme.fontfamily.robotoRegular,
    textDecorationLine: 'line-through',
  },
  imageContainer: {
    alignItems: 'center',
  },
  serviceImage: {
    borderRadius: SW(10),
  },
  addedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SW(10),
    paddingVertical: SH(4),
    borderRadius: SW(5),
    marginTop: SH(-15),
  },
  addedText: {
    color: theme.colors.white,
    fontSize: SF(12),
    fontFamily: theme.fontfamily.robotoBold,
    marginLeft: SW(4),
  },
  billCard: {
    backgroundColor: theme.colors.white,
    borderRadius: SW(15),
    padding: SW(20),
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  billHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SH(15),
  },
  billTitle: {
    fontSize: SF(16),
    fontFamily: theme.fontfamily.robotoBold,
    color: theme.colors.black,
    marginLeft: SW(10),
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginBottom: SH(15),
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SH(12),
  },
  billLabel: {
    fontSize: SF(14),
    color: theme.colors.textSecondary,
    fontFamily: theme.fontfamily.robotoRegular,
  },
  billValue: {
    fontSize: SF(14),
    color: theme.colors.black,
    fontFamily: theme.fontfamily.robotoMedium,
  },
  dividerDashed: {
    height: 1,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderStyle: 'dashed',
    marginVertical: SH(15),
  },
  taxNote: {
    fontSize: SF(12),
    color: theme.colors.textMuted,
    fontFamily: theme.fontfamily.robotoRegular,
  },
  taxValue: {
    fontSize: SF(12),
    color: theme.colors.textMuted,
    fontFamily: theme.fontfamily.robotoRegular,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SH(20),
  },
  totalLabel: {
    fontSize: SF(18),
    fontFamily: theme.fontfamily.robotoRegular,
    color: theme.colors.black,
  },
  totalValue: {
    fontSize: SF(18),
    fontFamily: theme.fontfamily.robotoRegular,
    color: theme.colors.black,
  },
  footer: {
    padding: SW(20),
    backgroundColor: theme.colors.white,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
});

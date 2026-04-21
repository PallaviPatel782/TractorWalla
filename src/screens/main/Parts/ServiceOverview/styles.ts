import { StyleSheet } from 'react-native';
import { SW, SH, SF } from '@utils/Dimensions';
import { AppTheme } from '@theme';
export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background || '#F8F9FB',
    },
    heroSection: {
      height: SH(280),
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#042C21',
    },
    headerRow: {
      position: 'absolute',
      top: SH(50),
      left: SW(16),
      right: SW(16),
      flexDirection: 'row',
      justifyContent: 'space-between',
      zIndex: 10,
    },
    iconCircle: {
      width: SW(36),
      height: SW(36),
      borderRadius: SW(18),
      backgroundColor: theme.colors.white,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      elevation: 3,
    },
    heroImage: {
      resizeMode: 'contain',
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: SH(15),
    },
    badgePill: {
      backgroundColor: '#1E633F',
      paddingHorizontal: SW(10),
      paddingVertical: SH(4),
      borderRadius: SW(6),
    },
    badgeText: {
      fontSize: SF(11),
      fontFamily: theme.fontfamily.robotoBold,
      color: theme.colors.white,
      textTransform: 'uppercase',
    },
    contentCard: {
      backgroundColor: theme.colors.white,
      marginTop: SH(-30),
      marginHorizontal: SW(10),
      borderRadius: SW(20),
      paddingHorizontal: SW(20),
      paddingVertical: SH(15),
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      elevation: 5,
    },
    titleRow: {
      marginBottom: SH(5),
    },
    starIcon: {
      color: '#F4C542',
      fontSize: SF(18),
    },
    divider: {
      height: 1,
      backgroundColor: '#F1F1F1',
      marginVertical: SH(20),
    },
    kitTitle: {
      fontSize: SF(14),
      fontFamily: theme.fontfamily.robotoBold,
      color: theme.colors.textPrimary || '#111827',
      marginBottom: SH(6),
    },
    mainKitTitle: {
      fontSize: SF(18),
      fontFamily: theme.fontfamily.robotoBold,
      color: theme.colors.textPrimary || '#111827',
      marginBottom: SH(10),
    },
    ratingWrap: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: SW(10),
    },
    ratingText: {
      fontSize: SF(13),
      fontFamily: theme.fontfamily.robotoBold,
      color: theme.colors.textSecondary,
      marginLeft: SW(4),
    },
    priceRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: SH(10),
    },
    price: {
      fontSize: SF(22),
      fontFamily: theme.fontfamily.robotoRegular,
      color: theme.colors.textPrimary,
    },
    mrp: {
      fontSize: SF(16),
      fontFamily: theme.fontfamily.robotoRegular,
      color: theme.colors.textMuted || '#9CA3AF',
      textDecorationLine: 'line-through',
      marginLeft: SW(10),
    },
    sectionTitle: {
      fontSize: SF(16),
      fontFamily: theme.fontfamily.robotoRegular,
      color: theme.colors.textPrimary || '#111827',
      marginBottom: SH(15),
    },
    detailsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    budgeSection: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: SH(5)
    },
    detailBulletRow: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '48%',
    },
    detailBulletText: {
      fontSize: SF(11),
      fontFamily: theme.fontfamily.robotoMedium,
      color: theme.colors.gray600,
      flex: 1,
      marginLeft: SW(10),
    },
    bulletText: {
      fontSize: SF(11),
      fontFamily: theme.fontfamily.robotoRegular,
      color: theme.colors.textSecondary || '#6B7280',
      flex: 1,
      marginLeft: SW(6),
    },
    recommendationBulletRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: SH(6),
    },
    otherPartsList: {
      // marginTop: SH(10),
    },
    kitCard: {
      flexDirection: 'row',
      backgroundColor: theme.colors.white,
      // marginHorizontal: SW(16),
      marginBottom: SH(10),
      borderRadius: SW(12),
      padding: SW(12),
      borderWidth: 1,
      borderColor: theme.colors.borderFaint || '#F1F1F1',
    },
    kitLeft: {
      flex: 1,
      paddingRight: SW(10),
    },

    kitFooter: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: SH(10),
    },



    kitRight: {
      alignItems: 'center',
    },
    kitImage: {
      width: SW(100),
      height: SW(90),
      borderRadius: SW(8),
      marginBottom: SH(8),
    },
    purchaseBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(30, 99, 63, 0.1)', // Light green bg
      paddingHorizontal: SW(12),
      paddingVertical: SH(6),
      borderRadius: SW(15),
      borderWidth: 1,
      borderColor: '#1E633F',
    },
    purchaseText: {
      fontSize: SF(11),
      fontFamily: theme.fontfamily.robotoBold,
      color: '#1E633F',
    },
    footer: {
      paddingHorizontal: SW(16),
      paddingBottom: SH(34),
      paddingTop: SH(10),
      backgroundColor: theme.colors.white,
      borderTopWidth: 1,
      borderTopColor: '#F1F1F1',
    },
    modalContainer: {
      backgroundColor: theme.colors.white,
      padding: SW(20),
      borderTopLeftRadius: SW(24),
      borderTopRightRadius: SW(24),
      position: 'relative',
    },
    modalCloseBtn: {
      position: 'absolute',
      top: SH(20),
      right: SW(20),
      zIndex: 10,
    },
    modalHeaderTitle: {
      fontSize: SF(16),
      fontFamily: theme.fontfamily.robotoBold,
      color: '#1E633F',
      marginTop: SH(5),
      marginBottom: SH(20),
    },
    modalMsg: {
      fontSize: SF(15),
      fontFamily: theme.fontfamily.robotoMedium,
      color: theme.colors.textPrimary,
      marginBottom: SH(20),
    },
    modalImageWrapper: {
      borderRadius: SW(8),
      padding: SW(10),
      alignItems: 'center',
      marginBottom: SH(30),
    },
  });

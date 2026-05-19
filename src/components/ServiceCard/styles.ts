import { StyleSheet } from 'react-native';
import { AppTheme } from '@theme';

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    serviceCard: {
      flexDirection: 'column',
      backgroundColor: theme.colors.white,
      marginBottom: 10,
      padding: 12,
      borderWidth: 1,
      borderColor: theme.colors.borderFaint,
    },
    cardMainRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    serviceLeft: {
      flex: 1,
      paddingRight: 10,
      marginLeft: 10,
    },
    serviceTitle: {
      marginBottom: 8,
    },
    bulletRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
    },
    bulletText: {
      flex: 1,
      marginLeft: 10,
    },
    kitFooter: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      // marginTop: 10,
      marginLeft: 10,
    },
    ratingText: {
      marginRight: 8,
    },
    price: {
      // Handled by Text
    },
    mrp: {
      textDecorationLine: 'line-through',
      marginLeft: 6,
    },
    serviceRight: {
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    imageContainer: {
      width: 100,
      height: 90,
      borderRadius: 8,
      overflow: 'hidden',
      marginBottom: 8,
      // backgroundColor: theme.colors.backgroundTertiary,
    },
    serviceImage: {
      width: '100%',
      height: '100%',
    },
    buttonWrapper: {
      width: 100,
      alignItems: 'center',
      justifyContent: 'center',
    },
    bookBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(30, 99, 63, 0.08)',
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.colors.successDeep,
    },
    bookText: {
      marginLeft: 4,
    },
    imageContainerAdded: {
      // borderWidth: 2,
      // borderColor: '#2563EB',
    },
    addedBadge: {
      backgroundColor: 'rgba(30, 99, 63, 0.08)',
      borderColor: theme.colors.successDeep,
      borderWidth: 1,
    },
    addedRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    addedCircle: {
      width: 16,
      height: 16,
      borderRadius: 8,
      backgroundColor: theme.colors.successDeep,
      alignItems: 'center',
      justifyContent: 'center',
    },
    addedText: {
      fontFamily: theme.fontfamily.poppinsMedium,
    },
    tractorRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8,
      gap: 6,
    },
    tractorLogo: {
      width: 20,
      height: 20,
    },
    tractorText: {
      fontFamily: theme.fontfamily.poppinsRegular,
      fontSize: 12,
    },
    quantityText: {
      fontFamily: theme.fontfamily.poppinsRegular,
      fontSize: 12,
      color: theme.colors.black,
      textAlign: 'right',
    },
  });



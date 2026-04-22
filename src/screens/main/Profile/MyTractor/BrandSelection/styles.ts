import { StyleSheet, Dimensions } from 'react-native';
import { AppTheme } from '@theme';
import { SW, SH, SF } from '@utils/Dimensions';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - SW(60)) / 4; // 4 items per row

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      borderBottomLeftRadius: SW(20),
      borderBottomRightRadius: SW(20),
    },
    content: {
      flex: 1,
    },
    searchContainer: {
      paddingHorizontal: SW(16)
    },
    brandGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      paddingHorizontal: SW(20),
      marginTop: SH(20),
    },
    brandItem: {
      width: ITEM_WIDTH,
      alignItems: 'center',
      marginBottom: SH(20),
      marginHorizontal: SW(2.5),
    },
    logoContainer: {
      width: SW(64),
      height: SW(64),
      borderRadius: SW(8),
      backgroundColor: theme.colors.white,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.borderLight,
      marginBottom: SH(8),
      // Shadow
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    brandName: {
      textAlign: 'center',
      color: theme.colors.textPrimary,
      fontFamily: theme.fontfamily.robotoMedium,
      fontSize: SF(11),
    },
  });

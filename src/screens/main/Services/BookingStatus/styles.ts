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
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: SW(20),
      paddingTop: SH(10),
      height: SH(60),
    },
    backBtn: {
      padding: SW(5),
    },
    backIcon: {
      fontSize: SF(24),
      color: theme.colors.black,
    },
    cancelBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.dangerFaint,
      paddingHorizontal: SW(12),
      paddingVertical: SH(6),
      borderRadius: SW(20),
      gap: SW(6),
    },
    cancelText: {
      color: theme.colors.red,
      fontSize: SF(12),
      fontFamily: theme.fontfamily.robotoMedium,
    },
    content: {
      flexGrow: 1,
      paddingHorizontal: SW(20),
      alignItems: 'center',
    },
    illustrationContainer: {
      marginTop: SH(40),
      marginBottom: SH(20),
    },
    statusContainer: {
      alignItems: 'center',
      gap: SH(16),
      marginBottom: SH(60),
    },
    waitingText: {
      color: theme.colors.black,
      textAlign: 'center',
      paddingHorizontal: SW(40),
    },
    stepsContainer: {
      width: '100%',
      paddingHorizontal: SW(10),
    },
    stepsRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
    },
    stepItem: {
      alignItems: 'center',
      width: SW(80),
    },
    stepCircle: {
      width: SW(32),
      height: SW(32),
      borderRadius: SW(16),
      backgroundColor: theme.colors.gray100,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: theme.colors.gray300,
      marginBottom: SH(8),
    },
    stepCircleActive: {
      backgroundColor: theme.colors.white,
      borderColor: theme.colors.DeepGreen,
      borderWidth: 2,
    },
    stepCircleCompleted: {
      backgroundColor: theme.colors.DeepGreen,
      borderColor: theme.colors.DeepGreen,
    },
    stepNumber: {
      fontSize: SF(14),
      color: theme.colors.gray500,
      fontFamily: theme.fontfamily.robotoMedium,
    },
    stepNumberActive: {
      color: theme.colors.DeepGreen,
    },
    stepLabel: {
      fontSize: SF(10),
      color: theme.colors.gray500,
      textAlign: 'center',
      fontFamily: theme.fontfamily.robotoRegular,
    },
    stepLabelActive: {
      color: theme.colors.black,
      fontFamily: theme.fontfamily.robotoMedium,
    },
    completedBadge: {
      position: 'absolute',
      bottom: SH(25),
      right: SW(20),
      backgroundColor: theme.colors.DeepGreen,
      borderRadius: SW(10),
      padding: SW(2),
      borderWidth: 1,
      borderColor: theme.colors.white,
    },
    connector: {
      flex: 1,
      height: 2,
      backgroundColor: theme.colors.gray200,
      marginTop: SH(16),
    },
    connectorActive: {
      backgroundColor: theme.colors.DeepGreen,
    },
    modalContent: {
      padding: SW(20),
    },
    modalSubTitle: {
      fontSize: SF(14),
      color: theme.colors.black,
      fontFamily: theme.fontfamily.robotoMedium,
      marginBottom: SH(12),
    },
    reasonsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: SW(10),
      marginBottom: SH(20),
    },
    reasonItem: {
      paddingHorizontal: SW(12),
      paddingVertical: SH(8),
      borderRadius: SW(8),
      borderWidth: 1,
      borderColor: theme.colors.gray300,
    },
    reasonItemActive: {
      borderColor: theme.colors.DeepGreen,
      backgroundColor: theme.colors.DeepGreen + '10',
    },
    reasonText: {
      fontSize: SF(12),
      color: theme.colors.gray600,
    },
    reasonTextActive: {
      color: theme.colors.DeepGreen,
      fontFamily: theme.fontfamily.robotoMedium,
    },
    othersLabel: {
      fontSize: SF(14),
      color: theme.colors.black,
      fontFamily: theme.fontfamily.robotoMedium,
      marginBottom: SH(8),
    },
    othersInput: {
      borderWidth: 1,
      borderColor: theme.colors.gray200,
      borderRadius: SW(10),
      padding: SW(12),
      fontSize: SF(12),
      color: theme.colors.black,
      backgroundColor: theme.colors.gray50,
      marginBottom: SH(24),
      textAlignVertical: 'top',
    },
    confirmCancelBtn: {
      width: '100%',
      borderRadius: SW(10),
    },
  });

import { StyleSheet } from 'react-native';
import { AppTheme } from '@theme';

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
      paddingHorizontal: 16,
      paddingTop: 8,
      paddingBottom: 8,
    },
    backBtn: {
      padding: 4,
    },
    cancelBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.brandRedLight || '#FFF1F1',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      gap: 8,
    },
    cancelText: {
      color: theme.colors.red,
      fontSize: 14,
      fontFamily: theme.fontfamily.poppinsMedium,
    },
    content: {
      flexGrow: 1,
      paddingHorizontal: 20,
      alignItems: 'center',
      paddingBottom: 10,
    },
    illustrationContainer: {
      marginTop: 40,
      marginBottom: 20,
    },
    statusContainer: {
      alignItems: 'center',
      gap: 16,
      marginBottom: 60,
    },
    waitingText: {
      color: theme.colors.black,
      textAlign: 'center',
      paddingHorizontal: 40,
    },
    stepsContainer: {
      width: '100%',
      paddingHorizontal: 8,
    },
    stepsRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
    },
    stepItem: {
      alignItems: 'center',
      width: 110,
    },
    circleContainer: {
      width: 32,
      height: 32,
      marginBottom: 8,
      position: 'relative',
    },
    stepCircle: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: theme.colors.gray100,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: theme.colors.gray300,
      zIndex: 2,
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
      fontSize: 14,
      color: theme.colors.gray500,
      fontFamily: theme.fontfamily.poppinsMedium,
    },
    stepNumberActive: {
      color: theme.colors.DeepGreen,
    },
    stepLabel: {
      fontSize: 12,
      color: theme.colors.gray500,
      textAlign: 'center',
      fontFamily: theme.fontfamily.poppinsRegular,
      paddingHorizontal: 4,
    },
    stepLabelActive: {
      color: theme.colors.black,
      fontFamily: theme.fontfamily.poppinsMedium,
    },
    connector: {
      flex: 1,
      height: 4,
      backgroundColor: theme.colors.gray200,
      marginTop: 14,
      marginHorizontal: -40,
      zIndex: 1,
    },
    connectorActive: {
      backgroundColor: theme.colors.DeepGreen,
    },
    modalContent: {
      padding: 20,
    },
    modalSubTitle: {
      fontSize: 14,
      color: theme.colors.black,
      fontFamily: theme.fontfamily.poppinsMedium,
      marginBottom: 12,
    },
    reasonsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      marginBottom: 20,
    },
    reasonItem: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.colors.gray300,
    },
    reasonItemActive: {
      borderColor: theme.colors.DeepGreen,
      backgroundColor: theme.colors.DeepGreen + '10',
    },
    reasonText: {
      fontSize: 12,
      color: theme.colors.gray600,
    },
    reasonTextActive: {
      color: theme.colors.DeepGreen,
      fontFamily: theme.fontfamily.poppinsMedium,
    },
    othersLabel: {
      fontSize: 14,
      color: theme.colors.black,
      fontFamily: theme.fontfamily.poppinsMedium,
      marginBottom: 8,
    },
    othersInput: {
      borderWidth: 1,
      borderColor: theme.colors.gray200,
      borderRadius: 10,
      padding: 12,
      fontSize: 12,
      color: theme.colors.black,
      marginBottom: 24,
      textAlignVertical: 'top',
    },
    confirmCancelBtn: {
      width: '100%',
      borderRadius: 10,
    },
  });

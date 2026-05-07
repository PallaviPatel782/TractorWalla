import { StyleSheet } from 'react-native';
import { AppTheme } from '@theme';

export const createStyles = (theme: AppTheme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
        },
        card: {
            flexDirection: 'row',
            backgroundColor: theme.colors.background,
            padding: 12,
            borderRadius: 12,
            marginBottom: 12,
            alignItems: 'center',
            borderWidth: 1,
            borderColor: theme.colors.gray100,
            shadowColor: theme.colors.black,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,
        },
        iconBox: {
            width: 40,
            height: 40,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 12,
        },
        title: {
            fontSize: 14,
            fontFamily: theme.fontfamily.poppinsSemiBold,
            color: theme.colors.gray900,
        },
        desc: {
            fontSize: 12,
            fontFamily: theme.fontfamily.poppinsRegular,
            color: theme.colors.gray600,
            marginTop: 2,
        },
        time: {
            fontSize: 10,
            fontFamily: theme.fontfamily.poppinsRegular,
            color: theme.colors.gray400,
            marginLeft: 8,
        },
    });
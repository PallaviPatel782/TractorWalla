// styles.ts
import { SW, SH, SF } from '@utils/Dimensions';
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
            padding: SW(12),
            borderRadius: SW(12),
            marginBottom: SH(12),
            alignItems: 'center',
            borderWidth: 1,
            borderColor: theme.colors.gray100,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,
        },
        iconBox: {
            width: SW(40),
            height: SW(40),
            borderRadius: SW(8),
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: SW(12),
        },
        title: {
            fontSize: SF(14),
            fontFamily: theme.fontfamily.robotoSemiBold,
            color: theme.colors.gray900,
        },
        desc: {
            fontSize: SF(12),
            fontFamily: theme.fontfamily.robotoRegular,
            color: theme.colors.gray600,
            marginTop: SH(2),
        },
        time: {
            fontSize: SF(10),
            fontFamily: theme.fontfamily.robotoRegular,
            color: theme.colors.gray400,
            marginLeft: SW(8),
        },
    });
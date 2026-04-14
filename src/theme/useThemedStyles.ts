import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from './ThemeContext';
import type { AppTheme } from './index';

type NamedStyles<T> = {
    [P in keyof T]: object;
};

export const useThemedStyles = <T extends NamedStyles<T>>(
    styles: (theme: AppTheme) => T,
): T => {
    const { theme } = useTheme();

    return useMemo(() => {
        return StyleSheet.create(styles(theme));
    }, [styles, theme]);
};
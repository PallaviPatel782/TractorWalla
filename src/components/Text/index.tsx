import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';
import { useTheme } from '@theme';
import { SF } from '@utils/Dimensions';

export interface TextProps extends RNTextProps {
  variant?: 'thin' | 'light' | 'regular' | 'medium' | 'semiBold' | 'bold' | 'extraBold' | 'black';
  size?: number;
  color?: string;
  align?: 'left' | 'center' | 'right';
  fontFamily?: 'poppins' | 'roboto';
}

const Text: React.FC<TextProps> = ({
  children,
  variant = 'regular',
  size = 14,
  color,
  align = 'left',
  fontFamily = 'poppins',
  style,
  ...props
}) => {
  const { theme } = useTheme();

  const getFontFamily = () => {
    const capitalizedVariant = variant.charAt(0).toUpperCase() + variant.slice(1);
    const fontKey = `${fontFamily}${capitalizedVariant}` as keyof typeof theme.typography.fonts;
    return theme.typography.fonts[fontKey] || theme.typography.fonts.poppinsRegular;
  };

  const textStyle = {
    fontFamily: getFontFamily(),
    fontSize: SF(size),
    color: color || theme.colors.textPrimary,
    textAlign: align,
  };

  return (
    <RNText style={[textStyle, style]} {...props}>
      {children}
    </RNText>
  );
};

export default Text;


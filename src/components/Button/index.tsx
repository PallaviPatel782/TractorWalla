import React from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useTheme } from '@theme';
import { SW, SH, SF } from '@utils/Dimensions';
import Text from '../Text';
import TouchableOpacity from '../TouchableOpacity';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const { theme } = useTheme();

  const getBackgroundColor = () => {
    if (disabled) return theme.colors.gray300;
    if (variant === 'secondary') return theme.colors.secondary;
    if (variant === 'outline') return 'transparent';
    return theme.colors.DeepGreen;
  };

  const getBorderColor = () => {
    if (disabled) return theme.colors.gray300;
    if (variant === 'outline') return theme.colors.primary;
    return 'transparent';
  };

  const getTextColor = () => {
    if (variant === 'outline') return theme.colors.primary;
    return theme.colors.white;
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          borderWidth: variant === 'outline' ? 1 : 0,
        },
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <Text
          variant="medium"
          size={14}
          color={getTextColor()}
          align="center"
          style={[{ lineHeight: SH(20) }, textStyle]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SW(10),
    paddingVertical: SH(10),
    paddingHorizontal: SW(16),
  },
});

export default Button;


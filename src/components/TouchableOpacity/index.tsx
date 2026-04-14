import React, { memo, useCallback, useRef } from 'react';
import {
  TouchableOpacity as RNTouchableOpacity,
  TouchableOpacityProps as RNTouchableOpacityProps,
  StyleProp,
  ViewStyle,
  GestureResponderEvent,
} from 'react-native';

export interface TouchableOpacityProps extends RNTouchableOpacityProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  debounceTime?: number;
  disabled?: boolean;
}

const TouchableOpacityComponent: React.FC<TouchableOpacityProps> = ({
  children,
  onPress,
  style,
  debounceTime = 400,
  disabled,
  activeOpacity = 0.7,
  ...rest
}) => {
  const lastPressTime = useRef(0);

  // prevent double tap
  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      const now = Date.now();

      if (now - lastPressTime.current < debounceTime) return;

      lastPressTime.current = now;
      onPress?.(event);
    },
    [onPress, debounceTime],
  );

  return (
    <RNTouchableOpacity
      {...rest}
      disabled={disabled}
      onPress={handlePress}
      activeOpacity={disabled ? 1 : activeOpacity}
      style={[style, disabled && { opacity: 0.5 }]}
    >
      {children}
    </RNTouchableOpacity>
  );
};

/** prevent unnecessary rerenders */
const areEqual = (prev: TouchableOpacityProps, next: TouchableOpacityProps) => {
  return (
    prev.children === next.children &&
    prev.style === next.style &&
    prev.disabled === next.disabled &&
    prev.onPress === next.onPress
  );
};

const TouchableOpacity = memo(TouchableOpacityComponent, areEqual);

export default TouchableOpacity;


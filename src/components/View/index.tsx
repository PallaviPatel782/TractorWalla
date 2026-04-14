import React, { memo, useMemo } from 'react';
import {
  View as RNView,
  ViewProps as RNViewProps,
  ViewStyle,
  StyleProp,
  StyleSheet,
} from 'react-native';

export interface ViewProps extends RNViewProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * Optimized View Component
 * Prevents unnecessary layout recalculation
 */
const ViewComponent: React.FC<ViewProps> = ({
  children,
  style,
  ...rest
}) => {
  // normalize style reference
  const flattenedStyle = useMemo(
    () => StyleSheet.flatten(style) || undefined,
    [style]
  );

  return (
    <RNView style={flattenedStyle} {...rest}>
      {children}
    </RNView>
  );
};

/**
 * Custom comparison
 * Only rerender if meaningful props changed
 */
const areEqual = (prev: ViewProps, next: ViewProps) => {
  return (
    prev.children === next.children &&
    prev.style === next.style &&
    prev.pointerEvents === next.pointerEvents &&
    prev.accessibilityLabel === next.accessibilityLabel
  );
};

const View = memo(ViewComponent, areEqual);

export default View;


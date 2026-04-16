import React, { memo } from 'react';
import {
  ScrollView as RNScrollView,
  ScrollViewProps as RNScrollViewProps,
  StyleProp,
  ViewStyle,
} from 'react-native';

export interface ScrollViewProps extends RNScrollViewProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

/**
 * Standardized ScrollView Component
 */
const ScrollViewComponent: React.FC<ScrollViewProps> = ({
  children,
  style,
  contentContainerStyle,
  showsVerticalScrollIndicator = false,
  showsHorizontalScrollIndicator = false,
  ...rest
}) => {
  return (
    <RNScrollView
      style={style}
      contentContainerStyle={contentContainerStyle}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
      {...rest}
    >
      {children}
    </RNScrollView>
  );
};

const ScrollView = memo(ScrollViewComponent);

export default ScrollView;

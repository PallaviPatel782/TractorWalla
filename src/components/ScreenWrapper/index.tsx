import React, { ReactNode } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  ViewStyle,
  StatusBarStyle,
  Platform
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@theme';

interface ScreenWrapperProps {
  children: ReactNode;
  style?: ViewStyle;
  statusBarColor?: string;
  barStyle?: StatusBarStyle;
  backgroundColor?: string;
  withStep?: boolean;
}

const ScreenWrapper = ({
  children,
  style,
  statusBarColor,
  barStyle = 'dark-content',
  backgroundColor,
}: ScreenWrapperProps) => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  const finalBackgroundColor = backgroundColor || theme.colors.background;

  return (
    <View style={[
      styles.container,
      { backgroundColor: finalBackgroundColor }
    ]}>
      <StatusBar
        backgroundColor={statusBarColor || finalBackgroundColor}
        barStyle={barStyle}
        translucent={Platform.OS === 'android'}
      />

      <View style={[
        styles.innerContainer,
        {
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
          backgroundColor: finalBackgroundColor
        },
        style
      ]}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
  },
});

export default ScreenWrapper;

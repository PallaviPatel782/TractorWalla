import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '@theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ScreenFooterProps {
  children: React.ReactNode;
  containerStyle?: ViewStyle;
}

const ScreenFooter: React.FC<ScreenFooterProps> = ({ children, containerStyle }) => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.footer,
        {
          backgroundColor: theme.colors.white,
          paddingBottom: Math.max(insets.bottom, 10),
          borderTopColor: theme.colors.gray100,
        },
        containerStyle,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    paddingHorizontal: 20,
    paddingTop: 15,
    borderTopWidth: 1,
  },
});

export default ScreenFooter;

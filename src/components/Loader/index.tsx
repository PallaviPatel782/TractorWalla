import React, { memo } from 'react';
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  View,
  ViewStyle,
  StyleProp,
} from 'react-native';
import Text from '../Text';
import { useTheme } from '@theme';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface LoaderProps {
  visible: boolean;
  message?: string;
  overlayColor?: string;
  color?: string;
  size?: 'small' | 'large';
  containerStyle?: StyleProp<ViewStyle>;
  inline?: boolean;
}

// ─── Constants ────────────────────────────────────────────────────────────────
// These will be overridden by theme values if not provided as props


// ─── Main Component ───────────────────────────────────────────────────────────

const Loader: React.FC<LoaderProps> = ({
  visible,
  message,
  overlayColor,
  color,
  size = 'large',
  containerStyle,
  inline = false,
}) => {
  const { theme } = useTheme();
  
  const finalColor = color || theme.colors.danger;
  const finalOverlay = overlayColor || theme.colors.overlay;

  if (!visible) return null;

  const content = (
    <View style={styles.content}>
      <ActivityIndicator size={size} color={finalColor} />
      {message ? (
        <Text variant="medium" style={[styles.message, { color: finalColor }]}>
          {message}
        </Text>
      ) : null}
    </View>
  );

  if (inline) {
    return (
      <View style={[styles.inlineContainer, containerStyle]}>{content}</View>
    );
  }

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      statusBarTranslucent
      onRequestClose={() => {}}
    >
      <View style={[styles.overlay, { backgroundColor: finalOverlay }]}>
        {content}
      </View>
    </Modal>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.5,
  },
  content: {
    alignItems: 'center',
    gap: 12,
  },
  message: {
    fontSize: 14,
    letterSpacing: 0.2,
  },
  inlineContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
});

export default memo(Loader);

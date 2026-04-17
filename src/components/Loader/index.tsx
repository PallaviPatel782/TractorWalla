import React, { memo } from 'react';
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  View,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { SH, SF } from '@utils/Dimensions';
import Text from '../Text';

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

const DEFAULT_COLOR = '#C92A34';
const DEFAULT_OVERLAY = 'rgba(0, 0, 0, 0.45)';

// ─── Main Component ───────────────────────────────────────────────────────────

const Loader: React.FC<LoaderProps> = ({
  visible,
  message,
  overlayColor = DEFAULT_OVERLAY,
  color = DEFAULT_COLOR,
  size = 'large',
  containerStyle,
  inline = false,
}) => {
  if (!visible) return null;

  const content = (
    <View style={styles.content}>
      <ActivityIndicator size={size} color={color} />
      {message ? (
        <Text variant="medium" style={[styles.message, { color }]}>
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
      <View style={[styles.overlay, { backgroundColor: overlayColor }]}>
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
    gap: SH(12),
  },
  message: {
    fontSize: SF(14),
    letterSpacing: 0.2,
  },
  inlineContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SH(40),
  },
});

export default memo(Loader);

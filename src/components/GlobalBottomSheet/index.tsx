import React, { ReactNode } from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useTheme } from '@theme';
import Text from '../Text';
import { createStyles } from './GlobalBottomSheet.styles';
import { CloseIcon } from '@assets/icons';

export interface GlobalBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

const GlobalBottomSheet: React.FC<GlobalBottomSheetProps> = ({
  visible,
  onClose,
  title,
  children,
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={onClose}
        >
          <TouchableWithoutFeedback>
            <View style={styles.container}>
              {title && (
                <View style={styles.header}>
                  <Text style={styles.title}>{title}</Text>
                  <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                    <CloseIcon width={20} height={20} />
                  </TouchableOpacity>
                </View>
              )}
              {children}
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default GlobalBottomSheet;

import React, { ReactNode, useEffect, useRef, useState } from 'react';
import {
  Modal,
  KeyboardAvoidingView,
  Platform,
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { useTheme } from '@theme';
import { View, Text, TouchableOpacity } from '@components';
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

  const [showModal, setShowModal] = useState(visible);
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      setShowModal(true);
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start(() => setShowModal(false));
    }
  }, [visible, animatedValue]);

  const backdropOpacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [600, 0], // Using a fixed offset for slide animation
  });

  if (!showModal && !visible) return null;

  return (
    <Modal
      visible={showModal}
      transparent
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={{ flex: 1 }}>
          <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]} />
          <TouchableOpacity
            style={styles.overlay}
            activeOpacity={1}
            onPress={onClose}
          >
            <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
              <TouchableWithoutFeedback>
                <View>
                  {title && (
                    <View style={styles.header}>
                      <Text variant="semiBold" size={16} style={styles.title}>{title}</Text>
                      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <CloseIcon width={20} height={20} color={theme.colors.black} />
                      </TouchableOpacity>
                    </View>
                  )}
                  {children}
                </View>
              </TouchableWithoutFeedback>
            </Animated.View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    backdrop: {
      ...StyleSheet.absoluteFill,
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    overlay: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    container: {
      backgroundColor: theme.colors.white,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      paddingTop: 10,
      paddingBottom: 20,
      maxHeight: '90%',
      paddingHorizontal: 10
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.gray100,
      marginBottom: 10,
    },
    title: {
      color: theme.colors.textPrimary,
    },
    closeButton: {
      padding: 5,
    },
  });

export default GlobalBottomSheet;


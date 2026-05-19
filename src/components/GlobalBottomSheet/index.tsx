import React, { ReactNode } from 'react';
import {
  Modal,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { useTheme } from '@theme';
import { View, Text } from '@components';
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

  const handleClose = () => {
    Keyboard.dismiss();
    setTimeout(() => {
      onClose();
    }, 150);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
      statusBarTranslucent={true}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={handleClose}
        >
          <TouchableOpacity
            style={styles.container}
            activeOpacity={1}
            onPress={() => {}}
          >
            {title && (
              <View style={styles.header}>
                <Text variant="semiBold" size={16} style={styles.title}>{title}</Text>
                <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
                  <CloseIcon width={20} height={20} color={theme.colors.black} />
                </TouchableOpacity>
              </View>
            )}
            {children}
          </TouchableOpacity>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    container: {
      backgroundColor: theme.colors.white,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      paddingTop: 10,
      paddingBottom: 20,
      maxHeight: '90%',
      paddingHorizontal: 10,
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

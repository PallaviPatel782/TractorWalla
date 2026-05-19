import React from 'react';
import { Modal, Keyboard, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@theme';
import { View, Text } from '@components';
import { CloseIcon } from '@assets/icons';
import { createStyles } from './styles';

interface BookingCancelledModalProps {
  visible: boolean;
  onClose: () => void;
  onBookAgain: () => void;
}

const BookingCancelledModal: React.FC<BookingCancelledModalProps> = ({
  visible,
  onClose,
  onBookAgain,
}) => {
  const { t } = useTranslation();
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
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={handleClose}
      >
        <TouchableOpacity
          style={styles.content}
          activeOpacity={1}
          onPress={() => {}}
        >
          <View style={styles.cancelIconCircle}>
            <CloseIcon size={24} color={theme.colors.white} />
          </View>

          <Text variant="semiBold" size={16} color={theme.colors.black} style={styles.cancelledText}>
            {t('main.serviceFlow.bookingCancelled', 'Booking Cancelled')}
          </Text>
          <Text variant="regular" size={13} style={styles.cancelledSubText}>
            {t('main.serviceFlow.cancelledByCustomer', 'This booking has been cancelled by the customer')}
          </Text>

          <TouchableOpacity style={styles.bookAgainBtn} onPress={onBookAgain}>
            <Text variant="medium" size={14} color={theme.colors.white}>
              {t('main.serviceFlow.bookAgain', 'Book Again')}
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default BookingCancelledModal;

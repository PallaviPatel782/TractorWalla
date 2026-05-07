import React, { useState, useMemo } from 'react';
import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { View, Text, TouchableOpacity } from '@components';
import { useThemedStyles, AppTheme } from '@theme';

interface CustomDatePickerModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (start: Date | null, end: Date | null) => void;
  mode?: 'single' | 'range';
  minDate?: Date;
  maxDate?: Date;
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const DAYS_OF_WEEK = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const CustomDatePickerModal: React.FC<CustomDatePickerModalProps> = ({
  visible,
  onClose,
  onApply,
  mode = 'range',
  minDate,
  maxDate,
}) => {
  const styles = useThemedStyles(createStyles);
  const today = useMemo(() => new Date(), []);

  const isSameDay = (d1: Date, d2: Date) =>
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear();

  const isBeforeDay = (d1: Date, d2: Date) =>
    new Date(d1.getFullYear(), d1.getMonth(), d1.getDate()) <
    new Date(d2.getFullYear(), d2.getMonth(), d2.getDate());

  const isAfterDay = (d1: Date, d2: Date) =>
    new Date(d1.getFullYear(), d1.getMonth(), d1.getDate()) >
    new Date(d2.getFullYear(), d2.getMonth(), d2.getDate());

  const initialDate = useMemo(() => {
    if (minDate && isAfterDay(minDate, today)) {
      return new Date(minDate.getFullYear(), minDate.getMonth());
    }
    return new Date(today.getFullYear(), today.getMonth());
  }, [minDate, today]);

  const [currentDate, setCurrentDate] = useState(initialDate);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  React.useEffect(() => {
    if (visible) setCurrentDate(initialDate);
  }, [visible, initialDate]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const handleDayPress = (day: number) => {
    const selected = new Date(year, month, day);

    if (minDate && isBeforeDay(selected, minDate)) return;
    if (maxDate && isAfterDay(selected, maxDate)) return;

    if (mode === 'single') {
      setStartDate(selected);
      setEndDate(null);
      return;
    }

    if (!startDate || (startDate && endDate)) {
      setStartDate(selected);
      setEndDate(null);
    } else {
      if (selected < startDate) {
        setEndDate(startDate);
        setStartDate(selected);
      } else {
        setEndDate(selected);
      }
    }
  };

  const isDayInRange = (day: number) => {
    if (!startDate || !endDate) return false;
    const d = new Date(year, month, day);
    return d > startDate && d < endDate;
  };

  const handleApply = () => {
    onApply(startDate, endDate);
    onClose();
  };

  const renderDays = () => {
    const days = [];
    const totalSlots = Math.ceil((daysInMonth + firstDayOfMonth) / 7) * 7;

    for (let i = 0; i < totalSlots; i++) {
      const day = i - firstDayOfMonth + 1;
      const valid = day > 0 && day <= daysInMonth;

      if (!valid) {
        days.push(<View key={`e-${i}`} style={styles.dayCell} />);
        continue;
      }

      const dateObj = new Date(year, month, day);
      const isStart = startDate && isSameDay(dateObj, startDate);
      const isEnd = endDate && isSameDay(dateObj, endDate);
      const inRange = isDayInRange(day);
      const isToday = isSameDay(dateObj, today);

      const disabled =
        (minDate && isBeforeDay(dateObj, minDate)) ||
        (maxDate && isAfterDay(dateObj, maxDate));

      days.push(
        <View key={day} style={styles.dayCell}>
          {startDate && endDate && (isStart || isEnd || inRange) && (
            <View style={styles.rangeBackground} />
          )}

          <TouchableOpacity
            style={[
              styles.dayTouchable,
              (isStart || isEnd) && styles.selectedDay,
              isToday && !isStart && styles.todayDay,
            ]}
            disabled={disabled}
            onPress={() => handleDayPress(day)}
          >
            <Text
              variant={(isStart || isEnd) ? 'semiBold' : 'regular'}
              size={15}
              style={[
                styles.dayText,
                (isStart || isEnd) && styles.selectedText,
                disabled && styles.disabledText,
              ]}
            >
              {day}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
    return days;
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.drag} />

          <View style={styles.header}>
            <Text variant="semiBold" size={16} style={styles.month}>
              {MONTH_NAMES[month]} {year}
            </Text>
          </View>

          <View style={styles.weekRow}>
            {DAYS_OF_WEEK.map((d, i) => (
              <Text key={i} color="#888" style={styles.weekText}>{d}</Text>
            ))}
          </View>

          <View style={styles.grid}>{renderDays()}</View>

          <TouchableOpacity style={styles.button} onPress={handleApply}>
            <Text variant="semiBold" size={16} style={styles.buttonText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    backdrop: {
      ...StyleSheet.absoluteFill,
      backgroundColor: 'rgba(0,0,0,0.4)',
    },

    container: {
      flex: 1,
      justifyContent: 'flex-end',
    },

    card: {
      backgroundColor: theme.colors.white,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
    },

    drag: {
      width: 40,
      height: 4,
      borderRadius: 2,
      backgroundColor: theme.colors.gray100,
      alignSelf: 'center',
      marginBottom: 16,
    },

    header: {
      alignItems: 'center',
      marginBottom: 16,
    },

    month: {
      // styles handled by Text props
    },

    weekRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 8,
    },

    weekText: {
      // styles handled by Text props
    },

    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },

    dayCell: {
      width: '14.28%',
      aspectRatio: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },

    dayTouchable: {
      width: 36,
      height: 36,
      borderRadius: 18,
      alignItems: 'center',
      justifyContent: 'center',
    },

    selectedDay: {
      backgroundColor: theme.colors.DeepGreen + '80', // Using a variant or transparency
    },

    todayDay: {
      borderWidth: 1,
      borderColor: theme.colors.gray300,
    },

    dayText: {
      // styles handled by Text props
    },

    selectedText: {
      color: theme.colors.white,
    },

    disabledText: {
      color: theme.colors.gray300,
    },

    rangeBackground: {
      position: 'absolute',
      width: '100%',
      height: '80%',
      backgroundColor: theme.colors.DeepGreen + '30',
    },

    button: {
      marginTop: 20,
      backgroundColor: theme.colors.DeepGreen,
      paddingVertical: 14,
      borderRadius: 24,
      alignItems: 'center',
    },

    buttonText: {
      color: theme.colors.white,
    },
  });

export default CustomDatePickerModal;
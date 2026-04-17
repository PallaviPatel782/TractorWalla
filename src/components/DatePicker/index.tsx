import React, { useState, useMemo } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import { useThemedStyles, AppTheme } from '@theme';
import { SW, SH, SF } from '@utils/Dimensions';

interface CustomDatePickerModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (start: Date | null, end: Date | null) => void;
  mode?: 'single' | 'range';
}

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const DAYS_OF_WEEK = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const CustomDatePickerModal: React.FC<CustomDatePickerModalProps> = ({
  visible,
  onClose,
  onApply,
  mode = 'range',
}) => {
  const styles = useThemedStyles(createStyles);
  const today = new Date();
  
  const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth())); 
  const [startDate, setStartDate] = useState<Date | null>(null); 
  const [endDate, setEndDate] = useState<Date | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = useMemo(() => new Date(year, month + 1, 0).getDate(), [year, month]);
  const firstDayOfMonth = useMemo(() => new Date(year, month, 1).getDay(), [year, month]);

  const isCurrentOrFutureMonth = year > today.getFullYear() || (year === today.getFullYear() && month >= today.getMonth());

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1));
  };

  const handleNextMonth = () => {
    if (isCurrentOrFutureMonth) return;
    setCurrentDate(new Date(year, month + 1));
  };

  const handleDayPress = (day: number) => {
    const selectedDate = new Date(year, month, day);
    if (selectedDate > today) return; // Prevent future dates

    if (mode === 'single') {
      setStartDate(selectedDate);
      setEndDate(null);
      return;
    }

    if (!startDate || (startDate && endDate)) {
      setStartDate(selectedDate);
      setEndDate(null);
    } else if (startDate && !endDate) {
      if (selectedDate < startDate) {
        setEndDate(startDate);
        setStartDate(selectedDate);
      } else {
        setEndDate(selectedDate);
      }
    }
  };

  const isSameDay = (d1: Date, d2: Date) => {
    return (
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear()
    );
  };

  const isDayInRange = (day: number) => {
    if (!startDate || !endDate) return false;
    const current = new Date(year, month, day);
    return current > startDate && current < endDate;
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
      const isCurrentMonth = day > 0 && day <= daysInMonth;

      if (!isCurrentMonth) {
        days.push(<View key={`empty-${i}`} style={styles.dayCell} />);
        continue;
      }

      const currentDateObj = new Date(year, month, day);
      const isStart = startDate ? isSameDay(currentDateObj, startDate) : false;
      const isEnd = endDate ? isSameDay(currentDateObj, endDate) : false;
      const inRange = isDayInRange(day);
      const isToday = isSameDay(currentDateObj, today);
      const isFuture = currentDateObj > today;
      
      days.push(
        <View key={day} style={[styles.dayCell, styles.dayCellWrapper]}>
          {/* Highlight Range Background */}
          {startDate && endDate && (isStart || isEnd || inRange) && (
            <View
              style={[
                styles.rangeBackground,
                isStart && !isEnd ? styles.rangeBackgroundStart : {},
                isEnd && !isStart ? styles.rangeBackgroundEnd : {},
              ]}
            />
          )}

          <TouchableOpacity
            style={[
              styles.dayTouchable,
              (isStart || isEnd) && styles.dayTouchableSelected,
              !isStart && !isEnd && isToday && styles.dayTouchableToday,
            ]}
            onPress={() => handleDayPress(day)}
            disabled={isFuture}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.dayText,
                (isStart || isEnd) && styles.dayTextSelected,
                isFuture && styles.dayTextDisabled,
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
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      <View style={styles.bottomContainer}>
        <View style={styles.card}>
          <View style={styles.dragHandle} />
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.monthText}>
              {MONTH_NAMES[month]} {year}
            </Text>
            <View style={styles.arrowsContainer}>
              <TouchableOpacity onPress={handlePrevMonth} style={styles.arrowButton}>
                <Text style={styles.arrowText}>{'<'}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleNextMonth} style={[styles.arrowButton, isCurrentOrFutureMonth && styles.arrowButtonDisabled]} disabled={isCurrentOrFutureMonth}>
                <Text style={[styles.arrowText, isCurrentOrFutureMonth && styles.arrowTextDisabled]}>{'>'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Days of Week */}
          <View style={styles.daysOfWeekContainer}>
            {DAYS_OF_WEEK.map((day, idx) => (
              <Text key={`dow-${idx}`} style={styles.dayOfWeekText}>
                {day}
              </Text>
            ))}
          </View>

          {/* Calendar Grid */}
          <View style={styles.grid}>{renderDays()}</View>

          {/* Footer */}
          <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
            <Text style={styles.applyButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// --- Styles ---
const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    backdrop: {
      position: 'absolute',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.4)',
    },
    bottomContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    dragHandle: {
      width: SW(40),
      height: SH(4),
      borderRadius: SW(2),
      backgroundColor: '#DDDDDD',
      alignSelf: 'center',
      marginBottom: SH(16),
    },
    card: {
      backgroundColor: '#FFFFFF',
      borderTopLeftRadius: SW(20),
      borderTopRightRadius: SW(20),
      padding: SW(20),
      paddingBottom: SH(30), // extra padding for bottom safe area
      width: '100%',
      elevation: 16,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: SW(16),
      shadowOffset: { width: 0, height: SH(-4) },
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: SH(20),
    },
    monthText: {
      fontSize: SF(16),
      fontWeight: '600',
      color: '#1A1A1A',
    },
    arrowsContainer: {
      flexDirection: 'row',
      gap: SW(16),
    },
    arrowButton: {
      paddingHorizontal: SW(8),
    },
    arrowButtonDisabled: {
      opacity: 0.4,
    },
    arrowText: {
      fontSize: SF(16),
      color: '#1A1A1A',
      fontWeight: '600',
    },
    arrowTextDisabled: {
      color: '#A0A0A0',
    },
    daysOfWeekContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: SH(10),
    },
    dayOfWeekText: {
      fontSize: SF(14),
      color: '#8C8C8C',
      width: SW(40),
      textAlign: 'center',
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
    },
    dayCellWrapper: {
      position: 'relative',
    },
    dayCell: {
      width: `${100 / 7}%`,
      aspectRatio: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: SH(4),
    },
    rangeBackground: {
      position: 'absolute',
      top: '10%',
      bottom: '10%',
      left: 0,
      right: 0,
      backgroundColor: '#AEE4D4', // light teal
    },
    rangeBackgroundStart: {
      borderTopLeftRadius: SW(20),
      borderBottomLeftRadius: SW(20),
      left: '10%', // start from circle edge
    },
    rangeBackgroundEnd: {
      borderTopRightRadius: SW(20),
      borderBottomRightRadius: SW(20),
      right: '10%',
    },
    dayTouchable: {
      width: SW(36),
      height: SW(36),
      borderRadius: SW(18),
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1,
    },
    dayTouchableSelected: {
      backgroundColor: '#8BCDB6', // Darker teal circle
      borderWidth: 2,
      borderColor: '#8BCDB6', // In mock it's teal-ish, or primaryGreen
    },
    dayTouchableToday: {
      borderWidth: 1,
      borderColor: '#CCCCCC',
    },
    dayText: {
      fontSize: SF(15),
      color: '#1A1A1A',
    },
    dayTextDisabled: {
      color: '#CCCCCC',
    },
    dayTextSelected: {
      color: '#FFFFFF',
      fontWeight: '600',
    },
    applyButton: {
      backgroundColor: theme.colors.DeepGreen || '#1E5128', // Fallback to dark green
      borderRadius: SW(24),
      paddingVertical: SH(14),
      alignItems: 'center',
      marginTop: SH(20),
    },
    applyButtonText: {
      color: '#FFFFFF',
      fontSize: SF(16),
      fontWeight: '600',
    },
  });

export default CustomDatePickerModal;

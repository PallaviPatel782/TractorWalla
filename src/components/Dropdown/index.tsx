import Text from '@components/Text';
import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  FlatList,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { KeyboardArrowUpIcon } from '@assets/icons';
import { useThemedStyles } from '@theme/useThemedStyles';
import { useTheme, type AppTheme } from '@theme';
import { SW, SH, SF } from '@utils/Dimensions';
import { ActivityIndicator } from 'react-native';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DropdownOption {
  label: string;
  value: string | number | any;
  id?: string | number;
}

interface DropdownProps {
  options: DropdownOption[];
  selectedValue?: string | number;
  onSelect: (option: DropdownOption) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  error?: string;
  containerStyle?: ViewStyle;
  buttonStyle?: ViewStyle;
  buttonTextStyle?: TextStyle;
  dropdownStyle?: ViewStyle;
  itemStyle?: ViewStyle;
  itemTextStyle?: TextStyle;
  activeItemStyle?: ViewStyle;
  activeItemTextStyle?: TextStyle;
  renderRightIcon?: () => React.ReactNode;
  leftIcon?: React.ReactNode;
  loading?: boolean;
  labelStyle?: TextStyle;
}

// ─── Component ────────────────────────────────────────────────────────────────

const Dropdown: React.FC<DropdownProps> = ({
  options,
  selectedValue,
  onSelect,
  placeholder = 'Select',
  label,
  required,
  error,
  containerStyle,
  buttonStyle,
  buttonTextStyle,
  dropdownStyle,
  itemStyle,
  itemTextStyle,
  activeItemStyle,
  activeItemTextStyle,
  renderRightIcon,
  leftIcon,
  loading = false,
  labelStyle,
}) => {
  const { theme } = useTheme();

  const [visible, setVisible] = useState(false);
  const [dropdownTop, setDropdownTop] = useState(0);
  const [dropdownLeft, setDropdownLeft] = useState(0);
  const [dropdownWidth, setDropdownWidth] = useState(0);
  const SCREEN_HEIGHT = Dimensions.get('window').height;
  const SCREEN_WIDTH = Dimensions.get('window').width;
  const buttonRef = useRef<any>(null);
  const styles = useThemedStyles(createStyles);

  const selectedOption = options.find(opt => opt.value === selectedValue);

  const openDropdown = () => {
    buttonRef.current?.measure(
      (
        _fx: number,
        _fy: number,
        width: number,
        height: number,
        px: number,
        py: number,
      ) => {
        const dropdownHeight = Math.min(options.length * SH(44), SH(300));

        // ── Vertical: flip up if not enough space below
        const spaceBelow = SCREEN_HEIGHT - (py + height);
        const fitsBelow = spaceBelow >= dropdownHeight;
        const top = fitsBelow
          ? py + height // open downward
          : py - dropdownHeight; // flip upward

        // ── Horizontal: shift left if overflows right edge
        const estimatedWidth = Math.max(width, SW(140));
        const overflowsRight = px + estimatedWidth > SCREEN_WIDTH;
        const left = overflowsRight
          ? SCREEN_WIDTH - estimatedWidth - SW(16) // align to right edge with padding
          : px;


        setDropdownTop(top);
        setDropdownLeft(left);
        setDropdownWidth(estimatedWidth);
      },
    );
    setVisible(true);
  };

  const closeDropdown = () => setVisible(false);

  const handleSelect = (option: DropdownOption) => {
    onSelect(option);
    closeDropdown();
  };

  const renderItem = ({ item }: { item: DropdownOption }) => {
    const isActive = item.value === selectedValue;
    return (
      <TouchableOpacity
        style={[
          styles.dropdownItem,
          itemStyle,
          isActive && styles.dropdownItemActive,
          isActive && activeItemStyle,
        ]}
        onPress={() => handleSelect(item)}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.dropdownItemText,
            itemTextStyle,
            isActive && styles.dropdownItemTextActive,
            isActive && activeItemTextStyle,
          ]}
        >
          {item.label}
        </Text>
        {isActive && <View style={styles.activeDot} />}
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text variant="semiBold" size={12} style={[styles.label, labelStyle]}>
          {label}
          {required && <Text style={{ color: theme.colors.error }}> *</Text>}
        </Text>
      )}
      {/* Trigger Button */}
      <TouchableOpacity
        ref={buttonRef}
        style={[
          styles.button,
          buttonStyle,
          error ? { borderColor: theme.colors.error } : undefined,
          visible ? { borderColor: theme.colors.primary } : undefined
        ]}
        onPress={openDropdown}
        activeOpacity={0.8}
      >
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        <Text
          style={[
            styles.buttonText,
            buttonTextStyle,
            !selectedOption && !selectedValue && styles.placeholderText,
          ]}
        >
          {selectedOption ? selectedOption.label : (selectedValue || placeholder)}
        </Text>
        {loading ? (
          <ActivityIndicator size="small" color={theme.colors.brandRed} />
        ) : renderRightIcon ? (
          renderRightIcon()
        ) : (
          <View style={visible && styles.arrowUp}>
            <KeyboardArrowUpIcon color={theme.colors.neutral400} size={SF(16)} />
          </View>

        )}
      </TouchableOpacity>

      {error && (
        <Text size={12} color={theme.colors.error} style={styles.errorText}>
          {error}
        </Text>
      )}

      {/* Dropdown Modal */}
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={closeDropdown}
        statusBarTranslucent={true}
      >
        {/* Backdrop */}
        <TouchableOpacity
          style={styles.backdrop}
          onPress={closeDropdown}
          activeOpacity={1}
        />

        {/* Dropdown Menu */}
        <View
          style={[
            styles.dropdownMenu,
            dropdownStyle,
            {
              top: dropdownTop,
              left: dropdownLeft,
              minWidth: dropdownWidth,
            },
          ]}
        >
          <FlatList
            data={options}
            keyExtractor={item => (item.value || item.id)?.toString()}
            renderItem={renderItem}
            scrollEnabled={options.length > 6}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </Modal>
    </View>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      position: 'relative',
      width: '100%',
      marginBottom: SH(10),
    },
    label: {
      marginBottom: SH(4),
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.white,
      borderRadius: SW(10),
      paddingHorizontal: SW(12),
      borderWidth: 1.5,
      borderColor: theme.colors.borderLight,
      gap: SW(8),
      height: SH(44),
    },

    leftIcon: {
      marginRight: SW(4),
    },
    buttonText: {
      fontSize: SF(13),
      color: theme.colors.textPrimary,
      fontFamily: theme.fontfamily.poppinsRegular,
      flex: 1,
    },

    placeholderText: {
      color: theme.colors.gray400,
    },
    arrowUp: {
      transform: [{ rotate: '180deg' }],
    },
    backdrop: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    dropdownMenu: {
      position: 'absolute',
      backgroundColor: theme.colors.white,
      borderRadius: SW(10),
      borderWidth: 1.5,
      borderColor: theme.colors.borderLight,
      elevation: 5,
      shadowColor: theme.colors.black,
      shadowOpacity: 0.1,
      shadowRadius: SW(10),
      shadowOffset: { width: 0, height: SH(4) },
      overflow: 'hidden',
      maxHeight: SH(300),
      zIndex: 1000,
    },

    dropdownItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: SW(16),
      paddingVertical: SH(12),
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.gray100,
    },

    dropdownItemActive: {
      backgroundColor: theme.colors.brandRedLight,
    },
    dropdownItemText: {
      fontSize: SF(14),
      color: theme.colors.gray800,
      fontFamily: theme.fontfamily.poppinsRegular,
    },
    dropdownItemTextActive: {
      color: theme.colors.brandRedDark,
      fontFamily: theme.fontfamily.poppinsSemiBold,
    },
    activeDot: {
      width: SW(6),
      height: SW(6),
      borderRadius: SW(3),
      backgroundColor: theme.colors.brandRedDark,
    },
    errorText: {
      marginTop: SH(4),
    },
  });

export default Dropdown;

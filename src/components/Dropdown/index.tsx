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

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DropdownOption {
  label: string;
  value: string | number | any;
}

interface DropdownProps {
  options: DropdownOption[];
  selectedValue?: string | number;
  onSelect: (option: DropdownOption) => void;
  placeholder?: string;
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
}

// ─── Component ────────────────────────────────────────────────────────────────

const Dropdown: React.FC<DropdownProps> = ({
  options,
  selectedValue,
  onSelect,
  placeholder = 'Select',
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
      {/* Trigger Button */}
      <TouchableOpacity
        ref={buttonRef}
        style={[styles.button, buttonStyle]}
        onPress={openDropdown}
        activeOpacity={0.8}
      >
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        <Text
          style={[
            styles.buttonText,
            buttonTextStyle,
            !selectedOption && styles.placeholderText,
          ]}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
        {renderRightIcon ? (
          renderRightIcon()
        ) : (
          <View style={visible && styles.arrowUp}>
            <KeyboardArrowUpIcon color={theme.colors.neutral400} size={SF(16)} />
          </View>

        )}
      </TouchableOpacity>

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
            keyExtractor={item => item.value}
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
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.neutral50,
      borderRadius: SW(10),
      paddingHorizontal: SW(12),
      borderWidth: 1,
      borderColor: theme.colors.neutral200,
      gap: SW(8),
    },

    leftIcon: {
      marginRight: SW(5),
    },
    buttonText: {
      fontSize: SF(14),
      color: theme.colors.neutral900,
      fontWeight: '400',
      flex: 1,
    },

    placeholderText: {
      color: theme.colors.neutral400,
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
      borderWidth: 1,
      borderColor: theme.colors.neutral200,
      elevation: 2,
      shadowColor: theme.colors.black,
      shadowOpacity: 0.12,
      shadowRadius: SW(8),
      shadowOffset: { width: 0, height: SH(4) },
      overflow: 'hidden',
      maxHeight: SH(300),
    },

    dropdownItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: SW(16),
      paddingVertical: SH(12),
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.surface,
    },

    dropdownItemActive: {
      backgroundColor: theme.colors.brandRedLight,
    },
    dropdownItemText: {
      fontSize: SF(14),
      color: theme.colors.gray800,
      fontWeight: '400',
    },
    dropdownItemTextActive: {
      color: theme.colors.brandRedDark,
      fontWeight: '600',
    },
    activeDot: {
      width: SW(6),
      height: SH(6),
      borderRadius: SW(3),
      backgroundColor: theme.colors.brandRedDark,
    },

  });

export default Dropdown;

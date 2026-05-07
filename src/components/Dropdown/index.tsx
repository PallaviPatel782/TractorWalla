import Text from '@components/Text';
import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  FlatList,
  ViewStyle,
  TextStyle,
  StyleProp,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { KeyboardArrowUpIcon } from '@assets/icons';
import { useThemedStyles } from '@theme/useThemedStyles';
import { useTheme, type AppTheme } from '@theme';

// ─── Types ─────────────────────────────────────────

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
  containerStyle?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  buttonTextStyle?: StyleProp<TextStyle>;
  dropdownStyle?: StyleProp<ViewStyle>;
  itemStyle?: StyleProp<ViewStyle>;
  itemTextStyle?: StyleProp<TextStyle>;
  activeItemStyle?: StyleProp<ViewStyle>;
  activeItemTextStyle?: StyleProp<TextStyle>;
  renderRightIcon?: () => React.ReactNode;
  leftIcon?: React.ReactNode;
  loading?: boolean;
  labelStyle?: StyleProp<TextStyle>;
}

// ─── Component ─────────────────────────────────────

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
  const styles = useThemedStyles(createStyles);

  const [visible, setVisible] = useState(false);
  const [dropdownTop, setDropdownTop] = useState(0);
  const [dropdownLeft, setDropdownLeft] = useState(0);
  const [dropdownWidth, setDropdownWidth] = useState(0);

  const SCREEN_HEIGHT = Dimensions.get('window').height;
  const SCREEN_WIDTH = Dimensions.get('window').width;

  const buttonRef = useRef<any>(null);

  const selectedOption = options.find(opt => opt.value === selectedValue);

  const openDropdown = () => {
    buttonRef.current?.measure(
      (_fx: number, _fy: number, width: number, height: number, px: number, py: number) => {
        const dropdownHeight = Math.min(options.length * 44, 300);

        // Vertical
        const spaceBelow = SCREEN_HEIGHT - (py + height);
        const fitsBelow = spaceBelow >= dropdownHeight;

        const top = fitsBelow ? py + height + 4 : py - dropdownHeight - 4;

        // Horizontal
        const estimatedWidth = Math.max(width, 140);
        const overflowsRight = px + estimatedWidth > SCREEN_WIDTH;

        const left = overflowsRight
          ? SCREEN_WIDTH - estimatedWidth - 16
          : px;

        setDropdownTop(top);
        setDropdownLeft(left);
        setDropdownWidth(estimatedWidth);
      }
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
          isActive && styles.dropdownItemActive,
          itemStyle,
          isActive && activeItemStyle,
        ]}
        onPress={() => handleSelect(item)}
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
        <Text style={[styles.label, labelStyle]}>
          {label}
          {required && <Text style={{ color: theme.colors.error }}> *</Text>}
        </Text>
      )}

      {/* Button */}
      <TouchableOpacity
        ref={buttonRef}
        style={[
          styles.button,
          error && { borderColor: theme.colors.error },
          visible && { borderColor: theme.colors.primary },
          buttonStyle,
        ]}
        onPress={openDropdown}
      >
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

        <Text
          style={[
            styles.buttonText,
            !selectedOption && styles.placeholderText,
            buttonTextStyle,
          ]}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </Text>

        {loading ? (
          <ActivityIndicator size="small" color={theme.colors.primary} />
        ) : renderRightIcon ? (
          renderRightIcon()
        ) : (
          <View style={visible && styles.arrowUp}>
            <KeyboardArrowUpIcon size={16} color={theme.colors.gray400} />
          </View>
        )}
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}

      {/* Modal */}
      <Modal transparent visible={visible} animationType="fade" statusBarTranslucent>
        <TouchableOpacity style={styles.backdrop} onPress={closeDropdown} />

        <View
          style={[
            styles.dropdownMenu,
            {
              top: dropdownTop,
              left: dropdownLeft,
              minWidth: dropdownWidth,
            },
            dropdownStyle,
          ]}
        >
          <FlatList
            data={options}
            keyExtractor={(item, i) => (item.value || i).toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </Modal>
    </View>
  );
};

// ─── Styles ─────────────────────────────────────────

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      width: '100%',
      marginBottom: 12,
    },

    label: {
      marginBottom: 4,
      fontSize: 13,
      fontFamily: theme.fontfamily.poppinsSemiBold,
      color: theme.colors.textPrimary,
    },

    button: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.white,
      borderRadius: 10,
      paddingHorizontal: 12,
      height: 44,
      borderWidth: 1.5,
      borderColor: theme.colors.borderLight,
    },

    leftIcon: {
      marginRight: 6,
    },

    buttonText: {
      flex: 1,
      fontSize: 14,
      fontFamily: theme.fontfamily.poppinsRegular,
      color: theme.colors.textPrimary,
    },

    placeholderText: {
      color: theme.colors.gray400,
    },

    arrowUp: {
      transform: [{ rotate: '180deg' }],
    },

    backdrop: {
      ...StyleSheet.absoluteFill,
    },

    dropdownMenu: {
      position: 'absolute',
      backgroundColor: theme.colors.white,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.colors.borderLight,
      elevation: 5,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 3 },
      maxHeight: 300,
      overflow: 'hidden',
    },

    dropdownItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.gray100,
    },

    dropdownItemActive: {
      backgroundColor: theme.colors.brandRedLight,
    },

    dropdownItemText: {
      fontSize: 14,
      fontFamily: theme.fontfamily.poppinsRegular,
      color: theme.colors.gray800,
    },

    dropdownItemTextActive: {
      fontFamily: theme.fontfamily.poppinsSemiBold,
      color: theme.colors.brandRedDark,
    },

    activeDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: theme.colors.brandRedDark,
    },

    errorText: {
      marginTop: 4,
      fontSize: 12,
      color: theme.colors.error,
    },
  });

export default Dropdown;
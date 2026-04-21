import React, { memo, useState, useCallback, forwardRef } from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  Image,
} from 'react-native';
import { useTheme } from '@theme';
import { AppTheme } from '@theme';
import { SW, SH, SF } from '@utils/Dimensions';
import Text from '../Text';
import View from '../View';

export interface TextInputProps extends RNTextInputProps {
  label?: string;
  error?: string;
  wrapperStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  isMobile?: boolean;
  countryCode?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  hasBorder?: boolean;
  required?: boolean;
}


const TextInputComponent = forwardRef<RNTextInput, TextInputProps>(
  (
    {
      label,
      error,
      style,
      wrapperStyle,
      containerStyle,
      inputStyle,
      size = 'md',
      isMobile = false,
      countryCode = '+91',
      leftIcon,
      rightIcon,
      hasBorder = true,
      required = false,
      multiline,
      onFocus,
      onBlur,
      ...rest
    },
    ref,
  ) => {
    const { theme } = useTheme();
    const themedStyles = createStyles(theme);
    const [focused, setFocused] = useState(false);

    const handleFocus = useCallback(
      (e: any) => {
        setFocused(true);
        onFocus?.(e);
      },
      [onFocus],
    );

    const handleBlur = useCallback(
      (e: any) => {
        setFocused(false);
        onBlur?.(e);
      },
      [onBlur],
    );

    const PADDING_MAP = {
      xs: SH(2),
      sm: SH(4),
      md: SH(7),
      lg: SH(12),
    };

    return (
      <View style={[themedStyles.wrapper, wrapperStyle]}>
        {label && (
          <Text variant="medium" size={14} style={themedStyles.label}>
            {label}
            {required && <Text style={{ color: theme.colors.error }}> *</Text>}
          </Text>
        )}

        <View
          style={[
            themedStyles.inputContainer,
            {
              paddingVertical: PADDING_MAP[size],
              backgroundColor: theme.colors.white,
              borderWidth: hasBorder ? (containerStyle as any)?.borderWidth ?? 1.5 : 0,
              borderColor: error ? theme.colors.error : focused ? theme.colors.primary : theme.colors.borderLight,
              alignItems: multiline ? 'flex-start' : 'center',
            },
            containerStyle,
          ]}
        >
          {leftIcon && <View style={themedStyles.leftIcon}>{leftIcon}</View>}

          {isMobile && (
            <View style={themedStyles.countryCodeContainer}>
              <Image
                source={{ uri: 'https://flagcdn.com/w40/in.png' }}
                style={themedStyles.flag}
              />
              <Text variant="medium" style={themedStyles.countryCodeText}>
                {countryCode}
              </Text>
              <View style={[themedStyles.divider, { backgroundColor: theme.colors.borderLight }]} />
            </View>
          )}

          <RNTextInput
            ref={ref}
            multiline={multiline}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholderTextColor={theme.colors.gray400}
            style={[
              themedStyles.input,
              {
                color: theme.colors.textPrimary,
                fontFamily: theme.typography.fonts.robotoRegular,
              },
              inputStyle,
              style,
            ]}
            {...rest}
          />

          {rightIcon && <View style={themedStyles.rightIcon}>{rightIcon}</View>}
        </View>

        {error && (
          <Text size={12} color={theme.colors.error} style={themedStyles.errorText}>
            {error}
          </Text>
        )}
      </View>
    );
  },
);

const TextInput = memo(TextInputComponent);

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    wrapper: {
      width: '100%',
      marginBottom: SH(10),
    },
    label: {
      marginBottom: SH(2),
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: SW(10),
      paddingHorizontal: SW(12),
    },
    input: {
      flex: 1,
      paddingVertical: SH(5),
      textAlignVertical: 'center',
      fontSize: SF(13),
    },
    leftIcon: {
      marginRight: SW(SW(8)),
    },
    rightIcon: {
      marginLeft: SW(SW(8)),
    },
    countryCodeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    flag: {
      width: SW(25),
      height: SH(15),
      borderRadius: SW(2),
    },
    countryCodeText: {
      marginLeft: SW(8),
      paddingRight: SW(10),
      fontSize: SF(13),
      color: theme.colors.textPrimary,
      borderRightWidth: 1,
      borderRightColor: theme.colors.gray300
    },
    divider: {
      width: 1,
      height: '60%',
      marginHorizontal: SW(10),
    },
    errorText: {
      marginTop: SH(4),
    },
  });

export default TextInput;


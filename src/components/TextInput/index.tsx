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
  labelStyle?: StyleProp<TextStyle>;
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
      labelStyle,
      onChangeText,
      ...rest
    },
    ref,
  ) => {
    const { theme } = useTheme();
    const themedStyles = createStyles(theme);
    const [focused, setFocused] = useState(false);

    const handleChangeText = useCallback(
      (text: string) => {
        if (isMobile || rest.keyboardType === 'number-pad' || rest.keyboardType === 'phone-pad') {
          const filteredText = text.replace(/[^0-9]/g, '');
          onChangeText?.(filteredText);
        } else {
          onChangeText?.(text);
        }
      },
      [isMobile, rest.keyboardType, onChangeText],
    );

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

    const HEIGHT_MAP = {
      xs: 32,
      sm: 38,
      md: 44,
      lg: 50,
    };

    return (
      <View style={[themedStyles.wrapper, wrapperStyle]}>
        {label && (
          <Text variant="semiBold" size={13} style={[themedStyles.label, labelStyle]}>
            {label}
            {required && <Text style={{ color: theme.colors.error }}> *</Text>}
          </Text>
        )}

        <View
          style={[
            themedStyles.inputContainer,
            {
              height: multiline ? undefined : HEIGHT_MAP[size],
              minHeight: multiline ? 80 : undefined,
              backgroundColor: theme.colors.white,
              borderWidth: hasBorder ? (containerStyle as any)?.borderWidth ?? 1.5 : 0,
              borderColor: error ? theme.colors.error : focused ? theme.colors.DeepGreen : theme.colors.border,
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
              <View style={themedStyles.divider} />
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
                fontFamily: theme.typography.fonts.poppinsRegular,
                paddingTop: multiline ? 8 : 0,
                paddingBottom: multiline ? 8 : 0,
                textAlignVertical: multiline ? 'top' : 'center',
                height: '100%',
                includeFontPadding: false, // Fix Android vertical alignment
              },
              inputStyle,
              style,
            ]}
            onChangeText={handleChangeText}
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
      marginBottom: 5,
    },
    label: {
      marginBottom: 4,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 10,
      paddingHorizontal: 12,
    },
    input: {
      flex: 1,
      paddingVertical: 0,
      textAlignVertical: 'center',
      fontSize: 13,
    },
    leftIcon: {
      marginRight: 8,
    },
    rightIcon: {
      marginLeft: 8,
    },
    countryCodeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    flag: {
      width: 25,
      height: 15,
      borderRadius: 2,
    },
    countryCodeText: {
      marginLeft: 8,
      paddingRight: 8,
      fontSize: 13,
      color: theme.colors.textPrimary,
    },
    divider: {
      width: 1,
      height: '50%',
      backgroundColor: theme.colors.gray300,
      marginRight: 8,
    },
    errorText: {
      marginTop: 4,
    },
  });

export default TextInput;
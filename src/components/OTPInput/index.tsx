import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useTheme } from '@theme';

interface OTPInputProps {
  length?: number;
  onComplete: (otp: string) => void;
  onChange?: (otp: string) => void;
  error?: boolean;
}

const OTPInput: React.FC<OTPInputProps> = ({ length = 6, onComplete, onChange, error }) => {
  const { theme } = useTheme();
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(''));
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const inputs = useRef<TextInput[]>([]);

  const handleChange = (text: string, index: number) => {
    const cleanText = text.replace(/[^0-9]/g, '');

    // Handle pasted OTP (length > 1)
    if (cleanText.length > 1) {
      const pastedOtp = cleanText.slice(0, length).split('');
      const newOtp = [...otp];

      for (let i = 0; i < length; i++) {
        if (pastedOtp[i]) {
          newOtp[i] = pastedOtp[i];
        }
      }

      setOtp(newOtp);

      const nextFocusIndex = Math.min(cleanText.length - 1, length - 1);
      inputs.current[nextFocusIndex]?.focus();

      onChange?.(newOtp.join(''));
      if (newOtp.every(val => val !== '')) {
        onComplete(newOtp.join(''));
      }
      return;
    }

    // Normal single character entry
    const newOtp = [...otp];
    newOtp[index] = cleanText;
    setOtp(newOtp);

    if (cleanText && index < length - 1) {
      inputs.current[index + 1].focus();
    }

    onChange?.(newOtp.join(''));
    if (newOtp.every(val => val !== '')) {
      onComplete(newOtp.join(''));
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        onChange?.(newOtp.join(''));
        inputs.current[index - 1].focus();
      }
    }
  };

  return (
    <View style={styles.container}>
      {otp.map((_, index) => (
        <TextInput
          key={index}
          ref={ref => {
            inputs.current[index] = ref as TextInput;
          }}
          style={[
            styles.input,
            {
              backgroundColor: theme.colors.white,
              borderColor: error
                ? theme.colors.error
                : focusedIndex === index
                  ? theme.colors.DeepGreen
                  : otp[index]
                    ? theme.colors.DeepGreen
                    : theme.colors.gray300,
              color: theme.colors.textPrimary,
              fontFamily: theme.typography.fonts.poppinsRegular,
            },
          ]}
          maxLength={index === 0 ? length : 1} // Allow pasting full OTP in the first box
          keyboardType="number-pad"
          onFocus={() => setFocusedIndex(index)}
          onBlur={() => setFocusedIndex(null)}
          onChangeText={text => handleChange(text, index)}
          onKeyPress={e => handleKeyPress(e, index)}
          value={otp[index]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
  },
  input: {
    width: 38,
    height: 44,
    borderWidth: 1.5,
    borderRadius: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 20,
    padding: 0,
    marginHorizontal: 4,
    marginVertical: 2,
    includeFontPadding: false,
  },
});

export default OTPInput;

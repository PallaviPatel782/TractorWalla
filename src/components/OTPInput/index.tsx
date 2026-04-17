import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useTheme } from '@theme';
import { SW, SH, SF } from '@utils/Dimensions';

interface OTPInputProps {
  length?: number;
  onComplete: (otp: string) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ length = 6, onComplete }) => {
  const { theme } = useTheme();
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(''));
  const inputs = useRef<TextInput[]>([]);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < length - 1) {
      inputs.current[index + 1].focus();
    }

    if (newOtp.every(val => val !== '')) {
      onComplete(newOtp.join(''));
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
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
              borderColor: otp[index] ? theme.colors.greenBtn : theme.colors.borderLight,
              color: theme.colors.textPrimary,
              fontFamily: theme.typography.fonts.robotoRegular,
            },
          ]}
          maxLength={1}
          keyboardType="number-pad"
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
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: SH(20),
  },
  input: {
    width: SW(45),
    height: SW(48),
    borderWidth: 1.5,
    borderRadius: SW(10),
    textAlign: 'center',
    fontSize: SF(20),
    padding: 0,
  },
});

export default OTPInput;

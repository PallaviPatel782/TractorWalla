import React, { useState } from 'react';
import { useTheme } from '@theme';
import { SW, SH } from '@utils/Dimensions';
import {
  Text,
  Button,
  Header,
  KeyboardWrapper,
  ScreenWrapper,
  View,
  Input,
} from '@components';
import { LoginImage } from '@images';
import { createStyles } from './Login.styles';

const LoginScreen = ({ navigation }: any) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [mobileNumber, setMobileNumber] = useState('');

  const handleGetOtp = () => {
    if (mobileNumber.length === 10) {
      navigation.navigate('OtpVerification', { mobileNumber });
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Header />
        <KeyboardWrapper>
          <View style={styles.content}>
            <View style={styles.illustrationContainer}>
              <LoginImage width={SW(180)} height={SH(180)} />
            </View>

            <View style={styles.textSection}>
              <Text variant="bold" size={16} align="center">
                Get Your Tractor Back to Work
              </Text>
              <Text
                variant="medium"
                size={12}
                color={theme.colors.gray500}
                align="center"
                style={styles.subText}
              >
                Tractor Service Made Easy
              </Text>
            </View>

            <View style={styles.inputCard}>
              <Input
                label="Mobile Number"
                placeholder="Enter mobile number"
                keyboardType="number-pad"
                maxLength={10}
                isMobile={true}
                value={mobileNumber}
                onChangeText={setMobileNumber}
              />


              <Button
                title="GET OTP"
                onPress={handleGetOtp}
                disabled={mobileNumber.length !== 10}
                style={styles.button}
              />
            </View>

            <View style={styles.footerContainer}>
              <Text size={12} align="center" color={theme.colors.gray500}>
                By signing up, you agree to the{' '}
                <Text size={12} color={theme.colors.AzureBlue} variant="bold">Terms of Service</Text>
                {' '}and{' '}
                <Text size={12} color={theme.colors.AzureBlue} variant="bold">Privacy Policy</Text>.
              </Text>
            </View>
          </View>
        </KeyboardWrapper>
      </View>
    </ScreenWrapper>
  );
};

export default LoginScreen;



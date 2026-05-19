import React, { useState, useEffect } from 'react';
import { Platform, Keyboard, Linking } from 'react-native';
import { useTranslation } from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@theme';
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
import { useSendOtp } from '@screens/auth/hooks/useAuth';
import { createStyles } from './styles';
import { useSnackbarStore } from '@store/useSnackbarStore';

const TERMS_URL = 'https://tractorwalla.com/terms-and-conditions';
const PRIVACY_URL = "https://tractorwalla.com/privacy-policy";

const LoginScreen = ({ navigation }: any) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = createStyles(theme);
  const showSnackbar = useSnackbarStore(state => state.showSnackbar);
  const [mobileNumber, setMobileNumber] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const { mutate: sendOtp, isPending } = useSendOtp();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true),
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false),
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleGetOtp = () => {
    const trimmedNumber = mobileNumber.trim();
    if (trimmedNumber.length === 10) {
      sendOtp(
        { phone: trimmedNumber, countryCode: '91', role: 'customer' },
        {
          onSuccess: (response: any) => {
            showSnackbar({
              type: 'success',
              title: 'Success',
              description: response.message || response.data?.message || 'OTP sent successfully'
            });
            navigation.navigate('OtpVerification', { mobileNumber: trimmedNumber });
          },
          onError: (error: any) => {
            showSnackbar({
              type: 'error',
              title: 'Error',
              description: error.error || error.message || 'Failed to send OTP'
            });
          }
        }
      );
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <LinearGradient
          colors={[theme.colors.authGradientStart, theme.colors.authGradientEnd]}
          style={styles.gradientHeader}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        />
        <Header onPressLogo={() => { }} />
        <KeyboardWrapper keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
          <View style={styles.content}>
            <View style={[
              styles.illustrationContainer,
              isKeyboardVisible && { marginTop: 10 }
            ]}>
              <View style={[
                isKeyboardVisible && { width: 80, height: 80, borderRadius: 40 }
              ]}>
                <LoginImage
                  width={isKeyboardVisible ? 60 : 120}
                  height={isKeyboardVisible ? 60 : 120}
                />
              </View>
            </View>

            <View style={[styles.textSection, isKeyboardVisible && { marginTop: 10 }]}>
              <Text variant="bold" size={isKeyboardVisible ? 18 : 24} align="center" style={styles.title}>
                {t('auth.login.title')}
              </Text>
              {!isKeyboardVisible && (
                <Text
                  variant="medium"
                  size={14}
                  align="center"
                  style={styles.subText}
                >
                  {t('auth.login.subtitle')}
                </Text>
              )}
            </View>

            <View style={[styles.inputCard, isKeyboardVisible && { marginTop: 10 }]}>
              <View>
                <Input
                  label={t('auth.login.mobileLabel')}
                  placeholder={t('auth.login.mobilePlaceholder')}
                  keyboardType="number-pad"
                  maxLength={10}
                  isMobile={true}
                  value={mobileNumber}
                  onChangeText={setMobileNumber}
                />
              </View>

              <Button
                title={t('common.getOtp')}
                onPress={handleGetOtp}
                disabled={mobileNumber.length !== 10}
                loading={isPending}
                style={[styles.button, { width: '100%', marginTop: 20 }]}
              />

            </View>

            <View style={styles.footerContainer}>
              <Text size={12} align="center" color={theme.colors.gray500} style={styles.agreementText}>
                {t('auth.login.agreementText')}{' '}
                <Text size={12} variant="bold" style={styles.linkText} onPress={() => Linking.openURL(TERMS_URL)} >{t('auth.login.terms')}</Text>
                {' '}{t('auth.login.and')}{' '}
                <Text size={12} variant="bold" style={styles.linkText} onPress={() => Linking.openURL(PRIVACY_URL)}>{t('auth.login.privacy')}</Text>.
              </Text>
            </View>
          </View>
        </KeyboardWrapper>
      </View>
    </ScreenWrapper>
  );
};

export default LoginScreen;



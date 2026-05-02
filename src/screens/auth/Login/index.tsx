import React, { useState, useEffect } from 'react';
import { Platform, Keyboard } from 'react-native';
import { useTranslation } from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
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
import { useSendOtp } from '@screens/auth/hooks/useAuth';
import { createStyles } from './styles';

const LoginScreen = ({ navigation }: any) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = createStyles(theme);
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
    if (mobileNumber.length === 10) {
      sendOtp(
        { phone: mobileNumber, countryCode: '91', role: 'customer' },
        {
          onSuccess: () => {
            navigation.navigate('OtpVerification', { mobileNumber });
          },
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
        <KeyboardWrapper keyboardVerticalOffset={Platform.OS === 'ios' ? SH(60) : 0}>
          <View style={styles.content}>
            <View style={[
              styles.illustrationContainer,
              isKeyboardVisible && { marginTop: SH(10) }
            ]}>
              <View style={[

                isKeyboardVisible && { width: SW(80), height: SW(80), borderRadius: SW(40) }
              ]}>
                <LoginImage
                  width={isKeyboardVisible ? SW(60) : SW(120)}
                  height={isKeyboardVisible ? SH(60) : SH(120)}
                />
              </View>
            </View>

            <View style={[styles.textSection, isKeyboardVisible && { marginTop: SH(10) }]}>
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

            <View style={[styles.inputCard, isKeyboardVisible && { marginTop: SH(10) }]}>
              <View style={styles.inputWrapper}>
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
            </View>

            <View style={styles.footerContainer}>
              <Button
                title={t('common.getOtp')}
                onPress={handleGetOtp}
                disabled={mobileNumber.length !== 10}
                loading={isPending}
                style={[styles.button, { width: '100%', marginBottom: SH(20) }]}
              />
              <Text size={12} align="center" color={theme.colors.gray500} style={styles.agreementText}>
                {t('auth.login.agreementText')}{' '}
                <Text size={12} variant="bold" style={styles.linkText}>{t('auth.login.terms')}</Text>
                {' '}{t('auth.login.and')}{' '}
                <Text size={12} variant="bold" style={styles.linkText}>{t('auth.login.privacy')}</Text>.
              </Text>
            </View>
          </View>
        </KeyboardWrapper>
      </View>
    </ScreenWrapper>
  );
};

export default LoginScreen;



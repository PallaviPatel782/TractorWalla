import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
import { createStyles } from './styles';

const LoginScreen = ({ navigation }: any) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
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
                {t('auth.login.title')}
              </Text>
              <Text
                variant="medium"
                size={12}
                color={theme.colors.gray500}
                align="center"
                style={styles.subText}
              >
                {t('auth.login.subtitle')}
              </Text>
            </View>

            <View style={styles.inputCard}>
              <Input
                label={t('auth.login.mobileLabel')}
                placeholder={t('auth.login.mobilePlaceholder')}
                keyboardType="number-pad"
                maxLength={10}
                isMobile={true}
                value={mobileNumber}
                onChangeText={setMobileNumber}
              />


              <Button
                title={t('common.getOtp')}
                onPress={handleGetOtp}
                disabled={mobileNumber.length !== 10}
                style={styles.button}
              />
            </View>

            <View style={styles.footerContainer}>
              <Text size={12} align="center" color={theme.colors.gray500}>
                {t('auth.login.agreementText')}{' '}
                <Text size={12} color={theme.colors.AzureBlue} variant="bold">{t('auth.login.terms')}</Text>
                {' '}{t('auth.login.and')}{' '}
                <Text size={12} color={theme.colors.AzureBlue} variant="bold">{t('auth.login.privacy')}</Text>.
              </Text>
            </View>
          </View>
        </KeyboardWrapper>
      </View>
    </ScreenWrapper>
  );
};

export default LoginScreen;



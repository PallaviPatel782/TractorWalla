import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@theme';
import { SF } from '@utils/Dimensions';
import { Text, Button, View, TouchableOpacity, ScreenWrapper } from '@components';
import { createStyles } from './Home.styles';

const HomeScreen = () => {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const toggleLanguage = () => {
    const nextLng = i18n.language === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(nextLng);
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* <Text
          variant="bold"
          size={SF(20)}
          style={{ color: theme.colors.secondary }}
        >
          {t('welcome')} to TractorWalla
        </Text>

        <TouchableOpacity
          style={styles.langButton}
          onPress={toggleLanguage}
        >
          <Text color={theme.colors.primary}>
            {t('language')}: {i18n.language === 'en' ? 'English' : 'हिंदी'}
          </Text>
        </TouchableOpacity> */}
      </View>
    </ScreenWrapper>
  );
};

export default HomeScreen;


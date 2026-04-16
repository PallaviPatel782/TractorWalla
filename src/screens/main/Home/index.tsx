import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@theme';
import { View, ScreenWrapper, Text } from '@components';
import { createStyles } from './styles';

const HomeScreen = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = createStyles(theme);

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text variant="bold" size={20} color={theme.colors.primary} align="center">
          {t('main.home.title')}
        </Text>
      </View>
    </ScreenWrapper>
  );
};

export default HomeScreen;


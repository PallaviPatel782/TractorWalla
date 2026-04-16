import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@theme';
import { Text, SecondaryHeader, ScreenWrapper, View, ScrollView } from '@components';
import { createStyles } from './styles';

const PrivacyPolicy = ({ navigation }: any) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = createStyles(theme);

  const sections = useMemo(() => t('main.privacy_policy.sections', { returnObjects: true }) as any[], [t]);

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <SecondaryHeader
          title={t('main.about_menu.privacy_policy')}
          onBack={() => navigation.goBack()}
        />

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.textContent}>
            {sections.map((section, index) => (
              <View key={index} style={{ marginBottom: 20 }}>
                <Text variant="semiBold" size={14} color={theme.colors.gray900} style={{ marginBottom: 4 }}>
                  {section.title}
                </Text>
                <Text variant="regular" size={12} color={theme.colors.gray600} style={{ lineHeight: 18 }}>
                  {section.content}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

export default PrivacyPolicy;

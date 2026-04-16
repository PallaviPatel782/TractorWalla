import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@theme';
import { Text, SecondaryHeader, ScreenWrapper, View, ScrollView } from '@components';
import { createStyles } from './styles';

const TermsConditions = ({ navigation }: any) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = createStyles(theme);

  const points = useMemo(() => t('main.terms_conditions.points', { returnObjects: true }) as string[], [t]);

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <SecondaryHeader
          title={t('main.about_menu.terms_conditions')}
          onBack={() => navigation.goBack()}
        />

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.textContent}>
            {points.map((point, index) => (
              <View key={index} style={{ flexDirection: 'row', marginBottom: 16 }}>
                <Text style={{ marginRight: 8, marginTop: 2 }}>•</Text>
                <Text variant="regular" size={13} color={theme.colors.gray700} style={{ flex: 1, lineHeight: 20 }}>
                  {point}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

export default TermsConditions;

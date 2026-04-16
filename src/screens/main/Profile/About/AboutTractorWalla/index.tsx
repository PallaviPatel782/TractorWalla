import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@theme';
import { Text, SecondaryHeader, ScreenWrapper, View, ScrollView } from '@components';
import { createStyles } from './styles';
import { AppLogoWhiteImage } from '@assets/images';
import { SW, SH } from '@utils/Dimensions';

const AboutTractorWalla = ({ navigation }: any) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = createStyles(theme);

  const features = useMemo(() => t('main.profile.about_info.features', { returnObjects: true }) as string[], [t]);

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <SecondaryHeader
          title={t('main.about_menu.about_tractorwalla')}
          onBack={() => navigation.goBack()}
        />

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.logoContainer}>
            <View style={styles.logoTextContainer}>
              <AppLogoWhiteImage width={SW(140)} height={SH(80)} />
            </View>
          </View>

          <View style={styles.textContent}>
            <Text style={styles.description}>
              {t('main.profile.about_info.description')}
            </Text>

            <View style={styles.whyChooseTitle}>
              <Text size={16}>🚜 </Text>
              <Text variant="semiBold" color={theme.colors.gray900} size={14}>
                {t('main.profile.about_info.whyChoose')}
              </Text>
            </View>

            {features.map((feature, index) => (
              <View key={index} style={styles.listItem}>
                <Text style={styles.listIcon} color={theme.colors.gray900}>✓</Text>
                <Text style={styles.listText}>{feature}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

export default AboutTractorWalla;

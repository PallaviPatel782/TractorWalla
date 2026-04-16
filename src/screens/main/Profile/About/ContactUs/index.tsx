import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@theme';
import { Text, SecondaryHeader, ScreenWrapper, View, Input, Button, ScrollView } from '@components';
import { createStyles } from './styles'

const ContactUs = ({ navigation }: any) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = createStyles(theme);

  const [contactForm, setContactForm] = useState({
    phone: '',
    email: '',
  });

  const reasons = useMemo(() => t('main.contact_us.reasons', { returnObjects: true }) as string[], [t]);

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <SecondaryHeader
          title={t('main.about_menu.contact_us')}
          onBack={() => navigation.goBack()}
        />

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.textContent}>
            <Text variant="semiBold" size={16} color={theme.colors.gray900} style={{ marginBottom: 12 }}>
              {t('main.contact_us.helpTitle')}
            </Text>

            <Text variant="medium" size={14} color={theme.colors.primary} style={{ marginBottom: 8 }}>
              {t('main.contact_us.supportTeamPrompt')}
            </Text>

            {reasons.map((reason, index) => (
              <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                <Text style={{ marginRight: 8 }}>•</Text>
                <Text variant="regular" size={13} color={theme.colors.gray600}>{reason}</Text>
              </View>
            ))}

            <View style={{ marginTop: 24, gap: 16 }}>
              <Input
                label={t('main.contact_us.phoneLabel')}
                placeholder={t('main.contact_us.phonePlaceholder')}
                keyboardType="phone-pad"
                value={contactForm.phone}
                onChangeText={(val) => setContactForm({ ...contactForm, phone: val })}
              />
              <Input
                label={t('main.contact_us.emailLabel')}
                placeholder={t('main.contact_us.emailPlaceholder')}
                keyboardType="email-address"
                value={contactForm.email}
                onChangeText={(val) => setContactForm({ ...contactForm, email: val })}
              />
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Button
            title={t('main.about_menu.contact_us')}
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default ContactUs;

import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@theme';
import {
  Text,
  SecondaryHeader,
  ScreenWrapper,
  View,
  Input,
  Button,
  ScrollView,
  ImagePicker,
} from '@components';
import { createStyles } from './styles';

const ContactUs = ({ navigation }: any) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = createStyles(theme);

  const [message, setMessage] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);

  const handleSubmit = () => {
    // Submit message and photos
    navigation.goBack();
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <SecondaryHeader
          title={t('main.about_menu.contact_us')}
          onBack={() => navigation.goBack()}
        />

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.textContent}>
              <Text
                variant="semiBold"
                size={16}
                color={theme.colors.gray900}
                style={{ marginBottom: 12 }}
              >
                {t('main.contact_us.helpTitle')}
              </Text>

              <Text
                variant="medium"
                size={14}
                color={theme.colors.BLUE_BG}
                style={{ marginBottom: 24 }}
              >
                {t('main.contact_us.supportTeamPrompt')}
              </Text>

              <View style={{ gap: 16 }}>
                <Input
                  label={t('main.contact_us.messageLabel')}
                  placeholder={t('main.contact_us.messagePlaceholder')}
                  value={message}
                  onChangeText={setMessage}
                  multiline
                  required
                  style={{ minHeight: 150, textAlignVertical: 'top' }}
                />

                <View style={styles.photoSection}>
                  <ImagePicker
                    photos={photos}
                    onPhotosChange={setPhotos}
                    label={t('main.contact_us.addPhoto')}
                    maxPhotos={5}
                  />
                </View>
              </View>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <Button
              title={t('common.submit')}
              onPress={handleSubmit}
              disabled={!message.trim()}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </ScreenWrapper>
  );
};

export default ContactUs;

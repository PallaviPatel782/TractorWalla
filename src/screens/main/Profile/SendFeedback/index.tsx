import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@theme';
import {
  Text,
  Button,
  SecondaryHeader,
  ScreenWrapper,
  View,
  ScrollView,
  Input,
} from '@components';
import { createStyles } from './styles';
import { SH, SW } from '@utils/Dimensions';

const SendFeedback = ({ navigation }: any) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = createStyles(theme);

  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    // Implement feedback submission logic
    navigation.goBack();
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <SecondaryHeader
          title={t('main.profile.feedback.title')}
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
            <Text style={styles.description}>
              {t('main.profile.feedback.description')}
            </Text>

            <Input
              placeholder={t('main.profile.feedback.placeholder')}
              multiline
              value={feedback}
              onChangeText={setFeedback}
              containerStyle={{
                minHeight: SH(150),
                alignItems: 'flex-start',
                paddingTop: SH(10),
                paddingHorizontal: SW(10),
              }}
            />
          </ScrollView>

          <View style={styles.bottomContainer}>
            <Button
              title={t('main.profile.feedback.button')}
              onPress={handleSubmit}
              disabled={!feedback.trim()}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </ScreenWrapper>
  );
};

export default SendFeedback;

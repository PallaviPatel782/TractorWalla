import React, { useState, useMemo } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@theme';
import {
  Text,
  Button,
  Input,
  Dropdown,
  SecondaryHeader,
  ScreenWrapper,
  View,
  ScrollView,
  ImagePicker,
} from '@components';
import { createStyles } from './styles';

const ReportIssue = ({ navigation }: any) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = createStyles(theme);

  const ISSUE_OPTIONS = useMemo(() => [
    { label: t('main.profile.report.options.report_issue'), value: 'report_issue' },
    { label: t('main.profile.report.options.general_inquiry'), value: 'general_inquiry' },
    { label: t('main.profile.report.options.report_incident'), value: 'report_incident' },
    { label: t('main.profile.report.options.report_mechanic'), value: 'report_mechanic' },
  ], [t]);


  const [issueType, setIssueType] = useState('report_issue');
  const [message, setMessage] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);

  const handleSubmit = () => {
    navigation.goBack();
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <SecondaryHeader
          title={t('main.profile.report.title')}
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
            <View style={styles.formContainer}>
              <View style={{ zIndex: 10 }}>
                <Text variant="medium" size={14} color={theme.colors.gray900} style={{ marginBottom: 4 }}>
                  {t('main.profile.report.helpText')}
                </Text>
                <Dropdown
                  options={ISSUE_OPTIONS}
                  selectedValue={issueType}
                  onSelect={(opt) => setIssueType(opt.value)}
                  placeholder={t('main.profile.report.selectIssue')}
                  buttonStyle={styles.dropdownButton}
                />
              </View>

              <View style={{ zIndex: 1 }}>
                <Input
                  label={t('main.profile.report.message')}
                  placeholder={t('main.profile.report.placeholder')}
                  value={message}
                  onChangeText={setMessage}
                  multiline
                  style={{ minHeight: 150, textAlignVertical: 'top' }}
                />
              </View>

              <View style={[styles.photoSection, { zIndex: 1 }]}>
                <ImagePicker
                  photos={photos}
                  onPhotosChange={setPhotos}
                  label={t('main.profile.report.addPhoto')}
                  maxPhotos={5}
                />
              </View>
            </View>
          </ScrollView>

          <View style={styles.bottomContainer}>
            <View style={styles.supportContainer}>
              <Text style={styles.supportText}>{t('main.profile.report.needHelp')}</Text>
              <Text style={styles.supportText}>{t('main.profile.report.urgentHelp')}</Text>
              <View style={styles.supportEmailContainer}>
                <Text style={styles.supportEmailText}>{t('common.supportEmail')}</Text>
              </View>
            </View>

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

export default ReportIssue;


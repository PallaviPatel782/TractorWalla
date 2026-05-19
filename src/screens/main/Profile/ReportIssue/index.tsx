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
  ScreenFooter,
} from '@components';
import { createStyles } from './styles';
import { useReportIssue } from '../../hooks/useReportIssue';
import { useSnackbarStore } from '@store/useSnackbarStore';

const ReportIssue = ({ navigation }: any) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = createStyles(theme);
  const showSnackbar = useSnackbarStore(state => state.showSnackbar);

  const { mutate: reportIssue, isPending } = useReportIssue();

  const ISSUE_OPTIONS = useMemo(() => [
    { label: t('main.profile.report.options.report_issue'), value: 'report_issue' },
    { label: t('main.profile.report.options.general_inquiry'), value: 'general_inquiry_buy_sell_tractor' },
    { label: t('main.profile.report.options.report_incident'), value: 'report_incident' },
    { label: t('main.profile.report.options.report_mechanic'), value: 'report_mechanic' },
  ], [t]);


  const [issueType, setIssueType] = useState('report_issue');
  const [message, setMessage] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('category', issueType);
    formData.append('message', message.trim());

    if (photos && photos.length > 0) {
      photos.forEach((photoUri, index) => {
        const filename = photoUri.split('/').pop() || `photo_${index}.jpg`;
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : 'image/jpeg';
        
        formData.append('photos', {
          uri: Platform.OS === 'android' ? photoUri : photoUri.replace('file://', ''),
          name: filename,
          type: type,
        } as any);
      });
    }

    reportIssue(formData, {
      onSuccess: (response: any) => {
        showSnackbar({
          type: 'success',
          title: 'Success',
          description: response.message || response.data?.message || 'Issue reported successfully',
        });
        navigation.goBack();
      },
      onError: (error: any) => {
        showSnackbar({
          type: 'error',
          title: 'Error',
          description: error.error || error.message || 'Failed to report issue',
        });
      }
    });
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
              <Dropdown
                label={t('main.profile.report.helpText')}
                options={ISSUE_OPTIONS}
                selectedValue={issueType}
                onSelect={(opt) => setIssueType(opt.value)}
                placeholder={t('main.profile.report.selectIssue')}
              />

              <View style={{ zIndex: 1 }}>
                <Input
                  label={t('main.profile.report.message')}
                  placeholder={t('main.profile.report.placeholder')}
                  value={message}
                  onChangeText={setMessage}
                  multiline
                  required
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

          <ScreenFooter>
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
              disabled={!message.trim() || isPending}
              loading={isPending}
            />
          </ScreenFooter>
        </KeyboardAvoidingView>
      </View>
    </ScreenWrapper>
  );
};

export default ReportIssue;



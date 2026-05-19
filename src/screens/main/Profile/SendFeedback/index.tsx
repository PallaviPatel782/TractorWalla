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
  ScreenFooter,
} from '@components';
import { createStyles } from './styles';
import { useSubmitFeedback } from '../../hooks/useFeedback';
import { useSnackbarStore } from '@store/useSnackbarStore';

const SendFeedback = ({ navigation }: any) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = createStyles(theme);
  const showSnackbar = useSnackbarStore(state => state.showSnackbar);

  // const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('');

  const { mutate: submitFeedback, isPending } = useSubmitFeedback();

  // const ratings = [1, 2, 3, 4, 5];
  // const ratingLabels = [
  //   t('main.review.labels.poor', 'Poor'),
  //   t('main.review.labels.fair', 'Fair'),
  //   t('main.review.labels.average', 'Average'),
  //   t('main.review.labels.good', 'Good'),
  //   t('main.review.labels.excellent', 'Excellent')
  // ];

  const handleSubmit = () => {
    submitFeedback({
      // rating: rating,
      message: feedback.trim(),
    }, {
      onSuccess: (response: any) => {
        showSnackbar({
          type: 'success',
          title: 'Success',
          description: response.message || response.data?.message || 'Feedback submitted successfully',
        });
        navigation.goBack();
      },
      onError: (error: any) => {
        showSnackbar({
          type: 'error',
          title: 'Error',
          description: error.error || error.message || 'Failed to submit feedback',
        });
      }
    });
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

            {/* <Text style={styles.experienceLabel}>
              {t('main.review.experience', 'Rate your experience:')}{' '}
              <Text style={{ color: theme.colors.DeepGreen, fontWeight: '600' }}>
                {ratingLabels[rating - 1]}
              </Text>
            </Text> */}

            {/* <View style={styles.starsRow}>
              {ratings.map((star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() => setRating(star)}
                  activeOpacity={0.7}
                >
                  <Text style={[
                    styles.star,
                    { color: star <= rating ? theme.colors.GoldenYellow : theme.colors.gray300 }
                  ]}>
                    ★
                  </Text>
                </TouchableOpacity>
              ))}
            </View> */}

            <View>
              <Input
                placeholder={t('main.profile.feedback.placeholder')}
                multiline
                value={feedback}
                onChangeText={setFeedback}
                style={{
                  minHeight: 150,
                  textAlignVertical: 'top',
                }}
              />
            </View>
          </ScrollView>

          <ScreenFooter>
            <Button
              title={t('main.profile.feedback.button')}
              onPress={handleSubmit}
              disabled={!feedback.trim() || isPending}
              loading={isPending}
            />
          </ScreenFooter>
        </KeyboardAvoidingView>
      </View>
    </ScreenWrapper>
  );
};

export default SendFeedback;

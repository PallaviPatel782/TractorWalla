import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@theme';
import { useNavigation } from '@react-navigation/native';
import {
  Text,
  ScreenWrapper,
  View,
  ScrollView,
  Button,
  Input,
  SecondaryHeader,
} from '@components';
import { createStyles } from './styles';
import { LeaveReviewImage } from '@assets/images';
import { SW, SH } from '@utils/Dimensions';
import { TouchableOpacity } from 'react-native';

const LeaveReview = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation<any>();

  const [rating, setRating] = useState(3);
  const [feedback, setFeedback] = useState('');

  const ratings = [1, 2, 3, 4, 5];
  const ratingLabels = [
    t('main.review.labels.poor'),
    t('main.review.labels.fair'),
    t('main.review.labels.average'),
    t('main.review.labels.good'),
    t('main.review.labels.excellent')
  ];

  const onSubmit = () => {
    // Implement submission logic
    navigation.navigate('Main');
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <SecondaryHeader
          title={t('main.review.title')}
          onBack={() => navigation.goBack()}
        />

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.illustrationContainer}>
            <LeaveReviewImage width={SW(240)} height={SH(200)} />
          </View>

          <View style={styles.formCard}>
            <Text style={styles.label}>{t('main.review.addDetailedReview')}</Text>
            <Input
              placeholder={t('main.review.placeholder')}
              value={feedback}
              onChangeText={setFeedback}
              multiline
              numberOfLines={4}
              inputStyle={styles.textInput}
            />

            <Text style={styles.experienceLabel}>
              {t('main.review.experience')} <Text style={styles.ratingValueText}>{ratingLabels[rating - 1]}</Text>
            </Text>

            <View style={styles.starsRow}>
              {ratings.map((star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() => setRating(star)}
                >
                  <Text style={[
                    styles.star,
                    { color: star <= rating ? theme.colors.GoldenYellow : theme.colors.gray300 }
                  ]}>
                    ★
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Button
            title={t('common.submit')}
            onPress={onSubmit}
            backgroundColor={theme.colors.DeepGreen}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default LeaveReview;


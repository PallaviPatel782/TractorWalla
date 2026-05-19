import React, { useState, useEffect } from 'react';
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
  ScreenFooter,
} from '@components';
import { createStyles } from './styles';
import { LeaveReviewImage } from '@assets/images';
import { TouchableOpacity, Modal, BackHandler } from 'react-native';
import { SucessIcon } from '@assets/icons';

const LeaveReview = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation<any>();

  const [rating, setRating] = useState(4);
  const [feedback, setFeedback] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const ratings = [1, 2, 3, 4, 5];
  const ratingLabels = [
    t('main.review.labels.poor'),
    t('main.review.labels.fair'),
    t('main.review.labels.average'),
    t('main.review.labels.good'),
    t('main.review.labels.excellent')
  ];

  useEffect(() => {
    const backAction = () => {
      navigation.reset({
        index: 1,
        routes: [{ name: 'Main' }, { name: 'Bookings' }],
      });
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigation]);

  const onSubmit = () => {
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
      navigation.navigate('Main');
    }, 2000);
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <SecondaryHeader
          title={t('main.review.title')}
          onBack={() => navigation.reset({ index: 1, routes: [{ name: 'Main' }, { name: 'Bookings' }] })}
        />

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.illustrationContainer}>
            <LeaveReviewImage width={240} height={200} />
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

        <ScreenFooter>
          <Button
            title={t('common.submit')}
            onPress={onSubmit}
            backgroundColor={theme.colors.DeepGreen}
          />
        </ScreenFooter>

        <Modal visible={showSuccessModal} transparent animationType="fade">
          <View style={styles.successOverlay}>
            <View style={styles.successContent}>
              <View style={[styles.successIconCircle, { backgroundColor: theme.colors.DeepGreen + '20' }]}>
                <SucessIcon size={50} color={theme.colors.DeepGreen} />
              </View>
              <Text style={styles.successTitle}>{t('main.serviceFlow.thankYou')}</Text>
              <Text style={[styles.successSubTitle, { color: theme.colors.DeepGreen }]}>
                {t('main.review.successMsg', 'Review Submitted Successfully')}
              </Text>
            </View>
          </View>
        </Modal>
      </View>
    </ScreenWrapper>
  );
};

export default LeaveReview;


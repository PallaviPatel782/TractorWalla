import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@theme';
import {
  Text,
  ScreenWrapper,
  Button,
  GlobalBottomSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Input as TextInput,
} from '@components';
import { createStyles } from './styles';
import { BookingDetailBannerImage } from '@assets/images';
import { CheckIcon, CloseIcon } from '@assets/icons';
import { SW, SH } from '@utils/Dimensions';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@navigation/NavigationTypes';
import Loader from '@components/Loader';

const BookingStatus = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'BookingStatus'>>();
  const { bookingId, paymentType } = route.params || { bookingId: 'ID1234' };

  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [status, setStatus] = useState(1); // 1: Request Sent, 2: Mechanic Reviewing, 3: Awaiting Confirmation

  const reasons = [
    'Plan Change',
    'Found a better offer elsewhere',
    'Booked by mistake',
    'Others'
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setStatus(2);
    }, 2000);
    const timer2 = setTimeout(() => {
      setStatus(3);
    }, 4000);
    const timer3 = setTimeout(() => {
      navigation.navigate('TrackMechanic', { bookingId, paymentType });
    }, 6000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [navigation, bookingId, paymentType]);

  const onCancelBooking = () => {
    setCancelModalVisible(false);
    navigation.goBack();
  };

  const renderStep = (stepNumber: number, label: string, isCompleted: boolean, isActive: boolean) => (
    <View style={styles.stepItem}>
      <View style={[
        styles.stepCircle,
        isCompleted && styles.stepCircleCompleted,
        isActive && styles.stepCircleActive
      ]}>
        {isCompleted ? (
          <CheckIcon size={12} color={theme.colors.white} />
        ) : (
          <Text style={[styles.stepNumber, isActive && styles.stepNumberActive]}>{stepNumber}</Text>
        )}
      </View>
      <Text style={[styles.stepLabel, isActive && styles.stepLabelActive]}>{label}</Text>
      {isCompleted && (
        <View style={styles.completedBadge}>
          <CheckIcon size={10} color={theme.colors.white} />
        </View>
      )}
    </View>
  );

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelBadge}
            onPress={() => setCancelModalVisible(true)}
          >
            <Text style={styles.cancelText}>Cancel</Text>
            <CloseIcon size={12} color={theme.colors.red} />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.illustrationContainer}>
            <BookingDetailBannerImage width={SW(300)} height={SH(250)} />
          </View>

          <View style={styles.statusContainer}>
            <Loader visible={true} inline={true} />
            <Text variant="medium" size={16} style={styles.waitingText}>
              {t('main.serviceFlow.waitingConfirmation')}
            </Text>
          </View>

          <View style={styles.stepsContainer}>
            <View style={styles.stepsRow}>
              {renderStep(1, t('main.serviceFlow.requestSent'), status > 1, status === 1)}
              <View style={[styles.connector, status > 1 && styles.connectorActive]} />
              {renderStep(2, t('main.serviceFlow.mechanicReviewing'), status > 2, status === 2)}
              <View style={[styles.connector, status > 2 && styles.connectorActive]} />
              {renderStep(3, t('main.serviceFlow.awaitingConfirmation'), status > 3, status === 3)}
            </View>
          </View>
        </ScrollView>

        <GlobalBottomSheet
          visible={cancelModalVisible}
          onClose={() => setCancelModalVisible(false)}
          title={t('main.serviceFlow.cancelBooking')}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalSubTitle}>{t('main.serviceFlow.writeReason')}</Text>
            <View style={styles.reasonsGrid}>
              {reasons.map((reason) => (
                <TouchableOpacity
                  key={reason}
                  style={[
                    styles.reasonItem,
                    cancelReason === reason && styles.reasonItemActive
                  ]}
                  onPress={() => setCancelReason(reason)}
                >
                  <Text style={[
                    styles.reasonText,
                    cancelReason === reason && styles.reasonTextActive
                  ]}>
                    {reason}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.othersLabel}>{t('main.serviceFlow.others')}</Text>
            <TextInput
              style={styles.othersInput}
              placeholder={t('main.serviceFlow.othersPlaceholder')}
              placeholderTextColor={theme.colors.gray400}
              multiline
              numberOfLines={3}
            />

            <Button
              title={t('main.serviceFlow.cancelBooking')}
              onPress={onCancelBooking}
              style={styles.confirmCancelBtn}
              backgroundColor={theme.colors.red}
            />
          </View>
        </GlobalBottomSheet>
      </View>
    </ScreenWrapper>
  );
};

export default BookingStatus;

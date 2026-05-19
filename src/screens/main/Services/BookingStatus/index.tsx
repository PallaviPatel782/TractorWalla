import React, { useState, useEffect, useRef } from 'react';
import { Image } from 'react-native';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';
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
  BookingCancelledModal,
} from '@components';
import { createStyles } from './styles';
import { BookingDetailBannerImage } from '@assets/images';
import { ChevronBackwardIcon, CheckIcon, CloseIcon } from '@assets/icons';

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
  const isFocused = useIsFocused();

  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [otherReason, setOtherReason] = useState('');
  const [cancelSuccessVisible, setCancelSuccessVisible] = useState(false);
  const [status, setStatus] = useState(1); // 1: Request Sent, 2: Mechanic Reviewing, 3: Awaiting Confirmation

  const timer1Ref = useRef<any>(null);
  const timer2Ref = useRef<any>(null);
  const timer3Ref = useRef<any>(null);

  const cancelModalVisibleRef = useRef(cancelModalVisible);
  const cancelSuccessVisibleRef = useRef(cancelSuccessVisible);
  const isFocusedRef = useRef(isFocused);

  useEffect(() => {
    cancelModalVisibleRef.current = cancelModalVisible;
    cancelSuccessVisibleRef.current = cancelSuccessVisible;
    isFocusedRef.current = isFocused;
  }, [cancelModalVisible, cancelSuccessVisible, isFocused]);

  const reasons = [
    'Plan Change',
    'Found a better offer elsewhere',
    'Booked by mistake',
    'Others'
  ];


  const clearAllTimers = () => {
    if (timer1Ref.current) clearTimeout(timer1Ref.current);
    if (timer2Ref.current) clearTimeout(timer2Ref.current);
    if (timer3Ref.current) clearTimeout(timer3Ref.current);
  };

  useEffect(() => {
    if (isFocused && !cancelModalVisible && !cancelSuccessVisible) {
      clearAllTimers();

      if (status === 1) {
        timer1Ref.current = setTimeout(() => {
          if (isFocusedRef.current && !cancelModalVisibleRef.current && !cancelSuccessVisibleRef.current) {
            setStatus(2);
          }
        }, 2000);
      } else if (status === 2) {
        timer2Ref.current = setTimeout(() => {
          if (isFocusedRef.current && !cancelModalVisibleRef.current && !cancelSuccessVisibleRef.current) {
            setStatus(3);
          }
        }, 2000);
      } else if (status === 3) {
        timer3Ref.current = setTimeout(() => {
          if (isFocusedRef.current && !cancelModalVisibleRef.current && !cancelSuccessVisibleRef.current) {
            navigation.navigate('TrackMechanic', { bookingId, paymentType });
          }
        }, 2000);
      }
    } else {
      clearAllTimers();
    }

    return () => clearAllTimers();
  }, [isFocused, cancelModalVisible, cancelSuccessVisible, status, navigation, bookingId, paymentType]);


  const onCancelBooking = () => {
    clearAllTimers();
    setCancelModalVisible(false);
    setCancelSuccessVisible(true);
  };



  const renderStep = (stepNumber: number, label: string, isCompleted: boolean, isActive: boolean) => (
    <View style={styles.stepItem}>
      <View style={styles.circleContainer}>
        <View style={[
          styles.stepCircle,
          isCompleted && styles.stepCircleCompleted,
          isActive && styles.stepCircleActive
        ]}>
          {isCompleted ? (
            <CheckIcon size={16} color={theme.colors.white} />
          ) : (
            <Text style={[styles.stepNumber, isActive && styles.stepNumberActive]}>{stepNumber}</Text>
          )}
        </View>
      </View>
      <Text style={[styles.stepLabel, isActive && styles.stepLabelActive]}>{label}</Text>
    </View>
  );

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <ChevronBackwardIcon size={24} color={theme.colors.black} />
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
            <Image
              source={BookingDetailBannerImage}
              style={{ width: 217, height: 268, resizeMode: 'contain' }}
            />
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

            {cancelReason === 'Others' && (
              <TextInput
                label={t('main.serviceFlow.others')}
                placeholder={t('main.serviceFlow.othersPlaceholder')}
                placeholderTextColor={theme.colors.gray400}
                multiline
                value={otherReason}
                onChangeText={setOtherReason}
                containerStyle={{ marginBottom: 20 }}
              />
            )}


            <Button
              title={t('main.serviceFlow.cancelBooking')}
              onPress={onCancelBooking}
              style={styles.confirmCancelBtn}
              backgroundColor={theme.colors.red}
              disabled={!cancelReason || (cancelReason === 'Others' && !otherReason.trim())}
            />
          </View>
        </GlobalBottomSheet>

        <BookingCancelledModal
          visible={cancelSuccessVisible}
          onClose={() => setCancelSuccessVisible(false)}
          onBookAgain={() => {
            setCancelSuccessVisible(false);
            (navigation as any).navigate('Main', { screen: 'Services' });
          }}
        />

      </View>

    </ScreenWrapper>
  );
};

export default BookingStatus;

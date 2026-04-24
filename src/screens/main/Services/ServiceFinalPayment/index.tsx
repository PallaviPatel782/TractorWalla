import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@theme';
import {
  Text,
  ScreenWrapper,
  SecondaryHeader,
  Button,
  PaymentModal,
} from '@components';
import { SW, SH } from '@utils/Dimensions';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/NavigationTypes';
import { BillIcon, CheckIcon } from '@assets/icons';
import { OilImage } from '@assets/images';

import { createStyles } from './styles';

const ServiceFinalPayment = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<any>();
  const { bookingId } = route.params || { bookingId: 'ID1234' };

  const [paymentModalVisible, setPaymentModalVisible] = useState(false);

  const handleConfirmPayment = () => {
    setPaymentModalVisible(false);
    navigation.navigate('ServiceCompletion', { bookingId, paymentType: 'partial' });
  };

  return (
    <ScreenWrapper>
      <SecondaryHeader
        title={t('main.home.services.bookingDetails')}
        onBack={() => navigation.goBack()}
        backgroundColor={theme.colors.DeepGreen}
        titleColor={theme.colors.white}
      />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.bookingId}>#{t('main.bookings.details.id')}: {bookingId}</Text>

          <Text style={styles.sectionTitle}>{t('main.home.services.title')}</Text>

          <View style={styles.serviceCard}>
            <View style={styles.serviceInfo}>
              <Text style={styles.serviceName}>{t('main.bookings.services.basic')}</Text>
              {[
                t('main.bookings.features.engine_oil'),
                t('main.bookings.features.oil_filter'),
                t('main.bookings.features.air_filter'),
                t('main.bookings.features.brake_check')
              ].map((item, idx) => (
                <View key={idx} style={styles.bulletRow}>
                  <CheckIcon size={12} color={theme.colors.success} />
                  <Text style={styles.bulletText}>{item}</Text>
                </View>
              ))}
              <View style={styles.priceRow}>
                <View style={styles.ratingRow}>
                  <Text style={styles.starIcon}>★</Text>
                  <Text style={styles.ratingText}>4.9</Text>
                </View>
                <Text style={styles.mrp}>₹1880</Text>
              </View>
            </View>
            <View style={styles.imageContainer}>
              <OilImage width={SW(100)} height={SH(80)} style={styles.serviceImage} />
              <View style={[styles.addedBadge, { backgroundColor: theme.colors.success }]}>
                <CheckIcon size={10} color={theme.colors.white} />
                <Text style={styles.addedText}>{t('common.added')}</Text>
              </View>
            </View>
          </View>

          <View style={styles.billCard}>
            <View style={styles.billHeader}>
              <BillIcon size={20} color={theme.colors.black} />
              <Text style={styles.billTitle}>{t('main.home.services.billSummary')}</Text>
            </View>
            <View style={styles.divider} />

            <View style={styles.billRow}>
              <Text style={styles.billLabel}>{t('main.bookings.invoice.itemTotal')}</Text>
              <Text style={styles.billValue}>₹1500.00</Text>
            </View>
            <View style={styles.billRow}>
              <Text style={styles.billLabel}>{t('main.bookings.invoice.serviceFee')}</Text>
              <Text style={styles.billValue}>₹500.00</Text>
            </View>
            <View style={styles.billRow}>
              <Text style={[styles.billLabel, { color: theme.colors.success }]}>STEAL50</Text>
              <Text style={[styles.billValue, { color: theme.colors.success }]}>-₹120.00</Text>
            </View>
            <View style={styles.billRow}>
              <Text style={[styles.billLabel, { color: theme.colors.success }]}>{t('main.home.services.partialPayment')}</Text>
              <Text style={[styles.billValue, { color: theme.colors.success }]}>-₹1314.00</Text>
            </View>

            <View style={styles.dividerDashed} />

            <View style={styles.serviceFooter}>
              <View style={styles.ratingRow}>
                <Text style={styles.starIcon}>★</Text>
                <Text style={styles.ratingText}>4.9</Text>
              </View>
              <Text style={styles.price}>₹{t('main.bookings.invoice.taxNotice')}</Text>
              <Text style={styles.mrp}>{t('common.default')}</Text>
            </View>

            <View style={styles.billRow}>
              <Text style={styles.taxNote}>* {t('main.bookings.invoice.estimate')}</Text>
              <Text style={styles.taxValue}>₹4380.00</Text>
            </View>
          </View>

        </ScrollView>

        <View style={styles.footer}>
          <Button
            title={t('main.home.services.proceedToPay')}
            onPress={() => setPaymentModalVisible(true)}
            backgroundColor={theme.colors.DeepGreen}
          />
        </View>
      </View>

      <PaymentModal
        visible={paymentModalVisible}
        onClose={() => setPaymentModalVisible(false)}
        onConfirm={handleConfirmPayment}
      />
    </ScreenWrapper>
  );
};

export default ServiceFinalPayment;

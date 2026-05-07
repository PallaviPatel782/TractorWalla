import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@theme';
import {
  PaymentModal,
  BillSummary,
  ScreenFooter,
  Button,
  Text,
  ScreenWrapper,
  SecondaryHeader,
  ServiceCard,
} from '@components';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/NavigationTypes';
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

          <ServiceCard
            item={{
              title: t('main.bookings.services.basic'),
              features: [
                t('main.bookings.features.engine_oil'),
                t('main.bookings.features.oil_filter'),
                t('main.bookings.features.air_filter'),
                t('main.bookings.features.brake_check')
              ],
              rating: "4.9",
              price: 1500,
              mrp: 1880,
              image: OilImage
            }}
            onPress={() => { }}
            onBookPress={() => { }}
            containerStyle={{ borderRadius: 12, marginBottom: 20 }}
            showButton={false}
          />

          <BillSummary
            itemTotal={1500}
            serviceFee={500}
            discount={120}
            couponCode="STEAL50"
            partialPayment={1314}
            totalEstimate={4380}
          />

        </ScrollView>

        <ScreenFooter>
          <Button
            title={t('main.home.services.proceedToPay')}
            onPress={() => setPaymentModalVisible(true)}
            backgroundColor={theme.colors.DeepGreen}
          />
        </ScreenFooter>
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

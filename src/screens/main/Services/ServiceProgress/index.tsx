import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useRoute } from '@react-navigation/native';
import { useTheme } from '@theme';
import {
  Text,
  ScreenWrapper,
  View,
  SecondaryHeader,
  Button,
  TouchableOpacity,
  PaymentModal,
  SuccessOTPModal,
  BillSummary,
  ScreenFooter,
} from '@components';
import { createStyles } from './styles';
import { ServiceCard } from '@components';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/NavigationTypes';
import { DummyUserImage, Product1Image, Product2Image } from '@assets/images';
import { CheckIcon } from '@assets/icons';

const ServiceProgress = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<any>();
  const { bookingId, paymentType } = route.params || { bookingId: 'ID1234', paymentType: 'full' };

  // For demo: toggle between empty and populated state
  const [hasParts, setHasParts] = useState(true);
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [otpModalVisible, setOtpModalVisible] = useState(false);

  const [parts] = useState([
    {
      id: '1',
      vendor: 'Sharma Auto Parts',
      location: '1.5km away • Sector 18, Noida',
      rating: '4.3',
      title: 'Castrol Basic Kit',
      bullets: [
        'Bosch 27 Diesel Filter Kit',
        'Bosch 31 Engine Oil Filter',
        'Castrol Engine Oil 7.5 ltr CH4'
      ],
      price: 2883,
      mrp: 3139,
      image: Product1Image,
      quantity: 1
    },
    {
      id: '2',
      vendor: 'Sharma Auto Parts',
      location: '1.5km away • Sector 18, Noida',
      rating: '4.3',
      title: 'Advanced Brake Repair Kit',
      bullets: [
        'Brake Shoe Replacement',
        'Brake Drum Inspection',
        'Brake Cable Adjustment'
      ],
      price: 2883,
      mrp: 3139,
      image: Product2Image,
      quantity: 1
    }
  ]);

  const totalPartsPrice = parts.reduce((sum, p) => sum + (p.price * p.quantity), 0);

  const onProceedToPay = () => {
    if (hasParts) {
      setPaymentModalVisible(true);
    } else {
      // Toggle demo state
      setHasParts(true);
    }
  };

  const handleConfirmPayment = () => {
    setPaymentModalVisible(false);
    // Show OTP modal after payment success
    setTimeout(() => {
      setOtpModalVisible(true);
    }, 500);
  };

  const handleOTPContinue = () => {
    setOtpModalVisible(false);
    if (paymentType === 'full') {
      navigation.navigate('ServiceCompletion', { bookingId, paymentType });
    } else {
      navigation.navigate('ServiceFinalPayment', { bookingId });
    }
  };

  return (
    <ScreenWrapper>
      <SecondaryHeader
        title={t('main.serviceFlow.partsAdded', 'Parts added')}
        onBack={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.bookingId}>#{t('main.bookings.details.id')}: {bookingId}</Text>

          {/* Mechanic Card */}
          <TouchableOpacity
            style={styles.mechanicCard}
            onPress={() => setHasParts(!hasParts)} // Demo toggle
          >
            <DummyUserImage
              size={50}
            />
            <View style={styles.mechanicInfo}>
              <Text style={styles.mechanicName}>Rajat Tiwari</Text>
              <Text style={styles.mechanicStats}>120+ {t('main.home.jobsDone')} • ★ 4.9</Text>
            </View>
          </TouchableOpacity>

          {/* Basic Service Box */}
          <View style={styles.basicServiceCard}>
            <Text style={styles.basicServiceTitle}>Basic Service</Text>
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
                image: Product2Image
              }}
              onPress={() => { }}
              onBookPress={() => { }}
              containerStyle={{ borderWidth: 0, padding: 0 }}
              showButton={false}
            />

            <View style={[styles.divider]} />

            <View style={styles.basicServiceCostRow}>
              <Text style={styles.basicServiceCostLabel}>Service Fee (Labor)</Text>
              <Text style={styles.basicServiceCostValue}>₹1500.00</Text>
            </View>
            <View style={styles.basicServiceCostRow}>
              <Text style={[styles.basicServiceCostLabel, styles.basicServiceCostDiscount]}>STEAL50</Text>
              <Text style={[styles.basicServiceCostValue, styles.basicServiceCostDiscount]}>-₹120.00</Text>
            </View>
            <View style={styles.basicServiceCostRow}>
              <Text style={[styles.basicServiceCostLabel, styles.basicServiceCostDiscount]}>Partial Payment</Text>
              <Text style={[styles.basicServiceCostValue, styles.basicServiceCostDiscount]}>-₹1314.00</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
              <Text style={styles.taxNote}>* Taxes applicable at checkout</Text>
              <Text style={styles.taxNote}>Included</Text>
            </View>
          </View>

          {!hasParts ? (
            <View style={styles.emptyContainer}>
              <CheckIcon size={40} color={theme.colors.gray400} />
              <Text style={styles.emptyTitle}>{t('main.serviceFlow.noPartsAdded', 'No Parts added by mechanic yet')}</Text>
              <Text style={styles.emptySub}>
                Rajat is diagnosing your vehicle.{'\n'}
                Once issues are identified,{'\n'}
                proposed parts will appear here{'\n'}
                for your approval.
              </Text>
            </View>
          ) : (
            <>
              <Text style={styles.partsSectionTitle}>{t('main.serviceFlow.partsAddedByMechanic', 'Parts Added by Mechanic')}</Text>
              {parts.map((item) => (
                <ServiceCard
                  key={item.id}
                  item={item}
                  onPress={() => { }}
                  onBookPress={() => { }}
                  showButton={false}
                  containerStyle={{ marginBottom: 12 }}
                />
              ))}

              <View style={styles.redNoteBox}>
                <Text style={styles.redNoteText}>
                  Note: You are paying only for parts added by the mechanic. Service charges will be paid separately.
                </Text>
              </View>

              <BillSummary
                itemTotal={totalPartsPrice}
                itemLabel={t('main.serviceFlow.inventoryParts', 'inventory parts')}
                totalEstimate={totalPartsPrice}
              />
            </>
          )}
        </ScrollView>

        <ScreenFooter>
          <Button
            title={hasParts ? t('main.home.services.proceedToPay') : t('main.serviceFlow.viewCart', 'View Cart')}
            onPress={onProceedToPay}
            backgroundColor={theme.colors.DeepGreen}
          />
        </ScreenFooter>
      </View>

      <PaymentModal
        visible={paymentModalVisible}
        onClose={() => setPaymentModalVisible(false)}
        onConfirm={handleConfirmPayment}
        amount={totalPartsPrice}
      />

      <SuccessOTPModal
        visible={otpModalVisible}
        otp="457328"
        onClose={handleOTPContinue}
      />
    </ScreenWrapper>
  );
};

export default ServiceProgress;

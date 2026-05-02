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
} from '@components';
import { createStyles } from './styles';
import { CheckIcon, BillIcon } from '@assets/icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/NavigationTypes';
import { DummyUserImage, Product1Image, Product2Image, TractorImage } from '@assets/images';
import { SH, SW, SF } from '@utils/Dimensions';

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
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flex: 1 }}>
                <Text style={styles.basicServiceTitle}>Basic Service</Text>
                <View style={styles.partBullet}>
                  <CheckIcon size={12} color={theme.colors.success} />
                  <Text style={styles.partBulletText}>Engine oil change</Text>
                </View>
                <View style={styles.partBullet}>
                  <CheckIcon size={12} color={theme.colors.success} />
                  <Text style={styles.partBulletText}>Oil filter replacement</Text>
                </View>
                <View style={styles.partBullet}>
                  <CheckIcon size={12} color={theme.colors.success} />
                  <Text style={styles.partBulletText}>Air filter cleaning</Text>
                </View>
                <View style={styles.partBullet}>
                  <CheckIcon size={12} color={theme.colors.success} />
                  <Text style={styles.partBulletText}>Brake check & inspection</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: SH(6) }}>
                  <Text style={{ color: theme.colors.GoldenYellow, fontSize: SF(12) }}>★ 4.9</Text>
                  <Text style={[styles.partPrice, { marginLeft: SW(10) }]}>₹1500</Text>
                  <Text style={styles.partMrp}>₹1880</Text>
                </View>
              </View>
              <View style={[styles.partImage, { width: SW(70), height: SH(60) }]}>
                {/* Simulated service image */}
                <Product2Image size={60} />
              </View>
            </View>

            <View style={[styles.divider, { marginVertical: SH(16) }]} />

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

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: SH(8) }}>
              <Text style={styles.taxNote}>* Taxes applicable at checkout</Text>
              <Text style={styles.taxNote}>Included</Text>
            </View>
          </View>

          {!hasParts ? (
            <View style={styles.emptyContainer}>
              <BillIcon size={40} color={theme.colors.gray400} />
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
              {parts.map((item) => {
                const PartImage = item.image as any;
                return (
                  <View key={item.id} style={styles.partCard}>
                    <View style={styles.partBody}>
                      <View style={styles.partDetails}>
                        <Text style={styles.partTitle}>{item.title}</Text>
                        {item.bullets.map((bullet, idx) => (
                          <View key={idx} style={styles.partBullet}>
                            <CheckIcon size={12} color={theme.colors.success} />
                            <Text style={styles.partBulletText}>{bullet}</Text>
                          </View>
                        ))}
                        <View style={styles.partTractorRow}>
                          <TractorImage width={SW(20)} height={SH(15)} />
                          <Text style={styles.partTractorText}>Mahindra 575 DI</Text>
                        </View>
                        <View style={styles.partPriceRow}>
                          <Text style={styles.partPrice}>₹{item.price * item.quantity}</Text>
                          <Text style={styles.partMrp}>₹{item.mrp * item.quantity}</Text>
                        </View>
                      </View>
                      <View style={{ alignItems: 'center' }}>
                        <View style={styles.partImage}>
                          <PartImage size={70} />
                        </View>
                        <Text style={styles.staticQuantityText}>Qty : {item.quantity}</Text>
                      </View>
                    </View>
                  </View>
                );
              })}

              <View style={styles.redNoteBox}>
                <Text style={styles.redNoteText}>
                  Note: You are paying only for parts added by the mechanic. Service charges will be paid separately.
                </Text>
              </View>

              <View style={styles.billSummaryCard}>
                <View style={styles.billHeaderRow}>
                  <BillIcon size={20} />
                  <Text style={styles.billTitle}>{t('main.home.services.billSummary')}</Text>
                </View>
                <View style={styles.billRow}>
                  <Text style={styles.billLabel}>{t('main.serviceFlow.inventoryParts', 'inventory parts')}</Text>
                  <Text style={styles.billValue}>₹{totalPartsPrice.toFixed(2)}</Text>
                </View>
                <View style={styles.billRow}>
                  <Text style={styles.taxNote}>{t('main.bookings.invoice.taxNotice')}</Text>
                  <Text style={styles.taxNote}>Included</Text>
                </View>
                <View style={styles.dottedDivider} />
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>{t('main.bookings.invoice.totalEstimate', 'Total Estimate')}</Text>
                  <Text style={styles.totalValue}>₹{totalPartsPrice.toFixed(2)}</Text>
                </View>
              </View>
            </>
          )}
        </ScrollView>

        <View style={styles.footer}>
          <Button
            title={hasParts ? t('main.home.services.proceedToPay') : t('main.serviceFlow.viewCart', 'View Cart')}
            onPress={onProceedToPay}
            backgroundColor={theme.colors.DeepGreen}
          />
        </View>
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

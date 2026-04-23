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
} from '@components';
import { createStyles } from './styles';
import { CheckIcon, BillIcon } from '@assets/icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/NavigationTypes';
import { DummyUserImage, Product1Image, Product2Image } from '@assets/images';

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

  const [parts, setParts] = useState([
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

  const updateQuantity = (id: string, delta: number) => {
    setParts(prev => prev.map(p => {
      if (p.id === id) {
        const newQty = Math.max(1, p.quantity + delta);
        return { ...p, quantity: newQty };
      }
      return p;
    }));
  };

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

    if (paymentType === 'full') {
      // If full payment was chosen at checkout, we are done after paying parts
      navigation.navigate('ServiceCompletion', { bookingId, paymentType });
    } else {
      // If partial payment was chosen, we need one more "Booking Details" step for balance
      navigation.navigate('ServiceFinalPayment', { bookingId });
    }
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
              <Text style={styles.mechanicStats}>120+ {t('main.home.jobsDone')} • ★ 4.8</Text>
            </View>
          </TouchableOpacity>

          {!hasParts ? (
            <View style={styles.emptyContainer}>

              <Text style={styles.emptyTitle}>{t('main.serviceFlow.noServicesAdded')}</Text>
              <Text style={styles.emptySub}>
                {t('main.serviceFlow.diagnosingMsg')}
              </Text>
            </View>
          ) : (
            <>
              <Text style={styles.partsSectionTitle}>{t('main.serviceFlow.partsAdded')}</Text>
              {parts.map((item) => {
                const PartImage = item.image as any;
                return (
                  <View key={item.id} style={styles.partCard}>
                    <View style={styles.partHeader}>
                      <View>
                        <Text style={styles.partVendor}>{item.vendor}</Text>
                        <Text style={styles.partLocation}>{item.location}</Text>
                      </View>
                      <Text style={styles.partRating}>★ {item.rating}</Text>
                    </View>
                    <View style={styles.partBody}>
                      <View style={styles.partDetails}>
                        <Text style={styles.partTitle}>{item.title}</Text>
                        {item.bullets.map((bullet, idx) => (
                          <View key={idx} style={styles.partBullet}>
                            <CheckIcon size={12} color={theme.colors.success} />
                            <Text style={styles.partBulletText}>{bullet}</Text>
                          </View>
                        ))}
                        <View style={styles.partPriceRow}>
                          <Text style={styles.partPrice}>₹{item.price * item.quantity}</Text>
                          <Text style={styles.partMrp}>₹{item.mrp * item.quantity}</Text>
                        </View>
                      </View>
                      <View style={{ alignItems: 'flex-end' }}>
                        <View style={styles.partImage}>
                          <PartImage size={70} />
                        </View>
                        <View style={styles.quantityContainer}>
                          <TouchableOpacity onPress={() => updateQuantity(item.id, -1)}>
                            <Text style={styles.quantityBtn}>-</Text>
                          </TouchableOpacity>
                          <Text style={styles.quantityText}>{item.quantity}</Text>
                          <TouchableOpacity onPress={() => updateQuantity(item.id, 1)}>
                            <Text style={styles.quantityBtn}>+</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              })}

              <View style={styles.billSummaryCard}>
                <View style={styles.billHeaderRow}>
                  <BillIcon size={20} />
                  <Text style={styles.billTitle}>{t('main.home.services.billSummary')}</Text>
                </View>
                <View style={styles.billRow}>
                  <Text style={styles.billLabel}>{t('main.serviceFlow.inventoryParts')}</Text>
                  <Text style={styles.billValue}>₹{totalPartsPrice.toFixed(2)}</Text>
                </View>
                <View style={styles.billRow}>
                  <Text style={styles.taxNote}>* {t('main.bookings.invoice.taxNotice')}</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>{t('main.bookings.invoice.estimate')}</Text>
                  <Text style={styles.totalValue}>₹{totalPartsPrice.toFixed(2)}</Text>
                </View>
              </View>
            </>
          )}
        </ScrollView>

        <View style={styles.footer}>
          <Button
            title={hasParts ? t('main.home.services.proceedToPay') : t('main.serviceFlow.viewCart')}
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
    </ScreenWrapper>
  );
};

export default ServiceProgress;

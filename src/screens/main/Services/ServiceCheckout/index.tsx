import React, { useState, useMemo } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@theme';
import {
  SecondaryHeader,
  ScreenWrapper,
  Button,
  PaymentModal,
  Input,
  Image,
  BillSummary,
  ScreenFooter,
  ServiceCard,
} from '@components';
import { useAuthStore } from '@store/useAuthStore';
import * as Brands from '@assets/images';
import { LocationIcon, ChevronArrowIcon, BikeIcon, BillIcon } from '@assets/icons';
import { createStyles } from './styles';
import { SERVICES_DATA, IService } from '../dummyData';
import { useGetAllAddresses } from '../../hooks/useAddress';
import { useGetVehiclesByCustomerId } from '../../hooks/useVehicle';

const ServiceCheckoutScreen = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { serviceId, category } = route.params || {};

  const [issue, setIssue] = useState('');
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [paymentType, setPaymentType] = useState<'partial' | 'full'>('partial');

  const onProceedToPay = () => {
    setPaymentModalVisible(true);
  };

  const onConfirmPayment = () => {
    setPaymentModalVisible(false);
    navigation.navigate('BookingStatus', { bookingId: 'ID1234', paymentType: paymentType });
  };

  const user = useAuthStore((state) => state.user);
  const { data: vehiclesData } = useGetVehiclesByCustomerId();

  const tractors = useMemo(() => {
    const rawTractors = vehiclesData?.vehicles || vehiclesData?.data || user?.tractors || [];
    return rawTractors.map((tractor: any) => ({
      id: tractor._id || tractor.id,
      brand: tractor.brandId?.name || tractor.customBrandName || tractor.brand,
      model: tractor.modelId?.name || tractor.customModelName || tractor.model,
      registrationNo: tractor.registrationNo,
      yearOfManufacture: tractor.yearOfManufacture?.toString(),
      yearOfPurchase: tractor.yearOfPurchase?.toString(),
      tractorType: tractor.tractorType,
      logoUrl: tractor.brandId?.logoUrl || tractor.logoUrl,
      _original: tractor
    }));
  }, [vehiclesData, user?.tractors]);
  const { data: addressResponse } = useGetAllAddresses();
  const addresses = useMemo(() => {
    return addressResponse?.data?.addresses || addressResponse?.addresses || [];
  }, [addressResponse]);

  const [selectedAddress, setSelectedAddress] = useState<any>(null);

  // Address Selection Logic
  React.useEffect(() => {
    // Listen for manual selection from ManageAddress screen
    const { DeviceEventEmitter } = require('react-native');
    const subscription = DeviceEventEmitter.addListener('ADDRESS_SELECTED', (address: any) => {
      setSelectedAddress(address);
    });

    if (route.params?.selectedAddress) {
      setSelectedAddress(route.params.selectedAddress);
    } else if (!selectedAddress && addresses.length > 0) {
      const defaultAddress = addresses.find((addr: any) => addr.isDefault);
      setSelectedAddress(defaultAddress || addresses[0]);
    }

    return () => subscription.remove();
  }, [route.params?.selectedAddress, addresses, selectedAddress]);

  const [selectedTractor, setSelectedTractor] = useState<any>(null);

  // Tractor Selection Logic
  const prevTractorsLength = React.useRef(tractors.length);
  React.useEffect(() => {
    // Listen for manual selection from MyTractors screen
    const { DeviceEventEmitter } = require('react-native');
    const subscription = DeviceEventEmitter.addListener('TRACTOR_SELECTED', (tractor: any) => {
      setSelectedTractor(tractor);
    });

    if (route.params?.selectedTractor) {
      setSelectedTractor(route.params.selectedTractor);
    } else if (tractors.length > 0) {
      const currentSelectionInList = selectedTractor ? tractors.find((t: any) => (t.id || t._id) === (selectedTractor.id || selectedTractor._id)) : null;

      if (!selectedTractor || !currentSelectionInList) {
        setSelectedTractor(tractors[tractors.length - 1]);
      } else if (currentSelectionInList && JSON.stringify(currentSelectionInList) !== JSON.stringify(selectedTractor)) {
        setSelectedTractor(currentSelectionInList);
      }
    }
    prevTractorsLength.current = tractors.length;

    return () => subscription.remove();
  }, [route.params?.selectedTractor, tractors, selectedTractor]);



  const currentCategory = SERVICES_DATA.find(c => c.category === category);
  const service = currentCategory?.services.find(s => s.id === serviceId) as IService | undefined;
  const ServiceImage = service?.image;

  if (!service) {
    return (
      <ScreenWrapper>
        <SecondaryHeader title={t('main.bookings.details.title')} onBack={() => navigation.goBack()} />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>{t('main.bookings.details.serviceNotFound', 'Service Not Found')}</Text>
        </View>
      </ScreenWrapper>
    );
  }

  const appliedCoupon = route.params?.appliedCoupon;

  const billData = {
    itemTotal: parseFloat(service.price) || 0,
    addons: 500,
    labor: 500,
    discount: 0,
  };

  // Calculate discount based on applied coupon
  if (appliedCoupon?.code === 'STEAL50') {
    billData.discount = Math.min((billData.itemTotal + billData.addons + billData.labor) * 0.5, 500);
  } else if (appliedCoupon?.code === 'FLAT100') {
    billData.discount = 100;
  } else if (appliedCoupon?.code === 'DIWALI500') {
    billData.discount = 500;
  }

  const totalEstimate = billData.itemTotal + billData.addons + billData.labor - billData.discount;
  const payableNow = paymentType === 'partial' ? totalEstimate * 0.3 : totalEstimate;

  return (
    <ScreenWrapper style={styles.container} withBottomInset={false}>
      <SecondaryHeader
        title={t('main.home.services.bookingDetails', 'Booking Details')}
        onBack={() => navigation.goBack()}
        backgroundColor={theme.colors.DeepGreen}
        titleColor={theme.colors.white}
      />

      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }} contentContainerStyle={[styles.content, { paddingBottom: 10 }]}>
        <Text style={styles.bookingId}>#{t('main.bookings.details.id')}: ID1234</Text>

        <View style={styles.sectionCard}>
          <Text style={styles.serviceType}>{t('main.home.services.bookService_card', 'Book Service')}</Text>
          <ServiceCard
            item={{
              ...service,
              image: ServiceImage,
              strikePrice: service.mrp
            }}
            onPress={() => { }}
            onBookPress={() => { }}
            containerStyle={{ borderWidth: 0, padding: 0 }}
            isAdded={true}
          />
        </View>

        {/* Issue Description */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionTitleRow}>
            <BillIcon size={20} />
            <Text style={styles.sectionTitle}>{t('main.home.services.issueDesc')}</Text>
          </View>
          <Input
            inputStyle={styles.issueInput}
            placeholder={t('main.home.services.issuePlaceholder', 'Describe any issues or symptoms...')}
            multiline
            numberOfLines={3}
            value={issue}
            onChangeText={setIssue}
          />
        </View>

        {/* Select Tractor */}
        <TouchableOpacity
          style={styles.sectionCard}
          onPress={() => navigation.navigate('MyTractors', {
            isSelectionMode: true,
            selectedTractorId: selectedTractor?.id,
            serviceId,
            category
          })}
        >
          <View style={styles.selectorRow}>
            <View style={styles.selectorLeft}>
              <BikeIcon size={18} color={theme.colors.DeepGreen} />
              <Text style={styles.selectorText}>{t('main.home.services.selectTractor', 'Select Tractor')}</Text>
            </View>
            <ChevronArrowIcon size={18} color={theme.colors.DeepGreen} />
          </View>
          {selectedTractor ? (
            <View style={styles.selectionBox}>
              {selectedTractor?.logoUrl ? (
                <Image
                  source={{ uri: selectedTractor.logoUrl }}
                  style={{ width: 40, height: 30 }}
                  resizeMode="contain"
                  showLoader={false}
                />
              ) : (
                <Brands.OthersImage width={40} height={30} />
              )}
              <View style={styles.selectionInfo}>
                <Text style={styles.selectionTitle}>
                  {t(`common.brands.${selectedTractor.brand}`) === `common.brands.${selectedTractor.brand}` ? selectedTractor.brand : t(`common.brands.${selectedTractor.brand}`)} {selectedTractor.model}
                </Text>
              </View>
            </View>
          ) : (
            <View style={styles.selectionBox}>
              <Text style={styles.selectionTitle}>{t('main.home.services.noTractorSelected', 'No Tractor Selected')}</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Add Address */}
        <TouchableOpacity
          style={styles.sectionCard}
          onPress={() => navigation.navigate('ManageAddress', {
            isSelectionMode: true,
            selectedAddressId: selectedAddress?.id,
            serviceId,
            category
          })}
        >
          <View style={styles.selectorRow}>
            <View style={styles.selectorLeft}>
              <LocationIcon size={18} color={theme.colors.DeepGreen} />
              <Text style={styles.selectorText}>{t('main.manageAddress.title', 'Manage Address')}</Text>
            </View>
            <ChevronArrowIcon size={18} color={theme.colors.DeepGreen} />
          </View>
          <View style={styles.selectionInfo}>
            <Text style={styles.selectionSub}>
              {selectedAddress
                ? selectedAddress.address || [selectedAddress.addressLine, selectedAddress.city, selectedAddress.state].filter(Boolean).join(', ')
                : 'Select an address'}
            </Text>
            <TouchableOpacity style={styles.addAddressBtn} onPress={() => navigation.navigate('AddLocation')}>
              <Text style={{ color: theme.colors.danger, fontSize: 16 }}>+</Text>
              <Text style={styles.addAddressText}>{t('main.manageAddress.addNewFooter')}</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        {/* Coupons */}
        <TouchableOpacity style={styles.sectionCard} onPress={() => navigation.navigate('ApplyCoupons', { serviceId, category })}>
          <View style={styles.selectorRow}>
            <View style={styles.selectorLeft}>
              <Text style={styles.PercentageContainer}>%</Text>
              <Text style={styles.selectorText}>{t('main.home.services.applyCoupons')}</Text>
            </View>
            <ChevronArrowIcon size={18} color={theme.colors.DeepGreen} />
          </View>
          <View style={styles.couponBadge}>
            <Text style={styles.couponCode}>{appliedCoupon ? appliedCoupon.code : t('main.home.services.selectCoupon', 'SELECT COUPON')}</Text>
            {appliedCoupon && <Text style={styles.couponDesc}>{appliedCoupon.title}</Text>}
          </View>
        </TouchableOpacity>

        <View style={styles.savingBanner}>
          <Text style={[styles.PercentageContainer, {
            backgroundColor: theme.colors.white,
            color: theme.colors.red
          }]}>%</Text>
          <Text style={styles.savingText}>
            {billData.discount > 0
              ? t('main.home.services.savedMessage', { amount: billData.discount.toFixed(0) })
              : t('main.home.services.applyCouponToSave')}
          </Text>
        </View>

        {/* Bill Summary */}
        <BillSummary
          itemTotal={billData.itemTotal}
          serviceFee={billData.labor}
          discount={billData.discount}
          couponCode={appliedCoupon?.code}
          totalEstimate={totalEstimate}
        />

        {/* Payment Type */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>{t('main.home.services.paymentType')}</Text>
          <View style={styles.paymentTypeSection}>
            <View style={styles.paymentTypeRow}>
              <TouchableOpacity
                style={[styles.paymentOption, paymentType === 'partial' && styles.paymentOptionSelected]}
                onPress={() => setPaymentType('partial')}
              >
                <Text style={[styles.paymentOptionTitle, paymentType === 'partial' && styles.paymentOptionTitleSelected]}>
                  {t('main.home.services.partialPayment')}
                </Text>
                <Text style={[styles.paymentOptionSub, paymentType === 'partial' && styles.paymentOptionSubSelected]}>
                  {t('main.home.services.advanceText', '(Advance)')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.paymentOption, paymentType === 'full' && styles.paymentOptionSelected]}
                onPress={() => setPaymentType('full')}
              >
                <Text style={[styles.paymentOptionTitle, paymentType === 'full' && styles.paymentOptionTitleSelected]}>
                  {t('main.home.services.fullPayment')}
                </Text>
                <Text style={[styles.paymentOptionSub, paymentType === 'full' && styles.paymentOptionSubSelected]}>
                  {t('main.home.services.fullText', '(Full)')}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.payableCard}>
              <View>
                <Text style={styles.payableLabel}>
                  {t('main.home.services.payableNowText', 'Payable Now')}
                </Text>
                <Text style={styles.payableSub}>{t('main.home.services.balanceAtService', 'Balance at service')}</Text>
              </View>
              <Text style={styles.payableValue}>₹{payableNow.toFixed(2)}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <ScreenFooter>
        <Button
          title={t('main.home.services.proceedToPay')}
          onPress={onProceedToPay}
        />
      </ScreenFooter>

      <PaymentModal
        visible={paymentModalVisible}
        onClose={() => setPaymentModalVisible(false)}
        onConfirm={onConfirmPayment}
      />
    </ScreenWrapper>
  );
};

export default ServiceCheckoutScreen;

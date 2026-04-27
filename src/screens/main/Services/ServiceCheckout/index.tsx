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
} from '@components';
import { useAuthStore, Address } from '@store/useAuthStore';
import * as Brands from '@assets/images';
import { CheckIcon, LocationIcon, BillIcon, BikeIcon, ChevronArrowIcon } from '@assets/icons';
import { createStyles } from './styles';
import { SERVICES_DATA, IService } from '../dummyData';
import { SW, SH, SF } from '@utils/Dimensions';

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
  const tractors = useMemo(() => user?.tractors || [], [user?.tractors]);
  const userAddresses = useMemo(() => user?.addresses || [], [user?.addresses]);

  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const addresses = userAddresses;

  React.useEffect(() => {
    if (route.params?.selectedAddress) {
      setSelectedAddress(route.params.selectedAddress);
    } else if (!selectedAddress && addresses.length > 0) {
      setSelectedAddress(addresses[0]);
    }
  }, [route.params?.selectedAddress, addresses, selectedAddress]);

  // Get selected tractor from params or default to first tractor
  const [selectedTractor, setSelectedTractor] = useState<any>(null);
  const prevTractorsLength = React.useRef(tractors.length);

  React.useEffect(() => {
    if (route.params?.selectedTractor) {
      setSelectedTractor(route.params.selectedTractor);
    } else if (tractors.length > 0) {
      // Select the last one if nothing is selected OR a new tractor was added
      if (!selectedTractor || tractors.length > prevTractorsLength.current) {
        setSelectedTractor(tractors[tractors.length - 1]);
      }
    }
    prevTractorsLength.current = tractors.length;
  }, [route.params?.selectedTractor, tractors, selectedTractor]);

  const BRAND_LOGOS: Record<string, any> = {
    Mahindra: Brands.MahindraImage,
    Swaraj: Brands.SwarajImage,
    'John Deere': Brands.JohnDeereImage,
    Eicher: Brands.EicherImage,
    Sonalika: Brands.SonalikaImage,
    Solis: Brands.SolisImage,
    Captain: Brands.CaptainImage,
    VST: Brands.VstImage,
    Force: Brands.ForceImage,
    'New Holland': Brands.NewHollandImage,
    Farmtrac: Brands.FarmtracImage,
    Powertrac: Brands.PowertracImage,
    Kubota: Brands.KubotaImage,
    'Massey Ferguson': Brands.MasseyFergusonImage,
    Others: Brands.OthersImage,
  };

  const SelectedBrandLogo = selectedTractor ? (BRAND_LOGOS[selectedTractor.brand] || Brands.OthersImage) : Brands.OthersImage;

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

  const billSummary = {
    itemTotal: parseFloat(service.price) || 0,
    addons: 500,
    labor: 500,
    discount: 0,
  };

  // Calculate discount based on applied coupon
  if (appliedCoupon?.code === 'STEAL50') {
    billSummary.discount = Math.min((billSummary.itemTotal + billSummary.addons + billSummary.labor) * 0.5, 500);
  } else if (appliedCoupon?.code === 'FLAT100') {
    billSummary.discount = 100;
  } else if (appliedCoupon?.code === 'DIWALI500') {
    billSummary.discount = 500;
  }

  const totalEstimate = billSummary.itemTotal + billSummary.addons + billSummary.labor - billSummary.discount;
  const payableNow = paymentType === 'partial' ? totalEstimate * 0.3 : totalEstimate;

  return (
    <ScreenWrapper style={styles.container}>
      <SecondaryHeader
        title={t('main.home.services.bookingDetails', 'Booking Details')}
        onBack={() => navigation.goBack()}
        backgroundColor={theme.colors.DeepGreen}
        titleColor={theme.colors.white}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={styles.bookingId}>#{t('main.bookings.details.id')}: ID1234</Text>

        {/* Service Card */}
        <View style={styles.sectionCard}>
          <Text style={styles.serviceType}>{t('main.home.services.bookService_card', 'Book Service')}</Text>
          <View style={styles.serviceInfoRow}>
            <View style={styles.serviceDetails}>
              <Text style={styles.serviceTitle}>{service.title}</Text>
              {service.bullets?.slice(0, 3).map((bullet, idx) => (
                <View key={idx} style={styles.bulletRow}>
                  <CheckIcon size={14} color={theme.colors.success} />
                  <Text style={styles.bulletText}>{bullet}</Text>
                </View>
              ))}
              <View style={styles.ratingPriceRow}>
                <Text style={{ color: theme.colors.GoldenYellow }}>★</Text>
                <Text style={styles.ratingText}>{service.rating}</Text>
                <Text style={styles.priceText}>₹{service.price}</Text>
                <Text style={styles.strikePrice}>₹{service.mrp}</Text>
              </View>
            </View>
            <View style={styles.serviceImageWrapper}>
              {ServiceImage && <ServiceImage width={SW(130)} height={SH(105)} style={styles.serviceImage} />}
              <View style={styles.addedBadge}>
                <View style={styles.circle}>
                  <CheckIcon size={10} />
                </View>
                <Text style={styles.addedText}>{t('common.added')}</Text>
              </View>
            </View>
          </View>
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
              <SelectedBrandLogo width={SW(40)} height={SH(30)} />
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
            <Text style={styles.selectionSub}>{selectedAddress ? selectedAddress.address : 'Select an address'}</Text>
            <TouchableOpacity style={styles.addAddressBtn} onPress={() => navigation.navigate('AddLocation')}>
              <Text style={{ color: theme.colors.danger, fontSize: SF(16) }}>+</Text>
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
            {billSummary.discount > 0
              ? t('main.home.services.savedMessage', { amount: billSummary.discount.toFixed(0) })
              : t('main.home.services.applyCouponToSave')}
          </Text>
        </View>

        {/* Bill Summary */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionTitleRow}>
            <BillIcon size={20} />
            <Text style={styles.sectionTitle}>{t('main.home.services.billSummary')}</Text>
          </View>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>{t('main.bookings.invoice.itemTotal')}</Text>
            <Text style={styles.billValue}>₹{billSummary.itemTotal.toFixed(2)}</Text>
          </View>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>{t('main.home.services.addonsTotal', 'Add-ons total')}</Text>
            <Text style={styles.billValue}>₹{billSummary.addons.toFixed(2)}</Text>
          </View>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>{t('main.bookings.invoice.serviceFee')}</Text>
            <Text style={styles.billValue}>₹{billSummary.labor.toFixed(2)}</Text>
          </View>
          {appliedCoupon && (
            <View style={styles.billRow}>
              <Text style={[styles.billLabel, styles.discountLabel]}>{appliedCoupon.code}</Text>
              <Text style={[styles.billValue, styles.discountValue]}>-₹{billSummary.discount.toFixed(2)}</Text>
            </View>
          )}
          <View style={styles.billRow}>
            <Text style={styles.taxNote}>{t('main.bookings.invoice.taxNotice')}</Text>
            <Text style={styles.taxNote}>{t('common.included', 'Included')}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>{t('main.bookings.invoice.estimate')}</Text>
            <Text style={styles.totalValue}>₹{totalEstimate.toFixed(2)}</Text>
          </View>
        </View>

        {/* Payment Type */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>{t('main.home.services.paymentType')}</Text>
          <View style={styles.paymentTypeSection}>
            <View style={styles.paymentTypeRow}>
              <TouchableOpacity
                style={[styles.paymentOption, paymentType === 'partial' && styles.paymentOptionSelected]}
                onPress={() => setPaymentType('partial')}
              >
                <Text style={styles.paymentOptionTitle}>{t('main.home.services.partialPayment')}</Text>
                <Text style={styles.paymentOptionSub}>(30% Advance)</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.paymentOption, paymentType === 'full' && styles.paymentOptionSelected]}
                onPress={() => setPaymentType('full')}
              >
                <Text style={styles.paymentOptionTitle}>{t('main.home.services.fullPayment')}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.payableCard}>
              <View>
                <Text style={styles.payableLabel}>{t('main.home.services.payableNow', 'Payable Now (30%)')}</Text>
                <Text style={styles.payableSub}>{t('main.home.services.balanceAtService', 'Balance at service')}</Text>
              </View>
              <Text style={styles.payableValue}>₹{payableNow.toFixed(2)}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title={t('main.home.services.proceedToPay')}
          onPress={onProceedToPay}
        />
      </View>

      <PaymentModal
        visible={paymentModalVisible}
        onClose={() => setPaymentModalVisible(false)}
        onConfirm={onConfirmPayment}
      />
    </ScreenWrapper>
  );
};

export default ServiceCheckoutScreen;

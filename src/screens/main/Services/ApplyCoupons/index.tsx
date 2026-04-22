import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  FlatList,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@theme';
import {
  SecondaryHeader,
  ScreenWrapper,
} from '@components';
import { createStyles } from './styles';
import { SH } from '@utils/Dimensions';

const COUPONS = [
  {
    id: '1',
    code: 'STEAL50',
    title: '50% OFF up to ₹500',
    description: 'Valid on service bookings above ₹999',
  },
  {
    id: '2',
    code: 'FLAT100',
    title: 'Flat ₹100 OFF',
    description: 'Get flat discount on your first service booking',
  },
  {
    id: '3',
    code: 'DIWALI500',
    title: 'Festival Offer: ₹500 OFF',
    description: 'Celebrate with us! Valid on all major services',
  },
];

const ApplyCouponsScreen = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const [couponCode, setCouponCode] = useState('');

  const onApply = (item: any) => {
    navigation.navigate('ServiceCheckout', {
      serviceId: route.params?.serviceId,
      category: route.params?.category,
      appliedCoupon: item
    });
  };

  const onManualApply = () => {
    const item = COUPONS.find(c => c.code.toLowerCase() === couponCode.toLowerCase());
    if (item) {
      onApply(item);
    }
  };

  const renderItem = ({ item }: { item: typeof COUPONS[0] }) => (
    <View style={styles.couponCard}>
      <View style={styles.redTag}>
        <Text style={styles.tagText}>{item.code}</Text>
      </View>
      <View style={styles.couponInfo}>
        <Text style={styles.couponCode}>{item.code}</Text>
        <Text style={styles.couponTitle}>{item.title}</Text>
        <Text style={styles.couponDesc}>{item.description}</Text>
      </View>
      <TouchableOpacity style={styles.cardApplyBtn} onPress={() => onApply(item)}>
        <Text style={styles.cardApplyText}>{t('main.home.services.apply', 'Apply')}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScreenWrapper style={styles.container}>
      <View style={styles.headerContainer}>
        <SecondaryHeader
          title={t('main.home.services.applyCoupons', 'Apply Coupons')}
          onBack={() => navigation.goBack()}
          backgroundColor="transparent"
          titleColor={theme.colors.black}
        />
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder={t('main.home.services.enterCoupon', 'Enter Coupon Code Here')}
            value={couponCode}
            onChangeText={setCouponCode}
            autoCapitalize="characters"
          />
          <TouchableOpacity style={styles.applyBtn} onPress={onManualApply}>
            <Text style={styles.applyBtnText}>{t('main.home.services.apply', 'Apply')}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>{t('main.home.services.availableOffers', 'Available Offers')}</Text>

        <FlatList
          data={COUPONS}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: SH(100) }}
        />
      </View>
    </ScreenWrapper>
  );
};

export default ApplyCouponsScreen;

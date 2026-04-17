import React, { useState } from 'react';
import {
  ScrollView,
  FlatList,
  TouchableOpacity,
  TextInput,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@theme';
import { View, Text, ScreenWrapper } from '@components';
import { createStyles } from './styles';

import {
  SearchIcon,
  BellIcon,
  LocationIcon,
  BookingIcon,
  BuyIcon,
  TractorIcon,
  EmergencybellIcon,
  KeyboardArrowUpIcon,
  LangauageIcon,
} from '@assets/icons';

import {
  HomeTopbanner1Image,
  HomeTopbanner2Image,
  HomeTopbanner3Image,
  Homemiddlebanner1Image,
  Homebottombanner1Image,
  Homebottombanner2Image,
  GeneralMaintenanceImage,
  TransmissionClutchImage,
  TyreWheelServicesImage,
  ElectricalServicesImage,
  HydraulicServicesImage,
  BrakeServicesImage,
  DentingPaintingImage,
  EngineServicesImage,
  MahindraImage,
  SwarajImage,
  JohnDeereImage,
  EicherImage,
  Product1Image,
  Product2Image,
} from '@assets/images';

import { SW, SH } from '@utils/Dimensions';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = createStyles(theme);

  const [heroIndex, setHeroIndex] = useState(0);
  const [networkIndex, setNetworkIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const HERO_SLIDERS = [
    {
      id: '1',
      Image: HomeTopbanner1Image,
      title: t('main.home.hero.slider1'),
      cta: t('main.home.hero.cta'),
    },
    {
      id: '2',
      Image: HomeTopbanner2Image,
      title: t('main.home.hero.slider2'),
      cta: t('main.home.hero.cta'),
    },
    {
      id: '3',
      Image: HomeTopbanner3Image,
      title: t('main.home.hero.slider3'),
      cta: t('main.home.hero.cta'),
    },
  ];

  const SERVICE_CARDS = [
    {
      id: 'book',
      label: t('main.home.serviceCards.bookService.title'),
      sub: t('main.home.serviceCards.bookService.sub'),
      Icon: BookingIcon,
      bgColor: '#FFF0F3',
      iconBg: '#C8332A',
    },
    {
      id: 'parts',
      label: t('main.home.serviceCards.buyParts.title'),
      sub: t('main.home.serviceCards.buyParts.sub'),
      Icon: BuyIcon,
      bgColor: '#F3F0FF',
      iconBg: '#5C3FA3',
    },
    {
      id: 'tractor',
      label: t('main.home.serviceCards.tractorPurchase.title'),
      sub: t('main.home.serviceCards.tractorPurchase.sub'),
      Icon: TractorIcon,
      bgColor: '#EAF4FF',
      iconBg: '#2563EB',
    },
    {
      id: 'emergency',
      label: t('main.home.serviceCards.emergencyVisit.title'),
      sub: t('main.home.serviceCards.emergencyVisit.sub'),
      Icon: EmergencybellIcon,
      bgColor: '#FFF5F5',
      iconBg: '#EF4444',
    },
  ];

  const PARTS_LIST = [
    { id: '1', Image: Product1Image, name: 'Utto 5 Ltr- Wet Disc Brake Oil Mobil', price: 1231, mrp: 1960, discount: '10% Off', rating: 4.9 },
    { id: '2', Image: Product2Image, name: 'Transmax Manual Gear Oil', price: 1231, mrp: 1960, discount: '10% Off', rating: 4.9 },
    { id: '3', Image: Product1Image, name: 'Tractor Coolant 5L', price: 1231, mrp: 1960, discount: '10% Off', rating: 4.9 },
  ];

  const CATEGORIES = [
    { id: 'maintenance', label: t('main.home.categoryLabels.maintenance'), Image: GeneralMaintenanceImage },
    { id: 'clutch', label: t('main.home.categoryLabels.clutch'), Image: TransmissionClutchImage },
    { id: 'tyre', label: t('main.home.categoryLabels.tyre'), Image: TyreWheelServicesImage },
    { id: 'electrical', label: t('main.home.categoryLabels.electrical'), Image: ElectricalServicesImage },
    { id: 'hydraulic', label: t('main.home.categoryLabels.hydraulic'), Image: HydraulicServicesImage },
    { id: 'brake', label: t('main.home.categoryLabels.brake'), Image: BrakeServicesImage },
    { id: 'painting', label: t('main.home.categoryLabels.painting'), Image: DentingPaintingImage },
    { id: 'engine', label: t('main.home.categoryLabels.engine'), Image: EngineServicesImage },
  ];

  const NETWORK_BANNERS = [
    { id: '1', Image: Homemiddlebanner1Image },
    { id: '2', Image: Homebottombanner1Image },
  ];

  const HOW_IT_WORKS_STEPS = [
    { step: 1, title: t('main.home.steps.step1.title'), desc: t('main.home.steps.step1.desc') },
    { step: 2, title: t('main.home.steps.step2.title'), desc: t('main.home.steps.step2.desc') },
    { step: 3, title: t('main.home.steps.step3.title'), desc: t('main.home.steps.step3.desc') },
  ];

  const BRANDS = [
    { id: '1', label: t('common.brands.Mahindra'), Image: MahindraImage },
    { id: '2', label: t('common.brands.Swaraj'), Image: SwarajImage },
    { id: '3', label: t('common.brands.John Deere'), Image: JohnDeereImage },
    { id: '4', label: t('common.brands.Eicher'), Image: EicherImage },
  ];

  const onHeroScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    const idx = Math.round(x / (SCREEN_WIDTH - SW(32)));
    if (idx !== heroIndex) setHeroIndex(idx);
  };

  const onNetworkScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    const idx = Math.round(x / (SCREEN_WIDTH - SW(32)));
    if (idx !== networkIndex) setNetworkIndex(idx);
  };

  return (
    <ScreenWrapper>
      <View style={styles.root}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.searchRow}>
            <View style={styles.searchBox}>
              <SearchIcon size={SW(18)} color={theme.colors.gray500} />
              <TextInput
                style={styles.searchInput}
                placeholder={t('main.home.searchPlaceholder')}
                placeholderTextColor={theme.colors.gray400}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
            <View style={styles.headerActions}>
              <TouchableOpacity
                style={styles.iconCircle}
                onPress={() => navigation.navigate('NotificationScreen')}
              >
                <BellIcon size={SW(18)} color={theme.colors.white} />
                <View style={styles.notifDot} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconCircle}
                onPress={() => navigation.navigate('ChooseLanguage')}
              >
                <LangauageIcon size={SW(18)} color={theme.colors.white} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.addressRow}>
            <LocationIcon size={SW(14)} color={theme.colors.white} />
            <Text style={styles.addressText}>
              {t('main.home.deliverTo')}{' '}
              <Text style={styles.addressBold}>3517 W. Gray St. Utica, Pennsyl..</Text>
            </Text>
            <KeyboardArrowUpIcon size={SW(14)} color={theme.colors.white} />
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

          {/* Hero Slider */}
          <View style={styles.sliderSection}>
            <FlatList
              data={HERO_SLIDERS}
              horizontal
              pagingEnabled
              snapToAlignment="center"
              decelerationRate="fast"
              showsHorizontalScrollIndicator={false}
              onScroll={onHeroScroll}
              scrollEventThrottle={16}
              keyExtractor={(i) => i.id}
              renderItem={({ item }) => (
                <View style={styles.heroCardContainer}>
                  <View style={styles.heroCard}>
                    <item.Image width={SCREEN_WIDTH - SW(32)} height={SH(220)} />
                    <View style={styles.heroOverlay}>
                      <Text style={styles.heroTitle}>{item.title}</Text>
                      <TouchableOpacity style={styles.heroCta}>
                        <Text style={styles.heroCtaText}>{item.cta}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            />
            <View style={styles.dots}>
              {HERO_SLIDERS.map((_, i) => (
                <View key={i} style={[styles.dot, i === heroIndex && styles.dotActive]} />
              ))}
            </View>
          </View>

          {/* Services Grid */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('main.home.whatServices')}</Text>
            <View style={styles.serviceGrid}>
              {SERVICE_CARDS.map((svc) => (
                <TouchableOpacity key={svc.id} style={[styles.serviceCard, { backgroundColor: svc.bgColor }]}>
                  <View style={[styles.serviceIconWrap, { backgroundColor: svc.iconBg }]}>
                    <svc.Icon size={SW(22)} color={theme.colors.white} />
                  </View>
                  <Text style={[styles.serviceLabel, { color: svc.iconBg }]}>{svc.label}</Text>
                  <Text style={styles.serviceSub}>{svc.sub}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Middle Banner */}
          <View style={styles.adBannerWrap}>
            <Homebottombanner2Image width={SCREEN_WIDTH - SW(32)} height={SH(154)} />
          </View>

          {/* Parts & Accessories */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{t('main.home.partsAccessories')}</Text>
              <TouchableOpacity>
                <Text style={styles.seeMore}>{t('main.home.seeMore')}</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={PARTS_LIST}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: SW(12) }}
              keyExtractor={(i) => i.id}
              renderItem={({ item }) => (
                <View style={styles.partCard}>
                  <View style={styles.partImageWrap}>
                    <item.Image width={SW(120)} height={SW(120)} />
                  </View>
                  <Text style={styles.partName} numberOfLines={2}>{item.name}</Text>
                  <View style={styles.partPriceRow}>
                    <Text style={styles.partPrice}>₹{item.price}</Text>
                    <Text style={styles.partMrp}>₹{item.mrp}</Text>
                    <Text style={styles.partDiscount}>{item.discount}</Text>
                  </View>
                  <View style={styles.ratingRow}>
                    <Text style={styles.starIcon}>★</Text>
                    <Text style={styles.ratingText}>{item.rating}</Text>
                  </View>
                </View>
              )}
            />
          </View>

          {/* Categories */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('main.home.categories')}</Text>
            <View style={styles.categoryGrid}>
              {CATEGORIES.map((cat) => (
                <TouchableOpacity key={cat.id} style={styles.categoryItem}>
                  <View style={styles.categoryImageWrap}>
                    <cat.Image width={SW(64)} height={SW(64)} />
                  </View>
                  <Text style={styles.categoryLabel}>{cat.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Network Banner */}
          <View style={styles.sliderSection}>
            <FlatList
              data={NETWORK_BANNERS}
              horizontal
              pagingEnabled
              snapToAlignment="center"
              decelerationRate="fast"
              showsHorizontalScrollIndicator={false}
              onScroll={onNetworkScroll}
              scrollEventThrottle={16}
              keyExtractor={(i) => i.id}
              renderItem={({ item }) => (
                <View style={styles.heroCardContainer}>
                  <View style={[styles.heroCard, { height: SH(160) }]}>
                    <item.Image width={SCREEN_WIDTH - SW(32)} height={SH(160)} />
                  </View>
                </View>
              )}
            />
            <View style={styles.dots}>
              {NETWORK_BANNERS.map((_, i) => (
                <View key={i} style={[styles.dot, i === networkIndex && styles.dotActive]} />
              ))}
            </View>
          </View>

          {/* How It Works */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('main.home.howItWorks')}</Text>
            <FlatList
              data={[{ id: '1' }, { id: '2' }]}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: SW(12), marginBottom: SH(16) }}
              renderItem={() => (
                <View style={styles.videoThumb}>
                  <View style={styles.playButton}>
                    <Text style={styles.playIcon}>▶</Text>
                  </View>
                </View>
              )}
            />

            <View style={styles.stepsCard}>
              <View style={styles.stepsHeader}>
                <View style={styles.stepsBorderLeft} />
                <Text style={styles.stepsTitle}>{t('main.home.howItWorksTitle')}</Text>
              </View>
              {HOW_IT_WORKS_STEPS.map((s) => (
                <View key={s.step} style={styles.stepRow}>
                  <View style={styles.stepBadge}>
                    <Text style={styles.stepNum}>{s.step}</Text>
                  </View>
                  <View style={styles.stepContent}>
                    <Text style={styles.stepTitle}>{s.title}</Text>
                    <Text style={styles.stepDesc}>{s.desc}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Brands */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('main.home.brandsTitle')}</Text>
            <FlatList
              data={BRANDS}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: SW(16) }}
              renderItem={({ item }) => (
                <View style={styles.brandItem}>
                  <item.Image width={SW(60)} height={SW(36)} />
                  <Text style={styles.brandLabel}>{item.label}</Text>
                </View>
              )}
            />
          </View>

          {/* Mechanic Bar */}
          <TouchableOpacity style={styles.mechanicBar}>
            <View style={styles.mechanicLeft}>
              <View style={styles.mechanicAvatar} />
              <View>
                <Text style={styles.mechanicName}>Rajat Tiwari</Text>
                <View style={styles.mechanicMeta}>
                  <TractorIcon size={SW(12)} color={theme.colors.gray500} />
                  <Text style={styles.mechanicJobs}>120+ {t('main.home.jobsDone')}</Text>
                </View>
                <View style={styles.ratingRow}>
                  <Text style={styles.starIcon}>★</Text>
                  <Text style={styles.ratingText}>4.8</Text>
                </View>
              </View>
            </View>
            <View style={styles.mechanicPrice}>
              <Text style={styles.mechanicPriceText}>₹3150</Text>
            </View>
            <View style={styles.mechanicArrow}>
              <Text style={styles.mechanicArrowText}>→</Text>
            </View>
          </TouchableOpacity>

          <View style={{ height: SH(32) }} />
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

export default HomeScreen;

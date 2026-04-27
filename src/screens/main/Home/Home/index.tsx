import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  NativeSyntheticEvent,
  NativeScrollEvent,
  Linking,
  FlatList as RNFlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import {
  ScrollView,
  FlatList,
  TouchableOpacity,
  View,
  Text,
  ScreenWrapper,
  SearchInput
} from '@components';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@theme';
import { createStyles } from './styles';
import { HOME_PARTS_LIST } from '../../Parts/dummyData';

import {
  BellIcon,
  LocationIcon,
  BuyIcon,
  TractorIcon,
  EmergencybellIcon,
  KeyboardArrowUpIcon,
  LangauageIcon,
  NextIcon,
  BagtimerIcon,
  Tractor2Icon
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
  VedioImage,
  DummyUserImage,
} from '@assets/images';

import { SW, SH } from '@utils/Dimensions';
import { useBrands } from '@screens/auth/hooks/useAuth';
import { ActivityIndicator, Image as RNImage } from 'react-native';
import { BikeIcon } from '@assets/icons';
import { Brand } from '@appTypes/api.types';

const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = createStyles(theme);

  const { data: brandsData, isLoading: isBrandsLoading } = useBrands();
  const brands: Brand[] = useMemo(() => {
    return brandsData?.data || brandsData?.brands || [];
  }, [brandsData]);

  const [heroIndex, setHeroIndex] = useState(0);
  const [middleIndex, setMiddleIndex] = useState(0);
  const [networkIndex, setNetworkIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const heroFlatListRef = useRef<RNFlatList>(null);
  const middleFlatListRef = useRef<RNFlatList>(null);
  const networkFlatListRef = useRef<RNFlatList>(null);

  const HERO_SLIDERS = useMemo(() => [
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
  ], [t]);

  const SERVICE_CARDS = [
    {
      id: 'book',
      label: t('main.home.serviceCards.bookService.title'),
      sub: t('main.home.serviceCards.bookService.sub'),
      Icon: TractorIcon,
      bgColor: '#FEE5E5',
      iconBg: '#793745',
      decorColors: ['#FFCEDD', '#FFE5EE'],
    },
    {
      id: 'parts',
      label: t('main.home.serviceCards.buyParts.title'),
      sub: t('main.home.serviceCards.buyParts.sub'),
      Icon: BuyIcon,
      bgColor: '#F4EEF8',
      iconBg: '#3E2D5A',
      decorColors: ['#DAC7E3', '#F4EEF8'],
    },
    {
      id: 'tractor',
      label: t('main.home.serviceCards.tractorPurchase.title'),
      sub: t('main.home.serviceCards.tractorPurchase.sub'),
      Icon: Tractor2Icon,
      bgColor: '#D4E7F6',
      iconBg: '#094B7D',
      decorColors: ['#BDD9EE', '#D4E7F6'],
    },
    {
      id: 'emergency',
      label: t('main.home.serviceCards.emergencyVisit.title'),
      sub: t('main.home.serviceCards.emergencyVisit.sub'),
      Icon: EmergencybellIcon,
      bgColor: '#FFDDDE',
      iconBg: '#D1072A',
      decorColors: ['#FFC2C3', '#FFDDDE'],
    },
  ];

  const PARTS_LIST = HOME_PARTS_LIST;

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

  const MIDDLE_BANNERS = useMemo(() => [
    {
      id: '1',
      Image: Homemiddlebanner1Image,
      bgColor: '#E84040',
      badge: 'TOP ASSIST',
      title: t('main.home.banners.assist.title'),
      bullets: [
        t('main.home.banners.assist.bullet1'),
        t('main.home.banners.assist.bullet2'),
      ],
      buttonText: t('main.home.banners.assist.cta'),
      btnColor: theme.colors.white,
      btnTextColor: '#E84040',
      isDark: false,
    },
    {
      id: '2',
      Image: HomeTopbanner2Image,
      bgColor: '#1A2744',
      badge: '',
      title: t('main.home.banners.repair.title'),
      bullets: [
        t('main.home.banners.repair.sub'),
      ],
      buttonText: t('main.home.banners.repair.cta'),
      btnColor: '#E84040',
      btnTextColor: theme.colors.white,
      isDark: false,
    },
    {
      id: '3',
      Image: Homemiddlebanner1Image,
      bgColor: '#2563EB',
      badge: '',
      title: t('main.home.banners.emergency.title'),
      bullets: [
        t('main.home.banners.emergency.sub'),
      ],
      buttonText: t('main.home.banners.emergency.cta'),
      btnColor: theme.colors.white,
      btnTextColor: '#2563EB',
      isDark: false,
    },
  ], [t, theme.colors.white]);

  const NETWORK_BANNERS = useMemo(() => [
    {
      id: '1',
      Image: Homebottombanner1Image,
      bgColor: '#FFF5E6',
      badge: '',
      title: t('main.home.network.title'),
      bullets: [
        t('main.home.network.sub'),
      ],
      buttonText: t('main.home.banners.assist.cta'),
      btnColor: '#1A2744',
      btnTextColor: theme.colors.white,
      isDark: true,
    },
    {
      id: '2',
      Image: Homebottombanner2Image,
      bgColor: '#E84040',
      badge: 'EARN MONEY',
      title: t('main.home.banners.earn.title'),
      bullets: [
        t('main.home.banners.earn.sub'),
      ],
      buttonText: t('main.home.banners.earn.cta'),
      btnColor: theme.colors.white,
      btnTextColor: '#E84040',
      isDark: false,
    },
  ], [t, theme.colors.white]);

  const HOW_IT_WORKS_STEPS = [
    {
      id: '1',
      thumbnail: VedioImage,
      url: 'https://youtube.com/shorts/mosXzrYdtIs',
    },
    {
      id: '2',
      thumbnail: VedioImage,
      url: 'https://youtube.com/shorts/mosXzrYdtIs',
    },
  ];

  const TRACTOR_WORKS_STEPS = useMemo(() => [
    {
      id: '1',
      title: t('main.home.steps.step1.title', 'Add Your Tractor Details'),
      desc: t('main.home.steps.step1.desc', "Enter your tractor's brand, model, and issue details so we can understand your needs better."),
    },
    {
      id: '2',
      title: t('main.home.steps.step2.title', 'Book a Repair Service'),
      desc: t('main.home.steps.step2.desc', 'Choose the type of service you need — repair, maintenance, or emergency breakdown support.'),
    },
    {
      id: '3',
      title: t('main.home.steps.step3.title', 'Get Matched with a Mechanic'),
      desc: t('main.home.steps.step3.desc', 'We connect you with a nearby verified mechanic who specializes in your tractor type.'),
    },
  ], [t]);



  // Auto-scroll hero slider every 4 seconds
  useEffect(() => {
    const autoScroll = setInterval(() => {
      const nextIndex = (heroIndex + 1) % HERO_SLIDERS.length;
      setHeroIndex(nextIndex);
      heroFlatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
    }, 4000);
    return () => clearInterval(autoScroll);
  }, [heroIndex, HERO_SLIDERS.length]);

  const onHeroScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    const interval = SW(343) + SW(15);
    const idx = Math.round(x / interval);
    if (idx !== heroIndex && idx >= 0 && idx < HERO_SLIDERS.length) setHeroIndex(idx);
  };

  const onMiddleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    const interval = SW(343) + SW(15);
    const idx = Math.round(x / interval);
    if (idx !== middleIndex && idx >= 0 && idx < MIDDLE_BANNERS.length) setMiddleIndex(idx);
  };

  const onNetworkScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    const interval = SW(343) + SW(15);
    const idx = Math.round(x / interval);
    if (idx !== networkIndex && idx >= 0 && idx < NETWORK_BANNERS.length) setNetworkIndex(idx);
  };

  return (
    <ScreenWrapper>
      <View style={styles.root}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.searchRow}>
            <TouchableOpacity
              style={styles.searchBox}
              activeOpacity={1}
              onPress={() => navigation.navigate('SearchServices')}
            >
              <View pointerEvents="none" style={{ flex: 1 }}>
                <SearchInput
                  placeholder={t('main.home.searchPlaceholder')}
                  containerStyle={{ marginBottom: 0 }}
                  inputStyle={styles.searchInput}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  hasBorder={false}
                  wrapperStyle={{ marginBottom: 0, flex: 1 }}
                  editable={false}
                />
              </View>
            </TouchableOpacity>
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
                <LangauageIcon size={SW(24)} color={theme.colors.white} />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={styles.addressRow}
            onPress={() => navigation.navigate('ManageAddress')}
            activeOpacity={0.7}
          >
            <LocationIcon size={SW(14)} color={theme.colors.white} />
            <Text style={styles.addressText}>
              {t('main.home.deliverTo')}{' '}
              <Text style={styles.addressBold}>3517 W. Gray St. Utica, Pennsyl..</Text>
            </Text>
            <KeyboardArrowUpIcon size={SW(14)} color={theme.colors.white} />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

          {/* Hero Slider */}
          <View style={styles.sliderSection}>
            <FlatList
              ref={heroFlatListRef}
              data={HERO_SLIDERS}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: SW(15), gap: SW(15) }}
              snapToInterval={SW(343) + SW(15)}
              snapToAlignment="start"
              decelerationRate="fast"
              onScroll={onHeroScroll}
              scrollEventThrottle={16}
              keyExtractor={(i) => i.id}
              renderItem={({ item }: { item: any }) => (
                <View style={styles.heroCardContainer}>
                  <View style={styles.heroCard}>
                    <item.Image
                      width={SW(343)}
                      height={SH(190)}
                      style={{ borderRadius: SW(20) }}
                    />
                    <LinearGradient
                      colors={['transparent', 'rgba(0,0,0,0.87)']}
                      style={styles.heroGradient}
                    >
                      <Text style={styles.heroTitle}>{item.title}</Text>
                      <TouchableOpacity style={styles.heroCta}>
                        <Text style={styles.heroCtaText}>{item.cta}</Text>
                      </TouchableOpacity>
                    </LinearGradient>
                  </View>
                </View>
              )}
            />
            <View style={styles.dots}>
              {HERO_SLIDERS.map((_, i: number) => (
                <View key={i} style={[styles.heroDot, i === heroIndex && styles.heroDotActive]} />
              ))}
            </View>
          </View>

          {/* Services Grid */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('main.home.whatServices')}</Text>
            <View style={styles.serviceGrid}>
              {SERVICE_CARDS.map((svc: any) => (
                <TouchableOpacity
                  key={svc.id}
                  style={[styles.serviceCard, { backgroundColor: svc.bgColor }]}
                  onPress={() => {
                    if (svc.id === 'parts') {
                      navigation.navigate('Parts');
                    } else if (svc.id === 'book') {
                      navigation.navigate('Services');
                    } else if (svc.id === 'emergency') {
                      navigation.navigate('EmergencyRoadside');
                    } else if (svc.id === 'tractor') {
                      navigation.navigate('TractorPurchase');
                    }
                  }}
                >
                  <LinearGradient
                    colors={svc.decorColors}
                    style={styles.serviceCardDecorator}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  />
                  <View style={styles.serviceTopRow}>
                    <View style={[styles.serviceIconWrap, { backgroundColor: svc.iconBg }]}>
                      <svc.Icon size={SW(16)} color={theme.colors.white} />
                    </View>
                    <Text style={[styles.serviceLabel, { color: svc.iconBg }]}>{svc.label}</Text>
                  </View>
                  <Text style={[styles.serviceSub, { color: svc.iconBg, opacity: 0.8 }]}>{svc.sub}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Middle Banner — 3 slide FlatList */}
          <View style={styles.sliderSection}>
            <FlatList
              ref={middleFlatListRef}
              data={MIDDLE_BANNERS}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: SW(15), gap: SW(15) }}
              snapToInterval={SW(343) + SW(15)}
              snapToAlignment="start"
              decelerationRate="fast"
              onScroll={onMiddleScroll}
              scrollEventThrottle={16}
              keyExtractor={(i) => i.id}
              renderItem={({ item }) => (
                <View style={[styles.middleCardContainer, { backgroundColor: item.bgColor }]}>
                  <View style={[styles.middleBannerCard, { backgroundColor: item.bgColor }]}>
                    <View style={styles.middleBannerContent}>
                      <View style={styles.middleBannerLeft}>
                        {item.badge ? (
                          <View style={styles.middleBannerBadge}>
                            <Text style={styles.middleBannerBadgeText}>{item.badge}</Text>
                          </View>
                        ) : null}
                        <Text style={[styles.middleBannerTitle, item.isDark && styles.middleBannerTitleDark]}>
                          {item.title}
                        </Text>
                        <View style={styles.middleBannerBullets}>
                          {item.bullets.map((b: string, idx: number) => (
                            <Text
                              key={idx}
                              style={[styles.middleBannerBullet, item.isDark && styles.middleBannerBulletDark]}
                            >
                              {item.bullets.length > 1 ? '• ' : ''}{b}
                            </Text>
                          ))}
                        </View>
                        <TouchableOpacity style={[styles.middleBannerBtn, { backgroundColor: item.btnColor }]}>
                          <Text style={[styles.middleBannerBtnText, { color: item.btnTextColor }]}>
                            {item.buttonText} ▶
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.middleBannerImageWrap}>
                        <item.Image width={SW(120)} height={SH(140)} />
                      </View>
                    </View>
                  </View>
                </View>
              )}
            />
            <View style={styles.dots}>
              {MIDDLE_BANNERS.map((_, i: number) => (
                <View key={i} style={[styles.middleDot, i === middleIndex && styles.middleDotActive]} />
              ))}
            </View>
          </View>

          {/* Parts & Accessories */}
          <View style={[styles.section, { backgroundColor: theme.colors.YellowLight, paddingVertical: SH(10) }]}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{t('main.home.partsAccessories')}</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Parts')}>
                <Text style={styles.seeMore}>{t('main.home.seeMore')}</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={PARTS_LIST}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: SW(12) }}
              keyExtractor={(i: any) => i.id}
              renderItem={({ item }: { item: any }) => (
                <TouchableOpacity
                  style={styles.partCard}
                  onPress={() => navigation.navigate('Parts')}
                >
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
                </TouchableOpacity>
              )}
            />
          </View>

          {/* Categories */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('main.home.categories')}</Text>
            <View style={styles.categoryGrid}>
              {CATEGORIES.map((cat: any) => (
                <TouchableOpacity
                  key={cat.id}
                  style={styles.categoryItem}
                  onPress={() => navigation.navigate('CategoryOverview', { categoryId: cat.id })}
                >
                  <View style={styles.categoryImageWrap}>
                    <cat.Image width={SW(52)} height={SW(52)} />
                  </View>
                  <Text style={styles.categoryLabel}>{cat.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Network Banner Slider */}
          <View style={styles.sliderSection}>
            <FlatList
              ref={networkFlatListRef}
              data={NETWORK_BANNERS}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: SW(15), gap: SW(15) }}
              snapToInterval={SW(343) + SW(15)}
              snapToAlignment="start"
              decelerationRate="fast"
              onScroll={onNetworkScroll}
              scrollEventThrottle={16}
              keyExtractor={(i) => i.id}
              renderItem={({ item }) => (
                <View style={[styles.networkCardContainer, { backgroundColor: item.bgColor }]}>
                  <View style={[styles.networkBannerCard, { backgroundColor: item.bgColor }]}>
                    <View style={styles.networkBannerContent}>
                      <View style={styles.networkBannerLeft}>
                        {item.badge ? (
                          <View style={styles.networkBannerBadge}>
                            <Text style={styles.networkBannerBadgeText}>{item.badge}</Text>
                          </View>
                        ) : null}
                        <Text style={[styles.networkBannerTitle, item.isDark && styles.networkBannerTitleDark]}>
                          {item.title}
                        </Text>
                        <View style={styles.networkBannerBullets}>
                          {item.bullets.map((b: string, idx: number) => (
                            <Text
                              key={idx}
                              style={[styles.networkBannerBullet, item.isDark && styles.networkBannerBulletDark]}
                            >
                              {b}
                            </Text>
                          ))}
                        </View>
                        <TouchableOpacity style={[styles.networkBannerBtn, { backgroundColor: item.btnColor }]}>
                          <Text style={[styles.networkBannerBtnText, { color: item.btnTextColor }]}>
                            {item.buttonText} ▶
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.networkBannerImageWrap}>
                        <item.Image width={SW(120)} height={SH(140)} />
                      </View>
                    </View>
                  </View>
                </View>
              )}
            />
            <View style={styles.dots}>
              {NETWORK_BANNERS.map((_, i: number) => (
                <View key={i} style={[styles.networkDot, i === networkIndex && styles.networkDotActive]} />
              ))}
            </View>
          </View>

          {/* How It Works */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('main.home.howItWorks')}</Text>
            <FlatList
              data={HOW_IT_WORKS_STEPS}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: SW(12), marginBottom: SH(16) }}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.videoThumb}
                  onPress={() => Linking.openURL(item.url)} // 🔥 opens YouTube Shorts
                >
                  <item.thumbnail width="100%" height="100%" />
                </TouchableOpacity>
              )}
            />
            <View style={styles.stepsCard}>
              <View style={styles.stepsHeader}>
                <View style={styles.stepsBorderLeft} />
                <Text style={styles.stepsTitle}>
                  {t('main.home.howTractorWallaWorks', 'How TractorWalla Works?')}
                </Text>
              </View>
              {TRACTOR_WORKS_STEPS.map((s: any) => (
                <View key={s.id} style={styles.stepRow}>
                  <View style={styles.stepBadge}>
                    <Text style={styles.stepNum}>{s.id}</Text>
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
            {isBrandsLoading ? (
              <ActivityIndicator color={theme.colors.brandRed} />
            ) : (
              <FlatList
                data={brands}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: SW(16) }}
                keyExtractor={(i: any) => i._id}
                renderItem={({ item }: { item: any }) => (
                  <View style={styles.brandItem}>
                    <View style={{ width: SW(60), height: SW(36), alignItems: 'center', justifyContent: 'center' }}>
                      {item.logoUrl ? (
                        <RNImage
                          source={{ uri: item.logoUrl }}
                          style={{ width: '100%', height: '100%', borderRadius: 50 }}
                          resizeMode="contain"
                        />
                      ) : (
                        <BikeIcon width={SW(40)} height={SW(24)} color={theme.colors.gray300} />
                      )}
                    </View>
                    <Text style={styles.brandLabel}>{item.name}</Text>
                  </View>
                )}
              />
            )}
          </View>

          {/* Mechanic Bar */}
          <TouchableOpacity style={styles.mechanicBar}>
            <View style={styles.mechanicLeft}>
              <DummyUserImage width={40} height={40} />
              <View>
                <Text style={styles.mechanicName}>Rajat Tiwari</Text>
                <View style={styles.mechanicMeta}>
                  <BagtimerIcon size={SW(12)} color={theme.colors.gray500} />
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
              <NextIcon width={20} height={20} color={theme.colors.white} />
            </View>
          </TouchableOpacity>

          <View style={{ height: SH(32) }} />
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

export default HomeScreen;

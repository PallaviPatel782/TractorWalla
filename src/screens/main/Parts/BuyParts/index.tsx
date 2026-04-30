import React, { useState, useRef } from 'react';
import {
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import {
  View,
  Text,
  ScreenWrapper,
  SearchInput,
  SecondaryHeader,
  GlobalBottomSheet,
  Button,
  FilterBottomSheet,
} from '@components';
import { useTheme } from '@theme';
import { createStyles } from './styles';
import { CheckIcon, CartIcon, CloseIcon, FilterIcon } from '@assets/icons';
import { ServiceModalImageImage } from '@assets/images';
import { PARTS_DATA, PARTS_CATEGORIES } from '../dummyData';
import { SW, SH } from '@utils/Dimensions';
const BuyPartsScreen = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation<any>();
  const [modalVisible, setModalVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const scrollRef = useRef<any>(null);
  const sectionLayouts = useRef<Record<string, number>>({});

  const onGoToService = () => {
    setModalVisible(false);
    navigation.navigate('Main', { screen: 'Services' });
  };

  const onSectionLayout = (id: string, y: number) => {
    sectionLayouts.current[id] = y;
  };

  const renderKitCard = (kit: any) => (
    <TouchableOpacity
      key={kit.id}
      style={styles.kitCard}
    // onPress={() => navigation.navigate('PartsOverview', { kitId: kit.id })}
    >
      <View style={styles.kitLeft}>
        <Text style={styles.kitTitle}>{kit.title}</Text>
        {kit.bullets.map((bullet: string, idx: number) => (
          <View key={idx} style={styles.bulletRow}>
            <CheckIcon size={15} color={theme.colors.DeepGreen} />
            <Text style={styles.bulletText}>{bullet}</Text>
          </View>
        ))}
        <View style={styles.kitFooter}>
          <Text style={styles.ratingText}>★ {kit.rating}</Text>
          <Text style={styles.price}>₹{kit.price}</Text>
          <Text style={styles.mrp}>₹{kit.price}</Text>
        </View>
      </View>
      <View style={styles.kitRight}>
        <kit.image width={SW(100)} height={SW(90)} style={styles.kitImage} />
        <TouchableOpacity
          style={styles.purchaseBtn}
          onPress={() => setModalVisible(true)}
        >
          <CartIcon size={SW(14)} color="#1E633F" />
          <Text style={styles.purchaseText}> {t('main.home.buyParts.purchase', 'Purchase')}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScreenWrapper style={styles.container}>
      <View style={styles.header}>
        <SecondaryHeader
          title={t('main.home.buyParts.title', 'Buy Parts')}
          onBack={() => navigation.goBack()}
          titleColor={theme.colors.white}
          backIconColor={theme.colors.white}
          backgroundColor={theme.colors.DeepGreen}
        />
        <View style={styles.searchContainer}>
          <SearchInput
            placeholder={t('main.home.buyParts.searchPlaceholder', 'Search for Kits')}
            rightIcon={
              <TouchableOpacity onPress={() => setFilterVisible(true)}>
                <FilterIcon size={SW(24)} color={theme.colors.gray500} />
              </TouchableOpacity>
            }
          />
        </View>
      </View>

      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        scrollEventThrottle={16}
      >
        {PARTS_DATA.map((section) => (
          <View
            key={section.category}
            onLayout={(e) => onSectionLayout(section.category, e.nativeEvent.layout.y)}
          >
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                {t(`main.home.buyParts.${section.category}`, {
                  defaultValue: PARTS_CATEGORIES.find(c => c.id === section.category)?.title || ''
                })}
              </Text>
            </View>
            {section.kits.map((kit) => renderKitCard(kit))}
          </View>
        ))}
      </ScrollView>
      <GlobalBottomSheet visible={modalVisible} onClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalCloseBtn}
            onPress={() => setModalVisible(false)}
          >
            <CloseIcon size={20} color="#000" />
          </TouchableOpacity>

          <Text style={styles.modalHeaderTitle}>
            {t('main.home.serviceOverview.bookingRequired.title', 'Book Service')}
          </Text>

          <Text style={styles.modalMsg}>
            {t('main.home.serviceOverview.bookingRequired.message', 'Please book service to Purchase Parts')}
          </Text>

          <View style={styles.modalImageWrapper}>
            <ServiceModalImageImage width={SW(280)} height={SH(180)} />
          </View>

          <Button
            title={t('main.home.serviceOverview.bookingRequired.button', 'GO TO SERVICE')}
            onPress={onGoToService}
          />
        </View>
      </GlobalBottomSheet>

      <FilterBottomSheet
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        onApply={(filters) => {
          console.log('Applied filters:', filters);
          setFilterVisible(false);
        }}
      />
    </ScreenWrapper>
  );
};

export default BuyPartsScreen;

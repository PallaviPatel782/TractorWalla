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
  ServiceCard,
} from '@components';
import { useTheme } from '@theme';
import { createStyles } from './styles';
import { CloseIcon, FilterIcon } from '@assets/icons';
import { ServiceModalImageImage } from '@assets/images';
import { PARTS_DATA, PARTS_CATEGORIES } from '../dummyData';
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
    <ServiceCard
      key={kit.id}
      item={kit}
      onPress={() => { }} // navigation.navigate('PartsOverview', { kitId: kit.id })
      onBookPress={() => setModalVisible(true)}
      buttonTitle={t('main.home.buyParts.purchase', 'Purchase')}
    />
  );

  return (
    <ScreenWrapper withBottomInset={false} style={styles.container}>
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
                <FilterIcon size={24} color={theme.colors.gray500} />
              </TouchableOpacity>
            }
          />
        </View>
      </View>

      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 10 }}
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
            <ServiceModalImageImage width={280} height={180} />
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

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
} from '@components';
import { useTheme } from '@theme';
import { createStyles } from './styles';
import { SERVICES_DATA, SERVICES_CATEGORIES } from '../dummyData';
import { SW, SH } from '@utils/Dimensions';
import ServiceCard from '../components/ServiceCard';

const BookServiceScreen = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation<any>();
  const [activeTab, setActiveTab] = useState(SERVICES_CATEGORIES[0].id);
  const scrollRef = useRef<any>(null);
  const sectionLayouts = useRef<Record<string, number>>({});

  const onTabPress = (id: string) => {
    setActiveTab(id);
    const yOffset = sectionLayouts.current[id];
    if (yOffset !== undefined) {
      scrollRef.current?.scrollTo({ y: yOffset - SH(10), animated: true });
    }
  };

  const onSectionLayout = (id: string, y: number) => {
    sectionLayouts.current[id] = y;
  };


  return (
    <ScreenWrapper style={styles.container}>
      <View style={styles.header}>
        <SecondaryHeader
          title={t('main.home.services.title', 'Book Service')}
          onBack={() => navigation.goBack()}
          titleColor={theme.colors.white}
          backIconColor={theme.colors.white}
          backgroundColor="transparent"
        />
        <View style={styles.searchContainer}>
          <SearchInput
            placeholder={t('main.home.services.searchPlaceholder', 'Search Services')}
          />
        </View>
      </View>

      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabsContainer}
          contentContainerStyle={{ paddingRight: SW(32) }}
        >
          {SERVICES_CATEGORIES.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tabPill,
                activeTab === tab.id && styles.tabPillActive,
              ]}
              onPress={() => onTabPress(tab.id)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab.id && styles.tabTextActive,
                ]}
              >
                {t(`main.home.services.${tab.id}`, { defaultValue: tab.title })}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        scrollEventThrottle={16}
      >
        {SERVICES_DATA.map((section) => (
          <View
            key={section.category}
            onLayout={(e) => onSectionLayout(section.category, e.nativeEvent.layout.y)}
          >
            <View>
              <Text style={styles.sectionTitle}>
                {t(`main.home.services.${section.category}`, {
                  defaultValue: SERVICES_CATEGORIES.find(c => c.id === section.category)?.title || ''
                })}
              </Text>
            </View>
            {section.services.map((item) => (
              <ServiceCard
                key={item.id}
                item={item}
                onPress={() => navigation.navigate('ServiceOverview', { serviceId: item.id, category: section.category })}
                onBookPress={() => navigation.navigate('ServiceCheckout', { serviceId: item.id, category: section.category })}
              />
            ))}
          </View>
        ))}
      </ScrollView>

    </ScreenWrapper>
  );
};

export default BookServiceScreen;

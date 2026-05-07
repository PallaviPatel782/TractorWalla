import React, { useRef } from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import {
  View,
  ScreenWrapper,
  SearchInput,
  SecondaryHeader,
  ServiceCard,
} from '@components';
import { useTheme } from '@theme';
import { createStyles } from './styles';
import { SERVICES_DATA, SERVICES_CATEGORIES } from '../dummyData';

const BookServiceScreen = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation<any>();
  const scrollRef = useRef<any>(null);
  const sectionLayouts = useRef<Record<string, number>>({});

  const onSectionLayout = (id: string, y: number) => {
    sectionLayouts.current[id] = y;
  };
  return (
    <ScreenWrapper withBottomInset={false} style={styles.container}>
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

      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        {SERVICES_DATA.filter(s => SERVICES_CATEGORIES.some(c => c.id === s.category)).map((section) => (
          <View
            key={section.category}
            onLayout={(e) => onSectionLayout(section.category, e.nativeEvent.layout.y)}
          >
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

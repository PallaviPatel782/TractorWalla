import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  ScreenWrapper,
  SearchInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from '@components';
import { useTheme } from '@theme';
import { createStyles } from './styles';
import { useTranslation } from 'react-i18next';
import { SERVICES_DATA, IService } from '../dummyData';
import { SW } from '@utils/Dimensions';
import { ChevronBackwardIcon } from '@assets/icons';
import ServiceCard from '../components/ServiceCard';

const RECENT_SEARCHES = ['Engine Oil', 'Brake Service', 'Hydraulic Oil'];

const SearchServicesScreen = () => {
  const navigation = useNavigation<any>();
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = createStyles(theme);

  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState(RECENT_SEARCHES);

  const allServices = SERVICES_DATA.flatMap(cat =>
    cat.services.map(svc => ({ ...svc, category: cat.category }))
  );

  const filteredServices = searchQuery
    ? allServices.filter(svc =>
      svc.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : allServices.slice(0, 5); // Popular Services placeholder

  const handleClearRecent = () => setRecentSearches([]);

  const renderServiceItem = ({ item }: { item: IService & { category: string } }) => (
    <ServiceCard
      item={item}
      onPress={() => navigation.navigate('ServiceOverview', { serviceId: item.id, category: item.category })}
      onBookPress={() => navigation.navigate('ServiceCheckout', { serviceId: item.id, category: item.category })}
    />
  );

  return (
    <ScreenWrapper>
      <View style={styles.root}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <ChevronBackwardIcon size={SW(24)} color={theme.colors.black} />
          </TouchableOpacity>
          <SearchInput
            placeholder={t('main.services.searchPlaceholder', 'Search Services')}
            value={searchQuery}
            onChangeText={setSearchQuery}
            wrapperStyle={styles.searchContainer}
          />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {recentSearches.length > 0 && !searchQuery && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{t('main.services.recentlySearched', 'Recently searched')}</Text>
                <TouchableOpacity onPress={handleClearRecent}>
                  <Text style={styles.clearText}>{t('common.clear', 'Clear')}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.recentRow}>
                {recentSearches.map((term, i) => (
                  <TouchableOpacity
                    key={i}
                    style={styles.recentItem}
                    onPress={() => setSearchQuery(term)}
                  >
                    <Text style={styles.clockIcon}>🕒</Text>
                    <Text style={styles.recentText}>{term}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {searchQuery ? t('main.services.searchResults', 'Search Results') : t('main.services.popularServices', 'Popular Services')}
            </Text>
            <FlatList
              data={filteredServices}
              renderItem={renderServiceItem}
              keyExtractor={item => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.listContent}
            />
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

export default SearchServicesScreen;

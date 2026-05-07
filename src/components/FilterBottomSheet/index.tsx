import React, { useState } from 'react';
import {
  StyleSheet,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Text, SearchInput, Button, GlobalBottomSheet, View, TouchableOpacity, ScrollView } from '@components';
import { useTheme } from '@theme';

const filterTabs = ['Category', 'Subcategory', 'Brand', 'Model'] as const;
type FilterTab = typeof filterTabs[number];

const mockFilterData: Record<FilterTab, string[]> = {
  Category: ['Engine Parts', 'Electrical Parts', 'Brakes', 'Transmission'],
  Subcategory: ['Oil Filter', 'Air Filter', 'Fuel Filter'],
  Brand: ['Mahindra', 'Swaraj', 'John Deere', 'Eicher'],
  Model: [
    'Mahindra 295 DI Turbo',
    'Mahindra Hidustan 60',
    'Mahindra 575 DI SP PLUS',
    'Mahindra Jivo 345 YR2024',
  ],
};

interface FilterBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  onApply: (selectedFilters: any) => void;
}

const FilterBottomSheet: React.FC<FilterBottomSheetProps> = ({
  visible,
  onClose,
  onApply,
}) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState<FilterTab>('Category');
  const [searchQuery, setSearchQuery] = useState('');

  const [selectedItems, setSelectedItems] = useState<Record<FilterTab, string[]>>({
    Category: [],
    Subcategory: [],
    Brand: [],
    Model: [],
  });

  const handleToggleItem = (item: string) => {
    setSelectedItems(prev => {
      const current = prev[activeTab];
      return current.includes(item)
        ? { ...prev, [activeTab]: current.filter(i => i !== item) }
        : { ...prev, [activeTab]: [...current, item] };
    });
  };

  const handleClearAll = () => {
    setSelectedItems({
      Category: [],
      Subcategory: [],
      Brand: [],
      Model: [],
    });
  };

  const filteredItems = mockFilterData[activeTab].filter(item =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <GlobalBottomSheet
      visible={visible}
      onClose={onClose}
      title={t('main.home.buyParts.filters.title', 'Filters and Sorting')}
    >
      <View style={styles.container}>

        {/* Search */}
        <View style={styles.searchWrapper}>
          <SearchInput
            placeholder={`${t('main.home.buyParts.filters.searchPrefix', 'Search by')} ${t(`main.home.buyParts.filters.tabs.${activeTab}`, activeTab)}`}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Content */}
        <View style={styles.contentRow}>

          {/* Sidebar */}
          <View style={[styles.sidebar, { backgroundColor: theme.colors.gray100 }]}>
            {filterTabs.map(tab => {
              const isActive = activeTab === tab;

              return (
                <TouchableOpacity
                  key={tab}
                  style={[
                    styles.tabItem,
                    isActive && styles.activeTab,
                    isActive && { borderLeftColor: theme.colors.DeepGreen },
                  ]}
                  onPress={() => {
                    setActiveTab(tab);
                    setSearchQuery('');
                  }}
                >
                  <Text
                    variant={isActive ? 'bold' : 'regular'}
                    size={13}
                    color={isActive ? theme.colors.black : theme.colors.gray600}
                  >
                    {t(`main.home.buyParts.filters.tabs.${tab}`, tab)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Options */}
          <View style={styles.optionsContainer}>
            <Text variant="semiBold" size={14} color={theme.colors.textPrimary} style={styles.sectionTitle}>
              {t(`main.home.buyParts.filters.tabs.${activeTab}`, activeTab)}
            </Text>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.optionsGrid}>
                {filteredItems.map(item => {
                  const isSelected = selectedItems[activeTab].includes(item);

                  return (
                    <TouchableOpacity
                      key={item}
                      style={[
                        styles.optionButton,
                        {
                          borderColor: isSelected
                            ? theme.colors.DeepGreen
                            : theme.colors.gray300,
                          backgroundColor: isSelected
                            ? theme.colors.brandRedLight
                            : theme.colors.white,
                        },
                      ]}
                      onPress={() => handleToggleItem(item)}
                    >
                      <Text
                        variant={isSelected ? 'bold' : 'regular'}
                        size={13}
                        color={isSelected ? theme.colors.DeepGreen : theme.colors.gray700}
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Button
            title={t('main.home.buyParts.filters.clearAll', 'Clear All')}
            onPress={handleClearAll}
            style={[styles.footerButton, { backgroundColor: '#F1F8F1' }]}
            textStyle={{
              color: theme.colors.DeepGreen,
              fontFamily: theme.fontfamily.poppinsBold,
              fontSize: 14,
            }}
          />

          <Button
            title={t('main.home.buyParts.filters.apply', 'Apply')}
            onPress={() => onApply(selectedItems)}
            style={styles.footerButton}
            textStyle={{
              fontFamily: theme.fontfamily.poppinsBold,
              fontSize: 14,
            }}
          />
        </View>
      </View>
    </GlobalBottomSheet>
  );
};

// ─── Styles ─────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  searchWrapper: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },

  contentRow: {
    flex: 1,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },

  sidebar: {
    width: 130,
  },

  tabItem: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderLeftWidth: 4,
    borderLeftColor: 'transparent',
  },

  activeTab: {
    backgroundColor: '#FFFFFF',
  },

  optionsContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },

  sectionTitle: {
    marginBottom: 12,
  },

  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  optionButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },

  footer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: '#FFFFFF',
  },

  footerButton: {
    flex: 1,
    height: 48,
    marginHorizontal: 6,
  },
});

export default FilterBottomSheet;
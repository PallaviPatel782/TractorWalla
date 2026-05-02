import React, { useState } from 'react';
import { TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { View, Text, GlobalBottomSheet, SearchInput, Button } from '@components';
import { useTheme } from '@theme';
import { SW, SH, SF } from '@utils/Dimensions';

const filterTabs = ['Category', 'Subcategory', 'Brand', 'Model'] as const;
type FilterTab = typeof filterTabs[number];

const mockFilterData: Record<FilterTab, string[]> = {
  Category: ['Engine Parts', 'Electrical Parts', 'Brakes', 'Transmission'],
  Subcategory: ['Oil Filter', 'Air Filter', 'Fuel Filter'],
  Brand: ['Mahindra', 'Swaraj', 'John Deere', 'Eicher'],
  Model: ['Mahindra 295 DI Turbo', 'Mahindra Hidustan 60', 'Mahindra 575 DI SP PLUS', 'Mahindra Jivo 345 YR2024'],
};

interface FilterBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  onApply: (selectedFilters: any) => void;
}

const FilterBottomSheet: React.FC<FilterBottomSheetProps> = ({ visible, onClose, onApply }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState<FilterTab>('Category');
  const [searchQuery, setSearchQuery] = useState('');

  // Using an object to store selected items for each category
  const [selectedItems, setSelectedItems] = useState<Record<FilterTab, string[]>>({
    Category: [],
    Subcategory: [],
    Brand: [],
    Model: [],
  });

  const handleToggleItem = (item: string) => {
    setSelectedItems(prev => {
      const currentSelected = prev[activeTab];
      if (currentSelected.includes(item)) {
        return { ...prev, [activeTab]: currentSelected.filter(i => i !== item) };
      } else {
        return { ...prev, [activeTab]: [...currentSelected, item] };
      }
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
    <GlobalBottomSheet visible={visible} onClose={onClose} title={t('main.home.buyParts.filters.title', 'Filters and Sorting')}>
      <View style={styles.container}>
        <View style={styles.searchWrapper}>
          <SearchInput
            placeholder={`${t('main.home.buyParts.filters.searchPrefix', 'Search by')} ${t(`main.home.buyParts.filters.tabs.${activeTab}`, activeTab)}`}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.contentRow}>
          {/* Left Sidebar (Tabs) */}
          <View style={[styles.sidebar, { backgroundColor: theme.colors.gray100 }]}>
            {filterTabs.map(tab => {
              const isActive = activeTab === tab;
              return (
                <TouchableOpacity
                  key={tab}
                  style={[
                    styles.tabItem,
                    isActive && { backgroundColor: theme.colors.white, borderLeftColor: theme.colors.DeepGreen, borderLeftWidth: 3 }
                  ]}
                  onPress={() => {
                    setActiveTab(tab);
                    setSearchQuery('');
                  }}
                >
                  <Text
                    style={{
                      color: isActive ? theme.colors.black : theme.colors.gray600,
                      fontFamily: isActive ? theme.fontfamily.poppinsBold : theme.fontfamily.poppinsRegular,
                      fontSize: SF(13)
                    }}
                  >
                    {t(`main.home.buyParts.filters.tabs.${tab}`, tab)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Right Content (Options) */}
          <View style={styles.optionsContainer}>
            <Text style={{ fontFamily: theme.fontfamily.poppinsBold, fontSize: SF(14), marginBottom: SH(12), color: theme.colors.textPrimary }}>
              {t(`main.home.buyParts.filters.tabs.${activeTab}`, activeTab)}
            </Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              {filteredItems.map(item => {
                const isSelected = selectedItems[activeTab].includes(item);
                return (
                  <TouchableOpacity
                    key={item}
                    style={[
                      styles.optionButton,
                      { borderColor: isSelected ? theme.colors.DeepGreen : theme.colors.gray300 }
                    ]}
                    onPress={() => handleToggleItem(item)}
                  >
                    <Text style={{
                      color: isSelected ? theme.colors.DeepGreen : theme.colors.gray700,
                      fontFamily: isSelected ? theme.fontfamily.poppinsBold : theme.fontfamily.poppinsRegular,
                      fontSize: SF(13)
                    }}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Button
            title={t('main.home.buyParts.filters.clearAll', 'Clear All')}
            onPress={handleClearAll}
            style={[styles.footerButton, { backgroundColor: '#F1F8F1' }]}
            textStyle={{ color: theme.colors.DeepGreen, fontFamily: theme.fontfamily.poppinsBold, fontSize: SF(14) }}
          />
          <Button
            title={t('main.home.buyParts.filters.apply', 'Apply')}
            onPress={() => onApply(selectedItems)}
            style={styles.footerButton}
            textStyle={{ fontFamily: theme.fontfamily.poppinsBold, fontSize: SF(14) }}
          />
        </View>
      </View>
    </GlobalBottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    height: SH(450),
    display: 'flex',
    flexDirection: 'column',
    marginHorizontal: -SW(20), // Compensate for GlobalBottomSheet horizontal padding
  },
  searchWrapper: {
    paddingHorizontal: SW(20),
    paddingBottom: SH(12),
  },
  contentRow: {
    flex: 1,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  sidebar: {
    width: SW(135),
    height: '100%',
  },
  tabItem: {
    paddingVertical: SH(16),
    paddingHorizontal: SW(16),
    borderLeftWidth: 4,
    borderLeftColor: 'transparent',
  },
  optionsContainer: {
    flex: 1,
    paddingHorizontal: SW(20),
    paddingVertical: SH(16),
    backgroundColor: '#FFFFFF',
  },
  optionButton: {
    paddingVertical: SH(8),
    paddingHorizontal: SW(12),
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: SH(10),
    alignSelf: 'flex-start',
  },
  footer: {
    flexDirection: 'row',
    padding: SW(20),
    gap: SW(12),
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: '#FFFFFF',
  },
  footerButton: {
    flex: 1,
    height: SH(48),
  }
});

export default FilterBottomSheet;

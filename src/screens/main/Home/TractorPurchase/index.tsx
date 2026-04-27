import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  ScreenWrapper,
  SearchInput,
  FlatList,
  TouchableOpacity,
  SecondaryHeader,
  Dropdown,
  Button,
} from '@components';
import { useTheme } from '@theme';
import { createStyles } from './styles';
import { useTranslation } from 'react-i18next';
import { SW, SH } from '@utils/Dimensions';
import { BikeIcon } from '@assets/icons';


import { useBrands } from '@screens/auth/hooks/useAuth';
import { ActivityIndicator, Image as RNImage } from 'react-native';
import { Brand } from '@appTypes/api.types';

const TractorPurchaseScreen = () => {
  const navigation = useNavigation<any>();
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = createStyles(theme);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('New Tractor');
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);

  const { data: brandsData, isLoading } = useBrands();
  const brands: Brand[] = brandsData?.data || brandsData?.brands || [];

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNext = () => {
    if (selectedBrand) {
      navigation.navigate('SelectTractor', {
        brand: selectedBrand.name,
        brandId: selectedBrand._id,
        brandLogo: selectedBrand.logoUrl,
        type: selectedType
      });
    }
  };

  const SelectedBrandIcon = () => {
    if (selectedBrand?.logoUrl) {
      return <RNImage source={{ uri: selectedBrand.logoUrl }} style={{ width: SW(20), height: SW(20) }} resizeMode="contain" />;
    }
    return <BikeIcon width={SW(20)} height={SW(20)} />;
  };



  return (
    <ScreenWrapper>
      <View style={styles.root}>
        <SecondaryHeader
          title={t('main.home.tractorPurchase', 'Tractor Purchase')}
          onBack={() => navigation.goBack()}
        />

        <View style={styles.content}>
          <SearchInput
            placeholder={t('main.home.searchByBrand', 'Search by Brand')}
            value={searchQuery}
            onChangeText={setSearchQuery}
            containerStyle={styles.searchContainer}
          />

          <Dropdown
            options={[
              { label: 'New Tractor', value: 'New Tractor' },
              { label: 'Old Tractor', value: 'Old Tractor' },
            ]}
            selectedValue={selectedType}
            onSelect={(item) => setSelectedType(item.value)}
            placeholder={t('main.home.chooseWhatToBuy', 'Choose what you want to buy')}
            buttonStyle={styles.dropdown}
            leftIcon={<SelectedBrandIcon />}
          />

          {isLoading ? (
            <ActivityIndicator color={theme.colors.brandRed} style={{ marginTop: SH(40) }} />
          ) : (
            <FlatList
              data={filteredBrands}
              numColumns={4}
              keyExtractor={(item) => item.name}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.brandGrid}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.brandItem,
                    selectedBrand?._id === item._id && styles.selectedBrand,
                  ]}
                  onPress={() => setSelectedBrand(item)}
                >
                  <View style={styles.brandImageWrap}>
                    {item.logoUrl ? (
                      <RNImage source={{ uri: item.logoUrl }} style={{ width: SW(44), height: SW(44) }} resizeMode="contain" />
                    ) : (
                      <BikeIcon width={SW(32)} height={SW(32)} color={theme.colors.gray300} />
                    )}
                  </View>
                  <Text style={styles.brandName} numberOfLines={1}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          )}
        </View>

        <View style={styles.footer}>
          <Button
            title={t('common.next', 'Next')}
            onPress={handleNext}
            disabled={!selectedBrand}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default TractorPurchaseScreen;

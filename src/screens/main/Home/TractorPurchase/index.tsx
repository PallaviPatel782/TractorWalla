import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  ScreenWrapper,
  SearchInput,
  TouchableOpacity,
  SecondaryHeader,
  Dropdown,
  FlatList,
  Image,
  Loader,
} from '@components';
import { useTheme } from '@theme';
import { createStyles } from './styles';
import { useTranslation } from 'react-i18next';
import { BikeIcon, TractorIcon } from '@assets/icons';
import { OthersImage } from '@assets/images';
import { useBrands } from '@screens/auth/hooks/useAuth';
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
  const brands: Brand[] = [...(brandsData?.data || brandsData?.brands || []), { _id: 'others', id: 'others', name: 'Others' }];

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const SelectedBrandIcon = () => {
    if (selectedBrand?._id === 'others') {
      return <OthersImage width={20} height={20} />;
    }
    if (selectedBrand?.logoUrl) {
      return <Image source={{ uri: selectedBrand.logoUrl }} style={{ width: 20, height: 20 }} resizeMode="contain" />;
    }
    return <BikeIcon width={20} height={20} />;
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
            leftIcon={<SelectedBrandIcon />}
          />

          <Loader visible={isLoading} inline />

          <FlatList
            key={4}
            data={filteredBrands}
            numColumns={4}
            keyExtractor={(item: any) => item._id}
            contentContainerStyle={{ paddingBottom: 20, marginTop: 20 }}
            columnWrapperStyle={{ marginBottom: 20, justifyContent: 'flex-start' }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }: { item: any }) => (
              <TouchableOpacity
                style={styles.brandItem}
                onPress={() => {
                  setSelectedBrand(item);
                  navigation.navigate('SelectTractor', {
                    brand: item.name,
                    brandId: item._id,
                    brandLogo: item.logoUrl,
                    type: selectedType
                  });
                }}
              >
                <View style={styles.brandImageWrap}>
                  {item._id === 'others' ? (
                    <OthersImage width={44} height={44} />
                  ) : item.logoUrl ? (
                    <Image source={{ uri: item.logoUrl }} style={{ width: 44, height: 44 }} resizeMode="contain" />
                  ) : (
                    <TractorIcon width={32} height={32} color={theme.colors.gray300} />
                  )}
                </View>
                <Text style={styles.brandName} numberOfLines={1}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

      </View>
    </ScreenWrapper>
  );
};

export default TractorPurchaseScreen;

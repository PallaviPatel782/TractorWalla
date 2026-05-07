import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@theme';
import {
  Text,
  SecondaryHeader,
  ScreenWrapper,
  View,
  TouchableOpacity,
  SearchInput,
  FlatList,
  Image,
  Loader,
} from '@components';
import { createStyles } from './styles';
import { useBrands } from '@screens/auth/hooks/useAuth';
import { BikeIcon } from '@assets/icons';

const TractorBrand = ({ navigation }: any) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = createStyles(theme);
  const [search, setSearch] = useState('');
  
  const { data, isLoading } = useBrands();
  const brands = [...(data?.data || data?.brands || []), { _id: 'others', name: 'Others' }];

  const filteredBrands = brands.filter(brand =>
    brand.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleBrandSelect = (brand: any) => {
    navigation.navigate('TractorBrandRegister', {
      brandId: brand._id,
      brandName: brand.name,
      logoUrl: brand.logoUrl,
    });
  };



  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.header}>
          <SecondaryHeader
            title={t('main.tractor.selectBrand')}
            onBack={() => navigation.goBack()}
            titleColor={theme.colors.black}
            backIconColor={theme.colors.black}
            backgroundColor="transparent"
          />
        </View>

        <View style={styles.content}>
          <View style={styles.searchContainer}>
            <SearchInput
              placeholder={t('main.tractor.searchBrand')}
              value={search}
              onChangeText={setSearch}
            />
          </View>

          <Loader visible={isLoading} inline />

          <FlatList
            data={filteredBrands}
            numColumns={4}
            keyExtractor={(item: any) => item._id}
            contentContainerStyle={{ paddingBottom: 20, marginTop: 20, paddingHorizontal: 12 }}
            columnWrapperStyle={{ marginBottom: 20 }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }: { item: any }) => (
              <TouchableOpacity
                style={styles.brandItem}
                onPress={() => handleBrandSelect(item)}
              >
                <View style={styles.logoContainer}>
                  {item._id === 'others' ? (
                    <BikeIcon width={40} height={40} color={theme.colors.brandRed} />
                  ) : item.logoUrl ? (
                    <Image
                      source={{ uri: item.logoUrl }}
                      style={{ width: 44, height: 44 }}
                      resizeMode="contain"
                    />
                  ) : null}
                </View>
                <Text variant="medium" size={11} style={styles.brandName}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default TractorBrand;
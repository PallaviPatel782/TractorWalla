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
  ScrollView,
  Image,
} from '@components';
import { createStyles } from './styles';
import { SW, SH } from '@utils/Dimensions';
import { useBrands } from '@screens/auth/hooks/useAuth';
import { ActivityIndicator } from 'react-native';
import { BikeIcon } from '@assets/icons';

const MainTractorBrand = ({ navigation, route }: any) => {
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
    navigation.navigate('AddTractorDetails', {
      ...route.params,
      brandId: brand._id,
      brandName: brand.name,
      logoUrl: brand.logoUrl,
      model: ''
    });
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.header}>
          <SecondaryHeader
            title={t('main.tractor.selectBrand', 'Select Your Tractor')}
            onBack={() => navigation.goBack()}
            titleColor={theme.colors.black}
            backIconColor={theme.colors.black}
            backgroundColor="transparent"
          />
        </View>

        <View style={styles.content}>
          <View style={styles.searchContainer}>
            <SearchInput
              placeholder={t('main.tractor.searchBrand', 'Search by Brand')}
              value={search}
              onChangeText={setSearch}
            />
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: SH(20) }}
          >
            {isLoading ? (
              <ActivityIndicator size="large" color={theme.colors.brandRed} style={{ marginTop: SH(50) }} />
            ) : (
              <View style={styles.brandGrid}>
                {filteredBrands.map((brand: any) => {
                  return (
                    <TouchableOpacity
                      key={brand._id}
                      style={styles.brandItem}
                      onPress={() => handleBrandSelect(brand)}
                    >
                      <View style={styles.logoContainer}>
                        {brand._id === 'others' ? (
                          <BikeIcon width={SW(40)} height={SW(40)} color={theme.colors.brandRed} />
                        ) : brand.logoUrl ? (
                          <Image 
                            source={{ uri: brand.logoUrl }} 
                            style={{ width: SW(44), height: SW(44) }}
                            resizeMode="contain"
                          />
                        ) : null}
                      </View>
                      <Text variant="medium" size={11} style={styles.brandName}>
                        {brand.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default MainTractorBrand;

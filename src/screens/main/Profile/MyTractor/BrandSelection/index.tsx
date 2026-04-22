import React, { useState } from 'react';
import { useTheme } from '@theme';
import {
  Text,
  SecondaryHeader,
  ScreenWrapper,
  View,
  TouchableOpacity,
  SearchInput,
  ScrollView,
} from '@components';
import {
  MahindraImage,
  SwarajImage,
  JohnDeereImage,
  EicherImage,
  SonalikaImage,
  SolisImage,
  CaptainImage,
  VstImage,
  ForceImage,
  NewHollandImage,
  FarmtracImage,
  PowertracImage,
  KubotaImage,
  MasseyFergusonImage,
  OthersImage
} from '@images';
import { createStyles } from './styles';
import { SW, SH } from '@utils/Dimensions';
import { useTranslation } from 'react-i18next';

const BRANDS = [
  { id: '1', name: 'Mahindra', logo: MahindraImage },
  { id: '2', name: 'Swaraj', logo: SwarajImage },
  { id: '3', name: 'John Deere', logo: JohnDeereImage },
  { id: '4', name: 'Eicher', logo: EicherImage },
  { id: '5', name: 'Sonalika', logo: SonalikaImage },
  { id: '6', name: 'Solis', logo: SolisImage },
  { id: '7', name: 'Captain', logo: CaptainImage },
  { id: '8', name: 'VST', logo: VstImage },
  { id: '9', name: 'Force', logo: ForceImage },
  { id: '10', name: 'New Holland', logo: NewHollandImage },
  { id: '11', name: 'Farmtrac', logo: FarmtracImage },
  { id: '12', name: 'Powertrac', logo: PowertracImage },
  { id: '13', name: 'Kubota', logo: KubotaImage },
  { id: '14', name: 'Massey Ferguson', logo: MasseyFergusonImage },
  { id: '15', name: 'Others', logo: OthersImage },
];

const MainTractorBrand = ({ navigation }: any) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [search, setSearch] = useState('');
  const { t } = useTranslation();

  const filteredBrands = BRANDS.filter(brand =>
    brand.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleBrandSelect = (brand: any) => {
    navigation.navigate('AddTractorDetails', {
      brand: brand.name,
      brandLogo: brand.logo,
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
            <View style={styles.brandGrid}>
              {filteredBrands.map((brand) => (
                <TouchableOpacity
                  key={brand.id}
                  style={styles.brandItem}
                  onPress={() => handleBrandSelect(brand)}
                >
                  <View style={styles.logoContainer}>
                    <brand.logo width={SW(44)} height={SW(44)} />
                  </View>
                  <Text variant="medium" size={11} style={styles.brandName}>
                    {brand.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default MainTractorBrand;

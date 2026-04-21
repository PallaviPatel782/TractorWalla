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
import { SW } from '@utils/Dimensions';
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
  FarmtracImage,
  PowertracImage,
  KubotaImage,
  NewHollandImage,
  MasseyFergusonImage,
  OthersImage,
} from '@assets/images';
import { BikeIcon } from '@assets/icons';

const BRANDS = [
  { name: 'Mahindra', Image: MahindraImage },
  { name: 'Swaraj', Image: SwarajImage },
  { name: 'John Deere', Image: JohnDeereImage },
  { name: 'Eicher', Image: EicherImage },
  { name: 'Sonalika', Image: SonalikaImage },
  { name: 'Solis', Image: SolisImage },
  { name: 'Captain', Image: CaptainImage },
  { name: 'VST', Image: VstImage },
  { name: 'Force', Image: ForceImage },
  { name: 'Farmtrac', Image: FarmtracImage },
  { name: 'Powertrac', Image: PowertracImage },
  { name: 'Kubota', Image: KubotaImage },
  { name: 'New Holland', Image: NewHollandImage },
  { name: 'Massey Ferguson', Image: MasseyFergusonImage },
  { name: 'Others', Image: OthersImage },
];

const TractorPurchaseScreen = () => {
  const navigation = useNavigation<any>();
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = createStyles(theme);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('New Tractor');
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const filteredBrands = BRANDS.filter(brand =>
    brand.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNext = () => {
    if (selectedBrand) {
      const brandObj = BRANDS.find(b => b.name === selectedBrand);
      navigation.navigate('SelectTractor', {
        brand: selectedBrand,
        brandLogo: brandObj?.Image,
        type: selectedType
      });
    }
  };

  const selectedBrandObj = BRANDS.find(b => b.name === selectedBrand);
  const SelectedBrandLogo = selectedBrandObj ? selectedBrandObj.Image : BikeIcon;



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
            leftIcon={<SelectedBrandLogo width={SW(20)} height={SW(20)} />}
          />

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
                  selectedBrand === item.name && styles.selectedBrand,
                ]}
                onPress={() => setSelectedBrand(item.name)}
              >
                <View style={styles.brandImageWrap}>
                  <item.Image width={SW(44)} height={SW(44)} />
                </View>
                <Text style={styles.brandName} numberOfLines={1}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
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

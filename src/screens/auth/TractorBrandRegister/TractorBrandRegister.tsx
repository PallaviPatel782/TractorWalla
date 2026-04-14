import React, { useState, useMemo } from 'react';
import { ScrollView } from 'react-native';
import { useTheme } from '@theme';
import {
  Text,
  Button,
  Input,
  SecondaryHeader,
  ScreenWrapper,
  KeyboardWrapper,
  View,
  TouchableOpacity,
  Dropdown,
} from '@components';
import { useAppDispatch } from '@store';
import { updateUser, setCredentials } from '@store/slices/authSlice';
import { createStyles } from './TractorBrandRegister.styles';
import { SW, SH, SF } from '@utils/Dimensions';
import { TRACTOR_MODELS } from '@constants/TractorData';
import * as Brands from '@images';

const BRAND_LOGOS: Record<string, any> = {
  Mahindra: Brands.MahindraImage,
  Swaraj: Brands.SwarajImage,
  'John Deere': Brands.JohnDeereImage,
  Eicher: Brands.EicherImage,
  Sonalika: Brands.SonalikaImage,
  Solis: Brands.SolisImage,
  Captain: Brands.CaptainImage,
  VST: Brands.VstImage,
  Force: Brands.ForceImage,
  'New Holland': Brands.NewHollandImage,
  Farmtrac: Brands.FarmtracImage,
  Powertrac: Brands.PowertracImage,
  Kubota: Brands.KubotaImage,
  'Massey Ferguson': Brands.MasseyFergusonImage,
  Others: Brands.OthersImage,
};

const TractorBrandRegister = ({ navigation, route }: any) => {

  const { theme } = useTheme();
  const styles = createStyles(theme);
  const dispatch = useAppDispatch();
  const { brand } = route.params;

  const isOthers = brand === 'Others';

  const [formData, setFormData] = useState({
    customBrand: isOthers ? '' : brand,
    model: '',
    registrationNo: '',
    yearOfManufacture: '',
    yearOfPurchase: '',
    tractorType: 'Agricultural', // Default as per common use
  });

  const modelOptions = useMemo(() => {
    const brandKey = isOthers ? formData.customBrand : brand;
    const models = TRACTOR_MODELS[brandKey] || [];
    return models.map(m => ({ label: m, value: m }));
  }, [brand, isOthers, formData.customBrand]);

  const handleInputChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleContinue = () => {
    dispatch(updateUser({
      tractorBrand: isOthers ? formData.customBrand : brand,
      tractorModel: formData.model,
      tractorRegNo: formData.registrationNo,
      tractorYearWeight: formData.yearOfManufacture,
      tractorPurchaseYear: formData.yearOfPurchase,
      tractorType: formData.tractorType,
    }));

    // Directly navigate to Main Tab Navigator
    navigation.navigate('Main');
  };


  const renderTractorTypeOption = (type: string) => {
    const isActive = formData.tractorType === type;
    return (
      <TouchableOpacity
        style={[styles.typeItem, isActive && styles.typeItemActive]}
        onPress={() => handleInputChange('tractorType', type)}
        activeOpacity={0.7}
      >
        <Text variant="medium" size={12} style={styles.typeText}>
          {type}
        </Text>
        <View style={[styles.radioCircle, isActive && styles.radioCircleActive]}>
          {isActive && <View style={styles.radioInner} />}
        </View>
      </TouchableOpacity>
    );
  };

  const BrandLogo = BRAND_LOGOS[brand] || Brands.OthersImage;


  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <SecondaryHeader title="Add Tractor Details" onBack={() => navigation.goBack()} />

        <KeyboardWrapper>
          <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
          >
            <View style={{ gap: SH(16) }}>
              {!isOthers && (
                <View style={styles.brandDisplayContainer}>
                  <View style={styles.brandLogoBox}>
                    <BrandLogo width={SW(40)} height={SW(40)} />
                  </View>
                  <Text variant="regular" size={16} style={styles.brandDisplayName}>
                    {brand}
                  </Text>
                </View>
              )}


              {!isOthers && (
                <View>
                  <Dropdown
                    options={modelOptions}
                    selectedValue={formData.model}
                    onSelect={(opt) => handleInputChange('model', opt.value)}
                    placeholder="Select Model"
                    leftIcon={<Brands.OthersImage width={SW(24)} height={SW(24)} />}
                    buttonStyle={styles.dropdownButton}
                  />
                </View>
              )}


              <View style={styles.formContainer}>
                {isOthers && (
                  <Input
                    label="Brand Name*"
                    placeholder="Enter brand name"
                    value={formData.customBrand}
                    onChangeText={(val) => handleInputChange('customBrand', val)}
                  />
                )}
                {isOthers && (
                  <Input
                    label="Model Name*"
                    placeholder="Enter model name"
                    value={formData.model}
                    onChangeText={(val) => handleInputChange('model', val)}
                  />
                )}
                <Input
                  label="Registration No*"
                  placeholder="Enter registration no"
                  value={formData.registrationNo}
                  onChangeText={(val) => handleInputChange('registrationNo', val)}
                />

                <Input
                  label="Year of Manufacture*"
                  placeholder="Enter year"
                  keyboardType="number-pad"
                  maxLength={4}
                  value={formData.yearOfManufacture}
                  onChangeText={(val) => handleInputChange('yearOfManufacture', val)}
                />

                <Input
                  label="Year of Purchase*"
                  placeholder="Enter year"
                  keyboardType="number-pad"
                  maxLength={4}
                  value={formData.yearOfPurchase}
                  onChangeText={(val) => handleInputChange('yearOfPurchase', val)}
                />

                <View>
                  <Text variant="medium" size={14} style={styles.label}>Type of Tractor*</Text>
                  <View style={styles.typeSelectionContainer}>
                    {renderTractorTypeOption('Commercial')}
                    {renderTractorTypeOption('Agricultural')}
                  </View>
                </View>

              </View>
            </View>

            <Button
              title={isOthers ? "ADD TRACTOR" : "CONTINUE"}

              onPress={handleContinue}
              style={styles.button}
              disabled={!formData.registrationNo || !formData.model || (!formData.customBrand && isOthers)}
            />
          </ScrollView>
        </KeyboardWrapper>
      </View>
    </ScreenWrapper>
  );
};

export default TractorBrandRegister;
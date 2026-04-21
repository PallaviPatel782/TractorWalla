import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
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
  ScrollView,
  GlobalBottomSheet,
} from '@components';
import { useAppDispatch } from '@store';
import { addTractor } from '@store/slices/authSlice';
import { createStyles } from './styles';
import { SW, SH } from '@utils/Dimensions';
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
  const { t } = useTranslation();
  const styles = createStyles(theme);
  const dispatch = useAppDispatch();
  const { brand } = route.params;

  const isOthers = brand === 'Others';

  const [showTypeSheet, setShowTypeSheet] = useState(false);

  const [formData, setFormData] = useState({
    customBrand: isOthers ? '' : brand,
    model: '',
    registrationNo: '',
    yearOfManufacture: '',
    yearOfPurchase: '',
    tractorType: 'agricultural',
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
    dispatch(addTractor({
      id: Math.random().toString(36).substr(2, 9),
      brand: isOthers ? formData.customBrand : brand,
      model: formData.model,
      registrationNo: formData.registrationNo,
      yearOfManufacture: formData.yearOfManufacture,
      yearOfPurchase: formData.yearOfPurchase,
      tractorType: formData.tractorType,
    }));
    navigation.navigate('Main');
  };




  const BrandLogo = BRAND_LOGOS[brand] || Brands.OthersImage;


  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <SecondaryHeader title={t('main.register.title')} onBack={() => navigation.goBack()} />

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
                    {t(`common.brands.${brand}`)}
                  </Text>
                </View>
              )}


              {!isOthers && (
                <View>
                  <Dropdown
                    options={modelOptions}
                    selectedValue={formData.model}
                    onSelect={(opt) => handleInputChange('model', opt.value)}
                    placeholder={t('main.register.placeholderModel')}
                    leftIcon={<Brands.OthersImage width={SW(24)} height={SW(24)} />}
                    buttonStyle={styles.dropdownButton}
                  />
                </View>
              )}


              <View style={styles.formContainer}>
                {isOthers && (
                  <Input
                    label={t('main.register.brandNameLabel')}
                    placeholder={t('main.register.placeholderBrandName')}
                    value={formData.customBrand}
                    onChangeText={(val) => handleInputChange('customBrand', val)}
                  />
                )}
                {isOthers && (
                  <Input
                    label={t('main.register.modelNameLabel')}
                    placeholder={t('main.register.placeholderModelName')}
                    value={formData.model}
                    onChangeText={(val) => handleInputChange('model', val)}
                  />
                )}
                <Input
                  label={t('main.register.registrationLabel')}
                  placeholder={t('main.register.placeholderRegistration')}
                  value={formData.registrationNo}
                  onChangeText={(val) => handleInputChange('registrationNo', val)}
                />

                <Input
                  label={t('main.register.manufactureYearLabel')}
                  placeholder={t('main.register.placeholderYearEntry')}
                  keyboardType="number-pad"
                  maxLength={4}
                  value={formData.yearOfManufacture}
                  onChangeText={(val) => handleInputChange('yearOfManufacture', val)}
                />

                <Input
                  label={t('main.register.purchaseYearLabel')}
                  placeholder={t('main.register.placeholderYearEntry')}
                  keyboardType="number-pad"
                  maxLength={4}
                  value={formData.yearOfPurchase}
                  onChangeText={(val) => handleInputChange('yearOfPurchase', val)}
                />

                <View>
                  <Text variant="medium" size={14} style={styles.label}>{t('main.register.typeLabel')}</Text>
                  <TouchableOpacity
                    style={styles.typeTriggerButton}
                    onPress={() => setShowTypeSheet(true)}
                    activeOpacity={0.7}
                  >
                    <Text variant="regular" size={13} style={styles.typeTriggerText}>
                      {t(`main.register.${formData.tractorType}`)}
                    </Text>
                  </TouchableOpacity>
                </View>

              </View>
            </View>

            <Button
              title={isOthers ? t('main.register.button') : t('common.continue')}

              onPress={handleContinue}
              style={styles.button}
            // disabled={!formData.registrationNo || !formData.model || (!formData.customBrand && isOthers)}
            />
          </ScrollView>
        </KeyboardWrapper>

        <GlobalBottomSheet
          visible={showTypeSheet}
          onClose={() => setShowTypeSheet(false)}
          title="Select Type of Tractor"
        >
          {['commercial', 'agricultural'].map((typeKey: any) => {
            const isActive = formData.tractorType === typeKey;
            return (
              <TouchableOpacity
                key={typeKey}
                style={styles.bottomSheetItem}
                onPress={() => {
                  handleInputChange('tractorType', typeKey);
                  setShowTypeSheet(false);
                }}
                activeOpacity={0.7}
              >
                <Text variant="regular" size={14} style={isActive ? styles.bottomSheetItemTextActive : styles.bottomSheetItemText}>
                  {t(`main.register.${typeKey}`)}
                </Text>
                <View style={[styles.radioCircle, isActive && styles.radioCircleActive]}>
                  {isActive && <View style={styles.radioInner} />}
                </View>
              </TouchableOpacity>
            );
          })}
        </GlobalBottomSheet>
      </View>
    </ScreenWrapper>
  );
};

export default TractorBrandRegister;
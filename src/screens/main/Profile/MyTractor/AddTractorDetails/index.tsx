import { SH, SW } from '@utils/Dimensions';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Brands from '@assets/images';
import { TractorImage } from '@assets/images';
import {
  Button,
  Dropdown,
  Input,
  KeyboardWrapper,
  ScreenWrapper,
  SecondaryHeader,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  GlobalBottomSheet
} from '@components';
import { TRACTOR_MODELS } from '@constants/TractorData';
import { useAppDispatch } from '@store';
import { addTractor, updateTractor } from '@store/slices/authSlice';
import { useTheme } from '@theme';
import { createStyles } from './styles';


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

const AddTractorDetails = ({ navigation, route }: any) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = createStyles(theme);
  const dispatch = useAppDispatch();
  const { brand, model, tractor } = route.params || {};

  const isEdit = !!tractor;
  const initialBrand = isEdit ? tractor.brand : (brand || 'Others');
  const isOthers = initialBrand === 'Others';

  const [showTypeSheet, setShowTypeSheet] = useState(false);

  const [formData, setFormData] = useState({
    id: isEdit ? tractor.id : Math.random().toString(36).substr(2, 9),
    brand: initialBrand,
    model: isEdit ? tractor.model : (model || ''),
    registrationNo: isEdit ? tractor.registrationNo : '',
    yearOfManufacture: isEdit ? tractor.yearOfManufacture : '',
    yearOfPurchase: isEdit ? tractor.yearOfPurchase : '',
    tractorType: isEdit ? tractor.tractorType : 'agricultural',
  });

  const modelOptions = useMemo(() => {
    const brandKey = isOthers ? formData.brand : initialBrand;
    const models = TRACTOR_MODELS[brandKey] || [];
    return models.map(m => ({ label: m, value: m }));
  }, [initialBrand, isOthers, formData.brand]);

  const handleInputChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    if (isEdit) {
      dispatch(updateTractor(formData));
    } else {
      dispatch(addTractor(formData));
    }
    navigation.navigate('MyTractors');
  };



  const BrandLogo = BRAND_LOGOS[initialBrand] || Brands.OthersImage;

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <SecondaryHeader
          title={isEdit ? t('main.register.myTractorTitle') : t('main.register.title')}
          onBack={() => navigation.goBack()}
        />

        <KeyboardWrapper>
          <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
          >
            <View style={{ gap: SH(16) }}>
              {!isOthers && !isEdit && (
                <View style={styles.brandDisplayContainer}>
                  <View style={styles.brandLogoBox}>
                    <BrandLogo width={SW(40)} height={SW(40)} />
                  </View>
                  <Text variant="regular" size={16} style={styles.brandDisplayName}>
                    {t(`common.brands.${initialBrand}`)}
                  </Text>
                </View>
              )}

              {isEdit && (
                <View style={styles.tractorImageContainer}>
                  <TractorImage width={SW(180)} height={SH(140)} />
                  <Text variant="semiBold" size={18} color={theme.colors.gray900} style={{ marginTop: SH(10) }}>
                    {t(`common.brands.${formData.brand}`)}
                  </Text>
                  <Text variant="regular" size={14} color={theme.colors.gray500}>
                    {formData.model}
                  </Text>
                </View>
              )}

              {!isOthers && !isEdit && (
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
                {isOthers && !isEdit && (
                  <Input
                    label={t('main.register.brandNameLabel')}
                    placeholder={t('main.register.placeholderBrandName')}
                    value={formData.brand}
                    onChangeText={(val) => handleInputChange('brand', val)}
                  />
                )}

                {isOthers && !isEdit && (
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

            <View style={styles.footer}>
              <Button
                title={isEdit ? t('main.register.updateButton') : t('main.register.button')}
                onPress={handleSave}
                disabled={!formData.registrationNo || !formData.model || !formData.brand}
              />
            </View>
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

export default AddTractorDetails;

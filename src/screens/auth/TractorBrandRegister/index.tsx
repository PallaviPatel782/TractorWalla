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
  Image,
  ScreenFooter,
} from '@components';
import { useAddVehicle, useModels } from '@screens/auth/hooks/useAuth';
import { createStyles } from './styles';
import { BikeIcon, KeyboardArrowUpIcon } from '@assets/icons';


const TractorBrandRegister = ({ navigation, route }: any) => {

  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = createStyles(theme);
  const { brandId, brandName, logoUrl } = route.params;

  const isOthers = brandName === 'Others';

  const [showTypeSheet, setShowTypeSheet] = useState(false);

  const { data: modelsData, isLoading: isLoadingModels } = useModels(brandId);
  const { mutate: addVehicle, isPending: isAddingVehicle } = useAddVehicle();

  const [formData, setFormData] = useState({
    customBrand: isOthers ? '' : brandName,
    model: '',
    modelId: '',
    registrationNo: '',
    yearOfManufacture: '',
    yearOfPurchase: '',
    tractorType: 'agricultural',
  });

  const modelOptions = useMemo(() => {
    const data = modelsData?.data || modelsData?.models || [];
    return data.map((m: any) => ({ label: m.name, value: m.name, id: m._id || m.id }));
  }, [modelsData]);

  const handleInputChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleContinue = () => {
    addVehicle({
      brandId: brandId,
      modelId: formData.modelId,
      registrationNo: formData.registrationNo,
      yearOfManufacture: parseInt(formData.yearOfManufacture),
      yearOfPurchase: parseInt(formData.yearOfPurchase),
      tractorType: formData.tractorType,
      customBrandName: formData.customBrand || '',
      customModelName: formData.model || '',
    }, {
      onSuccess: () => {
        // RootNavigator will switch to Main stack automatically
      }
    });
  };







  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <SecondaryHeader title={t('main.register.title')} onBack={() => navigation.goBack()} />

        <KeyboardWrapper>
          <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
          >
            <View style={{ gap: 12 }}>
              {!isOthers && (
                <View style={styles.brandDisplayContainer}>
                  <View style={styles.brandLogoBox}>
                    {logoUrl && (
                      <Image
                        source={{ uri: logoUrl }}
                        style={{ width: 40, height: 40 }}
                        resizeMode="contain"
                      />
                    )}
                  </View>
                  <Text variant="regular" size={16} style={styles.brandDisplayName}>
                    {brandName}
                  </Text>
                </View>
              )}

              {!isOthers && (
                <Dropdown
                  // label={t('main.register.modelNameLabel')}
                  required
                  options={modelOptions}
                  selectedValue={formData.model}
                  onSelect={(opt) => {
                    handleInputChange('model', opt.value);
                    handleInputChange('modelId', opt.id?.toString() || '');
                  }}
                  placeholder={t('main.register.placeholderModel')}
                  leftIcon={<BikeIcon width={20} height={20} color={theme.colors.brandRed} />}
                  loading={isLoadingModels}
                />
              )}


              <View style={styles.formContainer}>
                {isOthers && (
                  <Input
                    label={t('main.register.brandNameLabel')}
                    placeholder={t('main.register.placeholderBrandName')}
                    value={formData.customBrand}
                    onChangeText={(val) => handleInputChange('customBrand', val)}
                    required
                  />
                )}
                {isOthers && (
                  <Input
                    label={t('main.register.modelNameLabel')}
                    placeholder={t('main.register.placeholderModelName')}
                    value={formData.model}
                    onChangeText={(val) => handleInputChange('model', val)}
                    required
                  />
                )}
                <Input
                  label={t('main.register.registrationLabel')}
                  placeholder={t('main.register.placeholderRegistration')}
                  value={formData.registrationNo}
                  onChangeText={(val) => handleInputChange('registrationNo', val)}
                  required
                />

                <Input
                  label={t('main.register.manufactureYearLabel')}
                  placeholder={t('main.register.placeholderYearEntry')}
                  keyboardType="number-pad"
                  maxLength={4}
                  value={formData.yearOfManufacture}
                  onChangeText={(val) => handleInputChange('yearOfManufacture', val)}
                  required
                />

                <Input
                  label={t('main.register.purchaseYearLabel')}
                  placeholder={t('main.register.placeholderYearEntry')}
                  keyboardType="number-pad"
                  maxLength={4}
                  value={formData.yearOfPurchase}
                  onChangeText={(val) => handleInputChange('yearOfPurchase', val)}
                />

                <View style={{ marginBottom: 12 }}>
                  <Text style={[styles.label, { fontSize: 12, marginBottom: 4 }]}>
                    {t('main.register.typeLabel')} <Text style={{ color: theme.colors.error }}>*</Text>
                  </Text>
                  <TouchableOpacity
                    style={styles.typeTriggerButton}
                    onPress={() => setShowTypeSheet(true)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.typeTriggerText}>
                      {formData.tractorType ? t(`main.register.${formData.tractorType}`) : 'Select type'}
                    </Text>
                    <View style={{ transform: [{ rotate: '180deg' }] }}>
                      <KeyboardArrowUpIcon size={16} color={theme.colors.gray400} />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

          </ScrollView>
        </KeyboardWrapper>

        <ScreenFooter>
          <Button
            title={isOthers ? t('main.register.button') : t('common.continue')}
            onPress={handleContinue}
            loading={isAddingVehicle}
            disabled={!formData.registrationNo || !formData.model || (isOthers && !formData.customBrand)}
          />
        </ScreenFooter>


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
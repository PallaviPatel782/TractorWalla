import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  Input,
  KeyboardWrapper,
  ScreenWrapper,
  SecondaryHeader,
  Text,
  TouchableOpacity,
  Dropdown,
  View,
  ScrollView,
  GlobalBottomSheet,
  Image,
  ScreenFooter,
} from '@components';
import { useAddVehicle, useModels } from '@screens/auth/hooks/useAuth';
import { BikeIcon } from '@assets/icons';
import { useUpdateVehicle } from '@screens/main/hooks/useVehicle';
import { useTheme } from '@theme';
import { createStyles } from './styles';
import { TractorImage } from '@assets/images';

const AddTractorDetails = ({ navigation, route }: any) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = createStyles(theme);
  const { brandId, brandName, model, tractor, logoUrl } = route.params || {};

  const isEdit = !!tractor;
  const isOthers = brandName === 'Others';
  const initialBrand = isEdit ? tractor.brand : (brandName || 'Others');

  const actualBrandId = isEdit ? (tractor._original?.brandId?._id || tractor.brandId) : brandId;
  const actualModelId = isEdit ? (tractor._original?.modelId?._id || tractor.modelId) : '';
  const actualLogoUrl = isEdit ? (tractor._original?.brandId?.logoUrl || logoUrl) : logoUrl;

  const [showTypeSheet, setShowTypeSheet] = useState(false);

  const { data: modelsData, isLoading: isLoadingModels } = useModels(actualBrandId);
  const { mutate: addVehicle, isPending: isAddingVehicle } = useAddVehicle();
  const { mutate: updateVehicle, isPending: isUpdatingVehicle } = useUpdateVehicle();

  const [formData, setFormData] = useState({
    id: isEdit ? tractor.id : Math.random().toString(36).substr(2, 9),
    brand: initialBrand,
    brandId: actualBrandId,
    model: isEdit ? tractor.model : (model || ''),
    modelId: actualModelId,
    registrationNo: isEdit ? tractor.registrationNo : '',
    yearOfManufacture: isEdit ? tractor.yearOfManufacture?.toString() : '',
    yearOfPurchase: isEdit ? tractor.yearOfPurchase?.toString() : '',
    tractorType: isEdit ? tractor.tractorType : 'agricultural',
    customBrand: isOthers ? '' : (brandName || ''),
    customModel: '',
  });

  const modelOptions = React.useMemo(() => {
    const data = modelsData?.data || modelsData?.models || [];
    return data.map((m: any) => ({ label: m.name, value: m.name, id: m._id || m.id }));
  }, [modelsData]);

  const handleInputChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    const payload = {
      brandId: formData.brandId,
      modelId: formData.modelId,
      registrationNo: formData.registrationNo,
      yearOfManufacture: parseInt(formData.yearOfManufacture),
      yearOfPurchase: parseInt(formData.yearOfPurchase),
      tractorType: formData.tractorType,
      customBrandName: formData.customBrand || '',
      customModelName: formData.model || '',
    };

    const onSuccessAction = () => {
      // Use pop to go back to MyTractors without pushing a new screen
      // If it's an edit, we came from MyTractors (pop 1)
      // If it's a new tractor, we came from MyTractors -> BrandSelection (pop 2)
      navigation.pop(isEdit ? 1 : 2);
    };

    if (isEdit) {
      updateVehicle({ vehicleId: tractor.id || tractor._id, data: payload }, {
        onSuccess: onSuccessAction
      });
    } else {
      addVehicle(payload, {
        onSuccess: onSuccessAction
      });
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <SecondaryHeader
          title={isEdit ? t('main.register.myTractorTitle', 'My Tractor') : t('main.register.addTractor', 'Add Tractor')}
          onBack={() => navigation.goBack()}
        />

        <KeyboardWrapper>
          <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
          >
            {!isOthers && (
              <View style={styles.topSection}>
                <View style={styles.largeImageContainer}>
                  {actualLogoUrl ? (
                    <Image
                      source={{ uri: actualLogoUrl }}
                      style={styles.largeLogo}
                      resizeMode="contain"
                    />
                  ) : (
                    <TractorImage width={90} height={90} />
                  )}
                </View>
                <View style={styles.brandInfo}>
                  <Text variant="bold" size={20} color={theme.colors.textPrimary}>
                    {initialBrand}
                  </Text>
                  <Text variant="medium" size={14} color={theme.colors.textSecondary} style={{ marginTop: 4 }}>
                    {formData.model}
                  </Text>
                </View>
              </View>
            )}

            <View style={styles.formCard}>
              {!isOthers && !isEdit && (
                <Dropdown
                  label={t('main.register.modelNameLabel', 'Model Name')}
                  required
                  options={modelOptions}
                  selectedValue={formData.model}
                  onSelect={(opt) => {
                    handleInputChange('model', opt.value);
                    handleInputChange('modelId', opt.id?.toString() || '');
                  }}
                  placeholder={t('main.register.placeholderModel', 'Select Model')}
                  leftIcon={<BikeIcon width={20} height={20} color={theme.colors.brandRed} />}
                  loading={isLoadingModels}
                />
              )}

              {isOthers && (
                <>
                  <Input
                    label={t('main.register.brandNameLabel', 'Brand Name')}
                    placeholder={t('main.register.placeholderBrandName', 'Enter brand name')}
                    value={formData.customBrand}
                    onChangeText={(val) => handleInputChange('customBrand', val)}
                    required
                  />
                  <Input
                    label={t('main.register.modelNameLabel', 'Model Name')}
                    placeholder={t('main.register.placeholderModelName', 'Enter model name')}
                    value={formData.model}
                    onChangeText={(val) => handleInputChange('model', val)}
                    required
                  />
                </>
              )}
              <Input
                label={t('main.register.registrationLabel', 'Registration No')}
                placeholder={t('main.register.placeholderRegistration')}
                value={formData.registrationNo}
                onChangeText={(val) => handleInputChange('registrationNo', val)}
                required
              />

              <Input
                label={t('main.register.manufactureYearLabel', 'Year of Manufacture')}
                placeholder={t('main.register.placeholderYearEntry')}
                keyboardType="number-pad"
                maxLength={4}
                value={formData.yearOfManufacture}
                onChangeText={(val) => handleInputChange('yearOfManufacture', val)}
                required
              />

              <Input
                label={t('main.register.purchaseYearLabel', 'Year of Purchase')}
                placeholder={t('main.register.placeholderYearEntry')}
                keyboardType="number-pad"
                maxLength={4}
                value={formData.yearOfPurchase}
                onChangeText={(val) => handleInputChange('yearOfPurchase', val)}
              />

              <View>
                <Text variant="semiBold" size={12} color={theme.colors.textPrimary} style={styles.label}>
                  {t('main.register.typeLabel', 'Type of Tractor')}
                  <Text style={{ color: theme.colors.error }}> *</Text>
                </Text>
                <TouchableOpacity
                  style={styles.typeTriggerButton}
                  onPress={() => setShowTypeSheet(true)}
                  activeOpacity={0.7}
                >
                  <Text variant="regular" size={14} style={styles.typeTriggerText}>
                    {formData.tractorType ? t(`main.register.${formData.tractorType}`) : 'Select type of tractor'}
                  </Text>
                  {/* <ChevronArrowIcon width={SW(15)} height={SW(15)} color={theme.colors.gray400} /> */}
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardWrapper>

        <ScreenFooter>
          <Button
            title={isEdit ? t('main.register.updateButton', 'Update Details') : t('main.register.addTractor', 'Add Tractor')}
            onPress={handleSave}
            loading={isAddingVehicle || isUpdatingVehicle}
            disabled={!formData.registrationNo || !formData.model || !formData.brand || (isOthers && !formData.customBrand)}
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

export default AddTractorDetails;

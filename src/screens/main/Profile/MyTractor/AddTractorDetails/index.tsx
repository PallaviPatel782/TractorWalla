import { SH, SW } from '@utils/Dimensions';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

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
  GlobalBottomSheet,
  Image,
} from '@components';
import { useAddVehicle, useModels } from '@screens/auth/hooks/useAuth';
import { useTheme } from '@theme';
import { createStyles } from './styles';
import { BikeIcon } from '@assets/icons';



const AddTractorDetails = ({ navigation, route }: any) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = createStyles(theme);
  const { brandId, brandName, model, tractor, logoUrl } = route.params || {};

  const isEdit = !!tractor;
  const initialBrand = isEdit ? tractor.brand : (brandName || 'Others');
  const isOthers = initialBrand === 'Others';

  const [showTypeSheet, setShowTypeSheet] = useState(false);

  const { data: modelsData, isLoading: isLoadingModels } = useModels(brandId);
  const { mutate: addVehicle, isPending: isAddingVehicle } = useAddVehicle();

  const [formData, setFormData] = useState({
    id: isEdit ? tractor.id : Math.random().toString(36).substr(2, 9),
    brand: initialBrand,
    brandId: brandId,
    model: isEdit ? tractor.model : (model || ''),
    modelId: '',
    registrationNo: isEdit ? tractor.registrationNo : '',
    yearOfManufacture: isEdit ? tractor.yearOfManufacture?.toString() : '',
    yearOfPurchase: isEdit ? tractor.yearOfPurchase?.toString() : '',
    tractorType: isEdit ? tractor.tractorType : 'agricultural',
  });

  const modelOptions = useMemo(() => {
    const data = modelsData?.data || modelsData?.models || [];
    return data.map((m: any) => ({ label: m.name, value: m.name, id: m._id || m.id }));
  }, [modelsData]);

  const handleInputChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    if (isEdit) {
      // For now, only supporting add via API. Update logic can be added later.
      navigation.goBack();
      return;
    }

    addVehicle({
      brandId: formData.brandId,
      modelId: formData.modelId,
      registrationNo: formData.registrationNo,
      yearOfManufacture: parseInt(formData.yearOfManufacture),
      yearOfPurchase: parseInt(formData.yearOfPurchase),
      tractorType: formData.tractorType,
    }, {
      onSuccess: () => {
        if (route.params?.isSelectionMode) {
          navigation.navigate('ServiceCheckout', {
            ...route.params,
            selectedTractor: formData
          });
        } else {
          navigation.navigate('MyTractors');
        }
      }
    });
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <SecondaryHeader
          title={isEdit ? t('main.register.myTractorTitle') : t('main.register.addTractor', 'Add Tractor')}
          onBack={() => navigation.goBack()}
        />

        <KeyboardWrapper>
          <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
          >
            <View style={{ gap: SH(16) }}>
              {!isOthers && (
                <View style={styles.brandDisplayContainer}>
                  <View style={styles.brandLogoBox}>
                    {logoUrl && (
                      <Image
                        source={{ uri: logoUrl }}
                        style={{ width: SW(40), height: SW(40) }}
                        resizeMode="contain"
                      />
                    )}
                  </View>
                  <Text variant="regular" size={16} style={styles.brandDisplayName}>
                    {initialBrand}
                  </Text>
                </View>
              )}

              {isEdit && (
                <View style={styles.tractorImageContainer}>
                  <Text variant="semiBold" size={18} color={theme.colors.gray900} style={{ marginTop: SH(10) }}>
                    {formData.brand}
                  </Text>
                  <Text variant="regular" size={14} color={theme.colors.gray500}>
                    {formData.model}
                  </Text>
                </View>
              )}

              {!isOthers && (
                <View>
                  <Dropdown
                    options={modelOptions}
                    selectedValue={formData.model}
                    onSelect={(opt) => {
                      handleInputChange('model', opt.value);
                      handleInputChange('modelId', opt.id?.toString() || '');
                    }}
                    placeholder={t('main.register.placeholderModel')}
                    leftIcon={<BikeIcon width={SW(24)} height={SW(24)} color={theme.colors.brandRed} />}
                    buttonStyle={styles.dropdownButton}
                    loading={isLoadingModels}
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
                title={isEdit ? t('main.register.updateButton') : t('main.register.addTractor', 'Add Tractor')}
                onPress={handleSave}
                loading={isAddingVehicle}
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

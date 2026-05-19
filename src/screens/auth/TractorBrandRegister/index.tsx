import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { useTheme } from '@theme';
import {
  Text,
  Button,
  Input,
  SecondaryHeader,
  ScreenWrapper,
  View,
  TouchableOpacity,
  Dropdown,
  ScrollView,
  GlobalBottomSheet,
  Image,
  ScreenFooter,
} from '@components';
import { useAddVehicle, useModels } from '@screens/auth/hooks/useAuth';
import { useAuthStore } from '@store/useAuthStore';
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

  const yearErrors = useMemo(() => {
    const currentYear = new Date().getFullYear();
    let mError = '';
    let pError = '';

    const mYear = parseInt(formData.yearOfManufacture);
    const pYear = parseInt(formData.yearOfPurchase);

    if (formData.yearOfManufacture.length > 0) {
      if (formData.yearOfManufacture.length < 4) {
        mError = t('main.register.errorManufactureIncomplete', 'Year must be 4 digits');
      } else {
        if (isNaN(mYear) || mYear > currentYear) {
          mError = t('main.register.errorManufactureFuture', 'Manufacture year cannot be in the future');
        } else if (mYear < 1900) {
          mError = t('main.register.errorManufactureTooOld', 'Enter a valid year (1900 or later)');
        }
      }
    }

    if (formData.yearOfPurchase.length > 0) {
      if (formData.yearOfPurchase.length < 4) {
        pError = t('main.register.errorPurchaseIncomplete', 'Year must be 4 digits');
      } else {
        if (isNaN(pYear) || pYear > currentYear) {
          pError = t('main.register.errorPurchaseFuture', 'Purchase year cannot be in the future');
        } else if (pYear < 1900) {
          pError = t('main.register.errorPurchaseTooOld', 'Enter a valid year (1900 or later)');
        } else if (!isNaN(mYear) && pYear < mYear) {
          pError = t('main.register.errorPurchaseBeforeManufacture', 'Purchase year cannot be earlier than manufacture year');
        }
      }
    }

    return {
      manufactureError: mError,
      purchaseError: pError,
      hasErrors: !!mError || !!pError
    };
  }, [formData.yearOfManufacture, formData.yearOfPurchase, t]);

  const handleInputChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleContinue = () => {
    if (yearErrors.hasErrors) return;
    addVehicle({
      brandId: brandId,
      modelId: formData.modelId,
      registrationNo: formData.registrationNo.trim(),
      yearOfManufacture: parseInt(formData.yearOfManufacture),
      yearOfPurchase: parseInt(formData.yearOfPurchase),
      tractorType: formData.tractorType,
      customBrandName: (formData.customBrand || '').trim(),
      customModelName: (formData.model || '').trim(),
    }, {
      onSuccess: (response: any) => {
        const state = useAuthStore.getState();
        const user = state.user;
        if (user?._id) {
          const newVehicle = response?.vehicle || response?.data?.vehicle;
          state.setUser({
            ...user,
            onboardingCompleted: true,
            tractors: newVehicle ? [...(user.tractors || []), newVehicle] : (user.tractors || []),
          });
        }
      }
    });
  };







  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <SecondaryHeader title={t('main.register.title')} onBack={() => navigation.goBack()} />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
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
                />

                <Input
                  label={t('main.register.manufactureYearLabel')}
                  placeholder={t('main.register.placeholderYearEntry')}
                  keyboardType="number-pad"
                  maxLength={4}
                  value={formData.yearOfManufacture}
                  onChangeText={(val) => handleInputChange('yearOfManufacture', val)}
                  error={yearErrors.manufactureError}
                  required
                />

                <Input
                  label={t('main.register.purchaseYearLabel')}
                  placeholder={t('main.register.placeholderYearEntry')}
                  keyboardType="number-pad"
                  maxLength={4}
                  value={formData.yearOfPurchase}
                  onChangeText={(val) => handleInputChange('yearOfPurchase', val)}
                  error={yearErrors.purchaseError}
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

          <ScreenFooter>
            <Button
              title={isOthers ? t('main.register.button') : t('common.continue')}
              onPress={handleContinue}
              loading={isAddingVehicle}
              disabled={!formData.model || (isOthers && !formData.customBrand) || yearErrors.hasErrors || !formData.yearOfManufacture}
            />
          </ScreenFooter>
        </KeyboardAvoidingView>


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
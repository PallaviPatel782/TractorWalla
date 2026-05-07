import React, { useState, useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  ScreenWrapper,
  SecondaryHeader,
  Dropdown,
  Input,
  Button,
  ScrollView,
  KeyboardWrapper,
  GlobalBottomSheet,
  ScreenFooter,
} from '@components';
import { useTheme } from '@theme';
import { createStyles } from './styles';
import { useTranslation } from 'react-i18next';
import CustomDatePickerModal from '@components/DatePicker';
import { useModels } from '@screens/auth/hooks/useAuth';
import { ActivityIndicator, Image as RNImage } from 'react-native';
import { Model } from '@appTypes/api.types';
import { BikeIcon } from '@assets/icons';
import { useCreateTractorLead } from '../../hooks/useTractorLead';

const SelectTractorScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = createStyles(theme);

  const { brand, brandLogo, type, brandId } = route.params || {};

  const [selectedModel, setSelectedModel] = useState('');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [tractorType, setTractorType] = useState(type === 'New Tractor' ? 'agricultural' : 'commercial');
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [showTypeSheet, setShowTypeSheet] = useState(false);
  const isOthers = brand === 'Others';
  const [customBrand, setCustomBrand] = useState('');
  const [customModel, setCustomModel] = useState('');
  const [city, setCity] = useState('');

  const { mutate: createLead, isPending: isSubmitting } = useCreateTractorLead();

  const { data: modelsData, isLoading: isModelsLoading } = useModels(brandId);
  const modelOptions = useMemo(() => {
    const list: Model[] = modelsData?.data || modelsData?.models || [];
    return list.map((m) => ({ label: m.name, value: m.name }));
  }, [modelsData]);

  const handleSubmit = () => {
    const payload = {
      purchaseKind: type === 'New Tractor' ? 'new' : 'old',
      brandName: isOthers ? customBrand : brand,
      modelName: isOthers ? customModel : selectedModel,
      name: name,
      contactNumber: contact,
      wantToBuyDate: date ? date.toISOString().split('T')[0] : '',
      tractorType: tractorType,
      city: city,
    };

    createLead(payload, {
      onSuccess: () => {
        navigation.popToTop();
      },
    });
  };

  return (
    <ScreenWrapper>
      <View style={styles.root}>
        <SecondaryHeader
          title={t('main.home.selectYourTractor', 'Select Your Tractor')}
          onBack={() => navigation.goBack()}
        />

        <KeyboardWrapper>
          <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
            {!isOthers && (
              <View style={styles.brandDisplayContainer}>
                <View style={styles.brandLogoBox}>
                  {brandLogo ? (
                    <RNImage source={{ uri: brandLogo }} style={{ width: 60, height: 60 }} resizeMode="contain" />
                  ) : (
                    <Text style={{ fontSize: 40 }}>🚜</Text>
                  )}
                </View>
                <View style={styles.brandInfo}>
                  <Text variant="bold" size={18} style={styles.brandDisplayName}>
                    {brand}
                  </Text>
                  <Text variant="regular" size={14} color={theme.colors.gray500}>
                    {t(`main.home.${type === 'New Tractor' ? 'newTractor' : 'oldTractor'}`, { defaultValue: type }) as string}
                  </Text>
                </View>
              </View>
            )}

            <View style={{ gap: 16, marginTop: 10 }}>
              {!isOthers && (
                isModelsLoading ? (
                  <ActivityIndicator color={theme.colors.brandRed} />
                ) : (
                  <Dropdown
                    options={modelOptions}
                    selectedValue={selectedModel}
                    onSelect={(item) => setSelectedModel(item.value)}
                    buttonStyle={styles.dropdownButton}
                    placeholder={t('main.home.selectModel', 'Select Model')}
                    leftIcon={<BikeIcon width={20} height={20} color={theme.colors.brandRed} />}
                  />
                )
              )}

              <View style={styles.formContainer}>
                {!isOthers && (
                  <Text variant="medium" size={14} color={theme.colors.textPrimary} style={{ marginBottom: 16 }}>
                    {t('common.generalInquiry')}
                  </Text>
                )}
                {isOthers && (
                  <View>
                    <Input
                      label={t('main.register.brandNameLabel', 'Brand Name')}
                      placeholder={t('main.register.placeholderBrandName', 'Enter brand name')}
                      value={customBrand}
                      onChangeText={setCustomBrand}
                      required
                    />
                    <Input
                      label={t('main.register.modelNameLabel', 'Model Name')}
                      placeholder={t('main.register.placeholderModelName', 'Enter model name')}
                      value={customModel}
                      onChangeText={setCustomModel}
                      required
                    />
                  </View>
                )}

                <Input
                  label={t('common.name', 'Name')}
                  placeholder={t('common.enterName', 'Enter name')}
                  value={name}
                  onChangeText={setName}
                  required
                />

                <Input
                  label={t('common.contactNumber', 'Contact Number')}
                  placeholder="+91- 123456789"
                  value={contact}
                  onChangeText={setContact}
                  keyboardType="phone-pad"
                  required
                />

                <Input
                  label={t('common.city', 'City')}
                  placeholder={t('common.enterCity', 'Enter city')}
                  value={city}
                  onChangeText={setCity}
                  required
                />

                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setIsDatePickerVisible(true)}
                >
                  <View pointerEvents="none">
                    <Input
                      label={t('main.home.whenDoYouWantToBuy', 'When do you want to buy')}
                      placeholder={t('common.addDate', 'Add Date')}
                      value={date ? date.toDateString() : ''}
                      required
                      leftIcon={<Text>📅</Text>}
                    />
                  </View>
                </TouchableOpacity>

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
                      {t(`main.register.${tractorType}`, tractorType)}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

          </ScrollView>
        </KeyboardWrapper>

        <ScreenFooter>
          <Button
            title={t('common.submit', 'Submit')}
            onPress={handleSubmit}
            disabled={(isOthers ? (!customBrand || !customModel) : !selectedModel) || !name || !contact || !date || !city}
            loading={isSubmitting}
          />
        </ScreenFooter>


        <GlobalBottomSheet
          visible={showTypeSheet}
          onClose={() => setShowTypeSheet(false)}
          title="Select Type of Tractor"
        >
          {['commercial', 'agricultural'].map((typeKey) => {
            const isActive = tractorType === typeKey;
            return (
              <TouchableOpacity
                key={typeKey}
                style={styles.bottomSheetItem}
                onPress={() => {
                  setTractorType(typeKey);
                  setShowTypeSheet(false);
                }}
                activeOpacity={0.7}
              >
                <Text
                  variant="regular"
                  size={14}
                  style={isActive ? styles.bottomSheetItemTextActive : styles.bottomSheetItemText}
                >
                  {t(`main.register.${typeKey}`, typeKey)}
                </Text>
                <View style={[styles.radioCircle, isActive && styles.radioCircleActive]}>
                  {isActive && <View style={styles.radioInner} />}
                </View>
              </TouchableOpacity>
            );
          })}
        </GlobalBottomSheet>

        <CustomDatePickerModal
          visible={isDatePickerVisible}
          onClose={() => setIsDatePickerVisible(false)}
          mode="single"
          onApply={(start) => setDate(start)}
          minDate={new Date()}
        />
      </View>
    </ScreenWrapper>
  );
};

export default SelectTractorScreen;

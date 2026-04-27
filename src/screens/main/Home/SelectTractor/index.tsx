import React, { useState, useMemo } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
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
} from '@components';
import { useTheme } from '@theme';
import { createStyles } from './styles';
import { useTranslation } from 'react-i18next';
import { SW, SH } from '@utils/Dimensions';
import CustomDatePickerModal from '@components/DatePicker';
import { useModels } from '@screens/auth/hooks/useAuth';
import { ActivityIndicator, Image as RNImage } from 'react-native';
import { Model } from '@appTypes/api.types';

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

  const { data: modelsData, isLoading: isModelsLoading } = useModels(brandId);
  const modelOptions = useMemo(() => {
    const list: Model[] = modelsData?.data || modelsData?.models || [];
    return list.map((m) => ({ label: m.name, value: m.name }));
  }, [modelsData]);

  const handleSubmit = () => {
    Alert.alert('Inquiry Submitted Successfully!');
    navigation.popToTop();
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
            <View style={styles.brandDisplayContainer}>
              <View style={styles.brandLogoBox}>
                {brandLogo ? (
                  <RNImage source={{ uri: brandLogo }} style={{ width: SW(44), height: SW(44) }} resizeMode="contain" />
                ) : (
                  <Text>🚜</Text>
                )}
              </View>
              <Text variant="regular" size={16} style={styles.brandDisplayName}>
                {brand}
              </Text>
            </View>

            <View style={{ gap: SH(16), marginTop: SH(10) }}>
              {isModelsLoading ? (
                <ActivityIndicator color={theme.colors.brandRed} />
              ) : (
                <Dropdown
                  options={modelOptions}
                  selectedValue={selectedModel}
                  onSelect={(item) => setSelectedModel(item.value)}
                  buttonStyle={styles.dropdownButton}
                  placeholder={t('main.home.selectModel', 'Select Model')}
                />
              )}

              <View style={styles.formContainer}>
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

                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setIsDatePickerVisible(true)}
                >
                  <View pointerEvents="none">
                    <Input
                      label={t('main.home.whenYouWannaBuy', 'When you wanna buy')}
                      placeholder={t('common.addDate', 'Add Date')}
                      value={date ? date.toDateString() : ''}
                      required
                      leftIcon={<Text>📅</Text>}
                    />
                  </View>
                </TouchableOpacity>

                <View>
                  <Text variant="medium" size={14} style={styles.label}>
                    {t('main.register.typeLabel', 'Type of Tractor')}
                  </Text>
                  <TouchableOpacity
                    style={styles.typeTriggerButton}
                    onPress={() => setShowTypeSheet(true)}
                    activeOpacity={0.7}
                  >
                    <Text variant="regular" size={13} style={styles.typeTriggerText}>
                      {t(`main.register.${tractorType}`, tractorType)}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <Button
              title={t('main.home.addTractor', 'Add Tractor')}
              onPress={handleSubmit}
              disabled={!selectedModel || !name || !contact || !date}
              style={styles.submitButton}
            />
          </ScrollView>
        </KeyboardWrapper>

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
        />
      </View>
    </ScreenWrapper>
  );
};

export default SelectTractorScreen;

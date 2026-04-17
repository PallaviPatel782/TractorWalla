import React, { useState } from 'react';
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
  ScrollView,
} from '@components';
import { useAppDispatch } from '@store';
import { updateUser } from '@store/slices/authSlice';
import { createStyles } from './styles';
import { UserIcon } from '@icons';

const ProfileDetails = ({ navigation, route }: any) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = createStyles(theme);

  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    fullName: '',
    emailId: '',
    address: '',
    state: '',
    pincode: '',
  });

  React.useEffect(() => {
    if (route.params?.location) {
      const loc = route.params.location;
      setFormData(prev => ({
        ...prev,
        address: loc.fullAddress || '',
        state: loc.state || '',
      }));
    }
  }, [route.params?.location]);

  const handleInputChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    dispatch(updateUser({
      name: formData.fullName,
      email: formData.emailId,
      address: formData.address,
      state: formData.state,
      pincode: formData.pincode,
    }));
    navigation.navigate('TractorBrand');
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <SecondaryHeader title={t('main.profileDetails.title')} onBack={() => navigation.goBack()} />

        <View style={styles.headerBanner}>
          <View style={styles.headerIconContainer}>
            <UserIcon size={14} color={theme.colors.white} />
          </View>
          <Text variant="regular" size={14} style={styles.headerBannerText}>
            {t('main.profileDetails.setupTitle')}
          </Text>
        </View>

        <KeyboardWrapper>
          <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.formContainer}>
              <Input
                label={t('main.profileDetails.fullName')}
                placeholder={t('main.profileDetails.placeholderName')}
                value={formData.fullName}
                onChangeText={(val) => handleInputChange('fullName', val)}
              />

              <Input
                label={t('main.profileDetails.email')}
                placeholder={t('main.profileDetails.placeholderEmail')}
                keyboardType="email-address"
                autoCapitalize="none"
                value={formData.emailId}
                onChangeText={(val) => handleInputChange('emailId', val)}
              />

              <Input
                label={t('main.profileDetails.permanentAddress')}
                placeholder={t('main.profileDetails.placeholderAddress')}
                multiline
                value={formData.address}
                onChangeText={(val) => handleInputChange('address', val)}
              />


              <Input
                label={t('main.profileDetails.stateLabel')}
                placeholder={t('main.profileDetails.placeholderState')}
                value={formData.state}
                onChangeText={(val) => handleInputChange('state', val)}
              />

              <Input
                label={t('main.profileDetails.pincodeLabel')}
                placeholder={t('main.profileDetails.placeholderPincode')}
                keyboardType="number-pad"
                maxLength={6}
                value={formData.pincode}
                onChangeText={(val) => handleInputChange('pincode', val)}
              />

            </View>

            <Button
              title={t('common.submit')}
              onPress={handleSubmit}
              style={styles.button}
            // disabled={!formData.fullName || !formData.address || !formData.state || !formData.pincode}
            />
          </ScrollView>
        </KeyboardWrapper>
      </View>
    </ScreenWrapper>
  );
};

export default ProfileDetails;



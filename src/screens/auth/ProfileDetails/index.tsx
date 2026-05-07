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
  ScreenFooter,
} from '@components';
import { useUpdateProfile } from '@screens/auth/hooks/useAuth';
import { createStyles } from './styles';
import { UserIcon } from '@icons';

const ProfileDetails = ({ navigation, route }: any) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = createStyles(theme);
  const [formData, setFormData] = useState({
    fullName: '',
    emailId: '',
    address: '',
    state: '',
    pincode: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const handleInputChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));

    // Clear error for this field as soon as user starts typing
    if (errors[key]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[key];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = t('main.profileDetails.errorName');
    }

    if (formData.emailId.trim()) {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(formData.emailId)) {
        newErrors.emailId = t('main.profileDetails.errorEmail');
      }
    }

    if (!formData.address.trim()) {
      newErrors.address = t('main.profileDetails.errorAddress');
    }

    if (!formData.state.trim()) {
      newErrors.state = t('main.profileDetails.errorState');
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = t('main.profileDetails.errorPincode');
    } else if (formData.pincode.length !== 6) {
      newErrors.pincode = t('main.profileDetails.errorPincodeLength');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) {
      return;
    }

    updateProfile({
      name: formData.fullName,
      email: formData.emailId,
      address: formData.address,
      state: formData.state,
      pincode: formData.pincode,
    }, {
      onSuccess: () => {
        navigation.navigate('TractorBrand');
      }
    });
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
          <View style={styles.content}>
            <View style={styles.formContainer}>
              <Input
                label={t('main.profileDetails.fullName')}
                placeholder={t('main.profileDetails.placeholderName')}
                value={formData.fullName}
                onChangeText={(val) => handleInputChange('fullName', val)}
                error={errors.fullName}
                required
              />

              <Input
                label={t('main.profileDetails.email')}
                placeholder={t('main.profileDetails.placeholderEmail')}
                keyboardType="email-address"
                autoCapitalize="none"
                value={formData.emailId}
                onChangeText={(val) => handleInputChange('emailId', val)}
                error={errors.emailId}
              />

              <Input
                label={t('main.profileDetails.permanentAddress')}
                placeholder={t('main.profileDetails.placeholderAddress')}
                multiline
                value={formData.address}
                onChangeText={(val) => handleInputChange('address', val)}
                error={errors.address}
                required
              />

              <Input
                label={t('main.profileDetails.stateLabel')}
                placeholder={t('main.profileDetails.placeholderState')}
                value={formData.state}
                onChangeText={(val) => handleInputChange('state', val)}
                error={errors.state}
                required
              />

              <Input
                label={t('main.profileDetails.pincodeLabel')}
                placeholder={t('main.profileDetails.placeholderPincode')}
                keyboardType="number-pad"
                maxLength={6}
                value={formData.pincode}
                onChangeText={(val) => handleInputChange('pincode', val)}
                error={errors.pincode}
                required
              />
            </View>
          </View>
        </KeyboardWrapper>

        <ScreenFooter>
          <Button
            title={t('common.submit')}
            onPress={handleSubmit}
            loading={isPending}
          />
        </ScreenFooter>
      </View>
    </ScreenWrapper>
  );
};


export default ProfileDetails;



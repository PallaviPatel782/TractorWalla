import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { useTheme } from '@theme';
import {
  Text,
  Button,
  Input,
  SecondaryHeader,
  ScreenWrapper,
  KeyboardWrapper,
  View,
} from '@components';
import { useAppDispatch } from '@store';
import { updateUser } from '@store/slices/authSlice';
import { createStyles } from './ProfileDetails.styles';
import { UserIcon } from '@icons';

const ProfileDetails = ({ navigation, route }: any) => {
  const { theme } = useTheme();
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
        <SecondaryHeader title="Profile Details" onBack={() => navigation.goBack()} />

        <View style={styles.headerBanner}>
          <View style={styles.headerIconContainer}>
            <UserIcon size={14} color={theme.colors.white} />
          </View>
          <Text variant="regular" size={14} style={styles.headerBannerText}>
            Setup Your Profile Details
          </Text>
        </View>

        <KeyboardWrapper>
          <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.formContainer}>
              <Input
                label="Full Name*"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChangeText={(val) => handleInputChange('fullName', val)}
              />

              <Input
                label="Email ID"
                placeholder="Enter email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={formData.emailId}
                onChangeText={(val) => handleInputChange('emailId', val)}
              />

              <Input
                label="Permanent Address*"
                placeholder="Enter address"
                multiline
                value={formData.address}
                onChangeText={(val) => handleInputChange('address', val)}
              />


              <Input
                label="State*"
                placeholder="Enter state"
                value={formData.state}
                onChangeText={(val) => handleInputChange('state', val)}
              />

              <Input
                label="Pincode*"
                placeholder="Enter pincode"
                keyboardType="number-pad"
                maxLength={6}
                value={formData.pincode}
                onChangeText={(val) => handleInputChange('pincode', val)}
              />

            </View>

            <Button
              title="SUBMIT"
              onPress={handleSubmit}
              style={styles.button}
              disabled={!formData.fullName || !formData.address || !formData.state || !formData.pincode}
            />
          </ScrollView>
        </KeyboardWrapper>
      </View>
    </ScreenWrapper>
  );
};

export default ProfileDetails;



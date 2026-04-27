import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@theme';
import { Text, SecondaryHeader, ScreenWrapper, Input, Button, View, ScrollView, TouchableOpacity } from '@components';
import { createStyles } from './styles';
import { EditIcon, UserIcon } from '@assets/icons';
import { SW } from '@utils/Dimensions';
import { launchImageLibrary } from 'react-native-image-picker';
import { useAuthStore } from '@store/useAuthStore';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/NavigationTypes';

import { useUpdateProfile } from '@screens/auth/hooks/useAuth';

type Props = NativeStackScreenProps<RootStackParamList, 'UpdateProfile'>;

const UpdateProfileScreen = ({ navigation }: Props) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = createStyles(theme);
  const user = useAuthStore((state) => state.user);
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const [fullName, setFullName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  // Using a separate state for local profile image URI, or we could extend the User type later
  const [profileImage, setProfileImage] = useState(user?.profileImage || '');

  const handleUpdate = () => {
    updateProfile({
      name: fullName,
      email: email,
      // address, state, pincode can be added if needed, or fetched from user object
      address: user?.address || '',
      state: user?.state || '',
      pincode: user?.pincode || '',
    }, {
      onSuccess: () => {
        navigation.goBack();
      }
    });
  };

  const handlePickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
      includeBase64: false,
    });

    if (result.assets && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri || '');
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <SecondaryHeader
          title={t('main.profile.updateProfile.title')}
          onBack={() => navigation.goBack()}
        />

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.avatarContainer}>
              {profileImage ? (
                <Image
                  source={{ uri: profileImage }}
                  style={styles.avatarImage}
                />
              ) : (
                <View style={[styles.avatarImage, { alignItems: 'center', justifyContent: 'center' }]}>
                  <UserIcon size={SW(45)} color={theme.colors.black} />
                </View>
              )}
              <TouchableOpacity
                style={styles.editBadge}
                activeOpacity={0.8}
                onPress={handlePickImage}
              >
                <EditIcon size={SW(14)} color={theme.colors.white} />
              </TouchableOpacity>
            </View>

            <View style={styles.formContainer}>
              <View>
                <View style={styles.inputLabelRow}>
                  <Text style={styles.inputLabel}>{t('main.profile.updateProfile.fullName')}</Text>
                  <Text style={styles.asterisk}>*</Text>
                </View>
                <Input
                  placeholder={t('main.profile.updateProfile.placeholderName')}
                  value={fullName}
                  onChangeText={setFullName}
                />
              </View>

              <View>
                <View style={styles.inputLabelRow}>
                  <Text style={styles.inputLabel}>{t('main.profile.updateProfile.email')}</Text>
                </View>
                <Input
                  placeholder={t('main.profile.updateProfile.placeholderEmail')}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <Button
              title={t('main.profile.updateProfile.button')}
              onPress={handleUpdate}
              loading={isPending}
              style={styles.updateButton}
              disabled={!fullName.trim()}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </ScreenWrapper>
  );
};

export default UpdateProfileScreen;

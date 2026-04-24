import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@theme';
import { Text, SecondaryHeader, ScreenWrapper, Input, Button, View, ScrollView, TouchableOpacity } from '@components';
import { createStyles } from './styles';
import { EditIcon, UserIcon } from '@assets/icons';
import { SW } from '@utils/Dimensions';
import { launchImageLibrary } from 'react-native-image-picker';
import { useAppSelector } from '@store';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/NavigationTypes';

type Props = NativeStackScreenProps<RootStackParamList, 'UpdateProfile'>;

const UpdateProfileScreen = ({ navigation }: Props) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = createStyles(theme);
  const { user } = useAppSelector((state) => state.auth);

  const [fullName, setFullName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [profileImage, setProfileImage] = useState(user?.profileImage || '');

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
                  <UserIcon size={SW(45)} color={theme.colors.gray400} />
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
              onPress={() => navigation.goBack()}
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

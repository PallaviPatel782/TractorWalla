import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform } from 'react-native';
import { Input } from '@components';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@theme';
import { Text, ScreenWrapper, View, ScrollView, TouchableOpacity, GlobalBottomSheet, ScreenFooter } from '@components';
import { createStyles } from './styles';
import { CameraIcon, UserIcon, DeleteIcon } from '@assets/icons';
import { launchImageLibrary } from 'react-native-image-picker';
import { useAuthStore } from '@store/useAuthStore';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/NavigationTypes';
import { useUpdateProfile } from '@screens/auth/hooks/useAuth';
import LinearGradient from 'react-native-linear-gradient';
import { SecondaryHeader } from '@components';
import { useSnackbarStore } from '@store/useSnackbarStore';
type Props = NativeStackScreenProps<RootStackParamList, 'UpdateProfile'>;

const UpdateProfileScreen = ({ navigation }: Props) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = createStyles(theme);
  const user = useAuthStore((state) => state.user);
  const { mutate: updateProfile, isPending } = useUpdateProfile();
  const showSnackbar = useSnackbarStore(state => state.showSnackbar);

  const [fullName, setFullName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [profileImage, setProfileImage] = useState(user?.profileImage || '');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleUpdate = () => {
    updateProfile({
      name: fullName,
      email: email,
      address: user?.address || '',
      state: user?.state || '',
      pincode: user?.pincode || '',
    }, {
      onSuccess: (response: any) => {
        showSnackbar({
          type: 'success',
          title: 'Success',
          description: response.message || response.data?.message || 'Profile updated successfully'
        });
        navigation.goBack();
      },
      onError: (error: any) => {
        showSnackbar({
          type: 'error',
          title: 'Error',
          description: error.message || 'Failed to update profile'
        });
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
    <ScreenWrapper withBottomInset={false} style={styles.container}>
      <LinearGradient
        colors={['#FFF5F5', '#F0FFF4', '#EBF5FF']}
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Header */}
        <SecondaryHeader
          title={t('main.profile.updateProfile.title')}
          onBack={() => navigation.goBack()}
          backgroundColor={theme.colors.DeepGreen}
          titleColor={theme.colors.white}
        />

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
          >
            {/* Profile Banner Background */}
            <View style={styles.profileBanner} />

            {/* Avatar Section */}
            <View style={styles.avatarSection}>
              <View style={styles.avatarWrapper}>
                {profileImage ? (
                  <Image
                    source={{ uri: profileImage }}
                    style={styles.avatarImage}
                  />
                ) : (
                  <View style={[styles.avatarImage, { alignItems: 'center', justifyContent: 'center' }]}>
                    <UserIcon size={45} color={theme.colors.gray300} />
                  </View>
                )}
                <TouchableOpacity
                  style={styles.editBadge}
                  activeOpacity={0.8}
                  onPress={handlePickImage}
                >
                  <CameraIcon size={14} color={theme.colors.white} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Form Card */}
            <View style={styles.formCard}>
              <Input
                label={t('main.profile.updateProfile.fullName')}
                placeholder={t('main.profile.updateProfile.placeholderName')}
                value={fullName}
                onChangeText={setFullName}

              />

              <Input
                label={t('main.profile.updateProfile.phone') || 'Phone'}
                value={user?.phone || '0000-0000-00'}
                editable={false}
                inputStyle={{ color: theme.colors.textMuted }}
              />

              <Input
                label={t('main.profile.updateProfile.email')}
                placeholder={t('main.profile.updateProfile.placeholderEmail')}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        <ScreenFooter containerStyle={styles.footer}>
          <TouchableOpacity
            style={[styles.saveButton, { opacity: isPending || !fullName.trim() ? 0.7 : 1 }]}
            onPress={handleUpdate}
            disabled={isPending || !fullName.trim()}
            activeOpacity={0.8}
          >
            <Text style={styles.saveButtonText}>{t('main.profile.updateProfile.button')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            activeOpacity={0.8}
            onPress={() => setShowDeleteModal(true)}
          >
            <Text style={styles.deleteButtonText}>{t('main.profile.updateProfile.deleteAccount') || 'Delete Account'}</Text>
          </TouchableOpacity>
        </ScreenFooter>


        {/* Delete Confirmation Bottom Sheet */}
        <GlobalBottomSheet
          visible={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          title={t('main.profile.updateProfile.deleteAccount') || 'Delete Account'}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalIcon}>
              <DeleteIcon size={30} color={theme.colors.error} />
            </View>
            <Text variant="semiBold" size={18} color={theme.colors.textPrimary} style={styles.modalTitle}>
              {t('main.profile.updateProfile.areYouSure') || 'Are you sure?'}
            </Text>
            <Text variant="regular" size={14} color={theme.colors.textMuted} style={styles.modalDesc}>
              {t('main.profile.updateProfile.deleteDesc') || 'This action is permanent and will remove all your data, bookings, and vehicle information.'}
            </Text>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.confirmDeleteBtn}
                activeOpacity={0.8}
                onPress={() => {
                  setShowDeleteModal(false);
                  // Handle deletion logic
                }}
              >
                <Text variant="semiBold" size={16} color={theme.colors.white}>
                  {t('main.profile.updateProfile.confirmDelete') || 'Confirm Delete'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelBtn}
                activeOpacity={0.8}
                onPress={() => setShowDeleteModal(false)}
              >
                <Text variant="medium" size={16} color={theme.colors.textPrimary}>
                  {t('common.cancel') || 'Cancel'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </GlobalBottomSheet>
      </LinearGradient>
    </ScreenWrapper>
  );
};

export default UpdateProfileScreen;

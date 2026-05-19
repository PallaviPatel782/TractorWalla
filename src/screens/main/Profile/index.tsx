import React, { useEffect } from 'react';
import { StyleSheet, Image } from 'react-native';
import {
  Text,
  View,
  ScreenWrapper,
  TouchableOpacity,
  ProfileOptionItem,
  ScrollView,
} from '@components';
import { useAuthStore } from '@store/useAuthStore';
import { createStyles } from './styles';
import {
  AboutIcon,
  FaqIcon,
  FeedbackIcon,
  LogoutIcon,
  ReportIcon,
  ChangelanguageIcon,
  BookingIcon,
  InstagramIcon,
  FacebookIcon,
  YoutubeIcon,
  ThreadsIcon,
  LocationEditIcon,
  UserIcon,
  ChevronBackwardIcon,
  BikeIcon
} from '@assets/icons';
import { useTranslation } from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@theme';

import { useGetProfile } from '../hooks/useProfile';

const ProfileScreen = ({ navigation }: any) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = createStyles(theme);
  const user = useAuthStore(state => state.user) as any;
  const logout = useAuthStore(state => state.logout);

  const { data: profileData } = useGetProfile();
  const userProfile = (profileData as any)?.profile || (profileData as any)?.data?.profile || user;

  useEffect(() => {
    const freshUser = (profileData as any)?.profile || (profileData as any)?.data?.profile;
    if (freshUser) {
      useAuthStore.getState().updateUser({ ...freshUser, _id: freshUser.id || freshUser._id });
    }
  }, [profileData]);

  const getAbsoluteUrl = (url: string | null | undefined) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('file://')) {
      return url;
    }
    const baseUrl = 'https://tractorwalla-backend.onrender.com';
    return url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`;
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <ScreenWrapper withBottomInset={false}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        {/* Profile Section */}
        <View style={styles.profileHeader}>
          <TouchableOpacity
            style={styles.profileSection}
            onPress={() => navigation.navigate('UpdateProfile')}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={[theme.colors.authGradientStart, theme.colors.authGradientEnd]}
              style={StyleSheet.absoluteFill}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
            <View style={styles.imageContainer}>
              <View style={styles.avatarPlaceholder}>
                {userProfile?.profilePhotoUrl || userProfile?.profileImage ? (
                  <Image
                    source={{ uri: getAbsoluteUrl(userProfile.profilePhotoUrl || userProfile.profileImage) }}
                    style={{ width: 54, height: 54, borderRadius: 27 }}
                    resizeMode="cover"
                  />
                ) : (
                  <UserIcon size={35} color={theme.colors.DeepGreen} />
                )}
              </View>
            </View>
            <View style={styles.userInfo}>
              <Text variant="medium" size={18} color={theme.colors.textPrimary} style={styles.userName}>
                {userProfile?.name || 'User'}
              </Text>

              <Text variant="regular" size={14} color={theme.colors.textMuted} style={styles.userEmail}>
                {userProfile?.phoneDisplay || userProfile?.phone || '+91 0000000000'}
              </Text>
            </View>
            <ChevronBackwardIcon
              size={24}
              color={theme.colors.textPrimary}
              style={{ transform: [{ rotate: '180deg' }] }}
            />
          </TouchableOpacity>
        </View>

        {/* My Tractor Button */}
        <TouchableOpacity
          style={styles.myTractorButton}
          onPress={() => navigation.navigate('MyTractors')}
          activeOpacity={0.9}
        >
          <View style={styles.myTractorContent}>
            <View style={styles.myTractorLeft}>
              <View style={styles.tractorIconContainer}>
                <BikeIcon size={20} color={theme.colors.brandRed} />
              </View>
              <Text variant="medium" size={14} color={theme.colors.textPrimary}>
                {t('main.profile.myTractor')}
              </Text>
            </View>
            <ChevronBackwardIcon
              size={22}
              color={theme.colors.gray400}
              style={{ transform: [{ rotate: '180deg' }] }}
            />
          </View>
        </TouchableOpacity>

        {/* Options Section */}
        <View style={styles.sectionContainer}>
          <Text variant="semiBold" size={14} style={styles.sectionTitle}>
            {t('main.profile.accountSettings') || 'Account Settings'}
          </Text>
          <ProfileOptionItem
            title={t('main.profile.manageAddress')}
            icon={<LocationEditIcon size={16} color={theme.colors.gray600} />}
            onPress={() => navigation.navigate('ManageAddress')}
          />
          <ProfileOptionItem
            title={t('main.profile.language')}
            icon={<ChangelanguageIcon size={16} color={theme.colors.gray600} />}
            onPress={() => navigation.navigate('ChooseLanguage')}
          />
          <ProfileOptionItem
            title={t('main.profile.myBookings')}
            icon={<BookingIcon size={16} color={theme.colors.gray600} />}
            onPress={() => navigation.navigate('Bookings')}
            showBorder={false}
          />
        </View>

        <View style={styles.sectionContainer}>
          <Text variant="semiBold" size={14} style={styles.sectionTitle}>
            {t('main.profile.more') || 'Support'}
          </Text>
          <ProfileOptionItem
            title={t('main.profile.about')}
            icon={<AboutIcon size={16} color={theme.colors.gray600} />}
            onPress={() => navigation.navigate('About')}
          />
          <ProfileOptionItem
            title={t('main.profile.faq') || 'FAQs'}
            icon={<FaqIcon size={16} color={theme.colors.gray600} />}
            onPress={() => navigation.navigate('FAQ')}
          />
          <ProfileOptionItem
            title={t('main.profile.sendFeedback')}
            icon={<FeedbackIcon size={16} color={theme.colors.gray600} />}
            onPress={() => navigation.navigate('SendFeedback')}
          />
          <ProfileOptionItem
            title={t('main.profile.reportIssue')}
            icon={<ReportIcon size={16} color={theme.colors.gray600} />}
            onPress={() => navigation.navigate('ReportIssue')}
          />
          <ProfileOptionItem
            title={t('main.profile.logout')}
            icon={<LogoutIcon size={16} color={theme.colors.error} />}
            onPress={handleLogout}
            showBorder={false}
          />
        </View>

        {/* Social Section */}
        <View style={styles.socialSection}>
          <Text variant="medium" size={14} color={theme.colors.textMuted} style={styles.socialTitle}>
            {t('main.profile.connectWithUs') || 'Connect With Us'}
          </Text>
          <View style={styles.socialIconsRow}>
            <TouchableOpacity style={styles.socialItem} activeOpacity={0.7}>
              <View style={styles.socialIconWrapper}>
                <InstagramIcon size={24} />
              </View>
              <Text variant="regular" size={11} color={theme.colors.textMuted}>
                {t('main.profile.instagram')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialItem} activeOpacity={0.7}>
              <View style={styles.socialIconWrapper}>
                <FacebookIcon size={24} />
              </View>
              <Text variant="regular" size={11} color={theme.colors.textMuted}>
                {t('main.profile.facebook')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialItem} activeOpacity={0.7}>
              <View style={styles.socialIconWrapper}>
                <YoutubeIcon size={24} />
              </View>
              <Text variant="regular" size={11} color={theme.colors.textMuted}>
                {t('main.profile.youtube')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialItem} activeOpacity={0.7}>
              <View style={styles.socialIconWrapper}>
                <ThreadsIcon size={24} />
              </View>
              <Text variant="regular" size={11} color={theme.colors.textMuted}>
                {t('main.profile.threads')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </ScreenWrapper>
  );
};

export default ProfileScreen;

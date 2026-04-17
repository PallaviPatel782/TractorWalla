import React from 'react';
import { Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@theme';
import {
  Text,
  View,
  ScreenWrapper,
  TouchableOpacity,
  ProfileOptionItem,
  SecondaryHeader,
  ScrollView,
} from '@components';
import { useAppSelector, useAppDispatch } from '@store';
import { logout } from '@store/slices/authSlice';
import { createStyles } from './styles';
import {
  EditIcon,
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
  ChevronBackwardIcon,
  BikeIcon,
  LocationEditIcon
} from '@assets/icons';
import { SW, SH } from '@utils/Dimensions';

const ProfileScreen = ({ navigation }: any) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = createStyles(theme);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigation.replace('Auth');
  };

  const renderSocialIcon = (Icon: any, label: string) => (
    <View style={styles.socialItem}>
      <View style={styles.socialIconWrapper}>
        <Icon size={24} />
      </View>
      <Text variant="regular" size={12} color={theme.colors.gray600}>
        {label}
      </Text>
    </View>
  );

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <SecondaryHeader
          title={t('main.profile.title')}
          onBack={() => navigation.goBack()}
        />
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: SH(30) }}>
          <View style={styles.profileSection}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: 'https://i.pravatar.cc/300' }} // Placeholder as per screenshot
                style={styles.profileImage}
              />
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => navigation.navigate('UpdateProfile')}
              >
                <EditIcon size={14} color={theme.colors.background} />
              </TouchableOpacity>
            </View>
            <View style={styles.userInfo}>
              <Text variant="semiBold" size={18} color={theme.colors.gray900}>
                {user?.name || 'Raj Jadhav'}
              </Text>
              <Text variant="regular" size={14} color={theme.colors.gray500} style={styles.userEmail}>
                {user?.email || 'rajjadhav@gmail.com'}
              </Text>
              <Text variant="regular" size={14} color={theme.colors.gray500}>
                {user?.phone || '+91 1234567890'}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.myTractorButton}
            onPress={() => navigation.navigate('MyTractors')}
          >
            <View style={styles.myTractorLeft}>
              <View style={styles.tractorIconContainer}>
                <BikeIcon width={SW(24)} height={SW(24)} />
              </View>
              <Text variant="medium" size={16} color={theme.colors.gray800}>
                {t('main.profile.myTractor')}
              </Text>
            </View>
            <ChevronBackwardIcon size={20} color={theme.colors.gray400} style={{ transform: [{ rotate: '180deg' }] }} />
          </TouchableOpacity>

          <View style={styles.sectionContainer}>
            <View style={styles.sectionTitle}>
              <Text variant="semiBold" size={14} color={theme.colors.gray900}>
                {t('main.profile.myBookings')}
              </Text>
            </View>
            <ProfileOptionItem
              icon={<LocationEditIcon size={20} color={theme.colors.primary} />}
              title={t('main.profile.manageAddress')}
              onPress={() => navigation.navigate('ManageAddress')}
            />
            <ProfileOptionItem
              icon={<BookingIcon size={20} color={theme.colors.primary} />}
              title={t('main.profile.yourBookings')}
              onPress={() => navigation.navigate('Bookings')}
            />
            <ProfileOptionItem
              icon={<FaqIcon size={20} color={theme.colors.primary} />}
              title={t('main.profile.faq')}
              onPress={() => navigation.navigate('FAQ')}
            />
          </View>

          <View style={styles.sectionContainer}>
            <View style={styles.sectionTitle}>
              <Text variant="semiBold" size={14} color={theme.colors.gray900}>
                {t('main.profile.more')}
              </Text>
            </View>
            <ProfileOptionItem
              icon={<ChangelanguageIcon size={20} color={theme.colors.primary} />}
              title={t('main.profile.language')}
              onPress={() => navigation.navigate('ChooseLanguage')}
            />
            <ProfileOptionItem
              icon={<AboutIcon size={20} color={theme.colors.primary} />}
              title={t('main.profile.about')}
              onPress={() => navigation.navigate('About')}
            />
            <ProfileOptionItem
              icon={<FeedbackIcon size={20} color={theme.colors.primary} />}
              title={t('main.profile.sendFeedback')}
              onPress={() => navigation.navigate('SendFeedback')}
            />
            <ProfileOptionItem
              icon={<ReportIcon size={20} color={theme.colors.primary} />}
              title={t('main.profile.reportIssue')}
              onPress={() => navigation.navigate('ReportIssue')}
            />
            <ProfileOptionItem
              icon={<LogoutIcon size={20} color={theme.colors.primary} />}
              title={t('main.profile.logout')}
              onPress={handleLogout}
            />
          </View>

          <View style={styles.socialSection}>
            <Text variant="semiBold" size={14} color={theme.colors.gray900} style={styles.socialTitle}>
              {t('main.profile.connectWithUs')}
            </Text>
            <View style={styles.socialIconsRow}>
              {renderSocialIcon(InstagramIcon, t('main.profile.instagram'))}
              {renderSocialIcon(FacebookIcon, t('main.profile.facebook'))}
              {renderSocialIcon(YoutubeIcon, t('main.profile.youtube'))}
              {renderSocialIcon(ThreadsIcon, t('main.profile.threads'))}
            </View>
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};


export default ProfileScreen;

import React from 'react';
import { ScrollView, Image, TouchableOpacity as RNTouchableOpacity } from 'react-native';
import { useTheme } from '@theme';
import {
  Text,
  View,
  ScreenWrapper,
  TouchableOpacity,
  ProfileOptionItem,
  SecondaryHeader
} from '@components';
import { useAppSelector, useAppDispatch } from '@store';
import { logout } from '@store/slices/authSlice';
import { createStyles } from './Profile.styles';
import {
  EditIcon,
  AboutIcon,
  FaqIcon,
  FeedbackIcon,
  LogoutIcon,
  ReportIcon,
  ChangelanguageIcon,
  LocationIcon,
  BookingIcon,
  InstagramIcon,
  FacebookIcon,
  YoutubeIcon,
  ThreadsIcon,
  ChevronBackwardIcon,
  BikeIcon
} from '@assets/icons';
import { TractorImage } from '@assets/images';
import { SW, SH, SF } from '@utils/Dimensions';

const ProfileScreen = ({ navigation }: any) => {
  const { theme } = useTheme();
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
          title="My Account"
          onBack={() => navigation.goBack()}
        />
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: SH(30) }}>
          <View style={styles.profileSection}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: 'https://i.pravatar.cc/300' }} // Placeholder as per screenshot
                style={styles.profileImage}
              />
              <TouchableOpacity style={styles.editButton}>
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
                My Tractor
              </Text>
            </View>
            <ChevronBackwardIcon size={20} color={theme.colors.gray400} style={{ transform: [{ rotate: '180deg' }] }} />
          </TouchableOpacity>

          <View style={styles.sectionContainer}>
            <View style={styles.sectionTitle}>
              <Text variant="semiBold" size={14} color={theme.colors.gray900}>
                My Bookings
              </Text>
            </View>
            <ProfileOptionItem
              icon={<LocationIcon size={20} color={theme.colors.primary} />}
              title="Manage Address"
              onPress={() => navigation.navigate('ManageAddress')}
            />
            <ProfileOptionItem
              icon={<BookingIcon size={20} color={theme.colors.primary} />}
              title="Your bookings"
              onPress={() => navigation.navigate('Bookings')}
            />
            <ProfileOptionItem
              icon={<FaqIcon size={20} color={theme.colors.primary} />}
              title="Frequently asked questions"
              onPress={() => { }}
            />
          </View>

          <View style={styles.sectionContainer}>
            <View style={styles.sectionTitle}>
              <Text variant="semiBold" size={14} color={theme.colors.gray900}>
                More
              </Text>
            </View>
            <ProfileOptionItem
              icon={<ChangelanguageIcon size={20} color={theme.colors.primary} />}
              title="Language"
              onPress={() => { }}
            />
            <ProfileOptionItem
              icon={<AboutIcon size={20} color={theme.colors.primary} />}
              title="About"
              onPress={() => { }}
            />
            <ProfileOptionItem
              icon={<FeedbackIcon size={20} color={theme.colors.primary} />}
              title="Send feedback"
              onPress={() => { }}
            />
            <ProfileOptionItem
              icon={<ReportIcon size={20} color={theme.colors.primary} />}
              title="Report an Issue"
              onPress={() => { }}
            />
            <ProfileOptionItem
              icon={<LogoutIcon size={20} color={theme.colors.primary} />}
              title="Log out"
              onPress={handleLogout}
            />
          </View>

          <View style={styles.socialSection}>
            <Text variant="semiBold" size={14} color={theme.colors.gray900} style={styles.socialTitle}>
              Connect With Us
            </Text>
            <View style={styles.socialIconsRow}>
              {renderSocialIcon(InstagramIcon, 'Instagram')}
              {renderSocialIcon(FacebookIcon, 'Facebook')}
              {renderSocialIcon(YoutubeIcon, 'Youtube')}
              {renderSocialIcon(ThreadsIcon, 'Threads')}
            </View>
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

export default ProfileScreen;

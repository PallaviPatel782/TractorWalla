import React from 'react';
import {
  Text,
  View,
  ScreenWrapper,
  TouchableOpacity,
  ProfileOptionItem,
  SecondaryHeader,
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
  BikeIcon,
  LocationEditIcon,
  UserIcon,
  ChevronBackwardIcon,
  EditIcon
} from '@assets/icons';
import { SW } from '@utils/Dimensions';
import { useTheme } from '@theme';

const ProfileScreen = ({ navigation }: any) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);

  const handleLogout = () => {
    logout();
  };

  return (
    <ScreenWrapper>
      <SecondaryHeader title="Profile" />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={() => navigation.navigate('UpdateProfile')}
            activeOpacity={0.8}
          >
            <UserIcon size={SW(60)} color={theme.colors.black} />
            <View style={styles.editButton}>
              <EditIcon size={SW(16)} color={theme.colors.white} />
            </View>
          </TouchableOpacity>
          <View style={styles.userInfo}>
            <Text variant="semiBold" size={18} style={styles.userName}>
              {user?.name || 'User'}
            </Text>
            <Text variant="regular" size={14} color={theme.colors.gray500} style={styles.userEmail}>
              {user?.phone || '+91 0000000000'}
            </Text>
          </View>
        </View>

        {/* My Tractor Button (Original Design) */}
        <TouchableOpacity
          style={styles.myTractorButton}
          onPress={() => navigation.navigate('MyTractors')}
        >
          <View style={styles.myTractorLeft}>
            <View style={styles.tractorIconContainer}>
              <BikeIcon size={SW(24)} color={theme.colors.primary} />
            </View>
            <Text variant="medium" size={16}>My Tractors</Text>
          </View>
          <ChevronBackwardIcon size={SW(20)} color={theme.colors.gray400} style={{ transform: [{ rotate: '180deg' }] }} />
        </TouchableOpacity>

        {/* Options Section */}
        <View style={styles.sectionContainer}>
          <Text variant="bold" size={14} style={styles.sectionTitle}>Account Settings</Text>
          <ProfileOptionItem
            title="Manage Address"
            icon={<LocationEditIcon size={SW(20)} color={theme.colors.gray600} />}
            onPress={() => navigation.navigate('ManageAddress')}
          />
          <ProfileOptionItem
            title="Change Language"
            icon={<ChangelanguageIcon size={SW(20)} color={theme.colors.gray600} />}
            onPress={() => navigation.navigate('ChooseLanguage')}
          />
          <ProfileOptionItem
            title="My Bookings"
            icon={<BookingIcon size={SW(20)} color={theme.colors.gray600} />}
            onPress={() => navigation.navigate('Bookings')}
            showBorder={false}
          />
        </View>

        <View style={styles.sectionContainer}>
          <Text variant="bold" size={14} style={styles.sectionTitle}>Support</Text>
          <ProfileOptionItem
            title="About Us"
            icon={<AboutIcon size={SW(20)} color={theme.colors.gray600} />}
            onPress={() => navigation.navigate('About')}
          />
          <ProfileOptionItem
            title="FAQs"
            icon={<FaqIcon size={SW(20)} color={theme.colors.gray600} />}
            onPress={() => navigation.navigate('FAQ')}
          />
          <ProfileOptionItem
            title="Feedback"
            icon={<FeedbackIcon size={SW(20)} color={theme.colors.gray600} />}
            onPress={() => navigation.navigate('SendFeedback')}
          />
          <ProfileOptionItem
            title="Report Issue"
            icon={<ReportIcon size={SW(20)} color={theme.colors.gray600} />}
            onPress={() => navigation.navigate('ReportIssue')}
          />
          <ProfileOptionItem
            title="Logout"
            icon={<LogoutIcon size={SW(20)} color={theme.colors.brandRed} />}
            onPress={handleLogout}
            showBorder={false}
          />
        </View>

        {/* Social Section */}
        <View style={styles.socialSection}>
          <Text variant="medium" size={14} color={theme.colors.gray400} style={styles.socialTitle}>Follow us on</Text>
          <View style={styles.socialIconsRow}>
            <TouchableOpacity style={styles.socialItem}>
              <View style={styles.socialIconWrapper}>
                <InstagramIcon size={SW(24)} />
              </View>
              <Text variant="regular" size={11} color={theme.colors.gray600}>Instagram</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialItem}>
              <View style={styles.socialIconWrapper}>
                <FacebookIcon size={SW(24)} />
              </View>
              <Text variant="regular" size={11} color={theme.colors.gray600}>Facebook</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialItem}>
              <View style={styles.socialIconWrapper}>
                <YoutubeIcon size={SW(24)} />
              </View>
              <Text variant="regular" size={11} color={theme.colors.gray600}>Youtube</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialItem}>
              <View style={styles.socialIconWrapper}>
                <ThreadsIcon size={SW(24)} />
              </View>
              <Text variant="regular" size={11} color={theme.colors.gray600}>Threads</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </ScreenWrapper>
  );
};

export default ProfileScreen;

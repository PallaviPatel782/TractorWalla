import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@theme';
import { SecondaryHeader, ScreenWrapper, View, ProfileOptionItem } from '@components';
import { createStyles } from './styles';
import {
  AboutinfoIcon,
  TeamIcon,
  ReportIcon,
  FaqIcon,
  ContactusIcon
} from '@assets/icons';

const AboutScreen = ({ navigation }: any) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = createStyles(theme);

  const menuItems = [
    {
      title: t('main.about_menu.about_tractorwalla'),
      icon: <AboutinfoIcon size={20} color={theme.colors.primary} />,
      route: 'AboutTractorWalla',
    },
    {
      title: t('main.about_menu.join_team'),
      icon: <TeamIcon size={20} color={theme.colors.primary} />,
      route: 'JoinTeam',
    },
    {
      title: t('main.about_menu.privacy_policy'),
      icon: <ReportIcon size={20} color={theme.colors.primary} />,
      route: 'PrivacyPolicy',
    },
    {
      title: t('main.about_menu.terms_conditions'),
      icon: <FaqIcon size={20} color={theme.colors.primary} />,
      route: 'TermsConditions',
    },
    {
      title: t('main.about_menu.contact_us'),
      icon: <ContactusIcon size={20} color={theme.colors.primary} />,
      route: 'ContactUs',
    },
  ];

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <SecondaryHeader
          title={t('main.profile.about_info.title')}
          onBack={() => navigation.goBack()}
        />

        <View style={styles.menuContent}>
          <View style={styles.card}>
            {menuItems.map((item, index) => (
              <ProfileOptionItem
                key={index}
                title={item.title}
                icon={item.icon}
                onPress={() => navigation.navigate(item.route)}
                showBorder={index !== menuItems.length - 1}
              />
            ))}
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default AboutScreen;

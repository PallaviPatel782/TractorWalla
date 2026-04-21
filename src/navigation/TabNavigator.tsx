import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, ProfileScreen, BuyPartsScreen, BookServiceScreen } from '@screens/main';
import { View } from '@components';
import { MainTabParamList } from '@navigation/NavigationTypes';
import { useTheme } from '@theme';
import { SF, SH, SW } from '@utils/Dimensions';
import { useTranslation } from 'react-i18next';
import {
  HomeIcon,
  AllServicesIcon,
  ProfileIcon,
  SettingIcon
} from '@assets/icons';

const Tab = createBottomTabNavigator<MainTabParamList>();

interface TabIconProps {
  Icon: any;
  color: string;
  focused: boolean;
}

const RenderTabIcon = ({ Icon, color, focused }: TabIconProps) => {
  const { theme } = useTheme();
  return (
    <View style={{
      alignItems: 'center',
      justifyContent: 'center',
      width: SW(60),
      height: SH(60),
    }}>
      {focused && (
        <View
          style={{
            position: 'absolute',
            top: SH(10),
            width: SW(48),
            height: SH(4),
            backgroundColor: theme.colors.primary,
            borderBottomLeftRadius: SW(10),
            borderBottomRightRadius: SW(10),
            zIndex: 10,
          }}
        />

      )}
      <Icon color={color} size={24} />
    </View>
  );
};


const TabNavigator = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.gray500,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          height: SH(80),
          paddingBottom: SH(10),
          borderTopWidth: 1,
          borderTopColor: theme.colors.gray200,
        },
        tabBarLabelStyle: {
          fontSize: SF(12),
          fontFamily: theme.fontfamily.robotoRegular
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: t('main.home.home'),
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <RenderTabIcon Icon={HomeIcon} color={color} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Services"
        component={BookServiceScreen}
        options={{
          tabBarLabel: t('main.home.all_services'),
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <RenderTabIcon Icon={AllServicesIcon} color={color} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Parts"
        component={BuyPartsScreen}
        options={{
          tabBarLabel: t('main.home.parts'),
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <RenderTabIcon Icon={SettingIcon} color={color} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: t('main.home.profile'),
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <RenderTabIcon Icon={ProfileIcon} color={color} focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};


export default TabNavigator;

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, ProfileScreen, BuyPartsScreen, BookServiceScreen } from '@screens/main';
import { View, TouchableOpacity, Text } from '@components';
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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const Tab = createBottomTabNavigator<MainTabParamList>();

const TabNavigator = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      tabBar={({ state, descriptors, navigation }) => {
        const tabHeight = SH(60) + (insets.bottom > 0 ? insets.bottom : SH(5));

        return (
          <View style={{
            flexDirection: 'row',
            backgroundColor: theme.colors.white,
            height: tabHeight,
            paddingBottom: insets.bottom > 0 ? insets.bottom : SH(5),
            elevation: 10,
            shadowColor: theme.colors.black,
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.05,
            shadowRadius: 5,
            borderTopWidth: 1,
            borderTopColor: theme.colors.gray100,
          }}>
            {state.routes.map((route, index) => {
              const { options } = descriptors[route.key];
              const label = options.tabBarLabel !== undefined ? options.tabBarLabel : route.name;
              const isFocused = state.index === index;

              const onPress = () => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });

                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              };

              return (
                <TouchableOpacity
                  key={route.key}
                  onPress={onPress}
                  style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                >
                  {isFocused && (
                    <View style={{
                      position: 'absolute',
                      top: -1, // Exactly on the top border
                      width: SW(40),
                      height: SH(4),
                      backgroundColor: theme.colors.primary,
                      borderBottomLeftRadius: SW(8),
                      borderBottomRightRadius: SW(8),
                    }} />
                  )}
                  <View style={{ marginTop: SH(8) }}>
                    {options.tabBarIcon?.({
                      focused: isFocused,
                      color: isFocused ? theme.colors.primary : theme.colors.gray600,
                      size: 24
                    })}
                  </View>
                  <Text style={{
                    fontSize: SF(11),
                    fontFamily: theme.fontfamily.poppinsMedium,
                    color: isFocused ? theme.colors.primary : theme.colors.gray600,
                    marginTop: SH(2),
                  }}>
                    {label as string}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        );
      }}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: t('main.home.home'),
          tabBarIcon: ({ color }) => <HomeIcon color={color} size={24} />,
        }}
      />
      <Tab.Screen
        name="Services"
        component={BookServiceScreen}
        options={{
          tabBarLabel: t('main.home.all_services'),
          tabBarIcon: ({ color }) => <AllServicesIcon color={color} size={24} />,
        }}
      />
      <Tab.Screen
        name="Parts"
        component={BuyPartsScreen}
        options={{
          tabBarLabel: t('main.home.parts'),
          tabBarIcon: ({ color }) => <SettingIcon color={color} size={24} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: t('main.home.profile'),
          tabBarIcon: ({ color }) => <ProfileIcon color={color} size={24} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

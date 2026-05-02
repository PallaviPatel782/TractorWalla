import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Linking, View as RNView } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@theme';
import {
  Text,
  ScreenWrapper,
  View,
  TouchableOpacity,
  SecondaryHeader
} from '@components';
import { createStyles } from './styles';
import { LocationIcon, PhoneIcon } from '@assets/icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/NavigationTypes';
import { SH, SW } from '@utils/Dimensions';
const TrackMechanic = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<any>();
  const { bookingId, paymentType } = route.params || { bookingId: 'ID1234' };

  const mapRef = useRef<MapView>(null);
  const [mechanicPos, setMechanicPos] = useState({
    latitude: 18.5204,
    longitude: 73.8567,
  });

  const [reached, setReached] = useState(false);

  useEffect(() => {
    // Simulate movement
    const interval = setInterval(() => {
      setMechanicPos(prev => ({
        latitude: prev.latitude + 0.0001,
        longitude: prev.longitude + 0.0001,
      }));
    }, 3000);

    const timer = setTimeout(() => {
      setReached(true);
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    let autoNavTimer: ReturnType<typeof setTimeout>;
    if (reached) {
      autoNavTimer = setTimeout(() => {
        navigation.navigate('ServiceProgress', { bookingId, paymentType });
      }, 2000);
    }
    return () => {
      if (autoNavTimer) clearTimeout(autoNavTimer);
    };
  }, [reached, navigation, bookingId, paymentType]);

  return (
    <ScreenWrapper>
      <SecondaryHeader
        title="Track"
        onBack={() => navigation.navigate('Main')}
      />
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          <MapView
            ref={mapRef}
            provider={PROVIDER_DEFAULT}
            style={StyleSheet.absoluteFill}
            initialRegion={{
              latitude: 18.5204,
              longitude: 73.8567,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            {/* User Location */}
            <Marker coordinate={{ latitude: 18.5204, longitude: 73.8567 }}>
              <RNView style={styles.userMarker}>
                <RNView style={styles.storeBadge}>
                  <Text style={styles.storeText}>Reliance Digital</Text>
                </RNView>
                <LocationIcon size={24} color={theme.colors.DeepGreen} />
              </RNView>
            </Marker>

            {/* Mechanic Location */}
            <Marker coordinate={mechanicPos}>
              <RNView style={styles.mechanicMarker}>
                <LocationIcon size={30} color={theme.colors.DeepGreen} />
              </RNView>
            </Marker>
          </MapView>

          <TouchableOpacity
            style={styles.bottomCard}
            onPress={() => navigation.navigate('ServiceProgress', { bookingId, paymentType })}
            activeOpacity={0.8}
          >
            <View style={styles.cardContent}>
              <View style={styles.textContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: SW(4) }}>
                  <Text variant="semiBold" size={14} color={theme.colors.gray900}>
                    {reached ? t('main.serviceFlow.reached', 'Reached...') : t('main.serviceFlow.onTheWay', 'Service Engineer On the way...')}
                  </Text>
                </View>
                <Text variant="regular" size={14} color={theme.colors.gray500} style={{ marginTop: SH(2) }}>
                  Rajat Tiwari
                </Text>

                <TouchableOpacity
                  style={styles.callBtn}
                  onPress={() => Linking.openURL('tel:1234567890')}
                >
                  <PhoneIcon size={16} color={theme.colors.DeepGreen} />
                </TouchableOpacity>
              </View>

              <View style={styles.etaBadge}>
                <Text style={styles.etaText}>15</Text>
                <Text style={styles.etaUnit}>mins</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default TrackMechanic;

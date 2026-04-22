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
} from '@components';
import { createStyles } from './styles';
import { LocationIcon, PhoneIcon } from '@assets/icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/NavigationTypes';

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

  return (
    <ScreenWrapper>
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

          <View style={styles.bottomCard}>
            <View style={styles.infoRow}>
              <View style={styles.textContainer}>
                <Text variant="semiBold" size={14} style={styles.statusText}>
                  {reached ? t('main.serviceFlow.reached') : t('main.serviceFlow.onTheWay')}
                </Text>
                <Text variant="regular" size={12} style={styles.nameText}>
                  Rajat Tiwari
                </Text>
              </View>
              {!reached && (
                <View style={styles.etaBadge}>
                  <Text style={styles.etaText}>15</Text>
                  <Text style={styles.etaUnit}>mins</Text>
                </View>
              )}
            </View>

            {reached ? (
              <TouchableOpacity
                style={styles.viewDetailsBtn}
                onPress={() => navigation.navigate('ServiceProgress', { bookingId, paymentType })}
              >
                <Text style={styles.viewDetailsText}>{t('main.serviceFlow.viewProgress')}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.callBtn}
                onPress={() => Linking.openURL('tel:1234567890')}
              >
                <PhoneIcon size={20} color={theme.colors.DeepGreen} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default TrackMechanic;

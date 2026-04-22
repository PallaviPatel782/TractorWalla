import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import MapView, { Region, PROVIDER_DEFAULT } from 'react-native-maps';
import { CurrentLocationIcon, LocationIcon } from '@assets/icons';
import { Button, Text, ScreenWrapper, View, TouchableOpacity } from '@components';
import {
  requestLocationPermission,
  getCurrentLocation,
  reverseGeocodeLocation,
  LocationData,
} from '@utils/locationHelper';
import { useTheme } from '@theme';
import { createStyles } from './styles';


// ─── Constants ────────────────────────────────────────────────────────────────

const DEFAULT_REGION: Region = {
  latitude: 18.5204,
  longitude: 73.8567,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

const DEBOUNCE_MS = 350;

// ─── Main Component ───────────────────────────────────────────────────────────

const LocationScreen = ({ navigation }: any) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = createStyles(theme);

  const mapRef = useRef<MapView>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);
  const lastCoord = useRef({ lat: 0, lng: 0 });
  const abortRef = useRef<AbortController | null>(null);

  const [currentLocation, setCurrentLocation] = useState<LocationData>({
    address: t('main.location.detecting'),
    fullAddress: '',
    latitude: DEFAULT_REGION.latitude,
    longitude: DEFAULT_REGION.longitude,
    city: '',
    state: '',
  });
  const [fetchingAddress, setFetchingAddress] = useState(true);

  // ─── Reverse Geocoding ──────────────────────────────────────────────────
  const reverseGeocode = useCallback(
    async (latitude: number, longitude: number) => {
      // Skip if position barely changed
      if (
        Math.abs(lastCoord.current.lat - latitude) < 0.00008 &&
        Math.abs(lastCoord.current.lng - longitude) < 0.00008
      )
        return;

      lastCoord.current = { lat: latitude, lng: longitude };
      setFetchingAddress(true);

      abortRef.current?.abort();
      const ctrl = new AbortController();
      abortRef.current = ctrl;

      try {
        const data = await reverseGeocodeLocation(
          latitude,
          longitude,
          ctrl.signal,
        );
        setCurrentLocation(data);
      } catch (e: any) {
        if (e?.name === 'AbortError') return;
        setCurrentLocation({
          address: t('main.location.selected'),
          fullAddress: `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`,
          latitude,
          longitude,
          city: '',
          state: '',
        });
      } finally {
        setFetchingAddress(false);
      }
    },
    [t],
  );

  // ─── GPS ─────────────────────────────────────────────────────────────────

  const fetchGPS = useCallback(async () => {
    try {
      const coords = await getCurrentLocation();
      const newRegion = {
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      mapRef.current?.animateToRegion(newRegion, 500);
      reverseGeocode(coords.latitude, coords.longitude);
    } catch {
      reverseGeocode(DEFAULT_REGION.latitude, DEFAULT_REGION.longitude);
    }
  }, [reverseGeocode]);

  useEffect(() => {
    let alive = true;
    (async () => {
      const ok = await requestLocationPermission();
      if (!alive) return;
      ok
        ? fetchGPS()
        : reverseGeocode(DEFAULT_REGION.latitude, DEFAULT_REGION.longitude);
    })();
    return () => {
      alive = false;
      if (debounceRef.current) clearTimeout(debounceRef.current);
      abortRef.current?.abort();
    };
  }, [fetchGPS, reverseGeocode]);

  // ─── Map pan handler ─────────────────────────────────────────────────────

  const handleRegionChange = useCallback(
    (r: Region) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(
        () => reverseGeocode(r.latitude, r.longitude),
        DEBOUNCE_MS,
      );
    },
    [reverseGeocode],
  );

  // ─── Confirm ─────────────────────────────────────────────────────────────

  const handleConfirm = useCallback(() => {
    if (!currentLocation) return;
    navigation.navigate('ManageAddress', { 
      newAddress: {
        id: Date.now().toString(),
        label: 'New Address',
        address: currentLocation.fullAddress || currentLocation.address
      }
    });
  }, [currentLocation, navigation]);

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.currentLocRow}
          onPress={() => {
            setFetchingAddress(true);
            fetchGPS();
          }}
          activeOpacity={0.7}
        >
          <View style={styles.currentLocIcon}>
            <CurrentLocationIcon />
          </View>
          <Text style={styles.currentLocText}>{t('main.location.useCurrent')}</Text>
        </TouchableOpacity>

        <View style={styles.mapWrapper}>
          <MapView
            ref={mapRef}
            provider={PROVIDER_DEFAULT}
            style={StyleSheet.absoluteFill}
            initialRegion={DEFAULT_REGION}
            onRegionChange={handleRegionChange}
            showsUserLocation
            showsMyLocationButton={false}
            showsCompass={false}
            rotateEnabled={false}
            pitchEnabled={false}
            moveOnMarkerPress={false}
            toolbarEnabled={false}
          />

          <View pointerEvents="none" style={styles.pinAnchor}>
            <LocationIcon color={'red'} />
          </View>
        </View>

        <View style={styles.addressCard}>
          <View style={styles.addressInner}>
            <View style={styles.addressPinIcon}>
              <LocationIcon color={'white'} />
            </View>
            <View style={styles.addressTextWrap}>
              <Text style={styles.addressTitle} numberOfLines={1}>
                {currentLocation.address}
              </Text>
              {fetchingAddress ? (
                <View style={styles.addressLoadRow}>
                  <ActivityIndicator
                    size="small"
                    color="rgba(255,255,255,0.75)"
                  />
                  <Text style={styles.addressLoadText}>{t('main.location.fetching')}</Text>
                </View>
              ) : (
                <Text style={styles.addressSubtitle} numberOfLines={2}>
                  {currentLocation.fullAddress}
                </Text>
              )}
            </View>
          </View>
        </View>

        <View style={styles.confirmWrapper}>
          <Button
            title={t('main.location.confirm')}
            onPress={handleConfirm}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default LocationScreen;

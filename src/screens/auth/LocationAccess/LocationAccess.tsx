import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import MapView, { Region, PROVIDER_DEFAULT } from 'react-native-maps';
import { CurrentLocationIcon, LocationIcon, SearchIcon } from '@assets/icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Text, ScreenWrapper } from '@components';
import {
  requestLocationPermission,
  getCurrentLocation,
  reverseGeocodeLocation,
  searchLocationByQuery,
  LocationData,
} from '@utils/locationHelper';
import { SH } from '@utils/Dimensions';

// ─── Constants ────────────────────────────────────────────────────────────────

const DEFAULT_REGION: Region = {
  latitude: 18.5204,
  longitude: 73.8567,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

const DEBOUNCE_MS = 350;

// ─── Main Component ───────────────────────────────────────────────────────────

const LocationScreen = ({ navigation, route }: any) => {
  const mapRef = useRef<MapView>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);
  const lastCoord = useRef({ lat: 0, lng: 0 });
  const abortRef = useRef<AbortController | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLocation, setCurrentLocation] = useState<LocationData>({
    address: 'Detecting location...',
    fullAddress: '',
    latitude: DEFAULT_REGION.latitude,
    longitude: DEFAULT_REGION.longitude,
    city: '',
    state: '',
  });
  const [fetchingAddress, setFetchingAddress] = useState(true);
  // ─── Permission ──────────────────────────────────────────────────────────
  const reverseGeocode = useCallback(
    async (latitude: number, longitude: number) => {
      // Skip if position barely changed — avoids redundant calls while panning slowly
      if (
        Math.abs(lastCoord.current.lat - latitude) < 0.00008 &&
        Math.abs(lastCoord.current.lng - longitude) < 0.00008
      )
        return;

      lastCoord.current = { lat: latitude, lng: longitude };
      setFetchingAddress(true);

      // Cancel any in-flight request immediately so we never wait for a stale one
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
          address: 'Location Selected',
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
    [],
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

  // Map renders immediately — GPS + permission run in background after mount
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

  // ─── Reverse Geocoding ───────────────────────────────────────────────────

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
    navigation.navigate('ProfileDetails', { location: currentLocation });
  }, [currentLocation, navigation]);


  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* ── Use Current Location ── */}
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
          <Text style={styles.currentLocText}>Use Current Location</Text>
        </TouchableOpacity>

        {/* ── Map — renders immediately, no loading gate ── */}
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

          {/* Fixed teardrop pin centered on map */}
          <View pointerEvents="none" style={styles.pinAnchor}>
            <LocationIcon color={'red'} />
          </View>
        </View>

        {/* ── Teal address card (no border radius, flush) ── */}
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
                  <Text style={styles.addressLoadText}>Fetching address...</Text>
                </View>
              ) : (
                <Text style={styles.addressSubtitle} numberOfLines={2}>
                  {currentLocation.fullAddress}
                </Text>
              )}
            </View>
          </View>
        </View>

        {/* ── Confirm button ── */}
        <View style={styles.confirmWrapper}>
          <Button
            title="Confirm Location"
            onPress={handleConfirm}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: SH(30)
  },

  // ── Search ───────────────────────────────────────────────────────────────
  searchContainer: {
    paddingHorizontal: 14,
    paddingBottom: 0,
    backgroundColor: '#fff',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 11 : 7,
    backgroundColor: '#fff',
  },
  searchIcon: {
    fontSize: 15,
    marginRight: 8,
    color: '#bbb',
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    padding: 0,
  },

  // ── Current Location ─────────────────────────────────────────────────────
  currentLocRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 11,
    backgroundColor: '#fff',
  },
  currentLocIcon: {
    fontSize: 18,
    color: '#00BCD4',
    marginRight: 8,
    lineHeight: 22,
  },
  currentLocText: {
    fontSize: 14,
    color: '#00BCD4',
    fontWeight: '500',
  },

  // ── Map ──────────────────────────────────────────────────────────────────
  mapWrapper: {
    flex: 1,
  },

  // Pin is centered on the map — tip of rotated square is at bottom-right corner
  // Offset so the tip points exactly to the lat/lng center:
  // body is 32px wide, 32px tall. After 45° rotation the tip sits at
  // (left + 32, top + 32) from top-left of un-rotated box = center + 16,16.
  // We shift wrapper so the tip is at the center of the mapWrapper.
  pinAnchor: {
    position: 'absolute',
    left: '51%',
    top: '55%',
    // Move left by half the body width so body center aligns, then account for
    // the rotated corner: after rotation the bottom point is at x+16, y+16
    transform: [{ translateX: -16 }, { translateY: -42 }],
  },

  // ── Address Card ─────────────────────────────────────────────────────────
  addressCard: {
    backgroundColor: '#00897B',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  addressInner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  addressPinIcon: {
    fontSize: 22,
    marginRight: 10,
    marginTop: 1,
  },
  addressTextWrap: {
    flex: 1,
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 3,
  },
  addressLoadRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  addressLoadText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.75)',
  },
  addressSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.88)',
    lineHeight: 18,
  },

  // ── Confirm ───────────────────────────────────────────────────────────────
  confirmWrapper: {
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 34 : 14,
    backgroundColor: '#fff',
  },
  confirmBtn: {
    backgroundColor: '#1E88E5',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  confirmBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    letterSpacing: 0.2,
  },
});

export default LocationScreen;

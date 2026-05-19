import React, { useEffect, useState, useRef, useCallback } from 'react';
import { StyleSheet, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import MapView, { Region, PROVIDER_DEFAULT } from 'react-native-maps';
import { CurrentLocationIcon, LocationIcon } from '@assets/icons';
import {
  Button,
  Text,
  ScreenWrapper,
  View,
  TouchableOpacity,
  ScrollView,
  Input,
  ScreenFooter,
} from '@components';
import {
  requestLocationPermission,
  getCurrentLocation,
  reverseGeocodeLocation,
  LocationData,
} from '@utils/locationHelper';
import { useTheme } from '@theme';

import { createStyles } from './styles';
import { useCreateAddress, useUpdateAddress } from '../../../hooks/useAddress';
import { CustomerAddress } from '@appTypes';
import { useSnackbarStore } from '@store/useSnackbarStore';

// ─── Constants ────────────────────────────────────────────────────────────────

const DEFAULT_REGION: Region = {
  latitude: 18.5204,
  longitude: 73.8567,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

const DEBOUNCE_MS = 350;
const LABEL_OPTIONS = ['home', 'work', 'other'];

// ─── Main Component ───────────────────────────────────────────────────────────

const LocationScreen = ({ navigation, route }: { navigation: any; route: any }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = createStyles(theme);
  const showSnackbar = useSnackbarStore(state => state.showSnackbar);

  const mapRef = useRef<MapView>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);
  const lastCoord = useRef({ lat: 0, lng: 0 });
  const abortRef = useRef<AbortController | null>(null);

  const addressToEdit: CustomerAddress | undefined = route.params?.addressToEdit;
  const isEditMode = !!(addressToEdit?.id || addressToEdit?._id);

  // ─── Map location state ───────────────────────────────────────────────────
  // In edit mode: pre-fill from saved data (don't auto-detect GPS)
  const [geoLocation, setGeoLocation] = useState<LocationData>({
    address: isEditMode
      ? [addressToEdit?.addressLine, addressToEdit?.city].filter(Boolean).join(', ')
      : t('main.location.detecting'),
    fullAddress: isEditMode ? addressToEdit?.addressLine || '' : '',
    latitude: (isEditMode && addressToEdit?.latitude) ? addressToEdit.latitude : DEFAULT_REGION.latitude,
    longitude: (isEditMode && addressToEdit?.longitude) ? addressToEdit.longitude : DEFAULT_REGION.longitude,
    city: isEditMode ? (addressToEdit?.city || '') : '',
    state: isEditMode ? (addressToEdit?.state || '') : '',
  });
  const [fetchingAddress, setFetchingAddress] = useState(!isEditMode);

  // ─── Form state ───────────────────────────────────────────────────────────
  const [addressLine, setAddressLine] = useState(addressToEdit?.addressLine || '');
  const [pincode, setPincode] = useState(addressToEdit?.pincode || '');
  const [landmark, setLandmark] = useState(addressToEdit?.landmark || '');
  const [selectedLabel, setSelectedLabel] = useState(() => {
    const raw = addressToEdit?.addressType || addressToEdit?.label || 'home';
    return raw.toLowerCase();
  });
  const [errors, setErrors] = useState<{ addressLine?: string; pincode?: string }>({});

  // ─── API Hooks ────────────────────────────────────────────────────────────
  const { mutate: createAddress, isPending: isCreating } = useCreateAddress();
  const { mutate: updateAddress, isPending: isUpdating } = useUpdateAddress();

  // ─── Reverse Geocoding ────────────────────────────────────────────────────
  const reverseGeocode = useCallback(
    async (latitude: number, longitude: number) => {
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
        const data = await reverseGeocodeLocation(latitude, longitude, ctrl.signal);
        setGeoLocation(data);
      } catch (e: any) {
        if (e?.name === 'AbortError') return;
        setGeoLocation({
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

  // ─── GPS ──────────────────────────────────────────────────────────────────
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
    // In edit mode: skip GPS. If lat/lng exist, jump map there; otherwise stay on default.
    if (isEditMode) {
      setFetchingAddress(false);
      if (addressToEdit?.latitude && addressToEdit?.longitude) {
        mapRef.current?.animateToRegion(
          {
            latitude: addressToEdit.latitude,
            longitude: addressToEdit.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          },
          500,
        );
      }
      return;
    }

    // Add mode: fetch GPS as usual
    let alive = true;
    (async () => {
      const ok = await requestLocationPermission();
      if (!alive) return;
      ok ? fetchGPS() : reverseGeocode(DEFAULT_REGION.latitude, DEFAULT_REGION.longitude);
    })();
    return () => {
      alive = false;
      if (debounceRef.current) clearTimeout(debounceRef.current);
      abortRef.current?.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRegionChange = useCallback(
    (r: Region) => {
      // In edit mode, don't reverse geocode on map pan (user sees saved city/state)
      if (isEditMode) return;
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => reverseGeocode(r.latitude, r.longitude), DEBOUNCE_MS);
    },
    [isEditMode, reverseGeocode],
  );

  // ─── Validation & Submit ──────────────────────────────────────────────────
  const validate = () => {
    const newErrors: { addressLine?: string; pincode?: string } = {};
    if (!addressLine.trim()) newErrors.addressLine = 'Address line is required';
    if (!pincode.trim()) newErrors.pincode = 'Pincode is required';
    else if (!/^\d{6}$/.test(pincode.trim())) newErrors.pincode = 'Enter a valid 6-digit pincode';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirm = useCallback(() => {
    if (!validate()) return;

    const addressData: Partial<CustomerAddress> = {
      addressType: selectedLabel,
      label: selectedLabel,
      addressLine: addressLine.trim(),
      pincode: pincode.trim(),
      landmark: landmark.trim(),
      address: `${addressLine.trim()}, ${geoLocation.city || ''}, ${geoLocation.state || ''}`.replace(/^,\s*|,\s*$/g, '').trim(),
      city: geoLocation.city,
      state: geoLocation.state,
      location: {
        type: 'Point',
        coordinates: [geoLocation.longitude, geoLocation.latitude],
      },
    };

    if (addressToEdit?.id || addressToEdit?._id) {
      updateAddress(
        { addressId: (addressToEdit.id || addressToEdit._id) as string, data: addressData },
        {
          onSuccess: (response: any) => {
            showSnackbar({
              type: 'success',
              title: 'Success',
              description: response.message || response.data?.message || 'Address updated successfully'
            });
            navigation.navigate('ManageAddress', { ...route.params });
          },
          onError: (error: any) => {
            showSnackbar({
              type: 'error',
              title: 'Error',
              description: error.message || 'Failed to update address'
            });
          }
        },
      );
    } else {
      createAddress(addressData, {
        onSuccess: (response: any) => {
          showSnackbar({
            type: 'success',
            title: 'Success',
            description: response.message || response.data?.message || 'Address created successfully'
          });
          const newId = response?.address?._id || response?.data?._id;
          if (newId) {
            navigation.goBack();
          } else {
            navigation.goBack();
          }
        },
        onError: (error: any) => {
          showSnackbar({
            type: 'error',
            title: 'Error',
            description: error.message || 'Failed to create address'
          });
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressLine, pincode, landmark, selectedLabel, geoLocation, addressToEdit, createAddress, updateAddress, navigation, route.params, showSnackbar]);

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
        keyboardVerticalOffset={Platform.OS === 'android' ? 24 : 0}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Use Current Location — only shown in Add mode */}
          {!isEditMode && (
            <TouchableOpacity
              style={styles.currentLocRow}
              onPress={() => { setFetchingAddress(true); fetchGPS(); }}
              activeOpacity={0.7}
            >
              <View style={styles.currentLocIcon}>
                <CurrentLocationIcon />
              </View>
              <Text style={styles.currentLocText}>{t('main.location.useCurrent')}</Text>
            </TouchableOpacity>
          )}

          {/* Map */}
          <View style={[styles.mapWrapper, { height: 210, flex: 0 }]}>
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

          {/* Detected location strip */}
          <View style={styles.addressCard}>
            <View style={styles.addressInner}>
              <View style={styles.addressPinIcon}>
                <LocationIcon color={'white'} />
              </View>
              <View style={styles.addressTextWrap}>
                <Text style={styles.addressTitle} numberOfLines={1}>
                  {geoLocation.address}
                </Text>
                {fetchingAddress ? (
                  <View style={styles.addressLoadRow}>
                    <ActivityIndicator size="small" color="rgba(255,255,255,0.75)" />
                    <Text style={styles.addressLoadText}>{t('main.location.fetching')}</Text>
                  </View>
                ) : (
                  <Text style={styles.addressSubtitle} numberOfLines={2}>
                    {geoLocation.city ? `${geoLocation.city}, ${geoLocation.state}` : geoLocation.fullAddress}
                  </Text>
                )}
              </View>
            </View>
          </View>

          {/* Form */}
          <View style={{ padding: 16, paddingBottom: 30 }}>
            {/* Address Type */}
            <Text variant="medium" size={14} style={{ color: theme.colors.textSecondary, marginBottom: 6 }}>
              Address Type
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
              {LABEL_OPTIONS.map(opt => (
                <TouchableOpacity
                  key={opt}
                  onPress={() => setSelectedLabel(opt)}
                  style={{
                    paddingHorizontal: 14,
                    paddingVertical: 6,
                    borderRadius: 20,
                    borderWidth: 1.5,
                    backgroundColor: selectedLabel === opt ? theme.colors.DeepGreen : theme.colors.gray100,
                    borderColor: selectedLabel === opt ? theme.colors.DeepGreen : theme.colors.gray200,
                  }}
                >
                  <Text
                    size={12}
                    variant="medium"
                    style={{ color: selectedLabel === opt ? theme.colors.white : theme.colors.textPrimary, textTransform: 'capitalize' }}                  >
                    {opt}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Address Line */}
            <Input
              label="Address Line"
              required
              placeholder="House/Plot No., Street, Colony…"
              value={addressLine}
              onChangeText={v => { setAddressLine(v); setErrors(e => ({ ...e, addressLine: undefined })); }}
              error={errors.addressLine}
            />

            {/* City + State auto-detected */}
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <View style={{ flex: 1 }}>
                <Input
                  label="City"
                  value={geoLocation.city}
                  placeholder="City"
                  onChangeText={v => setGeoLocation(prev => ({ ...prev, city: v }))}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Input
                  label="State"
                  value={geoLocation.state}
                  placeholder="State"
                  onChangeText={v => setGeoLocation(prev => ({ ...prev, state: v }))}
                />
              </View>
            </View>

            {/* Pincode */}
            <Input
              label="Pincode"
              required
              placeholder="6-digit pincode"
              keyboardType="number-pad"
              maxLength={6}
              value={pincode}
              onChangeText={v => { setPincode(v); setErrors(e => ({ ...e, pincode: undefined })); }}
              error={errors.pincode}
            />

            {/* Landmark */}
            <Input
              label="Landmark (optional)"
              placeholder="Near bus stop, temple, etc."
              value={landmark}
              onChangeText={setLandmark}
            />
          </View>
        </ScrollView>

        <ScreenFooter>
          <Button
            title={addressToEdit ? 'Update Address' : t('main.location.confirm')}
            onPress={handleConfirm}
            disabled={isCreating || isUpdating}
            loading={isCreating || isUpdating}
          />
        </ScreenFooter>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

export default LocationScreen;

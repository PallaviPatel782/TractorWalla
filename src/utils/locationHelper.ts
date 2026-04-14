
import { Platform, PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

export interface LocationData {
  address: string;
  fullAddress: string;
  latitude: number;
  longitude: number;
  city: string;
  state: string;

}

/**
 * Requests location permissions for Android devices.
 * Returns true if permitted or if on iOS.
 */
export const requestLocationPermission = async (): Promise<boolean> => {
  if (Platform.OS !== 'android') return true;
  try {
    const result = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    ]);
    return (
      result['android.permission.ACCESS_FINE_LOCATION'] ===
      PermissionsAndroid.RESULTS.GRANTED ||
      result['android.permission.ACCESS_COARSE_LOCATION'] ===
      PermissionsAndroid.RESULTS.GRANTED
    );
  } catch {
    return false;
  }
};

/**
 * Fetches the user's current GPS coordinates.
 */
export const getCurrentLocation = (): Promise<{
  latitude: number;
  longitude: number;
}> => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      ({ coords }) => {
        resolve({ latitude: coords.latitude, longitude: coords.longitude });
      },
      error => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 5000,
        showLocationDialog: true,
        forceRequestLocation: true,
      },
    );
  });
};

/**
 * Perform reverse geocoding to get an address from latitude and longitude.
 */
export const reverseGeocodeLocation = async (
  latitude: number,
  longitude: number,
  signal?: AbortSignal,
): Promise<LocationData> => {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
      {
        headers: {
          'User-Agent': 'TrustMakerLocationApp/1.0',
          'Accept-Language': 'en',
        },
        signal,
      },
    );
    const data = await res.json();

    if (data?.address) {
      const a = data.address;
      const parts = [
        a.amenity,
        a.road || a.pedestrian || a.footway,
        a.neighbourhood || a.suburb || a.village || a.town,
        a.city || a.county,
      ].filter(Boolean);

      const shortAddress =
        parts.slice(0, 2).join(', ') || a.state || 'Unknown location';

      const city = a.city || a.town || a.village || '';
      const state = a.state || '';

      return {
        address: shortAddress,
        fullAddress: data.display_name || '',
        latitude,
        longitude,
        city,
        state,
      };
    } else {
      return {
        address: 'Location Selected',
        fullAddress: `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`,
        latitude,
        longitude,
        city: '',
        state: '',
      };
    }
  } catch (e: any) {
    if (e?.name === 'AbortError') throw e;
    return {
      address: 'Location Selected',
      fullAddress: `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`,
      latitude,
      longitude,
      city: '',
      state: '',
    };
  }
};

/**
 * Fetches coordinates for a given search query (address / place).
 */
export const searchLocationByQuery = async (
  searchQuery: string,
): Promise<{ latitude: number; longitude: number } | null> => {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        searchQuery,
      )}&limit=1`,
      {
        headers: {
          'User-Agent': 'PropertyLocationApp/1.0',
          'Accept-Language': 'en',
        },
      },
    );
    const data = await res.json();
    if (data?.length > 0) {
      const lat = parseFloat(data[0].lat);
      const lng = parseFloat(data[0].lon);
      return { latitude: lat, longitude: lng };
    }
    return null;
  } catch {
    return null;
  }
};

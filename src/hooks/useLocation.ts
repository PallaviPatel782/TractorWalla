import { useState, useCallback } from 'react';
import {
  requestLocationPermission,
  getCurrentLocation,
  reverseGeocodeLocation,
  searchLocationByQuery,
  LocationData,
} from '@utils/locationHelper';

export const useLocation = () => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCurrentLocation = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        setError('Location permission denied.');
        return null;
      }

      const coords = await getCurrentLocation();
      const locationData = await reverseGeocodeLocation(
        coords.latitude,
        coords.longitude,
      );
      setLocation(locationData);
      return locationData;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch current location.');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const geocodeAddress = useCallback(async (address: string) => {
    setLoading(true);
    setError(null);
    try {
      const coords = await searchLocationByQuery(address);
      if (coords) {
        const locationData = await reverseGeocodeLocation(
          coords.latitude,
          coords.longitude,
        );
        setLocation(locationData);
        return locationData;
      } else {
        setError('Address not found.');
        return null;
      }
    } catch (err: any) {
      setError(err.message || 'Failed to geocode address.');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    location,
    loading,
    error,
    setLocation,
    fetchCurrentLocation,
    geocodeAddress,
  };
};

export default useLocation;

import React from 'react';
import { Image, StyleSheet, Platform, PermissionsAndroid, Alert } from 'react-native';
import { launchImageLibrary, PhotoQuality } from 'react-native-image-picker';
import { useTheme, AppTheme } from '@theme';
import { SW, SH, SF } from '@utils/Dimensions';
import { CloseIcon, CameraIcon } from '@assets/icons';
import View from '../View';
import TouchableOpacity from '../TouchableOpacity';
import Text from '../Text';

export interface ImagePickerProps {
  photos: string[];
  onPhotosChange: (photos: string[]) => void;
  label?: string;
  maxPhotos?: number;
  quality?: PhotoQuality;
}

// ── Android permission helper ──────────────────────────────────────────────
// Handles both Android 13+ (READ_MEDIA_IMAGES) and older (READ_EXTERNAL_STORAGE).
// iOS: react-native-image-picker shows its own system permission dialog — no code needed here.
const requestAndroidPermission = async (): Promise<boolean> => {
  try {
    const permission =
      Number(Platform.Version) >= 33
        ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
        : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

    const alreadyGranted = await PermissionsAndroid.check(permission);
    if (alreadyGranted) return true;

    const result = await PermissionsAndroid.request(permission, {
      title: 'Photo Access Required',
      message: 'This app needs access to your photos to upload images.',
      buttonPositive: 'Allow',
      buttonNegative: 'Deny',
    });

    if (result === PermissionsAndroid.RESULTS.GRANTED) return true;

    if (result === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      Alert.alert(
        'Permission Denied',
        'Photo access was permanently denied. Please enable it from\nSettings > App > Permissions > Photos.',
        [{ text: 'OK' }],
      );
    }

    return false;
  } catch {
    return false;
  }
};
// ──────────────────────────────────────────────────────────────────────────

const ImagePickerComponent: React.FC<ImagePickerProps> = ({
  photos,
  onPhotosChange,
  label = 'Add photo',
  maxPhotos = 5,
  quality = 0.8,
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const pickImage = async () => {
    const remaining = maxPhotos - photos.length;
    if (remaining <= 0) return;

    // Android: request permission explicitly before opening picker
    if (Platform.OS === 'android') {
      const granted = await requestAndroidPermission();
      if (!granted) return;
    }

    launchImageLibrary(
      { mediaType: 'photo', quality, selectionLimit: remaining },
      (response) => {
        // iOS: user denied permission in the system dialog shown by picker
        if (response.errorCode === 'permission') {
          Alert.alert(
            'Permission Denied',
            'Please allow photo access in\nSettings > Privacy & Security > Photos.',
            [{ text: 'OK' }],
          );
          return;
        }

        if (!response.didCancel && !response.errorCode && response.assets) {
          const uris = response.assets
            .map((a) => a.uri)
            .filter(Boolean) as string[];
          onPhotosChange([...photos, ...uris].slice(0, maxPhotos));
        }
      },
    );
  };

  const removePhoto = (index: number) => {
    onPhotosChange(photos.filter((_, i) => i !== index));
  };

  return (
    <View>
      <TouchableOpacity style={styles.labelRow} onPress={pickImage}>
        <CameraIcon size={SW(20)} color={theme.colors.gray700} />
        <Text style={styles.label}>{label}</Text>
      </TouchableOpacity>

      {photos.length > 0 && (
        <View style={styles.photosRow}>
          {photos.map((uri, index) => (
            <View key={index} style={styles.photoBox}>
              <Image source={{ uri }} style={styles.photoImage} />
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removePhoto(index)}
              >
                <CloseIcon size={SW(11)} color={theme.colors.white} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    labelRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: SW(8),
      marginBottom: SH(4),
    },
    label: {
      color: theme.colors.gray900,
      fontFamily: theme.fontfamily.robotoMedium,
      fontSize: SF(14),
    },
    photosRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: SW(10),
      marginTop: SH(8),
    },
    photoBox: {
      width: SW(72),
      height: SW(72),
      borderRadius: SW(10),
      position: 'relative',
      borderWidth: 1,
      borderColor: theme.colors.gray200,
    },
    photoImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
      borderRadius: SW(10),
    },
    removeButton: {
      position: 'absolute',
      top: -SH(8),
      right: -SW(8),
      backgroundColor: theme.colors.gray700,
      borderRadius: SW(12),
      width: SW(20),
      height: SW(20),
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10,
    },
  });

export default ImagePickerComponent;

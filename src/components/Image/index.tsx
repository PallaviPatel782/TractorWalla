import React, { memo, useState, useCallback } from 'react';
import {
  Image,
  ImageProps,
  ImageSourcePropType,
  ActivityIndicator,
  View,
  StyleSheet,
  StyleProp,
  ImageStyle,
} from 'react-native';

export interface AppImageProps extends ImageProps {
  source: ImageSourcePropType;
  fallback?: ImageSourcePropType;
  style?: StyleProp<ImageStyle>;
  showLoader?: boolean;
}

const AppImageComponent: React.FC<AppImageProps> = ({
  source,
  fallback = require('../../assets/images/image-placeholder.jpg'),
  style,
  showLoader = true,
  ...rest
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  // console.log('Rendering Image:', source);
  const onLoadEnd = useCallback(() => {
    setLoading(false);
  }, []);

  const onError = useCallback(() => {
    setError(true);
    setLoading(false);
  }, []);

  return (
    <View style={[style]}>
      <Image
        {...rest}
        source={error ? fallback : source}
        style={[StyleSheet.absoluteFill, style]}
        onLoadEnd={onLoadEnd}
        onError={onError}
        resizeMode="cover"
      />

      {loading && showLoader && (
        <View style={styles.loader}>
          <ActivityIndicator size="small" />
        </View>
      )}
    </View>
  );
};

const areEqual = (prev: AppImageProps, next: AppImageProps) => {
  return (
    prev.source === next.source &&
    prev.style === next.style &&
    prev.fallback === next.fallback
  );
};

const AppImage = memo(AppImageComponent, areEqual);

export default AppImage;

const styles = StyleSheet.create({
  loader: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

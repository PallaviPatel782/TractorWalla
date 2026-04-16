import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  SlideInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withDelay,
} from 'react-native-reanimated';
import { useTheme } from '@theme';
import { AppLogoImage } from '@images';
import { SW, SH } from '@utils/Dimensions';
import { View, StatusBar } from '@components';
import { createStyles } from './styles';

const LoadingScreen = ({ navigation }: any) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  // Entrance animation for scale
  const scale = useSharedValue(0.3);

  useEffect(() => {
    scale.value = withDelay(200, withSpring(1, { damping: 12, stiffness: 90 }));

    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2500); // Slightly longer to appreciate animation
    return () => clearTimeout(timer);
  }, [navigation, scale]);

  const animatedLogoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar />
      <View style={styles.container}>
        <Animated.View
          entering={SlideInDown.duration(800).springify().damping(15)}
          style={[styles.logoWrapper, animatedLogoStyle]}
        >
          <AppLogoImage width={SW(150)} height={SH(150)} />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default LoadingScreen;

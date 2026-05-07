import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useTheme } from '@theme';
import { AppLogoImage } from '@images';
import { View, StatusBar } from '@components';
import { createStyles } from './styles';

const LoadingScreen = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      <View style={styles.container}>
        <Animated.View
          entering={FadeIn.duration(500)}
          style={styles.logoWrapper}
        >
          <AppLogoImage width={150} height={150} />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default LoadingScreen;

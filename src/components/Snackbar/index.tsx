import React, { useCallback, useEffect } from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSnackbarStore } from '../../store/useSnackbarStore';
import { lightColors, darkColors } from '../../theme/tokens/colors';
import { CheckIcon, CloseIcon, AboutinfoIcon } from '../../assets/icons';
import Text from '../Text';
import View from '../View';

const { width } = Dimensions.get('window');

const SnackbarItem = ({
  item,
  onHide,
  isDark,
}: {
  item: any;
  onHide: () => void;
  isDark: boolean;
}) => {
  const insets = useSafeAreaInsets();
  const themeColors = isDark ? darkColors : lightColors;

  const bottomOffset = insets.bottom + (Platform.OS === 'ios' ? 20 : 30);

  const translateY = useSharedValue(100);
  const opacity = useSharedValue(0);
  const isDismissing = useSharedValue(false);

  const dismiss = useCallback(() => {
    'worklet';
    if (isDismissing.value) return;
    isDismissing.value = true;
    translateY.value = withTiming(100, { duration: 250 }, finished => {
      if (finished) {
        runOnJS(onHide)();
      }
    });

    opacity.value = withTiming(0, { duration: 200 });
  }, [isDismissing, onHide, opacity, translateY]);

  useEffect(() => {
    translateY.value = withSpring(0, {
      damping: 16,
      stiffness: 140,
      mass: 0.9,
    });
    opacity.value = withTiming(1, { duration: 300 });

    const timeout = setTimeout(() => {
      dismiss();
    }, item.duration);

    return () => clearTimeout(timeout);
  }, [dismiss, item.duration, opacity, translateY]);

  const panGesture = Gesture.Pan()
    .onUpdate(event => {
      if (event.translationY > 0) {
        translateY.value = event.translationY;
      } else {
        // Resistance effect when swiping up
        translateY.value = event.translationY * 0.3;
      }
    })
    .onEnd(event => {
      if (event.translationY > 40 || event.velocityY > 500) {
        dismiss();
      } else {
        translateY.value = withSpring(0, {
          damping: 14,
          stiffness: 150,
        });
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
      opacity: opacity.value,
    };
  });

  const getBackgroundColor = () => {
    switch (item.type) {
      case 'success':
        return themeColors.success || '#4CAF50';
      case 'error':
        return themeColors.error || '#F44336';
      case 'warning':
        return '#FF9800';
      case 'info':
      default:
        return themeColors.AzureBlue || '#2196F3';
    }
  };

  const getIcon = () => {
    switch (item.type) {
      case 'success':
        return <CheckIcon color={themeColors.white || '#FFF'} size={20} />;
      case 'error':
        return <CloseIcon color={themeColors.white || '#FFF'} size={15} />;
      case 'warning':
      case 'info':
      default:
        return <AboutinfoIcon color={themeColors.white || '#FFF'} size={20} />;
    }
  };

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View
        style={[
          styles.snackbarContainer,
          animatedStyle,
          {
            bottom: bottomOffset,
            backgroundColor: getBackgroundColor(),
          },
        ]}
      >
        <View style={styles.iconContainer}>{getIcon()}</View>

        <View style={styles.textContainer}>
          <Text variant="semiBold" style={styles.title}>
            {item.title}
          </Text>

          {item.description ? (
            <Text variant="regular" style={styles.description}>
              {item.description}
            </Text>
          ) : null}
        </View>

      </Animated.View>
    </GestureDetector>
  );
};

const Snackbar = () => {
  const queue = useSnackbarStore(state => state.queue);
  const hideSnackbar = useSnackbarStore(state => state.hideSnackbar);
  // const { isDarkMode } = useTheme();

  if (queue.length === 0) return null;

  const currentItem = queue[0];

  return (
    <View style={styles.wrapper} pointerEvents="box-none">
      <SnackbarItem
        key={currentItem.id}
        item={currentItem}
        onHide={() => hideSnackbar(currentItem.id)}
        isDark={false}
      />
    </View>
  );
};

export default Snackbar;

const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFill,
    zIndex: 9999,
    elevation: 9999,
    alignItems: 'center',
  },

  snackbarContainer: {
    position: 'absolute',
    width: width * 0.92,
    borderRadius: 16,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },

  iconContainer: {
    marginRight: 14,
    width: 30,
    height: 30,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#FFF',
    fontSize: 15,
  },

  description: {
    color: 'rgba(255,255,255,0.95)',
    fontSize: 13,
    lineHeight: 18,
    marginTop: 2,
  },
});

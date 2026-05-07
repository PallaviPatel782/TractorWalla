import React from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '@theme';
import Text from '../Text';
import View from '../View';
import TouchableOpacity from '../TouchableOpacity';
import { ChevronBackwardIcon } from '@icons';

interface SecondaryHeaderProps {
  title: string;
  onBack?: () => void;
  backgroundColor?: string;
  titleColor?: string;
  backIconColor?: string;
}

const SecondaryHeader: React.FC<SecondaryHeaderProps> = ({
  title,
  onBack,
  backgroundColor,
  titleColor,
  backIconColor
}) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, backgroundColor ? { backgroundColor } : undefined]}>
      {onBack && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
          activeOpacity={0.7}
        >
          <ChevronBackwardIcon size={24} color={backIconColor || titleColor || theme.colors.black} />
        </TouchableOpacity>
      )}
      <View style={styles.titleContainer}>
        <Text
          variant="semiBold"
          size={16}
          style={[styles.titleText, titleColor ? { color: titleColor } : undefined]}
        >
          {title}
        </Text>
      </View>
      {/* Invisible placeholder for symmetry if needed, but absolute positioning works too */}
      {onBack && <View style={styles.rightPlaceholder} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    minHeight: 56,
    backgroundColor: 'transparent',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    textAlign: 'center',
  },
  rightPlaceholder: {
    width: 40, // Same as backButton width for perfect centering
  },
});

export default SecondaryHeader;


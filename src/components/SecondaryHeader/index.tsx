import React from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '@theme';
import { SW, SH } from '@utils/Dimensions';
import Text from '../Text';
import View from '../View';
import TouchableOpacity from '../TouchableOpacity';
import { ChevronBackwardIcon } from '@icons';

interface SecondaryHeaderProps {
  title: string;
  onBack?: () => void;
}

const SecondaryHeader: React.FC<SecondaryHeaderProps> = ({ title, onBack }) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      {onBack && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
          activeOpacity={0.7}
        >
          <ChevronBackwardIcon size={24} color={theme.colors.black} />
        </TouchableOpacity>
      )}
      <View style={styles.titleContainer}>
        <Text variant="medium" size={18} style={styles.titleText}>
          {title}
        </Text>
      </View>
      {/* Empty view to balance the header if back button exists */}
      {onBack && <View style={styles.placeholder} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SW(16),
    paddingVertical: SH(15),
    backgroundColor: 'white',
  },
  backButton: {
    padding: SW(5),
    zIndex: 1,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    marginRight: SW(30), // Offset to balance the back button
  },
  titleText: {
    textAlign: 'center',
  },
  placeholder: {
    width: SW(30),
  },
});

export default SecondaryHeader;


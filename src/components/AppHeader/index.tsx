import React from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '@theme';
import { SW, SH } from '@utils/Dimensions';
import { AppLogoImage } from '@images';
import Text from '../Text';
import View from '../View';
import TouchableOpacity from '../TouchableOpacity';

interface HeaderProps {
  onPressLogo?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onPressLogo }) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.logoContainer}
        onPress={onPressLogo}
        activeOpacity={0.7}
      >
        <AppLogoImage width={SW(50)} height={SH(26)} />
        <Text
          variant="bold"
          size={theme.typography.sizes.xl}
          style={[styles.brandText, { fontFamily: theme.typography.fonts.poppinsBold }]}
        >
          TractorWalla
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SW(16),
    paddingVertical: SH(10),
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandText: {
    marginLeft: SW(10),
    letterSpacing: 0.5,
  },
});

export default Header;


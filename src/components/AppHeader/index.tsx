import React from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '@theme';
import { AppLogoImage } from '@images';
import { Text, View, TouchableOpacity } from '@components';

interface HeaderProps {
  onPressLogo?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onPressLogo }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.logoContainer}
        onPress={onPressLogo}
        activeOpacity={0.7}
      >
        <AppLogoImage width={50} height={26} />

        <Text
          variant="bold"
          size={theme.typography.sizes.lg}
          style={styles.brandText}
        >
          TractorWalla
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 10,
      paddingTop: 20,
      // backgroundColor: theme.colors.white,
    },
    logoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    brandText: {
      marginLeft: 10,
      letterSpacing: 0.5,
      color: theme.colors.black,
    },
  });

export default Header;
import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import View from '../View';
import Text from '../Text';
import TouchableOpacity from '../TouchableOpacity';
import { useTheme } from '@theme';
import { SW, SH } from '@utils/Dimensions';
import { ChevronBackwardIcon } from '@assets/icons';

interface ProfileOptionItemProps {
  icon: React.ReactNode;
  title: string;
  onPress: () => void;
  showChevron?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
  showBorder?: boolean;
}

const ProfileOptionItem = ({
  icon,
  title,
  onPress,
  showChevron = true,
  showBorder = true,
}: ProfileOptionItemProps) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={styles.container}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={styles.leftContainer}>
          <View style={styles.iconContainer}>
            {icon}
          </View>
          <Text variant="regular" size={14} color={theme.colors.gray800}>
            {title}
          </Text>
        </View>
        {showChevron && (
          <View style={styles.chevronIcon}>
            <ChevronBackwardIcon size={25} color={theme.colors.gray500} style={{ transform: [{ rotate: '180deg' }] }} />
          </View>
        )}
      </TouchableOpacity>
      {showBorder && <View style={styles.bottomLine} />}
    </View>
  );
};

export default ProfileOptionItem;

const createStyles = (theme: any) =>
  StyleSheet.create({
    wrapper: {
      width: '100%',
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: SH(8),
      paddingHorizontal: SW(16),
    },
    leftContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconContainer: {
      width: SW(32),
      height: SW(32),
      borderRadius: SW(10),
      backgroundColor: theme.colors.backgroundTertiary,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: SW(14),
    },
    chevronIcon: {
      // Styling for chevron if needed
    },
    bottomLine: {
      height: 1,
      backgroundColor: theme.colors.gray200,
      marginHorizontal: SW(16),
    }
  });

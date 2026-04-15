import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import View from '../View';
import Text from '../Text';
import TouchableOpacity from '../TouchableOpacity';
import { useTheme } from '@theme';
import { SW, SH, SF } from '@utils/Dimensions';
import { ChevronBackwardIcon } from '@assets/icons';

interface ProfileOptionItemProps {
  icon: React.ReactNode;
  title: string;
  onPress: () => void;
  showChevron?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
}

const ProfileOptionItem = ({
  icon,
  title,
  onPress,
  showChevron = true,
}: ProfileOptionItemProps) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.leftContainer}>
        <View style={styles.iconContainer}>
          {icon}
        </View>
        <Text variant="medium" size={14} color={theme.colors.gray800}>
          {title}
        </Text>
      </View>
      {showChevron && (
        <View style={styles.chevronIcon}>
          <ChevronBackwardIcon size={18} color={theme.colors.gray500} style={{ transform: [{ rotate: '180deg' }] }} />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ProfileOptionItem;

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: SH(14),
      paddingBottom: SH(5),
      paddingHorizontal: SW(16),
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.gray300,
    },
    leftContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconContainer: {
      width: SW(36),
      height: SW(36),
      borderRadius: SW(18),
      backgroundColor: theme.colors.backgroundExtraLight,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: SW(12),
    },
    chevronIcon: {
      // Styling for chevron if needed
    }
  });

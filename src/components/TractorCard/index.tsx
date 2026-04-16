import React, { useMemo } from 'react';
import { StyleSheet, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import View from '../View';
import Text from '../Text';
import TouchableOpacity from '../TouchableOpacity';
import { useTheme } from '@theme';
import { SW, SH, SF } from '@utils/Dimensions';
import { DeleteIcon } from '@assets/icons';
import { TractorImage } from '@assets/images';

interface TractorCardProps {
  tractor: {
    id: string;
    brand: string;
    model: string;
    registrationNo: string;
    yearOfManufacture: string;
    yearOfPurchase: string;
    tractorType: string;
  };
  onPress: () => void;
  onDelete: () => void;
}

const TractorCard = ({ tractor, onPress, onDelete }: TractorCardProps) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <TractorImage width={SW(80)} height={SH(60)} />
      </View>
      <View style={styles.detailsContainer}>
        <Text variant="semiBold" size={14} color={theme.colors.gray900}>
          {t(`common.brands.${tractor.brand}`)}
        </Text>
        <Text variant="regular" size={12} color={theme.colors.gray500}>
          {tractor.model}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={onDelete}
        activeOpacity={0.6}
      >
        <DeleteIcon size={24} color={theme.colors.gray500} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default TractorCard;

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.white,
      borderRadius: SW(12),
      padding: SW(12),
      marginBottom: SH(12),
      borderWidth: 1,
      borderColor: theme.colors.borderFaint,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
    },
    imageContainer: {
      width: SW(80),
      height: SH(60),
      backgroundColor: theme.colors.backgroundFaint,
      borderRadius: SW(8),
      alignItems: 'center',
      justifyContent: 'center',
    },
    detailsContainer: {
      flex: 1,
      marginLeft: SW(12),
    },
    deleteButton: {
      padding: SW(8),
    },
  });

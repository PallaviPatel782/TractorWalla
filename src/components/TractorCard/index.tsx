import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import View from '../View';
import Text from '../Text';
import TouchableOpacity from '../TouchableOpacity';
import Image from '../Image';
import { useTheme } from '@theme';
import { SW, SH } from '@utils/Dimensions';
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
    logoUrl?: string;
  };
  onPress: () => void;
  onDelete?: () => void;
  isSelectionMode?: boolean;
  selected?: boolean;
}

const TractorCard = ({ tractor, onPress, onDelete, isSelectionMode, selected }: TractorCardProps) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <TouchableOpacity
      style={[styles.container, selected && styles.selectedContainer]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        {tractor.logoUrl ? (
          <Image
            source={{ uri: tractor.logoUrl }}
            style={{ width: SW(80), height: SW(60) }}
            resizeMode="contain"
            showLoader={false}
          />
        ) : (
          <TractorImage width={SW(80)} height={SH(60)} />
        )}
      </View>
      <View style={styles.detailsContainer}>
        <Text variant="medium" size={12} color={theme.colors.gray900}>
          {t(`common.brands.${tractor.brand}`) === `common.brands.${tractor.brand}` ? tractor.brand : t(`common.brands.${tractor.brand}`)}
        </Text>
        <Text variant="medium" size={12} color={theme.colors.gray600} style={{ marginBottom: SH(4) }}>
          {tractor.model}
        </Text>
        <View style={styles.infoRow}>
          <Text variant="regular" size={11} color={theme.colors.gray400}>
            {tractor.registrationNo} • {tractor.yearOfPurchase || tractor.yearOfManufacture}
          </Text>
        </View>
      </View>

      <View style={styles.actionContainer}>
        {isSelectionMode ? (
          <View style={[styles.selectButton, selected && { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary }]}>
            <Text variant="semiBold" size={12} color={selected ? theme.colors.white : theme.colors.primary}>
              {selected ? 'Selected' : 'Select'}
            </Text>
          </View>
        ) : (
          onDelete && (
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={onDelete}
              activeOpacity={0.6}
            >
              <DeleteIcon size={24} color={theme.colors.gray400} />
            </TouchableOpacity>
          )
        )}
      </View>
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
      borderRadius: SW(16),
      padding: SW(12),
      marginBottom: SH(12),
      borderWidth: 1,
      borderColor: theme.colors.borderFaint,
      elevation: 2,
      shadowColor: theme.colors.black,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
    },
    selectedContainer: {
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.backgroundFaint,
    },
    imageContainer: {
      width: SW(80),
      height: SH(60),
      backgroundColor: theme.colors.backgroundFaint,
      borderRadius: SW(10),
      alignItems: 'center',
      justifyContent: 'center',
    },
    detailsContainer: {
      flex: 1,
      marginLeft: SW(15),
    },
    infoRow: {
      marginTop: SH(2),
    },
    actionContainer: {
      justifyContent: 'center',
      marginLeft: SW(8),
    },
    deleteButton: {
      padding: SW(8),
    },
    selectButton: {
      paddingHorizontal: SW(12),
      paddingVertical: SH(6),
      borderRadius: SW(20),
      borderWidth: 1,
      borderColor: theme.colors.primary,
    },
  });

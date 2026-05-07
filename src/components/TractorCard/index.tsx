import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import View from '../View';
import Text from '../Text';
import TouchableOpacity from '../TouchableOpacity';
import Image from '../Image';
import { useTheme } from '@theme';
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
  onSelect?: () => void;
  onDelete?: () => void;
  isSelectionMode?: boolean;
  selected?: boolean;
}

const TractorCard = ({ tractor, onPress, onSelect, onDelete, isSelectionMode, selected }: TractorCardProps) => {
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
            style={{ width: 80, height: 60 }}
            resizeMode="contain"
            showLoader={false}
          />
        ) : (
          <TractorImage width={80} height={60} />
        )}
      </View>
      <View style={styles.detailsContainer}>
        <Text variant="medium" size={12} color={theme.colors.gray900}>
          {t(`common.brands.${tractor.brand}`) === `common.brands.${tractor.brand}` ? tractor.brand : t(`common.brands.${tractor.brand}`)}
        </Text>
        <Text variant="medium" size={12} color={theme.colors.gray600} style={{ marginBottom: 4 }}>
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
          <TouchableOpacity 
            style={[styles.selectButton, selected && { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary }]}
            onPress={(e) => {
              e.stopPropagation();
              onSelect?.();
            }}
            activeOpacity={0.7}
          >
            <Text variant="semiBold" size={12} color={selected ? theme.colors.white : theme.colors.primary}>
              {selected ? 'Selected' : 'Select'}
            </Text>
          </TouchableOpacity>
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
      borderRadius: 16,
      padding: 12,
      marginBottom: 12,
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
      width: 80,
      height: 60,
      backgroundColor: theme.colors.backgroundFaint,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    detailsContainer: {
      flex: 1,
      marginLeft: 15,
    },
    infoRow: {
      marginTop: 2,
    },
    actionContainer: {
      justifyContent: 'center',
      marginLeft: 8,
    },
    deleteButton: {
      padding: 8,
    },
    selectButton: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: theme.colors.primary,
    },
  });

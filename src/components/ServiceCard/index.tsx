import React from 'react';
import { StyleProp, ViewStyle, TouchableOpacity } from 'react-native';
import { View, Text, RatingPriceRow } from '@components';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@theme';
import { CheckIcon, CartIcon } from '@assets/icons';
import { createStyles } from './styles';

interface ServiceCardProps {
  item: any;
  onPress: () => void;
  onBookPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  buttonTitle?: string;
  showButton?: boolean;
  isAdded?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  item,
  onPress,
  onBookPress,
  containerStyle,
  buttonTitle,
  showButton = true,
  isAdded = false,
}) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <TouchableOpacity style={[styles.serviceCard, containerStyle]} onPress={onPress}>
      {/* Top Row: Left Content and Right Image */}
      <View style={styles.cardMainRow}>
        <View style={styles.serviceLeft}>
          <Text variant="semiBold" size={15} color={theme.colors.textPrimary} style={styles.serviceTitle}>
            {item.title}
          </Text>
          {(item.bullets || item.features)?.slice(0, 3).map((bullet: string, idx: number) => (
            <View key={idx} style={styles.bulletRow}>
              <CheckIcon size={15} color={theme.colors.DeepGreen} />
              <Text size={12} color={theme.colors.black} style={styles.bulletText}>
                {bullet}
              </Text>
            </View>
          ))}
        </View>
        <View style={styles.serviceRight}>
          {item.image && (
            <View style={[styles.imageContainer, isAdded && styles.imageContainerAdded]}>
              <item.image width={100} height={90} style={styles.serviceImage} />
            </View>
          )}
        </View>
      </View>

      {/* Bottom Row: Rating/Price and Book Button */}
      <View style={styles.kitFooter}>
        <RatingPriceRow
          rating={item.rating}
          price={item.price}
          mrp={item.strikePrice || item.mrp}
        />
        {showButton && (
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              style={[styles.bookBtn, isAdded && styles.addedBadge]}
              onPress={onBookPress}
              disabled={isAdded}
            >
              {isAdded ? (
                <View style={styles.addedRow}>
                  <View style={styles.addedCircle}>
                    <CheckIcon size={8} color={theme.colors.white} />
                  </View>
                  <Text size={12} color={theme.colors.successDeep} style={styles.addedText}>
                    {t('common.added', 'Added')}
                  </Text>
                </View>
              ) : (
                <>
                  <CartIcon size={12} color={theme.colors.successDeep} />
                  <Text size={12} color={theme.colors.successDeep} style={styles.bookText}>
                    {buttonTitle || t('main.home.services.book', 'Book')}
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};


export default ServiceCard;


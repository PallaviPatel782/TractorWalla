import React from 'react';
import { ViewStyle, TextStyle, StyleSheet } from 'react-native';
import { View, Text } from '@components';
import { useTheme } from '@theme';

interface RatingPriceRowProps {
  rating: string | number;
  price: string | number;
  mrp?: string | number;
  containerStyle?: ViewStyle;
  ratingTextStyle?: TextStyle;
  priceTextStyle?: TextStyle;
  mrpTextStyle?: TextStyle;
}

const RatingPriceRow: React.FC<RatingPriceRowProps> = ({
  rating,
  price,
  mrp,
  containerStyle,
  ratingTextStyle,
  priceTextStyle,
  mrpTextStyle,
}) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.ratingBox}>
        <Text color={theme.colors.GoldenYellow} size={14}>★</Text>
        <Text variant="semiBold" size={14} color={theme.colors.textPrimary} style={ratingTextStyle}>
          {rating}
        </Text>
      </View>
      <View style={styles.priceContainer}>
        <Text variant="semiBold" size={15} color={theme.colors.textPrimary} style={priceTextStyle}>
          ₹{price}
        </Text>
        {mrp && (
          <Text size={13} color={theme.colors.textMuted} style={[styles.mrpText, mrpTextStyle]}>
            ₹{mrp}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  mrpText: {
    textDecorationLine: 'line-through',
  },
});

export default RatingPriceRow;


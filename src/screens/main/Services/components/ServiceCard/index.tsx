import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@theme';
import { SW } from '@utils/Dimensions';
import { CheckIcon, CartIcon } from '@assets/icons';
import { createStyles } from './styles';

interface ServiceCardProps {
  item: any;
  onPress: () => void;
  onBookPress: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ item, onPress, onBookPress }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <TouchableOpacity style={styles.serviceCard} onPress={onPress}>
      <View style={styles.serviceLeft}>
        <Text style={styles.serviceTitle}>{item.title}</Text>
        {item.bullets?.slice(0, 3).map((bullet: string, idx: number) => (
          <View key={idx} style={styles.bulletRow}>
            <CheckIcon size={15} color={theme.colors.DeepGreen || '#105D38'} />
            <Text style={styles.bulletText}>{bullet}</Text>
          </View>
        ))}
        <View style={styles.serviceFooter}>
          <View style={styles.ratingRow}>
            <Text style={styles.starIcon}>★</Text>
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
          <Text style={styles.price}>₹{item.price}</Text>
          <Text style={styles.mrp}>₹{item.mrp}</Text>
        </View>
      </View>
      <View style={styles.serviceRight}>
        {item.image && <item.image width={SW(100)} height={SW(85)} style={styles.serviceImage} />}
        <TouchableOpacity style={styles.bookBtn} onPress={onBookPress}>
          <CartIcon size={14} color="#1E633F" />
          <Text style={styles.bookText}> {t('main.home.services.book', 'Book')}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ServiceCard;

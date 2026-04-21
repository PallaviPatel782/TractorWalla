import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@theme';
import {
  ChevronBackwardIcon,
  ShareIcon,
  CheckIcon,
  BagtimerIcon,
  LocationIcon,
} from '@assets/icons';
import { Button } from '@components';
import { createStyles } from './styles';
import { CATEGORY_OVERVIEW_DATA } from '../dummyData';

const CategoryOverviewScreen = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation<any>();
  const data = CATEGORY_OVERVIEW_DATA;
  const ServiceImage = data.image;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header/Hero */}
        <View style={styles.heroSection}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <ChevronBackwardIcon size={20} color={theme.colors.black} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareBtn}>
            <ShareIcon size={20} color={theme.colors.black} />
          </TouchableOpacity>
          <ServiceImage width="100%" height="100%" style={styles.heroImage} />

          <View style={styles.heroOverlay}>
            <View style={styles.benefitsBadge}>
              <Text style={styles.benefitsBadgeText}>{t('main.home.services.serviceBenefits', 'SERVICE BENEFITS')}</Text>
            </View>
            <View style={styles.heroBullets}>
              <Text style={styles.heroBulletItem}>• Filter Cleaning</Text>
              <Text style={styles.heroBulletItem}>• Inspection</Text>
              <Text style={styles.heroBulletItem}>• Oil Change</Text>
            </View>
          </View>
        </View>

        {/* Content */}
        <View style={styles.contentCard}>
          <Text style={styles.title}>{data.title}</Text>

          <View style={styles.highlights}>
            <View style={styles.highlightItem}>
              <BagtimerIcon size={16} color={theme.colors.textSecondary} />
              <Text style={styles.highlightText}>{data.arrival}</Text>
            </View>
            <View style={styles.highlightItem}>
              <CheckIcon size={16} color={theme.colors.AzureBlue || '#3281D1'} />
              <Text style={styles.highlightText}>{data.mechanics}</Text>
            </View>
            <View style={styles.highlightItem}>
              <LocationIcon size={16} color={theme.colors.AzureBlue || '#3281D1'} />
              <Text style={styles.highlightText}>{data.feature1}</Text>
            </View>
            <View style={styles.highlightItem}>
              <LocationIcon size={16} color={theme.colors.danger || '#D11C3D'} />
              <Text style={styles.highlightText}>{data.feature2}</Text>
            </View>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.ratingText}>★ {data.rating}</Text>
            <Text style={styles.price}>₹{data.price}</Text>
            <Text style={styles.mrp}>₹{data.mrp}</Text>
          </View>

          {/* Service Includes */}
          <Text style={styles.sectionHeading}>{t('main.home.services.includes', 'Service Includes')}</Text>
          {data.includes?.map((point: string, idx: number) => (
            <View key={idx} style={styles.bulletRow}>
              <CheckIcon size={20} color={theme.colors.success || '#41A863'} />
              <Text style={styles.bulletText}>{point}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Footer Action */}
      <View style={styles.footer}>
        <Button
          title={t('main.home.services.bookService', 'Book Service')}
          onPress={() => navigation.navigate('ServiceCheckout', {
            serviceId: data.id,
            category: 'general'
          })}
        />
      </View>
    </View>
  );
};

export default CategoryOverviewScreen;

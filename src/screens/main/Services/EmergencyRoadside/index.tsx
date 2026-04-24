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
  TractorIcon,
  CheckedIcon,
} from '@assets/icons';
import { Button } from '@components';
import { createStyles } from './styles';
import { EMERGENCY_SERVICE } from '../dummyData';

const EmergencyRoadsideScreen = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation<any>();
  const data = EMERGENCY_SERVICE;
  const ServiceImage = data.image;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <ChevronBackwardIcon size={20} color={theme.colors.black} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.shareBtn}>
        <ShareIcon size={20} color={theme.colors.black} />
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header/Hero */}
        <View style={styles.heroSection}>
          <ServiceImage width="100%" height="100%" style={styles.heroImage} />

          <View style={styles.heroOverlay}>
            <View style={styles.instantBadge}>
              <Text style={styles.instantBadgeText}>{t('main.home.services.instantRoadside', 'INSTANT ROADSIDE HELP')}</Text>
            </View>
            <View style={styles.heroBullets}>
              <Text style={styles.heroBulletItem}>• Quick response assistance</Text>
              <Text style={styles.heroBulletItem}>• Basic on-site inspection</Text>
              <Text style={styles.heroBulletItem}>• Emergency towing</Text>
            </View>
          </View>
        </View>

        {/* Content */}
        <View style={styles.contentCard}>
          <Text style={styles.title}>{data.title}</Text>

          <View style={styles.highlights}>
            <View style={styles.highlightItem}>
              <View style={styles.highlightIconWrap}><BagtimerIcon size={16} color={theme.colors.textSecondary} /></View>
              <Text style={styles.highlightText}>{data.arrival}</Text>
            </View>
            <View style={styles.highlightItem}>
              <View style={styles.highlightIconWrap}><CheckIcon size={16} color={theme.colors.AzureBlue} /></View>
              <Text style={styles.highlightText}>{data.mechanics}</Text>
            </View>
            <View style={styles.highlightItem}>
              <View style={styles.highlightIconWrap}><LocationIcon size={16} color={theme.colors.AzureBlue} /></View>
              <Text style={styles.highlightText}>{data.feature1}</Text>
            </View>
            <View style={styles.highlightItem}>
              <View style={styles.highlightIconWrap}><TractorIcon size={16} color={theme.colors.danger} /></View>
              <Text style={styles.highlightText}>{data.feature2}</Text>
            </View>
          </View>

          <View style={styles.serviceFooter}>
            <View style={styles.ratingRow}>
              <Text style={styles.starIcon}>★</Text>
              <Text style={styles.ratingText}>{data.rating}</Text>
            </View>
            <Text style={styles.price}>₹{data.price}</Text>
            <Text style={styles.mrp}>₹{data.mrp}</Text>
          </View>


          {/* Service Includes */}
          <Text style={styles.sectionHeading}>{t('main.home.services.includes', 'Service Includes')}</Text>
          <View style={styles.includesGrid}>
            {data.bullets?.map((point: string, idx: number) => (
              <View key={idx} style={styles.bulletRow}>
                <CheckedIcon size={16} color={theme.colors.success} />
                <Text style={styles.bulletText}>{point}</Text>
              </View>
            ))}
          </View>

          {/* Duration & Warranty */}
          <View style={styles.warrantySection}>
            <Text style={styles.sectionHeading}>{t('main.home.services.durationWarranty', 'Duration & Warranty')}</Text>
            {Array.isArray(data.warranty) ? data.warranty.map((point: string, idx: number) => (
              <View key={idx} style={styles.bulletRow}>
                <CheckIcon size={16} color={theme.colors.success} />
                <Text style={styles.bulletText}>{point}</Text>
              </View>
            )) : null}
          </View>
        </View>
      </ScrollView>

      {/* Footer Action */}
      <View style={styles.footer}>
        <Button
          title={t('main.home.services.bookService', 'Book Service')}
          onPress={() => navigation.navigate('ServiceCheckout', {
            serviceId: data.id,
            category: 'emergency'
          })}
        />
      </View>
    </View>
  );
};

export default EmergencyRoadsideScreen;

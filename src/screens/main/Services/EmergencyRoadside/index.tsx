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
  // CheckIcon,
  CheckedIcon,
  EmergencybellIcon,
  TimeLineIcon,
  HumbsupIcon,
  LoudspeakerIcon,
  WarrantyBadgeIcon,
} from '@assets/icons';
import { Button, ScreenWrapper } from '@components';
import { createStyles } from './styles';
import { EMERGENCY_SERVICE, SERVICES_DATA } from '../dummyData';
// import { SH, SW } from '@utils/Dimensions';
import ServiceCard from '../components/ServiceCard';

const EmergencyRoadsideScreen = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation<any>();
  const data = EMERGENCY_SERVICE;
  const ServiceImage = data.image;

  return (
    <ScreenWrapper style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header/Hero */}
        <View style={styles.heroSection}>
          {ServiceImage && <ServiceImage width="100%" height="100%" style={styles.heroImage} />}
          <View style={styles.headerRow}>
            <TouchableOpacity style={styles.iconCircle} onPress={() => navigation.goBack()}>
              <ChevronBackwardIcon size={24} color={theme.colors.white} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconCircle}>
              <ShareIcon size={18} color={theme.colors.white} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Content */}
        <View style={styles.contentCard}>
          <View style={styles.budgeSection}>
            <View style={styles.priorityBadge}>
              <EmergencybellIcon size={14} color={theme.colors.white} />
              <Text style={styles.priorityText}>{t('main.home.services.priorityService', 'Priority Service')}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: theme.colors.GoldenYellow }}>★ </Text>
              <Text style={styles.ratingText}>{data.rating}</Text>
            </View>
          </View>

          <Text style={styles.title}>{data.title}</Text>

          <View style={styles.highlights}>
            <View style={styles.highlightItem}>
              <TimeLineIcon size={18} color={theme.colors.danger} />
              <Text style={styles.highlightText}>{data.arrival}</Text>
            </View>
            <View style={styles.highlightItem}>
              <WarrantyBadgeIcon size={18} color={theme.colors.danger} />
              <Text style={styles.highlightText}>{data.mechanics}</Text>
            </View>
            <View style={styles.highlightItem}>
              <HumbsupIcon size={18} color={theme.colors.danger} />
              <Text style={styles.highlightText}>{data.feature1}</Text>
            </View>
            <View style={styles.highlightItem}>
              <LoudspeakerIcon size={18} color={theme.colors.danger} />
              <Text style={styles.highlightText}>{data.feature2}</Text>
            </View>
          </View>

          <View style={styles.priceRow}>
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
        </View>

        {/* Other Services */}
        <View style={styles.otherServicesSection}>
          <Text style={styles.sectionHeading}>{t('main.home.services.otherServices', 'Other Services')}</Text>
          {SERVICES_DATA[0].services.map((item) => (
            <ServiceCard
              key={item.id}
              item={item}
              onPress={() => navigation.push('ServiceOverview', { serviceId: item.id, category: SERVICES_DATA[0].category })}
              onBookPress={() => navigation.push('ServiceCheckout', { serviceId: item.id, category: SERVICES_DATA[0].category })}
            />
          ))}
        </View>
      </ScrollView>

      {/* Footer Action */}
      <View style={styles.footer}>
        <Button
          title={t('main.home.services.bookNow', 'Book Now')}
          onPress={() => navigation.navigate('ServiceCheckout', {
            serviceId: data.id,
            category: 'emergency'
          })}
        />
      </View>
    </ScreenWrapper>
  );
};

export default EmergencyRoadsideScreen;

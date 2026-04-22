import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@theme';
import {
  ChevronBackwardIcon,
  ShareIcon,
  CheckedIcon,
  TimeLineIcon,
  HumbsupIcon,
  LoudspeakerIcon,
  WarrantyBadgeIcon,
} from '@assets/icons';
import { Button } from '@components';
import { createStyles } from './styles';
import { SERVICES_DATA, IService } from '../dummyData';
import ServiceCard from '../components/ServiceCard';
import { SH, SW } from '@utils/Dimensions';

const ServiceOverviewScreen = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { serviceId, category } = route.params || {};

  const currentCategory = SERVICES_DATA.find(c => c.category === category);
  const service = currentCategory?.services.find(s => s.id === serviceId) as IService | undefined;
  const ServiceImage = service?.image;

  const otherServices = currentCategory?.services.filter(s => s.id !== serviceId) || [];

  if (!service) {
    return (
      <View style={styles.container}>
        <Text>Service not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header/Hero */}
        <View style={styles.heroSection}>
          <View style={styles.headerRow}>
            <TouchableOpacity style={styles.iconCircle} onPress={() => navigation.goBack()}>
              <ChevronBackwardIcon size={24} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconCircle}>
              <ShareIcon size={18} color="#000" />
            </TouchableOpacity>
          </View>
          {ServiceImage && <ServiceImage width={SW(240)} height={SH(200)} />}
        </View>

        {/* Content */}
        <View style={styles.contentCard}>
          <View style={styles.budgeSection}>
            <View style={styles.badgePill}>
              <Text style={styles.badgeText}>{t('main.home.services.topRated', 'TOP RATED SERVICE')}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: theme.colors.GoldenYellow }}>★ </Text>
              <Text style={styles.ratingText}>{service.rating}</Text>
            </View>
          </View>

          <Text style={styles.title}>{service.title}</Text>

          <View style={styles.priceRow}>
            <Text style={styles.price}>₹{service.price}</Text>
            <Text style={styles.mrp}>₹{service.mrp}</Text>
          </View>

          <View style={styles.highlights}>
            {service.highlight && (
              <View style={styles.highlightItem}>
                <TimeLineIcon size={18} color={theme.colors.danger || '#D11C3D'} />
                <Text style={styles.highlightText}>{service.highlight}</Text>
              </View>
            )}
            {service.warranty && (
              <View style={styles.highlightItem}>
                <WarrantyBadgeIcon size={18} color={theme.colors.danger || '#D11C3D'} />
                <Text style={styles.highlightText}>{service.warranty}</Text>
              </View>
            )}
            {service.frequency && (
              <View style={styles.highlightItem}>
                <HumbsupIcon size={18} color={theme.colors.danger || '#D11C3D'} />
                <Text style={styles.highlightText}>{service.frequency}</Text>
              </View>
            )}
            {service.pickup && (
              <View style={styles.highlightItem}>
                <LoudspeakerIcon size={18} color={theme.colors.danger || '#D11C3D'} />
                <Text style={styles.highlightText}>{service.pickup}</Text>
              </View>
            )}
          </View>

          {/* Service Includes */}
          <Text style={[styles.sectionHeading, { marginHorizontal: 0 }]}>{t('main.home.services.includes', 'Service Includes')}</Text>
          <View style={styles.includesGrid}>
            {service.bullets?.map((bullet: string, idx: number) => (
              <View key={idx} style={styles.detailBulletRow}>
                <CheckedIcon size={16} color={theme.colors.success || '#10B981'} />
                <Text style={styles.detailBulletText}>{bullet}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Other Services */}
        {otherServices.length > 0 && (
          <View style={styles.otherServicesSection}>
            <Text style={styles.sectionHeading}>{t('main.home.services.otherServices', 'Other Services')}</Text>
            {otherServices.map((item) => (
              <ServiceCard
                key={item.id}
                item={item}
                onPress={() => navigation.push('ServiceOverview', { serviceId: item.id, category })}
                onBookPress={() => { }} // Handle booking from here if needed
              />
            ))}
          </View>
        )}

      </ScrollView>

      {/* Footer Action */}
      <View style={styles.footer}>
        <Button
          title={t('main.home.services.bookNow', 'Book Now')}
          onPress={() => navigation.push('ServiceCheckout', { serviceId, category })}
        />
      </View>
    </View>
  );
};

export default ServiceOverviewScreen;

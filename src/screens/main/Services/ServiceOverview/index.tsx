import React from 'react';
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
import {
  Button,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  ScreenWrapper,
  ServiceCard,
  Image,
  RatingPriceRow,
  ScreenFooter,
} from '@components';
import { createStyles } from './styles';
import { SERVICES_DATA, IService } from '../dummyData';
import { ServiceOverviewBanner } from '@assets/images';

const ServiceOverviewScreen = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { serviceId, category } = route.params || {};

  const currentCategory = SERVICES_DATA.find(c => c.category === category);
  const service = currentCategory?.services.find(s => s.id === serviceId) as IService | undefined;

  const otherServices = currentCategory?.services.filter(s => s.id !== serviceId) || [];

  if (!service) {
    return (
      <View style={styles.container}>
        <Text>Service not found</Text>
      </View>
    );
  }

  return (
    <ScreenWrapper style={styles.container} withBottomInset={false}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        {/* Header/Hero */}
        <View style={styles.heroSection}>
          <Image
            source={ServiceOverviewBanner}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.headerRow}>
            <TouchableOpacity style={styles.iconCircle} onPress={() => navigation.goBack()}>
              <ChevronBackwardIcon size={24} color={theme.colors.black} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconCircle}>
              <ShareIcon size={18} color={theme.colors.black} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Content */}
        <View style={styles.contentCard}>
          <View style={styles.budgeSection}>
            <View style={styles.badgePill}>
              <Text style={styles.badgeText}>{t('main.home.services.topRated', 'TOP RATED SERVICE')}</Text>
            </View>
            <RatingPriceRow
              rating={service.rating}
              price={service.price}
              mrp={service.mrp}
            />
          </View>

          <Text style={styles.title}>{service.title}</Text>


          <View style={styles.highlights}>
            {service.highlight && (
              <View style={styles.highlightItem}>
                <TimeLineIcon size={18} color={theme.colors.danger} />
                <Text style={styles.highlightText}>{service.highlight}</Text>
              </View>
            )}
            {service.warranty && (
              <View style={styles.highlightItem}>
                <WarrantyBadgeIcon size={18} color={theme.colors.danger} />
                <Text style={styles.highlightText}>{service.warranty}</Text>
              </View>
            )}
            {service.frequency && (
              <View style={styles.highlightItem}>
                <HumbsupIcon size={18} color={theme.colors.danger} />
                <Text style={styles.highlightText}>{service.frequency}</Text>
              </View>
            )}
            {service.pickup && (
              <View style={styles.highlightItem}>
                <LoudspeakerIcon size={18} color={theme.colors.danger} />
                <Text style={styles.highlightText}>{service.pickup}</Text>
              </View>
            )}
          </View>

          {/* Service Includes */}
          <Text style={[styles.sectionHeading, { marginHorizontal: 0, marginTop: 0 }]}>{t('main.home.services.includes', 'Service Includes')}</Text>
          <View style={styles.includesGrid}>
            {service.bullets?.map((bullet: string, idx: number) => (
              <View key={idx} style={styles.detailBulletRow}>
                <CheckedIcon size={16} color={theme.colors.success} />
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
      <ScreenFooter>
        <Button
          title={t('main.home.services.bookNow', 'Book Now')}
          onPress={() => navigation.push('ServiceCheckout', { serviceId, category })}
        />
      </ScreenFooter>
    </ScreenWrapper>
  );
};

export default ServiceOverviewScreen;

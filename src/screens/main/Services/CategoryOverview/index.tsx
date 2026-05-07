import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
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
import { Button, ScreenWrapper, ServiceCard, RatingPriceRow, ScreenFooter } from '@components';
import { createStyles } from './styles';
import { CATEGORY_OVERVIEW_DATA, SERVICES_DATA } from '../dummyData';
import { categoryOverViewBanner } from '@assets/images';

const CategoryOverviewScreen = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation<any>();
  const data = CATEGORY_OVERVIEW_DATA;

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
            source={categoryOverViewBanner}
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
              rating={data.rating}
              price={data.price}
              mrp={data.mrp}
            />
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


          {/* Service Includes */}
          <Text style={[styles.sectionHeading, { marginHorizontal: 0 }]}>{t('main.home.services.includes', 'Service Includes')}</Text>
          <View style={styles.includesGrid}>
            {data.bullets?.map((point: string, idx: number) => (
              <View key={idx} style={styles.detailBulletRow}>
                <CheckedIcon size={16} color={theme.colors.success} />
                <Text style={styles.detailBulletText}>{point}</Text>
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
      <ScreenFooter>
        <Button
          title={t('main.home.services.bookService', 'Book Service')}
          onPress={() => navigation.navigate('ServiceCheckout', {
            serviceId: data.id,
            category: 'general'
          })}
        />
      </ScreenFooter>
    </ScreenWrapper>
  );
};

export default CategoryOverviewScreen;

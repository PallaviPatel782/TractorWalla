import React, { useMemo } from 'react';
import { Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@theme';
import { Text, SecondaryHeader, ScreenWrapper, View, ScrollView } from '@components';
import { createStyles } from './styles';
import { TractorImage } from '@assets/images';
import { SW, SH } from '@utils/Dimensions';

const BookingDetailsScreen = ({ navigation }: any) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = createStyles(theme);

  const basicFeatures = useMemo(() => [
    t('main.bookings.features.engine_oil'),
    t('main.bookings.features.oil_filter'),
    t('main.bookings.features.air_filter'),
    t('main.bookings.features.brake_check'),
  ], [t]);

  const advancedFeatures = useMemo(() => [
    t('main.bookings.features.hydraulic_oil'),
    t('main.bookings.features.brake_adj'),
    t('main.bookings.features.battery_test'),
    t('main.bookings.features.coolant_insp'),
  ], [t]);

  const brakeFeatures = useMemo(() => [
    t('main.bookings.features.brake_shoe'),
    t('main.bookings.features.brake_drum'),
    t('main.bookings.features.brake_cable'),
    t('main.bookings.features.pedal_lub'),
  ], [t]);


  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <SecondaryHeader
          title={t('main.bookings.details.title')}
          onBack={() => navigation.goBack()}
        />

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.headerSection}>
            <Text style={styles.bookingId}>#{t('main.bookings.details.id')}: ID1234</Text>
            
            <View style={styles.tractorRow}>
              <TractorImage width={SW(40)} height={SH(30)} />
              <Text style={styles.tractorName}>{t('common.brands.Mahindra')} 575 DI</Text>
            </View>

            <Text style={styles.serviceTypeTitle}>{t('main.bookings.details.bookService')}</Text>

            {/* Basic Service Item */}
            <View style={styles.serviceItem}>
              <View style={styles.itemDetails}>
                <Text style={styles.itemTitle}>{t('main.bookings.services.basic')}</Text>
                
                {basicFeatures.map((feat, i) => (
                  <View key={i} style={styles.featureRow}>
                    <Text color={theme.colors.success || '#10B981'}>✓</Text>
                    <Text style={styles.featureText}>{feat}</Text>
                  </View>
                ))}

                <View style={styles.priceRow}>
                  <Text style={styles.starIcon}>★</Text>
                  <Text style={styles.ratingText}>4.9</Text>
                  <Text style={styles.priceText}>₹1500</Text>
                  <Text style={styles.strikePrice}>₹1880</Text>
                </View>
              </View>

              <View style={styles.imageContainer}>
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' }} // Placeholder mechanic img
                  style={styles.itemImage}
                />
                <View style={styles.addedBadge}>
                  <Text color={theme.colors.white}>✓</Text>
                  <Text style={styles.addedText}>{t('common.added')}</Text>
                </View>
              </View>
            </View>

            {/* Advanced Service Item */}
            <View style={styles.serviceItem}>
              <View style={styles.itemDetails}>
                <Text style={styles.itemTitle}>{t('main.bookings.services.advanced')}</Text>
                
                {advancedFeatures.map((feat, i) => (
                  <View key={i} style={styles.featureRow}>
                    <Text color={theme.colors.success || '#10B981'}>✓</Text>
                    <Text style={styles.featureText}>{feat}</Text>
                  </View>
                ))}

                <View style={styles.priceRow}>
                  <Text style={styles.starIcon}>★</Text>
                  <Text style={styles.ratingText}>4.9</Text>
                  <Text style={styles.priceText}>₹2500</Text>
                  <Text style={styles.strikePrice}>₹2800</Text>
                </View>
              </View>

              <View style={styles.imageContainer}>
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1599839619722-39751411ea63?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' }} 
                  style={styles.itemImage}
                />
                <View style={styles.addedBadge}>
                  <Text color={theme.colors.white}>✓</Text>
                  <Text style={styles.addedText}>{t('common.added')}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Brake Service Kits Section */}
          <View style={styles.sectionCard}>
            <Text style={styles.serviceTypeTitle}>{t('main.bookings.details.brakeKits')}</Text>
            
            <View style={styles.serviceItem}>
              <View style={styles.itemDetails}>
                <Text style={styles.itemTitle}>{t('main.bookings.services.brake_repair')}</Text>
                
                {brakeFeatures.map((feat, i) => (
                  <View key={i} style={styles.featureRow}>
                    <Text color={theme.colors.success || '#10B981'}>✓</Text>
                    <Text style={styles.featureText}>{feat}</Text>
                  </View>
                ))}

                <View style={styles.priceRow}>
                  <Text style={styles.starIcon}>★</Text>
                  <Text style={styles.ratingText}>4.8</Text>
                  <Text style={styles.priceText}>₹1200</Text>
                  <Text style={styles.strikePrice}>₹1500</Text>
                </View>
              </View>

              <View style={styles.imageContainer}>
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1486262715619-6708146bcdbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' }} 
                  style={styles.itemImage}
                />
                <View style={styles.addedBadge}>
                  <Text color={theme.colors.white}>✓</Text>
                  <Text style={styles.addedText}>{t('common.added')}</Text>
                </View>
              </View>
            </View>

          </View>


        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

export default BookingDetailsScreen;

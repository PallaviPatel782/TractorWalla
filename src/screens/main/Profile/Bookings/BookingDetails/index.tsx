import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@theme';
import { Text, SecondaryHeader, ScreenWrapper, View, ScrollView, BillSummary, ServiceCard } from '@components';
import { createStyles } from './styles';
import { OilImage, OilcheckImage, MahindraImage } from '@assets/images';

const BookingDetailsScreen = ({ navigation }: any) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = createStyles(theme);

  const bookingData = useMemo(() => {
    return {
      id: 'ID1234',
      tractorBrand: t('common.brands.Mahindra'),
      tractorModel: '575 DI',
      sections: [
        {
          id: 'section_1',
          title: t('main.bookings.details.bookService'),
          items: [
            {
              id: 'basic',
              title: t('main.bookings.services.basic'),
              features: [
                t('main.bookings.features.engine_oil'),
                t('main.bookings.features.oil_filter'),
                t('main.bookings.features.air_filter'),
                t('main.bookings.features.brake_check'),
              ],
              rating: 4.9,
              price: 1500,
              strikePrice: 1880,
              image: 'oil',
            },
            {
              id: 'advanced',
              title: t('main.bookings.services.advanced'),
              features: [
                t('main.bookings.features.hydraulic_oil'),
                t('main.bookings.features.brake_adj'),
                t('main.bookings.features.battery_test'),
                t('main.bookings.features.coolant_insp'),
              ],
              rating: 4.9,
              price: 2500,
              strikePrice: 2800,
              image: 'oilcheck',
            }
          ]
        },
        {
          id: 'section_2',
          title: t('main.bookings.details.brakeKits'),
          items: [
            {
              id: 'brake',
              title: t('main.bookings.services.brake_repair'),
              features: [
                t('main.bookings.features.brake_shoe'),
                t('main.bookings.features.brake_drum'),
                t('main.bookings.features.brake_cable'),
                t('main.bookings.features.pedal_lub'),
              ],
              rating: 4.8,
              price: 1200,
              strikePrice: 1500,
              image: 'brake',
            }
          ]
        }
      ],
      billing: {
        itemTotal: 4000.00,
        serviceFee: 500.00,
        discounts: [
          { name: 'STEAL50', amount: 120.00 },
          { name: 'Partial Payment', amount: 1314.00 }
        ],
        totalEstimate: 4380.00,
      }
    };
  }, [t]);

  const getServiceImage = (imageType: string) => {
    switch (imageType) {
      case 'oil': return OilImage;
      case 'oilcheck': return OilcheckImage;
      case 'brake':
      default:
        return OilImage;
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <SecondaryHeader
          title={t('main.bookings.details.title')}
          onBack={() => navigation.goBack()}
          backgroundColor={theme.colors.DeepGreen}
          titleColor={theme.colors.white}
        />

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.headerSection}>
            <Text style={styles.bookingId}>#{t('main.bookings.details.id')}: {bookingData.id}</Text>

            <View style={styles.tractorRow}>
              <MahindraImage width={40} height={30} />
              <Text style={styles.tractorName}>{bookingData.tractorBrand} {bookingData.tractorModel}</Text>
            </View>

            {bookingData.sections[0] && (
              <>
                <Text style={styles.serviceTypeTitle}>{bookingData.sections[0].title}</Text>
                {bookingData.sections[0].items.map((item) => (
                  <ServiceCard
                    key={item.id}
                    item={{
                      ...item,
                      image: getServiceImage(item.image)
                    }}
                    onPress={() => { }}
                    isAdded={true}
                    containerStyle={{ borderWidth: 0, padding: 0, marginBottom: 16 }}
                  />
                ))}
              </>
            )}
          </View>

          {/* Section 2 Details */}
          {bookingData.sections.length > 1 && (
            <View style={styles.sectionCard}>
              <Text style={styles.serviceTypeTitle}>{bookingData.sections[1].title}</Text>
              {bookingData.sections[1].items.map((item) => (
                <ServiceCard
                  key={item.id}
                  item={{
                    ...item,
                    image: getServiceImage(item.image)
                  }}
                  onPress={() => { }}
                  isAdded={true}
                  containerStyle={{ borderWidth: 0, padding: 0, marginBottom: 12 }}
                />
              ))}
            </View>
          )}

          <BillSummary
            itemTotal={bookingData.billing.itemTotal}
            serviceFee={bookingData.billing.serviceFee}
            discount={bookingData.billing.discounts.find(d => d.name === 'STEAL50')?.amount}
            couponCode="STEAL50"
            partialPayment={bookingData.billing.discounts.find(d => d.name === 'Partial Payment')?.amount}
            totalEstimate={bookingData.billing.totalEstimate}
            containerStyle={styles.billSummaryCard}
          />

        </ScrollView>


      </View>
    </ScreenWrapper>
  );
};

export default BookingDetailsScreen;

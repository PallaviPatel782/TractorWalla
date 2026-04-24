import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@theme';
import { Text, SecondaryHeader, ScreenWrapper, View, ScrollView } from '@components';
import { createStyles } from './styles';
import { OilImage, OilcheckImage, MahindraImage } from '@assets/images';
import { SW, SH } from '@utils/Dimensions';
import { CheckIcon, BillIcon, CheckedIcon } from '@assets/icons';

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

  const renderServiceImage = (imageType: string) => {
    switch (imageType) {
      case 'oil': return <OilImage width={SW(80)} height={SW(80)} />;
      case 'oilcheck': return <OilcheckImage width={SW(80)} height={SW(80)} />;
      case 'brake':
      default:
        return <OilImage width={SW(80)} height={SW(80)} />;
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
              <MahindraImage width={SW(40)} height={SH(30)} />
              <Text style={styles.tractorName}>{bookingData.tractorBrand} {bookingData.tractorModel}</Text>
            </View>

            {bookingData.sections[0] && (
              <>
                <Text style={styles.serviceTypeTitle}>{bookingData.sections[0].title}</Text>
                {bookingData.sections[0].items.map((item) => (
                  <View key={item.id} style={styles.serviceItem}>
                    <View style={styles.itemDetails}>
                      <Text style={styles.itemTitle}>{item.title}</Text>
                      {item.features.map((feat, i) => (
                        <View key={i} style={styles.featureRow}>
                          <CheckIcon width={SW(16)} height={SW(16)} />
                          <Text style={styles.featureText}>{feat}</Text>
                        </View>
                      ))}
                      <View style={styles.priceRow}>
                        <Text style={styles.starIcon}>★</Text>
                        <Text style={styles.ratingText}>{item.rating}</Text>
                        <Text style={styles.priceText}>₹{item.price}</Text>
                        <Text style={styles.strikePrice}>₹{item.strikePrice}</Text>
                      </View>
                    </View>

                    <View style={styles.imageContainer}>
                      <View style={[styles.itemImage, { overflow: 'hidden', alignItems: 'center', justifyContent: 'center' }]}>
                        {renderServiceImage(item.image)}
                      </View>
                      <View style={styles.addedBadge}>
                        <CheckedIcon width={SW(16)} height={SW(16)} color={theme.colors.white} />
                        <Text style={styles.addedText}>{t('common.added')}</Text>
                      </View>
                    </View>
                  </View>
                ))}
              </>
            )}
          </View>

          {/* Section 2 Details */}
          {bookingData.sections.length > 1 && (
            <View style={styles.sectionCard}>
              <Text style={styles.serviceTypeTitle}>{bookingData.sections[1].title}</Text>
              {bookingData.sections[1].items.map((item) => (
                <View key={item.id} style={styles.serviceItem}>
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    {item.features.map((feat, i) => (
                      <View key={i} style={styles.featureRow}>
                        <CheckIcon width={SW(16)} height={SW(16)} />
                        <Text style={styles.featureText}>{feat}</Text>
                      </View>
                    ))}
                    <View style={styles.priceRow}>
                      <Text style={styles.starIcon}>★</Text>
                      <Text style={styles.ratingText}>{item.rating}</Text>
                      <Text style={styles.priceText}>₹{item.price}</Text>
                      <Text style={styles.strikePrice}>₹{item.strikePrice}</Text>
                    </View>
                  </View>

                  <View style={styles.imageContainer}>
                    <View style={[styles.itemImage, { overflow: 'hidden', alignItems: 'center', justifyContent: 'center' }]}>
                      {renderServiceImage(item.image)}
                    </View>
                    <View style={styles.addedBadge}>
                      <CheckedIcon width={SW(16)} height={SW(16)} />
                      <Text style={styles.addedText}>{t('common.added')}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Bill Summary Section */}
          <View style={[styles.sectionCard, styles.billSummaryCard]}>
            <View style={styles.billTitleRow}>
              <BillIcon width={SW(20)} height={SW(20)} color={theme.colors.gray900} />
              <Text style={styles.sectionTitle}>Bill Summary</Text>
            </View>

            <View style={styles.billDivider} />

            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Item Total</Text>
              <Text style={styles.billValue}>₹{bookingData.billing.itemTotal.toFixed(2)}</Text>
            </View>

            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Service Fee (Labor)</Text>
              <Text style={styles.billValue}>₹{bookingData.billing.serviceFee.toFixed(2)}</Text>
            </View>

            {bookingData.billing.discounts.map((discount, idx) => (
              <View key={idx} style={styles.billRow}>
                <Text style={styles.billDiscountLabel}>{discount.name}</Text>
                <Text style={styles.billDiscountValue}>-₹{discount.amount.toFixed(2)}</Text>
              </View>
            ))}

            <View style={styles.billRow}>
              <Text style={styles.billTaxLabel}>* Taxes applicable at checkout</Text>
              <Text style={styles.billTaxLabel}>Included</Text>
            </View>

            <View style={styles.billDividerDashed} />

            <View style={styles.billTotalRow}>
              <Text style={styles.billTotalLabel}>Total Estimate</Text>
              <Text style={styles.billTotalValue}>₹{bookingData.billing.totalEstimate.toFixed(2)}</Text>
            </View>
          </View>

        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

export default BookingDetailsScreen;

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@theme';
import {
  Text,
  Button,
  SecondaryHeader,
  ScreenWrapper,
  View,
  ScrollView,
} from '@components';
import { createStyles } from './styles';
import { MahindraImage } from '@assets/images';
import { BillIcon } from '@assets/icons';
import { SW } from '@utils/Dimensions';

const InvoiceScreen = ({ navigation, route }: any) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = createStyles(theme);

  const { type = 'General', bookingId = '#OD193734' } = route.params || {};

  const isGeneral = type === 'General';

  const generalItems = [
    { product: 'Basic Service', qty: 1, price: 1500, total: 1500 },
  ];

  const inventoryItems = [
    { product: 'Advance Service', qty: 1, price: 2500, total: 2500 },
    { product: 'Advance Brake Repair Kit', qty: 1, price: 2500, total: 2500 },
  ];

  const items = isGeneral ? generalItems : inventoryItems;
  const itemTotal = isGeneral ? 4000.00 : 5000.00;
  const serviceFee = isGeneral ? 500.00 : 0;
  const discount = isGeneral ? 120.00 : 0;
  const totalEstimate = isGeneral ? 4820.00 : 5000.00;

  const handleDownload = () => {
    // Implement download logic
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <SecondaryHeader
          title={t('main.bookings.invoice.title')}
          onBack={() => navigation.goBack()}
        />

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.invoiceCard}>

            {/* Header section */}
            <View style={styles.headerRow}>
              <View style={styles.invoiceTitleBlock}>
                <Text style={styles.invoiceMainTitle}>{t('main.bookings.invoice.mainTitle')}</Text>
                <Text variant="bold" size={10} color={theme.colors.gray600}>
                  {bookingId}
                </Text>
              </View>
              <View style={styles.invoiceCompanyBlock}>
                <Text variant="semiBold" size={12} color={theme.colors.gray900}>
                  Tractorwalla
                </Text>
                <Text variant="regular" size={10} color={theme.colors.gray600} style={{ textAlign: 'right' }}>
                  Delivery Services Pvt. Ltd.
                </Text>
                <Text variant="regular" size={10} color={theme.colors.gray600}>
                  {t('main.bookings.invoice.date')}: 17 Oct 2025
                </Text>
              </View>
            </View>

            {/* Tractor Info */}
            <View style={styles.tractorInfoRow}>
              <MahindraImage width={SW(40)} height={SW(40)} />
              <Text variant="medium" size={14} color={theme.colors.gray900}>
                Mahindra 575 DI
              </Text>
            </View>

            <View style={styles.divider} />

            {/* Billing Info */}
            <View style={styles.billingContainer}>
              <View style={styles.billingColumn}>
                <Text variant="semiBold" size={12} color={theme.colors.gray900} style={{ marginBottom: 4 }}>
                  {t('main.bookings.invoice.billedTo')}:
                </Text>
                <Text variant="medium" size={12} color={theme.colors.gray900}>Radhika Kashyap</Text>
                <Text variant="regular" size={10} color={theme.colors.gray600} style={{ lineHeight: 14 }}>
                  A-402, Green Apartments,{'\n'}Hinjewadi Phase 1, Pune{'\n'}Email: priya.s@example.com
                </Text>
              </View>

              <View style={styles.billingColumnRight}>
                <Text variant="semiBold" size={12} color={theme.colors.gray900} style={{ marginBottom: 4 }}>
                  {t('main.bookings.invoice.paymentStatus')}:
                </Text>
                <Text variant="bold" size={14} color={theme.colors.gray900}>PAID</Text>
                <Text variant="regular" size={10} color={theme.colors.gray600} style={{ textAlign: 'right', marginTop: 4, lineHeight: 14 }}>
                  Mode: UPI Transaction{'\n'}Ref ID: UPI010976543
                </Text>
              </View>
            </View>

            {/* Bill Summary Table */}
            <View style={styles.billSummaryHeader}>
              <BillIcon size={20} color={theme.colors.gray900} />
              <Text variant="semiBold" size={14} color={theme.colors.gray900}>
                {t('main.bookings.invoice.summary')}
              </Text>
            </View>

            <View style={styles.tableHeaderRow}>
              <View style={styles.colProduct}><Text style={styles.tableTextWhite}>{t('main.bookings.invoice.product')}</Text></View>
              <View style={styles.colQty}><Text style={styles.tableTextWhite}>{t('main.bookings.invoice.qty')}</Text></View>
              <View style={styles.colPrice}><Text style={styles.tableTextWhite}>{t('main.bookings.invoice.price')}</Text></View>
              <View style={styles.colTotal}><Text style={styles.tableTextWhite}>{t('main.bookings.invoice.total')}</Text></View>
            </View>

            {items.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <View style={styles.colProduct}>
                  <Text style={styles.tableText}>{item.product}</Text>
                </View>
                <View style={styles.colQty}>
                  <Text style={styles.tableText}>{item.qty}</Text>
                </View>
                <View style={styles.colPrice}>
                  <Text style={styles.tableText}>{item.price}</Text>
                </View>
                <View style={styles.colTotal}>
                  <Text style={styles.tableText}>{item.total}</Text>
                </View>
              </View>
            ))}

            <View style={{ marginTop: 12 }}>
              <View style={styles.summaryRow}>
                <Text style={styles.tableText}>{isGeneral ? t('main.bookings.invoice.itemTotal') : t('main.bookings.invoice.inventoryItems')}</Text>
                <Text style={styles.tableText}>₹{itemTotal.toFixed(2)}</Text>
              </View>
              {isGeneral && (
                <>
                  <View style={styles.summaryRow}>
                    <Text style={styles.tableText}>{t('main.bookings.invoice.serviceFee')}</Text>
                    <Text style={styles.tableText}>₹{serviceFee.toFixed(2)}</Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text style={[styles.tableText, { color: theme.colors.brandGreen }]}>STEAL50</Text>
                    <Text style={[styles.tableText, { color: theme.colors.brandGreen }]}>-₹{discount.toFixed(2)}</Text>
                  </View>
                </>
              )}
            </View>

            <Text style={styles.taxNotice}>{t('main.bookings.invoice.taxNotice')}</Text>

            <View style={styles.totalEstimateContainer}>
              <Text variant="semiBold" size={16} color={theme.colors.gray900}>{t('main.bookings.invoice.estimate')}</Text>
              <Text variant="bold" size={16} color={theme.colors.gray900}>₹{totalEstimate.toFixed(2)}</Text>
            </View>

            <Button
              title={t('common.download')}
              onPress={handleDownload}
            />
            {/* The icon in the button is usually supported directly via an icon prop but using just title for now assuming the standard Button component supports it or we keep it simple as per screenshot. Actually looking at the screenshot, "Download" button has a download icon. */}
            {/* If standard button does not have icon prop, we can wrap or modify. Assuming it does, or we just leave it with text for now. */}
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

export default InvoiceScreen;

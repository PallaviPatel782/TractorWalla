import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@theme';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  Text,
  ScreenWrapper,
  View,
  ScrollView,
  Button,
  ScreenFooter,
} from '@components';
import { createStyles } from './styles';
import { ServiceModalImageImage, DummyUserImage } from '@assets/images';
import { CheckedIcon, ChevronBackwardIcon, DownloadIcon } from '@assets/icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/NavigationTypes';
import { TouchableOpacity, StyleSheet } from 'react-native';
const ServiceInvoiceSummary = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<any>();
  const { bookingId = 'ID1234' } = route.params || {};

  const [invoiceMenuVisible, setInvoiceMenuVisible] = React.useState(false);

  const handleInvoiceOptionSelect = (type: 'General' | 'Inventory') => {
    setInvoiceMenuVisible(false);
    navigation.navigate('Invoice', { type, bookingId });
  };

  const onAddReview = () => {
    navigation.navigate('LeaveReview', { bookingId });
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <ChevronBackwardIcon size={24} color={theme.colors.black} />
          </TouchableOpacity>
        </View>

        {invoiceMenuVisible && (
          <TouchableOpacity
            style={[StyleSheet.absoluteFill, { zIndex: 1 }]}
            activeOpacity={1}
            onPress={() => setInvoiceMenuVisible(false)}
          />
        )}

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          style={{ zIndex: invoiceMenuVisible ? 10 : 0 }}
        >
          <View style={styles.bannerContainer}>
            <ServiceModalImageImage width={300} height={180} />
          </View>

          <View style={styles.detailsCard}>
            <Text style={styles.bookingId}>#{t('main.bookings.details.id')}: {bookingId}</Text>

            <View style={styles.engineerCard}>
              <DummyUserImage size={50} />
              <View style={styles.engineerInfo}>
                <Text style={styles.engineerLabel}>{t('main.bookings.list.assignedEngineer')}</Text>
                <Text style={styles.engineerName}>Nikhil Kamat</Text>
              </View>
              <View style={styles.statusContainer}>
                <View style={styles.statusText}>
                  <CheckedIcon size={15} />
                  <Text style={{ fontSize: 12, color: theme.colors.DeepGreen, fontFamily: theme.fontfamily.poppinsBold }}>
                    {t('main.bookings.list.statuses.Completed')}
                  </Text>
                </View>
                <Text style={styles.timeText}>{t('common.today')}, 2:30 PM</Text>
              </View>
            </View>

            <View style={styles.amountRow}>
              <View>
                <Text style={{ fontSize: 11, color: theme.colors.gray500, fontFamily: theme.fontfamily.poppinsMedium }}>
                  {t('main.bookings.list.totalAmount').toUpperCase()}
                </Text>
                <Text style={{ fontSize: 18, color: theme.colors.black, fontFamily: theme.fontfamily.poppinsBold }}>
                  ₹4185.00
                </Text>
              </View>

              <View style={{ position: 'relative' }}>
                <TouchableOpacity
                  style={styles.invoiceButton}
                  activeOpacity={0.7}
                  onPress={() => setInvoiceMenuVisible(!invoiceMenuVisible)}
                >
                  <DownloadIcon size={16} color={theme.colors.white} />
                  <Text style={styles.invoiceText}>
                    {t('main.bookings.list.invoice')}
                  </Text>
                  <Text style={{ color: theme.colors.white }}>{invoiceMenuVisible ? '▴' : '▾'}</Text>
                </TouchableOpacity>

                {invoiceMenuVisible && (
                  <View style={styles.invoiceMenuBody}>
                    <TouchableOpacity
                      style={styles.invoiceMenuItem}
                      onPress={() => handleInvoiceOptionSelect('General')}
                    >
                      <Text style={styles.invoiceMenuItemText}>{t('main.bookings.list.generalInvoice')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.invoiceMenuItem}
                      onPress={() => handleInvoiceOptionSelect('Inventory')}
                    >
                      <Text style={styles.invoiceMenuItemText}>{t('main.bookings.list.inventoryInvoice')}</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </View>
        </ScrollView>


        <ScreenFooter>
          <Button
            title={t('main.serviceFlow.addReview')}
            onPress={onAddReview}
            backgroundColor={theme.colors.DeepGreen}
          />
        </ScreenFooter>

      </View>
    </ScreenWrapper>
  );
};

export default ServiceInvoiceSummary;


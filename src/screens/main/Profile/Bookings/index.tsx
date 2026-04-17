import React, { useMemo } from 'react';
import { FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@theme';
import {
  Text,
  SecondaryHeader,
  ScreenWrapper,
  View,
  TouchableOpacity,
  GlobalBottomSheet,
  Input,
  Button,
} from '@components';
import { createStyles } from './styles';
import { SW, SH } from '@utils/Dimensions';
import { DownloadIcon, ThreedotsIcon, UserIcon } from '@icons';

const MOCK_BOOKINGS = [
  {
    id: 'ID1234',
    engineer: 'Rajat Tiwari',
    status: 'Scheduled',
    time: 'Today, 2:30 PM',
    amount: '185.00',
    type: 'view',
  },
  {
    id: 'ID5678',
    engineer: 'Nikhil Kamat',
    status: 'Completed',
    time: 'Yesterday, 10:00 AM',
    amount: '185.00',
    type: 'invoice',
  },
  {
    id: 'ID9012',
    engineer: 'Nitin Shah',
    status: 'Cancelled',
    time: '15 Oct, 4:00 PM',
    amount: '185.00',
    type: 'invoice',
  },
];

const Bookings = ({ navigation }: any) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = createStyles(theme);

  const [activeInvoiceMenuId, setActiveInvoiceMenuId] = React.useState<string | null>(null);
  const [cancelModalVisible, setCancelModalVisible] = React.useState(false);
  const [selectedCancelBooking, setSelectedCancelBooking] = React.useState<any>(null);
  const [cancelReason, setCancelReason] = React.useState('');
  const [otherReasonText, setOtherReasonText] = React.useState('');

  const CANCEL_REASONS = useMemo(() => [
    { label: t('main.bookings.list.reasons.plan_change'), value: 'plan_change' },
    { label: t('main.bookings.list.reasons.better_offer'), value: 'better_offer' },
    { label: t('main.bookings.list.reasons.mistake'), value: 'mistake' },
    { label: t('main.bookings.list.reasons.others'), value: 'others' }
  ], [t]);


  const handleInvoiceOptionSelect = (bookingId: string, type: 'General' | 'Inventory') => {
    setActiveInvoiceMenuId(null);
    console.log("selectedCancelBooking", selectedCancelBooking);
    navigation.navigate('Invoice', { type, bookingId });
  };

  const handleOpenCancelModal = (item: any) => {
    setSelectedCancelBooking(item);
    setCancelModalVisible(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled':
        return theme.colors.AzureBlue || '#3281D1';
      case 'Completed':
        return theme.colors.success || '#10B981';
      case 'Cancelled':
        return theme.colors.danger || '#D92D20';
      default:
        return theme.colors.gray500;
    }
  };

  const renderBookingItem = ({ item }: { item: typeof MOCK_BOOKINGS[0]; index: number }) => {
    const isActive = activeInvoiceMenuId === item.id;
    const localizedStatus = t(`main.bookings.list.statuses.${item.status}`);
    return (
      <View style={[styles.bookingCard, isActive && { zIndex: Number.MAX_SAFE_INTEGER, elevation: 10 }]}>
        <View style={styles.cardHeader}>
          <Text style={styles.bookingId}>#{t('main.bookings.list.bookingId')}: {item.id}</Text>
          {item.status === 'Scheduled' && (
            <TouchableOpacity style={styles.optionsIcon} onPress={() => handleOpenCancelModal(item)}>
              <ThreedotsIcon size={24} color={theme.colors.gray400} />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.engineerSection}>
          <View style={styles.engineerInfo}>
            <View style={styles.avatar}>
              <UserIcon size={24} color={theme.colors.gray400} />
            </View>
            <View>
              <Text variant="regular" size={12} style={styles.assignedLabel}>
                {t('main.bookings.list.assignedEngineer')}
              </Text>
              <Text variant="semiBold" size={13} style={styles.engineerName}>
                {item.engineer}
              </Text>
            </View>
          </View>
          <View style={styles.statusContainer}>
            <Text variant="regular" size={11} style={styles.statusLabel}>
              {localizedStatus}
            </Text>
            <View style={styles.statusValueRow}>
              <Text variant="medium" size={11} style={[styles.statusValue, { color: getStatusColor(item.status) }]}>
                {item.time}
              </Text>
              {item.status === 'Completed' && <Text color={theme.colors.success}>✓</Text>}
              {item.status === 'Cancelled' && <Text color={theme.colors.danger}>×</Text>}
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.cardFooter}>
          <View style={styles.amountSection}>
            <Text variant="regular" size={10} style={styles.amountLabel}>
              {t('main.bookings.list.totalAmount')}
            </Text>
            <Text variant="bold" size={15} style={styles.amountValue}>
              ${item.amount}
            </Text>
          </View>

          {item.type === 'view' ? (
            <View style={{ flexDirection: 'row', gap: SW(8) }}>
              <TouchableOpacity
                style={styles.viewDetailsButton}
                activeOpacity={0.7}
                onPress={() => navigation.navigate('BookingDetails', { bookingId: item.id })}
              >
                <Text variant="medium" size={12} style={styles.viewDetailsText}>
                  {t('main.bookings.list.viewDetails')}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ position: 'relative' }}>
              <TouchableOpacity
                style={styles.invoiceButton}
                activeOpacity={0.7}
                onPress={() => setActiveInvoiceMenuId(
                  activeInvoiceMenuId === item.id ? null : item.id
                )}
              >
                <DownloadIcon size={16} color={theme.colors.white} />
                <Text variant="medium" size={12} style={styles.invoiceText}>
                  {t('main.bookings.list.invoice')}
                </Text>
                <Text color={theme.colors.white}>{activeInvoiceMenuId === item.id ? '▴' : '▾'}</Text>
              </TouchableOpacity>

              {activeInvoiceMenuId === item.id && (
                <View style={styles.invoiceMenuBody}>
                  <TouchableOpacity
                    style={styles.invoiceMenuItem}
                    onPress={() => handleInvoiceOptionSelect(item.id, 'General')}
                  >
                    <Text variant="medium" size={12} color={theme.colors.gray800}>{t('main.bookings.list.generalInvoice')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.invoiceMenuItem}
                    onPress={() => handleInvoiceOptionSelect(item.id, 'Inventory')}
                  >
                    <Text variant="medium" size={12} color={theme.colors.gray800}>{t('main.bookings.list.inventoryInvoice')}</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        </View>
      </View>
    );
  };

  const renderCancelBottomSheet = () => (
    <GlobalBottomSheet
      visible={cancelModalVisible}
      onClose={() => setCancelModalVisible(false)}
      title={t('main.bookings.list.cancelBooking')}
    >
      <View style={{ gap: SH(16) }}>
        <Text variant="medium" size={14} color={theme.colors.gray900}>
          {t('main.bookings.list.writeReason')}
        </Text>
        <View style={styles.reasonChipsContainer}>
          {CANCEL_REASONS.map((reason) => {
            const isSelected = cancelReason === reason.value;
            return (
              <TouchableOpacity
                key={reason.value}
                style={[styles.reasonChip, isSelected && styles.reasonChipSelected]}
                onPress={() => setCancelReason(reason.value)}
              >
                <Text size={12} color={isSelected ? theme.colors.brandGreen : theme.colors.gray700}>
                  {reason.label}
                </Text>
              </TouchableOpacity>
            )
          })}
        </View>

        {cancelReason === 'others' && (
          <View style={{ marginTop: SH(8) }}>
            <Text variant="medium" size={12} color={theme.colors.gray900} style={{ marginBottom: SH(8) }}>
              {t('main.bookings.list.others')}
            </Text>
            <Input
              placeholder={t('main.bookings.list.othersPlaceholder')}
              value={otherReasonText}
              onChangeText={setOtherReasonText}
              style={{ height: SH(50) }}
            />
          </View>
        )}

        <Button
          title={t('main.bookings.list.cancelBooking')}
          style={{ backgroundColor: theme.colors.danger, marginTop: SH(10) }}
          onPress={() => setCancelModalVisible(false)}
          disabled={!cancelReason || (cancelReason === 'others' && !otherReasonText.trim())}
        />
      </View>
    </GlobalBottomSheet>
  );

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <SecondaryHeader title={t('main.bookings.list.title')} onBack={() => navigation.goBack()} />

        <View style={styles.content}>
          <FlatList
            data={MOCK_BOOKINGS}
            renderItem={({ item, index }) => renderBookingItem({ item, index })}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
      {renderCancelBottomSheet()}
    </ScreenWrapper>
  );
};

export default Bookings;

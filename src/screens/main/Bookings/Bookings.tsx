import React from 'react';
import { FlatList, Image } from 'react-native';
import { useTheme } from '@theme';
import {
  Text,
  SecondaryHeader,
  ScreenWrapper,
  View,
  TouchableOpacity,
} from '@components';
import { createStyles } from './Bookings.styles';
import { SW, SH } from '@utils/Dimensions';
import { DownloadIcon, UserIcon } from '@icons';

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
  const styles = createStyles(theme);

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

  const renderBookingItem = ({ item }: { item: typeof MOCK_BOOKINGS[0] }) => {
    return (
      <View style={styles.bookingCard}>
        <View style={styles.cardHeader}>
          <Text style={styles.bookingId}>#BOOKING ID: {item.id}</Text>
          <TouchableOpacity style={styles.optionsIcon}>
            <Text variant="bold" color={theme.colors.gray300}>•••</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.engineerSection}>
          <View style={styles.engineerInfo}>
            <View style={styles.avatar}>
              <UserIcon size={24} color={theme.colors.gray400} />
            </View>
            <View>
              <Text variant="regular" size={12} style={styles.assignedLabel}>
                Assigned Service Engineer
              </Text>
              <Text variant="semiBold" size={13} style={styles.engineerName}>
                {item.engineer}
              </Text>
            </View>
          </View>
          <View style={styles.statusContainer}>
            <Text variant="regular" size={11} style={styles.statusLabel}>
              {item.status}
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
              Total Amount
            </Text>
            <Text variant="bold" size={15} style={styles.amountValue}>
              ${item.amount}
            </Text>
          </View>

          {item.type === 'view' ? (
            <TouchableOpacity
              style={styles.viewDetailsButton}
              activeOpacity={0.7}
            >
              <Text variant="medium" size={12} style={styles.viewDetailsText}>
                View Details
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.invoiceButton}
              activeOpacity={0.7}
            >
              <DownloadIcon size={16} color={theme.colors.white} />
              <Text variant="medium" size={12} style={styles.invoiceText}>
                Invoice
              </Text>
              <Text color={theme.colors.white}>▾</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <SecondaryHeader title="Your Bookings" onBack={() => navigation.goBack()} />

        <View style={styles.content}>
          <FlatList
            data={MOCK_BOOKINGS}
            renderItem={renderBookingItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Bookings;

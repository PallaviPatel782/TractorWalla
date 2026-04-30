import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@theme';
import {
  Text,
  SecondaryHeader,
  ScreenWrapper,
  View,
  TouchableOpacity,
  FlatList,
} from '@components';
import { createStyles } from './styles';
import { AddlocationIcon } from '@icons';
import { Alert } from 'react-native';
import { useGetAllAddresses, useDeleteAddress, useSetDefaultAddress } from '../../hooks/useAddress';
import { CustomerAddress } from '@appTypes';

const ManageAddress = ({ navigation, route }: any) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = createStyles(theme);

  const { data: addressResponse, isLoading, refetch } = useGetAllAddresses();
  const { mutate: deleteAddress } = useDeleteAddress();
  const { mutate: setDefaultAddress } = useSetDefaultAddress();

  const userAddresses: CustomerAddress[] = useMemo(() => {
    return addressResponse?.data?.addresses || addressResponse?.addresses || [];
  }, [addressResponse]);

  const { isSelectionMode, selectedAddressId, serviceId, category, newAddress } = route.params || {};
  const [selectedId, setSelectedId] = useState(selectedAddressId || '');

  // Auto-select: use passed ID, else default, else first
  useEffect(() => {
    if (userAddresses.length > 0) {
      if (selectedId) return; // already set from params
      const defaultAddr = userAddresses.find((a: any) => a.isDefault);
      setSelectedId(
        defaultAddr
          ? (defaultAddr._id || defaultAddr.id)
          : (userAddresses[userAddresses.length - 1]._id || userAddresses[userAddresses.length - 1].id)
      );
    }
  }, [userAddresses, selectedId]);

  useEffect(() => {
    if (newAddress) {
      refetch();

      if (isSelectionMode) {
        navigation.navigate('ServiceCheckout', {
          serviceId,
          category,
          selectedAddress: newAddress
        });
      }

      navigation.setParams({ newAddress: undefined });
    }
  }, [newAddress, navigation, isSelectionMode, serviceId, category, refetch]);

  const onSelectAddress = (item: CustomerAddress) => {
    const itemId = item._id || item.id || '';
    setSelectedId(itemId);
    // In selection mode: just highlight, confirm via button below
  };

  const onConfirmSelection = () => {
    const selected = userAddresses.find((a) => (a._id || a.id) === selectedId);
    if (selected) {
      navigation.navigate('ServiceCheckout', {
        serviceId,
        category,
        selectedAddress: selected
      });
    }
  };

  const onRemoveAddress = (id: string) => {
    Alert.alert(
      t('common.remove', 'Remove'),
      'Are you sure you want to remove this address?',
      [
        { text: t('common.cancel', 'Cancel'), style: 'cancel' },
        {
          text: t('common.remove', 'Remove'),
          style: 'destructive',
          onPress: () => {
            deleteAddress(id, {
              onSuccess: () => {
                if (selectedId === id) setSelectedId('');
              }
            });
          }
        },
      ]
    );
  };

  const onEditAddress = (item: CustomerAddress) => {
    navigation.navigate('AddLocation', { addressToEdit: item });
  };

  const renderAddressItem = ({ item }: { item: CustomerAddress }) => {
    const itemId = item._id || item.id || '';
    const isSelected = selectedId === itemId;
    return (
      <TouchableOpacity
        style={[styles.addressCard, isSelected && styles.addressCardSelected]}
        onPress={() => onSelectAddress(item)}
        activeOpacity={0.9}
      >
        <View style={styles.radioContainer}>
          <View style={[styles.radioOuter, isSelected && styles.radioOuterSelected]}>
            {isSelected && <View style={styles.radioInner} />}
          </View>
        </View>
        <View style={styles.addressInfo}>
          <View style={styles.labelRow}>
            <Text variant="semiBold" size={13} style={styles.addressLabel}>
              {(item.addressType || item.label || 'Address').charAt(0).toUpperCase() +
                (item.addressType || item.label || 'address').slice(1)}
            </Text>
            {item.isDefault && (
              <View style={styles.defaultBadge}>
                <Text variant="medium" size={10} style={styles.defaultBadgeText}>Default</Text>
              </View>
            )}
          </View>
          <Text variant="regular" size={12} style={styles.addressText}>
            {[
              item.addressLine,
              item.landmark,
              item.city,
              item.state,
              item.pincode,
            ].filter(Boolean).join(', ')}
          </Text>
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => onEditAddress(item)}
            >
              <Text variant="medium" size={11} style={styles.actionText}>{t('common.edit')}</Text>
            </TouchableOpacity>
            {!item.isDefault && (
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => setDefaultAddress(itemId)}
              >
                <Text variant="medium" size={11} style={styles.actionText}>Set Default</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => onRemoveAddress(itemId)}
            >
              <Text variant="medium" size={11} style={styles.actionText}>{t('common.remove')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <SecondaryHeader title={t('main.manageAddress.title')} onBack={() => navigation.goBack()} backgroundColor={theme.colors.YellowLight}
            titleColor={theme.colors.black} />
        </View>

        <View style={styles.content}>
          <Text variant="semiBold" size={14} style={styles.sectionTitle}>
            {t('main.manageAddress.yourAddress')}
          </Text>

          <FlatList
            data={userAddresses}
            renderItem={renderAddressItem}
            keyExtractor={(item) => (item._id || item.id || '').toString()}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            refreshing={isLoading}
            onRefresh={refetch}
          />
        </View>

        <TouchableOpacity
          style={styles.footer}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('AddLocation', { ...route.params })}
        >
          <AddlocationIcon size={20} color={theme.colors.white} />
          <Text variant="semiBold" size={14} style={styles.footerText}>
            {t('main.manageAddress.addNewFooter')}
          </Text>
          <View style={{ flex: 1 }} />
          <Text variant="semiBold" size={18} color={theme.colors.white}>›</Text>
        </TouchableOpacity>

        {isSelectionMode && selectedId ? (
          <TouchableOpacity
            style={styles.confirmFooter}
            activeOpacity={0.85}
            onPress={onConfirmSelection}
          >
            <Text variant="semiBold" size={15} style={styles.confirmFooterText}>
              Deliver to this address
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </ScreenWrapper>
  );
};

export default ManageAddress;

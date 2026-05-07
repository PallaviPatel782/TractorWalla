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
  ScreenFooter,
} from '@components';
import { createStyles } from './styles';
import { AddlocationIcon } from '@icons';
import { Alert } from 'react-native';
import { useGetAllAddresses, useDeleteAddress, useSetDefaultAddress } from '../../hooks/useAddress';
import { CustomerAddress } from '@appTypes';
import { useSnackbarStore } from '@store/useSnackbarStore';

const ManageAddress = ({ navigation, route }: any) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = createStyles(theme);
  const showSnackbar = useSnackbarStore(state => state.showSnackbar);

  const { data: addressResponse, isLoading, refetch } = useGetAllAddresses();
  const { mutate: deleteAddress } = useDeleteAddress();
  const { mutate: setDefaultAddress } = useSetDefaultAddress();

  const userAddresses: CustomerAddress[] = useMemo(() => {
    return addressResponse?.data?.addresses || addressResponse?.addresses || [];
  }, [addressResponse]);

  const { isSelectionMode, selectedAddressId, newAddress } = route.params || {};
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
      navigation.setParams({ newAddress: undefined });
    }
  }, [newAddress, navigation, refetch]);

  const { useFocusEffect } = require('@react-navigation/native');
  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [refetch])
  );

  const onSelectAddress = (item: CustomerAddress) => {
    const itemId = item._id || item.id || '';
    setSelectedId(itemId);
    // In selection mode: just highlight, confirm via button below
  };

  const onConfirmSelection = () => {
    const selected = userAddresses.find((a) => (a._id || a.id) === selectedId);
    if (selected) {
      const { DeviceEventEmitter } = require('react-native');
      DeviceEventEmitter.emit('ADDRESS_SELECTED', selected);
      navigation.goBack();
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
              onSuccess: (response: any) => {
                showSnackbar({
                  type: 'success',
                  title: 'Success',
                  description: response.message || response.data?.message || 'Address deleted successfully'
                });
                if (selectedId === id) setSelectedId('');
              },
              onError: (error: any) => {
                showSnackbar({
                  type: 'error',
                  title: 'Error',
                  description: error.message || 'Failed to delete address'
                });
              }
            });
          }
        },
      ]
    );
  };

  const onHandleSetDefault = (id: string) => {
    setDefaultAddress(id, {
      onSuccess: (response: any) => {
        showSnackbar({
          type: 'success',
          title: 'Success',
          description: response.message || response.data?.message || 'Default address set successfully'
        });
      },
      onError: (error: any) => {
        showSnackbar({
          type: 'error',
          title: 'Error',
          description: error.message || 'Failed to set default address'
        });
      }
    });
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
            <Text variant="regular" size={14} style={styles.addressLabel}>
              {(item.addressType || item.label || 'Address').charAt(0).toUpperCase() +
                (item.addressType || item.label || 'address').slice(1)}
            </Text>
            {item.isDefault && (
              <View style={styles.defaultBadge}>
                <Text variant="regular" size={10} style={styles.defaultBadgeText}>Default</Text>
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
                onPress={() => onHandleSetDefault(itemId)}
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
    <ScreenWrapper withBottomInset={false}>
      <View style={styles.headerContainer}>
        <SecondaryHeader
          title={t('main.manageAddress.title')}
          onBack={() => navigation.goBack()}
          backgroundColor={theme.colors.YellowLight}
          titleColor={theme.colors.black}
        />
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

      <ScreenFooter containerStyle={styles.footerContainer}>
        {isSelectionMode && selectedId ? (
          <TouchableOpacity
            style={styles.confirmButton}
            activeOpacity={0.85}
            onPress={onConfirmSelection}
          >
            <Text variant="semiBold" size={15} style={styles.confirmFooterText}>
              Deliver to this address
            </Text>
          </TouchableOpacity>
        ) : null}

        <TouchableOpacity
          style={styles.addNewFooter}
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
      </ScreenFooter>
    </ScreenWrapper>
  );
};

export default ManageAddress;

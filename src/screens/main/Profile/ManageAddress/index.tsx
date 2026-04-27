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
import { useAuthStore, Address } from '@store/useAuthStore';

const ManageAddress = ({ navigation, route }: any) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = createStyles(theme);
  
  const user = useAuthStore(state => state.user);
  const updateUser = useAuthStore(state => state.updateUser);
  
  const userAddresses = useMemo(() => user?.addresses || [], [user?.addresses]);
  
  const { isSelectionMode, selectedAddressId, serviceId, category, newAddress } = route.params || {};
  const [selectedId, setSelectedId] = useState(selectedAddressId || (userAddresses.length > 0 ? userAddresses[0].id : ''));

  useEffect(() => {
    if (newAddress) {
      // Prevent duplicates
      if (!userAddresses.find(a => a.id === newAddress.id)) {
        updateUser({
          addresses: [...userAddresses, newAddress]
        });
      }
      
      if (isSelectionMode) {
        navigation.navigate('ServiceCheckout', {
          serviceId,
          category,
          selectedAddress: newAddress
        });
      }
      
      navigation.setParams({ newAddress: undefined });
    }
  }, [newAddress, navigation, userAddresses, isSelectionMode, serviceId, category, updateUser]);

  const onSelectAddress = (item: any) => {
    setSelectedId(item.id);
    if (isSelectionMode) {
      navigation.navigate('ServiceCheckout', {
        serviceId,
        category,
        selectedAddress: item
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
            updateUser({
              addresses: userAddresses.filter(a => a.id !== id)
            });
            if (selectedId === id) setSelectedId('');
          }
        },
      ]
    );
  };

  const onEditAddress = (item: any) => {
    navigation.navigate('AddLocation', { addressToEdit: item });
  };

  const renderAddressItem = ({ item }: { item: Address }) => {
    const isSelected = selectedId === item.id;
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
              {item.label === 'Default' ? t('common.default') : t('main.manageAddress.yourAddress')}
            </Text>
          </View>
          <Text variant="regular" size={12} style={styles.addressText}>
            {item.address}
          </Text>
          <View style={styles.actionRow}>
            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={() => onEditAddress(item)}
            >
              <Text variant="medium" size={11} style={styles.actionText}>{t('common.edit')}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => onRemoveAddress(item.id)}
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
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
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
      </View>
    </ScreenWrapper>
  );
};

export default ManageAddress;

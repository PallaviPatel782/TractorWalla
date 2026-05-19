import React, { useState } from 'react';
import { Modal, RefreshControl } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@theme';
import {
  Text,
  View,
  ScreenWrapper,
  TouchableOpacity,
  TractorCard,
  SecondaryHeader,
  Button,
  FlatList,
} from '@components';
import { useAuthStore } from '@store/useAuthStore';
import { useGetVehiclesByCustomerId, useDeleteVehicle } from '@screens/main/hooks/useVehicle';
import { createStyles } from './styles';
import { TractorImage } from '@assets/images';
import { Loader } from '@components';
import { useSnackbarStore } from '@store/useSnackbarStore';

const MyTractorsScreen = ({ navigation, route }: any) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = createStyles(theme);
  const showSnackbar = useSnackbarStore(state => state.showSnackbar);
  const user = useAuthStore((state) => state.user);
  const isSelectionMode = route.params?.isSelectionMode;

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedTractor, setSelectedTractor] = useState<any>(null);

  const {
    data: vehiclesData,
    isLoading: isLoadingVehicles,
    isFetching,
    refetch
  } = useGetVehiclesByCustomerId();
  const { mutate: deleteVehicle, isPending: isDeleting } = useDeleteVehicle();

  // If the API call returns an array of vehicles, use it; otherwise fallback to user state
  const rawTractors = vehiclesData?.vehicles || vehiclesData?.data || user?.tractors || [];

  const tractors = rawTractors.map((t: any) => ({
    id: t._id || t.id,
    brand: t.brandId?.name || t.customBrandName || t.brand,
    model: t.modelId?.name || t.customModelName || t.model,
    registrationNo: t.registrationNo,
    yearOfManufacture: t.yearOfManufacture?.toString(),
    yearOfPurchase: t.yearOfPurchase?.toString(),
    tractorType: t.tractorType,
    logoUrl: t.brandId?.logoUrl || t.logoUrl,
    // Keep original object reference if needed
    _original: t
  }));

  // Refetch when a new tractor is added or when screen gains focus
  React.useEffect(() => {
    if (route.params?.newTractorAdded) {
      refetch();
      navigation.setParams({ newTractorAdded: undefined });
    }
  }, [route.params?.newTractorAdded, refetch, navigation]);

  // Ensure data is fresh when returning to this screen
  const { useFocusEffect } = require('@react-navigation/native');
  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [refetch])
  );

  const handleDeletePress = (tractor: any) => {
    setSelectedTractor(tractor);
    setDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    if (selectedTractor) {
      deleteVehicle(selectedTractor.id || selectedTractor._id, {
        onSuccess: (response: any) => {
          showSnackbar({
            type: 'success',
            title: 'Success',
            description: response.message || response.data?.message || 'Vehicle deleted successfully'
          });
          setDeleteModalVisible(false);
          setSelectedTractor(null);
        },
        onError: (error: any) => {
          showSnackbar({
            type: 'error',
            title: 'Error',
            description: error.message || 'Failed to delete vehicle'
          });
        }
      });
    }
  };

  const renderEmptyState = () => {
    if (isLoadingVehicles) return null;
    return (
      <View style={styles.emptyContainer}>
        <TractorImage width={127} height={127} opacity={0.3} />
        <Text variant="medium" size={16} color={theme.colors.gray400} style={styles.emptyText}>
          {t('main.myTractor.emptyText')}
        </Text>
      </View>
    );
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <SecondaryHeader
          title={t('main.myTractor.title')}
          onBack={() => navigation.goBack()}
        />

        <Loader visible={isLoadingVehicles} />

        {!isLoadingVehicles && (
          <>
            <View style={styles.content}>
              <FlatList
                data={tractors}
                keyExtractor={(item: any) => item.id || item._id}
                renderItem={({ item, index }: { item: any; index: number }) => (
                  <TractorCard
                    tractor={item}
                    isSelectionMode={isSelectionMode}
                    selected={
                      route.params?.selectedTractorId === item.id ||
                      (route.params?.newTractorAdded && index === 0)
                    }
                    onPress={() => {
                      if (isSelectionMode) {
                        // In selection mode, clicking card also selects
                        const { DeviceEventEmitter } = require('react-native');
                        DeviceEventEmitter.emit('TRACTOR_SELECTED', item);
                        navigation.goBack();
                      } else {
                        // Card press goes to edit/update form ONLY from Profile
                        navigation.navigate('TractorDetails', {
                          tractor: item,
                          ...route.params
                        });
                      }
                    }}
                    onSelect={() => {
                      // Select button press goes back to checkout
                      if (isSelectionMode) {
                        const { DeviceEventEmitter } = require('react-native');
                        DeviceEventEmitter.emit('TRACTOR_SELECTED', item);
                        navigation.goBack();
                      }
                    }}
                    onDelete={() => handleDeletePress(item)}
                  />
                )}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={renderEmptyState}
                showsVerticalScrollIndicator={false}
                refreshControl={
                  <RefreshControl
                    refreshing={isFetching && !isLoadingVehicles}
                    onRefresh={refetch}
                    colors={[theme.colors.brandRed]}
                    tintColor={theme.colors.brandRed}
                  />
                }
              />
            </View>

            <View style={styles.footer}>
              <Button
                title={t('main.myTractor.addNew', 'Add New Tractor') + ' +'}
                onPress={() => navigation.navigate('MainTractorBrand', { ...route.params })}
              />
            </View>
          </>
        )}

        <Modal
          visible={deleteModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setDeleteModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text variant="semiBold" size={18} color={theme.colors.gray900} style={styles.modalTitle}>
                {t('common.delete')} {selectedTractor?.brand ? t(`common.brands.${selectedTractor.brand}`) : ''} {selectedTractor?.model}
              </Text>
              <Text variant="regular" size={14} color={theme.colors.gray500} style={styles.modalSubtitle}>
                {t('main.myTractor.deleteSubtitle')}
              </Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setDeleteModalVisible(false)}
                >
                  <Text variant="regular" size={14} color={theme.colors.gray700}>
                    {t('common.cancel')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.deleteButton, isDeleting && { opacity: 0.7 }]}
                  onPress={confirmDelete}
                  disabled={isDeleting}
                >
                  <Text variant="regular" size={14} color={theme.colors.white}>
                    {isDeleting ? t('common.deleting', 'Deleting...') : t('main.myTractor.deleteConfirm')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScreenWrapper>
  );
};

export default MyTractorsScreen;

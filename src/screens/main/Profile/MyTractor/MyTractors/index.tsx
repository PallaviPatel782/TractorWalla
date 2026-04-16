import React, { useState } from 'react';
import { Modal } from 'react-native';
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
import { useAppSelector, useAppDispatch } from '@store';
import { deleteTractor } from '@store/slices/authSlice';
import { createStyles } from './styles';
import { TractorImage } from '@assets/images';
import { SW, SH } from '@utils/Dimensions';

const MyTractorsScreen = ({ navigation }: any) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = createStyles(theme);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const tractors = user?.tractors || [];

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedTractor, setSelectedTractor] = useState<any>(null);

  const handleDeletePress = (tractor: any) => {
    setSelectedTractor(tractor);
    setDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    if (selectedTractor) {
      dispatch(deleteTractor(selectedTractor.id));
      setDeleteModalVisible(false);
      setSelectedTractor(null);
    }
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <TractorImage width={SW(127)} height={SH(127)} opacity={0.3} />
      <Text variant="medium" size={16} color={theme.colors.gray400} style={styles.emptyText}>
        {t('main.myTractor.emptyText')}
      </Text>
    </View>
  );

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <SecondaryHeader
          title={t('main.myTractor.title')}
          onBack={() => navigation.goBack()}
        />

        <View style={styles.content}>
          <FlatList
            data={tractors}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TractorCard
                tractor={item}
                onPress={() => navigation.navigate('TractorDetails', { tractor: item })}
                onDelete={() => handleDeletePress(item)}
              />
            )}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={renderEmptyState}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <View style={styles.footer}>
          <Button
            title={t('main.myTractor.addNew')}
            onPress={() => navigation.navigate('MainTractorBrand')}
          />
        </View>

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
                  <Text variant="regular" size={13} color={theme.colors.gray700}>
                    {t('common.cancel')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={confirmDelete}
                >
                  <Text variant="regular" size={13} color="#FFFFFF">
                    {t('main.myTractor.deleteConfirm')}
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

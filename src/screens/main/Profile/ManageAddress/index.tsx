import React, { useState } from 'react';
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

const MOCK_ADDRESSES = [
  {
    id: '1',
    label: 'Default',
    address: 'No. 26/1, Brigade World Trade Centre, 10th Floor, Dr. Raj Kumar Road, Malleshwaram (W) Bengaluru, Karnataka, India - 560055',
  },
  {
    id: '2',
    label: 'Your Address',
    address: 'No. 26/1, Brigade World Trade Centre, 10th Floor, Dr. Raj Kumar Road, Malleshwaram (W) Bengaluru, Karnataka, India - 560055',
  },
];

const ManageAddress = ({ navigation }: any) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = createStyles(theme);
  const [selectedId, setSelectedId] = useState('1');

  const renderAddressItem = ({ item }: { item: typeof MOCK_ADDRESSES[0] }) => {
    const isSelected = selectedId === item.id;
    return (
      <TouchableOpacity
        style={[styles.addressCard, isSelected && styles.addressCardSelected]}
        onPress={() => setSelectedId(item.id)}
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
            <TouchableOpacity style={styles.actionButton}>
              <Text variant="medium" size={11} style={styles.actionText}>{t('common.edit')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
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
          <SecondaryHeader title={t('main.manageAddress.title')} onBack={() => navigation.goBack()} />
        </View>

        <View style={styles.content}>
          <Text variant="semiBold" size={14} style={styles.sectionTitle}>
            {t('main.manageAddress.yourAddress')}
          </Text>

          <FlatList
            data={MOCK_ADDRESSES}
            renderItem={renderAddressItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <TouchableOpacity
          style={styles.footer}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('AddLocation')}
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

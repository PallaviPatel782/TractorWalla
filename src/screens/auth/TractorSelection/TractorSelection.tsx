import React, { useState } from 'react';
import { useTheme } from '@theme';
import {
  Text,
  SecondaryHeader,
  ScreenWrapper,
  View,
  FlatList,
  TouchableOpacity,
  Input,
} from '@components';
import { createStyles } from './TractorSelection.styles';
import { SW, SH } from '@utils/Dimensions';
import { SearchIcon } from '@icons';

const MOCK_MODELS = [
  'Mahindra 295 DI Turbo',
  'Mahindra Hindustan 60',
  'Mahindra 575 DI SP PLUS',
  'Mahindra Jivo 305 DI 4WD Vineyard',
  'Mahindra Jivo 345 YR2024',
  'Mahindra Jivo 345',
  'Mahindra Jivo 245 YR2024',
  'Mahindra Sarpanch 575',
  'Mahindra Bhoomiputra 575',
];

const TractorSelection = ({ navigation, route }: any) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { brand, brandLogo } = route.params;

  const [search, setSearch] = useState('');
  const [selectedModel, setSelectedModel] = useState('');

  const filteredModels = MOCK_MODELS.filter(model =>
    model.toLowerCase().includes(search.toLowerCase())
  );

  const handleModelSelect = (model: string) => {
    setSelectedModel(model);
    navigation.navigate('TractorBrandRegister', {
      brand,
      brandLogo,
      model
    });
  };

  const renderItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={styles.modelItem}
      onPress={() => handleModelSelect(item)}
    >
      <Text variant="medium" size={14} style={styles.modelName}>
        {item}
      </Text>
      <View style={[
        styles.radioButton,
        selectedModel === item && styles.radioButtonSelected
      ]}>
        {selectedModel === item && <View style={styles.radioInner} />}
      </View>
    </TouchableOpacity>
  );

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <SecondaryHeader title="Select Your Tractor" onBack={() => navigation.goBack()} />

        <View style={styles.content}>
          <Text variant="bold" size={18} style={styles.title}>
            All Tractors
          </Text>

          <View style={styles.searchBar}>
            <SearchIcon size={20} color={theme.colors.gray400} style={{ marginRight: SW(10) }} />
            <Input
              placeholder="Search by Model"
              placeholderTextColor={theme.colors.gray400}
              style={styles.searchInput}
              value={search}
              onChangeText={setSearch}
              hasBorder={false}
            />
          </View>

          <FlatList
            data={filteredModels}
            renderItem={renderItem}
            keyExtractor={(item) => item}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default TractorSelection;
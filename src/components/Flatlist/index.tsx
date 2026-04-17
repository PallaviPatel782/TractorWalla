import { SearchIcon } from '@assets/icons';
import Text from '../Text';
import View from '../View';
import TextInput from '../TextInput';
import { SW, SH, SF } from '@utils/Dimensions';
import React, { forwardRef, memo, useCallback, useMemo, useState } from 'react';
import {
  FlatList as RNFlatList,
  FlatListProps as RNFlatListProps,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  ListRenderItem,
} from 'react-native';

export interface FlatListProps<T>
  extends Omit<RNFlatListProps<T>, 'renderItem' | 'data'> {
  data: T[];
  renderItem: ListRenderItem<T>;

  /** Loading */
  loading?: boolean;

  /** Pull to refresh */
  refreshing?: boolean;
  onRefresh?: () => void;

  /** Pagination */
  onLoadMore?: () => void;
  isFetchingMore?: boolean;

  /** Empty */
  emptyMessage?: string;
  EmptyComponent?: React.ReactNode;

  /** Error */
  error?: string | null;

  /** 🔎 Search */
  enableSearch?: boolean;
  hideSearchBar?: boolean;
  searchPlaceholder?: string;
  searchKeys?: (keyof T)[];
  searchValue?: string;
  onSearchChange?: (text: string) => void;
  searchBarProps?: Partial<import('../TextInput').TextInputProps>;
}


function FlatListComponent<T extends Record<string, any>>(
  {
    data,
    renderItem,
    keyExtractor,
    loading,
    refreshing,
    onRefresh,
    onLoadMore,
    isFetchingMore,
    emptyMessage = 'No data found',
    EmptyComponent,
    error,

    enableSearch = false,
    hideSearchBar = false,
    searchPlaceholder = 'Search...',
    searchKeys = [],
    searchValue,
    onSearchChange,
    searchBarProps = {},

    contentContainerStyle,
    ...rest
  }: FlatListProps<T>,
  ref: React.Ref<RNFlatList<T>>,
) {
  /**
   * Internal search state (if uncontrolled)
   */
  const [internalSearch, setInternalSearch] = useState('');

  const searchText = searchValue ?? internalSearch;

  /**
   * Handle search change
   */
  const handleSearch = useCallback(
    (text: string) => {
      if (onSearchChange) {
        onSearchChange(text);
      } else {
        setInternalSearch(text);
      }
    },
    [onSearchChange],
  );

  /**
   * 🔎 Filtered Data (Memoized)
   */
  const filteredData = useMemo(() => {
    if (!enableSearch || !searchText?.trim()) {
      return data;
    }

    const lower = searchText.toLowerCase();

    return data.filter(item =>
      searchKeys.some(key => {
        const value = item[key];
        if (value == null) return false;
        return value.toString().toLowerCase().includes(lower);
      }),
    );
  }, [data, enableSearch, searchText, searchKeys]);

  /**
   * Default key extractor
   */
  const defaultKeyExtractor = useCallback(
    (item: any, index: number) =>
      keyExtractor
        ? keyExtractor(item, index)
        : item?.id?.toString() ?? index.toString(),
    [keyExtractor],
  );

  /**
   * Pagination footer
   */
  const renderFooter = useMemo(() => {
    if (!isFetchingMore) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" />
      </View>
    );
  }, [isFetchingMore]);

  /**
   * Empty state
   */
  const renderEmpty = useMemo(() => {
    if (loading) return null;

    if (error) {
      return (
        <View style={styles.center}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      );
    }

    if (EmptyComponent) {
      return <>{EmptyComponent}</>;
    }

    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>{emptyMessage}</Text>
      </View>
    );
  }, [loading, error, EmptyComponent, emptyMessage]);

  /**
   * onEndReached
   */
  const handleEndReached = useCallback(() => {
    if (!isFetchingMore && onLoadMore) {
      onLoadMore();
    }
  }, [isFetchingMore, onLoadMore]);

  /**
   * Search Header
   */
  const renderSearchBar = useMemo(() => {
    if (!enableSearch || hideSearchBar) return null;

    return (
      <View style={styles.searchContainer}>
        <TextInput
          size="sm"
          value={searchText}
          onChangeText={handleSearch}
          leftIcon={<SearchIcon size={16} color="black" />}
          style={{ borderRadius: 25 }}
          placeholder={searchPlaceholder}
          {...searchBarProps}
        />

      </View>
    );
  }, [
    enableSearch,
    hideSearchBar,
    searchText,
    handleSearch,
    searchPlaceholder,
    searchBarProps,
  ]);

  /**
   * Initial loader
   */
  if (loading && data.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <RNFlatList
      ref={ref}
      data={filteredData}
      renderItem={renderItem}
      keyExtractor={defaultKeyExtractor}
      ListHeaderComponent={renderSearchBar}
      ListEmptyComponent={renderEmpty}
      ListFooterComponent={renderFooter}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      removeClippedSubviews
      maxToRenderPerBatch={10}
      windowSize={10}
      initialNumToRender={8}
      refreshControl={
        onRefresh ? (
          <RefreshControl refreshing={!!refreshing} onRefresh={onRefresh} />
        ) : undefined
      }
      contentContainerStyle={contentContainerStyle}
      {...rest}
    />
  );
}

const FlatList = memo(forwardRef(FlatListComponent)) as <T>(
  props: FlatListProps<T> & { ref?: React.Ref<RNFlatList<T>> },
) => React.ReactElement;

export default FlatList;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    paddingVertical: SH(16),
  },
  emptyText: {
    fontSize: SF(14),
    color: '#999',
  },
  errorText: {
    fontSize: SF(14),
    color: 'red',
  },
  searchContainer: {
    marginHorizontal: SW(10),
    paddingVertical: SH(10),
  },
});

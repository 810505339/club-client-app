import { useRequest } from 'ahooks';
import React, { useState, useEffect } from 'react';
import { FlatList, RefreshControl, ActivityIndicator, Text, View, RefreshControlProps } from 'react-native';
import { useImmer } from 'use-immer';

interface IPaginatedFlatListProps<T> {
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T, index: number) => string;
  data: T[];
  onFetchData: (page: number) => Promise<T[]>;
  initialPage?: number;
  size?: number;
  refreshControlProps?: RefreshControlProps;
  errorComponent?: React.ReactNode;
  noDataComponent?: React.ReactNode;
  renderHeader?: React.ReactNode;
  params?: any
}

const INIT_STATE = {
  isLoading: false,
  isRefreshing: false,
  hasMoreData: true,
  error: null,
};

function CustomFlatList<T>({
  renderItem,
  keyExtractor,
  data,
  onFetchData,
  initialPage = 1,
  size = 20,
  params,
  refreshControlProps,
  errorComponent = <Text>Oops! Something went wrong.</Text>,
  noDataComponent = <Text>No data found.</Text>,
  renderHeader = <></>,
}: IPaginatedFlatListProps<T>) {
  // 初始化 state
  // const [page, setPage] = useState(initialPage);
  // const [isLoading, setIsLoading] = useState(false);
  // const [isRefreshing, setIsRefreshing] = useState(false);
  // const [hasMoreData, setHasMoreData] = useState(true);
  // const [error, setError] = useState<Error | null>(null);

  const [allData, setAllData] = useImmer({
    current: initialPage,
    ...INIT_STATE,
    data,
  });

  const { current, isLoading, isRefreshing, hasMoreData, error } = allData;

  const { run, runAsync } = useRequest(onFetchData, {
    manual: true,
  });

  // 当 current 发生变化时，重新获取数据
  useEffect(() => {
    run({ ...params, current, size });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  // 获取数据
  const fetchData = async () => {
    // 判断是否需要分页获取
    if (!hasMoreData || isLoading) {
      return;
    }
    setAllData(draft => {
      draft.isLoading = true;
      draft.error = null;
    });
    try {
      const newData = await runAsync({ ...params, current, size });
      if (newData.length < size) {
        // 如果返回的数据少于 pageSize，说明没有更多数据了

        setAllData(draft => {
          draft.hasMoreData = true;
        });
      }
      // 将新数据添加到现有数据后面
      setAllData(draft => {
        draft.data = [...draft.data, ...newData];
      });


    } catch (error) {
      setAllData(draft => {
        draft.error = error;
      });
    }
    setAllData(draft => {
      draft.isLoading = false;
    });

  };

  // 刷新数据
  const refreshData = async () => {
    if (isRefreshing) {
      return;
    }


    setAllData(draft => {

      Object.keys(INIT_STATE).forEach(item => {
        draft[item] = INIT_STATE[item];
      });
      draft.current = initialPage;
    });


    try {
      const newData = await runAsync({ ...params, current: initialPage, size });
      setAllData(draft => {
        draft.data = [...draft.data, ...newData];
      });
    } catch (error) {
      setAllData(draft => {
        draft.error = error;
      });
    }
    setAllData(draft => {
      draft.isRefreshing = false;
    });
  };

  // 渲染每个 item
  const renderItemWithIndex = ({ item, index }: { item: T; index: number }) => renderItem(item, index);

  // 渲染 FlatList
  return (
    <FlatList
      data={allData.data}
      ListHeaderComponent={renderHeader}
      renderItem={({ item, index }) => renderItemWithIndex({ item, index })}
      keyExtractor={keyExtractor}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={refreshData} {...refreshControlProps} />
      }
      onEndReachedThreshold={0.1}
      onEndReached={fetchData}
      ListFooterComponent={
        isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          !hasMoreData && (
            <View>
              {!data.length ? noDataComponent : null}
              {error ? errorComponent : null}
            </View>
          )
        )
      }
    />);
}


export default CustomFlatList;

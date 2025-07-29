import { ListItem, SearchBox } from "components";
import { useLocalSearchParams } from "expo-router";
import { getSearchSongs } from "fetchers";
import { memo, useCallback } from "react";
import { FlatList } from "react-native";
import type { SongSearch } from "structures";
import useSWRInfinite from "swr/infinite";
import { Spinner, Text, YStack } from "tamagui";

export default function SongSearchScreen() {
  const { query } = useLocalSearchParams();

  const { data, error, isLoading, isValidating, size, setSize } = useSWRInfinite(
    getKey,
    getSearchSongs
  );

  function getKey(page: number, prevPageData: SongSearch) {
    if (prevPageData && prevPageData.results?.length === 0) return null;
    return ["/search/songs", { q: query, p: page }];
  }

  const results = data?.flatMap((d) => d.results) ?? [];

  const MemoizedListItem = memo(ListItem);
  const renderItem = useCallback(
    ({ item }: { item: SongSearch["results"][number] }) => <MemoizedListItem {...item} />,
    []
  );

  if (isLoading) {
    return (
      <YStack bg="$background" flex={1} items="center" justify="center">
        <Spinner size="large" />
      </YStack>
    );
  }

  if (error || results.length === 0) {
    return (
      <YStack bg="$background" flex={1} items="center" justify="center">
        <Text>No songs found for {query}</Text>
      </YStack>
    );
  }

  return (
    <YStack flex={1} px="$4" bg="$background">
      <SearchBox query={query as string} />
      <FlatList
        data={results}
        keyExtractor={(item, index) => `${item.id}_${index}`}
        renderItem={renderItem}
        onEndReached={() => setSize(size + 1)}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isValidating && results.length > 0 ? (
            <YStack items="center" py="$4">
              <Spinner size="large" />
            </YStack>
          ) : null
        }
      />
    </YStack>
  );
}

import { CardItem, SearchBox } from "components";
import { useLocalSearchParams } from "expo-router";
import { getSearchArtists } from "fetchers";
import { memo, useCallback } from "react";
import { FlatList } from "react-native";
import type { ArtistSearch } from "structures";
import useSWRInfinite from "swr/infinite";
import { Spinner, Text, YStack } from "tamagui";
import { toCapitalize } from "utilities";

export default function ArtistSearchScreen() {
  const { query } = useLocalSearchParams();

  const { data, error, isLoading, isValidating, size, setSize } = useSWRInfinite(
    getKey,
    getSearchArtists
  );

  function getKey(page: number, prevPageData: ArtistSearch) {
    if (prevPageData && prevPageData.results?.length === 0) return null;
    return ["/search/artists", { q: query, p: page }];
  }

  const results = data?.flatMap((d) => d.results) ?? [];

  const MemoizedCardItem = memo(CardItem);
  const renderItem = useCallback(
    ({ item: it }: { item: ArtistSearch["results"][number] }) => (
      <MemoizedCardItem
        title={it.name}
        subtitle={toCapitalize(it.role)}
        image={it.image}
        perma_url={it.perma_url}
        circle
      />
    ),
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
        <Text>No artists found for {query}</Text>
      </YStack>
    );
  }

  return (
    <YStack flex={1} px="$4" bg="$background">
      <SearchBox query={query as string} />
      <FlatList
        data={results}
        keyExtractor={(item, index) => `${item.id}_${index}`}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-around",
          gap: 10,
        }}
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

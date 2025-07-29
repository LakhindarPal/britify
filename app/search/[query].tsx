import { SearchBox, SectionList } from "components";
import { useLocalSearchParams } from "expo-router";
import { getSearchAll } from "fetchers";
import useSWR from "swr";
import { ScrollView, Spinner, Text, YStack } from "tamagui";

export default function SearchScreen() {
  const { query } = useLocalSearchParams();
  const { data, error, isLoading } = useSWR(["/search", query], getSearchAll);

  if (isLoading) {
    return (
      <YStack bg="$background" flex={1} items="center" justify="center">
        <Spinner size="large" />
      </YStack>
    );
  }

  if (error) {
    return (
      <YStack bg="$background" flex={1} items="center" justify="center">
        <Text>No results found for {query}</Text>
      </YStack>
    );
  }

  const results = {
    "Top results": data?.topquery.data.filter((it) => it.type !== "artist"),
    Songs: data?.songs.data,
    Albums: data?.albums.data,
    Playlists: data?.playlists.data,
    // Artists: data?.artists.data,
  };

  return (
    <YStack flex={1} px="$4" bg="$background">
      <SearchBox query={query as string} />
      <ScrollView>
        <SectionList data={results} />
      </ScrollView>
    </YStack>
  );
}

import { CardItem, SectionList } from "components";
import { getLaunchData } from "fetchers";
import useSWR from "swr";
import { H2, ScrollView, Spinner, YStack } from "tamagui";
import { groupBy } from "utilities";

export default function HomeScreen() {
  const { data, isLoading } = useSWR(["/home"], getLaunchData);
  const trending = groupBy(data?.new_trending, (t) => t.type);
  const latest = groupBy(data?.new_albums, (t) => t.type);

  if (isLoading) {
    return (
      <YStack bg="$background" flex={1} items="center" justify="center">
        <Spinner size="large" />
      </YStack>
    );
  }

  const items = {
    "Trending Songs": trending.song,
    "Trending Albums": trending.album,
    "Trending Playlists": trending.playlist,
    "Editorial Picks": data?.top_playlists,
    "Latest Songs": latest.song,
    "Latest Albums": latest.album,
    "Top Charts": data?.charts,
    // "Spotlight Artists": data?.artist_recos,
    "Mood Mixes": data?.tag_mixes,
  };

  return (
    <ScrollView px="$4" bg="$background" showsVerticalScrollIndicator={false}>
      <SectionList data={items} />
      <YStack>
        <H2 fontSize="$5" fontWeight="700" mb="$2" $sm={{ fontSize: "$4" }}>
          Artists
        </H2>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          mb="$2"
          contentContainerStyle={{
            gap: "$2",
            pr: "$2",
          }}
        >
          {data?.artist_recos?.map((it) => (
            <CardItem
              key={it.id}
              title={it.title}
              image={it.image}
              perma_url={it.perma_url}
            />
          ))}
        </ScrollView>
      </YStack>
    </ScrollView>
  );
}

import { Dot as DotIcon } from "@tamagui/lucide-icons";
import { HeroBanner, ListItem } from "components";
import { Redirect, type RelativePathString, useLocalSearchParams } from "expo-router";
import { getArtistOverview } from "fetchers";
import { memo, useCallback, useState } from "react";
import { FlatList } from "react-native";
import type { ArtistOverview } from "structures";
import useSWRInfinite from "swr/infinite";
import { Separator, SizableText, Spinner, ToggleGroup, XStack, YStack } from "tamagui";
import { prettifyNumber, toCapitalize } from "utilities";

export default function ArtistOverviewScreen() {
  const { token } = useLocalSearchParams();
  const [filter, setFilter] = useState("category=&sort_order=asc");

  const { data, error, isLoading, isValidating, size, setSize } = useSWRInfinite(
    getKey,
    getArtistOverview
  );

  function getKey(page: number, prevPageData: ArtistOverview) {
    if (prevPageData && prevPageData.topSongs?.length === 0) return null;
    return [
      "/artist/songs",
      token,
      `p=${page}&n_song=20&n_album=0&sub_type=songs&more=true&${filter}`,
    ];
  }

  const results = data?.flatMap((d) => d.topSongs) ?? [];
  const artist = data?.[0];

  const MemoizedListItem = memo(ListItem);
  const renderItem = useCallback(
    ({ item }: { item: ArtistOverview["topSongs"][number] }) => (
      <MemoizedListItem {...item} />
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

  if (error) {
    <Redirect href={"/404" as RelativePathString} />;
  }

  return (
    <YStack flex={1} px="$4" bg="$background">
      <HeroBanner
        id={artist?.artistId!}
        title={artist?.name!}
        subtitle={artist?.dominantType}
        type="artist"
        image={artist?.image!}
        showImage={false}
        songs={results}
        perma_url={artist?.urls.songs!}
      >
        <XStack>
          <SizableText>{toCapitalize(artist?.dominantType)}</SizableText>
          <DotIcon />
          <SizableText>{prettifyNumber(Number(artist?.fan_count))} Listeners</SizableText>
        </XStack>
      </HeroBanner>
      <Separator my="$1.5" />
      <ToggleGroup
        type="single"
        orientation="horizontal"
        onValueChange={setFilter}
        gap="$5"
        mb="$3"
        justify="space-around"
      >
        <ToggleGroup.Item value="category=&sort_order=asc" hoverTheme focusTheme>
          <SizableText>Popular</SizableText>
        </ToggleGroup.Item>
        <ToggleGroup.Item value="category=latest&sort_order=desc" hoverTheme focusTheme>
          <SizableText>Date</SizableText>
        </ToggleGroup.Item>
        <ToggleGroup.Item
          value="category=alphabetical&sort_order=asc"
          hoverTheme
          focusTheme
        >
          <SizableText>Name</SizableText>
        </ToggleGroup.Item>
      </ToggleGroup>
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

import { Dot as DotIcon } from "@tamagui/lucide-icons";
import { HeroBanner, ListItem, SectionList } from "components";
import { Redirect, type RelativePathString, useLocalSearchParams } from "expo-router";
import { getPlaylistDetail, getRecoPlaylists } from "fetchers";
import useSWR from "swr";
import { ScrollView, Separator, SizableText, Spinner, XStack, YStack } from "tamagui";
import { dedupArtists, listDuration } from "utilities";

export default function PlaylistScreen() {
  const { token } = useLocalSearchParams();
  const { data, error, isLoading } = useSWR(["/playlist", token], getPlaylistDetail);

  if (error) {
    <Redirect href={"/404" as RelativePathString} />;
  }

  const { data: recommended } = useSWR(
    [`/reco/playlist`, data?.modules.relatedPlaylist.source_params],
    getRecoPlaylists
  );

  if (isLoading) {
    return (
      <YStack bg="$background" flex={1} items="center" justify="center">
        <Spinner size="large" />
      </YStack>
    );
  }

  const extras = {
    "You might like": recommended,
    Artists: dedupArtists(data?.more_info.artists!),
  };

  return (
    <ScrollView px="$4" bg="$background" showsVerticalScrollIndicator={false}>
      <HeroBanner
        id={data?.id!}
        title={data?.title!}
        subtitle={data?.subtitle}
        type="playlist"
        image={data?.image!}
        perma_url={data?.perma_url!}
        description={data?.header_desc}
        songs={data?.list!}
      >
        <XStack>
          <SizableText>{data?.subtitle}</SizableText>
          <DotIcon />
          <SizableText>{data?.list_count} Songs</SizableText>
          <DotIcon />
          <SizableText>{listDuration(data?.list)}</SizableText>
        </XStack>
      </HeroBanner>
      <Separator my="$1.5" />
      <YStack>
        {data?.list.map((it) => (
          <ListItem key={it.id} {...it} />
        ))}
      </YStack>
      <Separator my="$1.5" />
      <SectionList data={extras} />
    </ScrollView>
  );
}

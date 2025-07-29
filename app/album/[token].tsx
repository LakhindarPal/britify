import { Dot as DotIcon } from "@tamagui/lucide-icons";
import { HeroBanner, ListItem, SectionList } from "components";
import { Redirect, type RelativePathString, useLocalSearchParams } from "expo-router";
import { getAlbumDetail, getRecoAlbums, getYearAlbums } from "fetchers";
import he from "he";
import useSWRImmutable from "swr/immutable";
import { ScrollView, Separator, SizableText, Spinner, XStack, YStack } from "tamagui";
import { dedupArtists, listDuration, toCapitalize } from "utilities";

export default function AlbumScreen() {
  const { token } = useLocalSearchParams();
  const { data, error, isLoading } = useSWRImmutable(["/album", token], getAlbumDetail);

  if (error) {
    <Redirect href={"/404" as RelativePathString} />;
  }

  const { data: recommended } = useSWRImmutable(
    [`/reco/album`, data?.modules.reco.source_params],
    getRecoAlbums
  );

  const { data: yearAlbums } = useSWRImmutable(
    [`/yearalbums`, data?.modules.topAlbumsFromSameYear.source_params],
    getYearAlbums
  );

  if (isLoading) {
    return (
      <YStack bg="$background" flex={1} items="center" justify="center">
        <Spinner size="large" />
      </YStack>
    );
  }

  const description =
    "By artists like " +
    data?.more_info.artistMap.primary_artists.map((art) => he.decode(art.name)).join(",");

  const extras = {
    "You might like": recommended,
    "From same year": yearAlbums,
    Artists: dedupArtists(data?.more_info.artistMap.artists!),
  };

  return (
    <ScrollView px="$4" bg="$background" showsVerticalScrollIndicator={false}>
      <HeroBanner
        id={data?.id!}
        title={data?.title!}
        subtitle={data?.subtitle}
        type="album"
        image={data?.image!}
        perma_url={data?.perma_url!}
        description={description}
        songs={data?.list!}
      >
        <XStack>
          <SizableText>{data?.year}</SizableText>
          <DotIcon />
          <SizableText>{toCapitalize(data?.language ?? "")} Album</SizableText>
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

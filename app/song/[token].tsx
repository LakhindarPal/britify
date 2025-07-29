import { Dot as DotIcon } from "@tamagui/lucide-icons";
import { HeroBanner, ListItem, SectionList } from "components";
import { Redirect, type RelativePathString, useLocalSearchParams } from "expo-router";
import {
  getActorSongs,
  getAlbumDetail,
  getArtistSongs,
  getRecoSongs,
  getSongDetail,
} from "fetchers";
import he from "he";
import { Fragment } from "react";
import useSWRImmutable from "swr/immutable";
import { H2, ScrollView, Separator, SizableText, Spinner, XStack, YStack } from "tamagui";
import { formatDuration, prettifyNumber } from "utilities";
import { dedupArtists } from "utilities/dedupArtists";

export default function SongScreen() {
  const { token } = useLocalSearchParams();
  const { data, error, isLoading } = useSWRImmutable(["/song", token], getSongDetail);
  const song = data?.songs[0];

  if (error || !song) {
    <Redirect href={"/404" as RelativePathString} />;
  }

  const { data: album } = useSWRImmutable(
    ["/album", song?.more_info.album_url.split("/").pop()!],
    getAlbumDetail
  );
  const albumSongs = album?.list.filter((s) => s.id != song?.id);

  const { data: recommended } = useSWRImmutable(
    [`/reco/songs`, data?.modules.reco.source_params],
    getRecoSongs
  );

  const { data: actorSongs } = useSWRImmutable(
    [`/actorsongs`, data?.modules.songsBysameActors.source_params],
    getActorSongs
  );

  const { data: artistSongs } = useSWRImmutable(
    [`/artistsongs`, data?.modules.songsBysameArtists.source_params],
    getArtistSongs
  );

  if (isLoading) {
    return (
      <YStack bg="$background" flex={1} items="center" justify="center">
        <Spinner size="large" />
      </YStack>
    );
  }

  const description = `From ${he.decode(song?.more_info.album || "")} by artists like ${song?.more_info.artistMap.primary_artists
    .map((art) => he.decode(art.name))
    .join(", ")}`;
  const extras = {
    "You might like": recommended,
    "From same artists": artistSongs,
    "From same actors": actorSongs,
    "Artists & Actors": dedupArtists(song?.more_info.artistMap.artists!),
  };

  return (
    <ScrollView px="$4" bg="$background" showsVerticalScrollIndicator={false}>
      <HeroBanner
        id={song?.id!}
        title={song?.title!}
        subtitle={song?.subtitle}
        type="song"
        image={song?.image!}
        description={description}
        songs={data?.songs!}
        perma_url={song?.perma_url!}
      >
        <XStack>
          <SizableText>{song?.year}</SizableText>
          <DotIcon />
          <SizableText>{prettifyNumber(Number(song?.play_count))} plays</SizableText>
          <DotIcon />
          <SizableText>
            {formatDuration(Number(song?.more_info.duration), "pretty")}
          </SizableText>
        </XStack>
      </HeroBanner>
      {!!albumSongs?.length && (
        <Fragment>
          <Separator my="$1.5" />
          <YStack>
            <H2 fontSize="$5" fontWeight="700" mb="$2" $sm={{ fontSize: "$4" }}>
              From same album
            </H2>
            {albumSongs.map((it) => (
              <ListItem key={it.id} {...it} />
            ))}
          </YStack>
        </Fragment>
      )}
      <Separator my="$1.5" />
      <SectionList data={extras} />
    </ScrollView>
  );
}

import { ChevronRight as ChevronRightIcon, Dot as DotIcon } from "@tamagui/lucide-icons";
import { CardItem, HeroBanner, ListItem, SectionList } from "components";
import {
  Link,
  Redirect,
  type RelativePathString,
  useLocalSearchParams,
} from "expo-router";
import { getArtistOverview } from "fetchers";
import { Fragment } from "react";
import useSWR from "swr";
import { H2, ScrollView, Separator, SizableText, Spinner, XStack, YStack } from "tamagui";
import { prettifyNumber, toCapitalize } from "utilities";

export default function ArtistOverviewScreen() {
  const { token } = useLocalSearchParams();
  const { data, error, isLoading } = useSWR(
    ["/artist/overview", token, "p=0&n_song=10&n_album=10"],
    getArtistOverview
  );

  if (error) {
    <Redirect href={"/404" as RelativePathString} />;
  }

  if (isLoading) {
    return (
      <YStack bg="$background" flex={1} items="center" justify="center">
        <Spinner size="large" />
      </YStack>
    );
  }

  const extras = {
    [`Just ${data?.name.split(" ")[0]}`]: data?.dedicated_artist_playlist,
    "Featured In": data?.featured_artist_playlist,
    "Top Singles": data?.singles,
    "New Releases": data?.latest_release,
    "Similar Artists": data?.similarArtists,
  };

  return (
    <ScrollView px="$4" bg="$background" showsVerticalScrollIndicator={false}>
      <HeroBanner
        id={data?.artistId!}
        title={data?.name!}
        subtitle={data?.dominantType}
        type="artist"
        image={data?.image!}
        songs={data?.topSongs!}
        perma_url={data?.urls.overview!}
      >
        <XStack>
          <SizableText>{toCapitalize(data?.dominantType)}</SizableText>
          <DotIcon />
          <SizableText>{prettifyNumber(Number(data?.fan_count))} Listeners</SizableText>
        </XStack>
      </HeroBanner>
      <Separator my="$1.5" />
      <YStack>
        <XStack gap="$2" justify="space-between" items="center">
          <H2 fontSize="$5" fontWeight="700" mb="$2" $sm={{ fontSize: "$4" }}>
            Top Songs
          </H2>
          <Link href={`/artist/${token}/songs`}>
            <SizableText color="$blue11">View more</SizableText>
            <ChevronRightIcon color="$blue11" />
          </Link>
        </XStack>
        <YStack>
          {data?.topSongs.map((it) => (
            <ListItem key={it.id} {...it} />
          ))}
        </YStack>
      </YStack>
      {!!data?.topAlbums.length && (
        <Fragment>
          <Separator my="$1.5" />
          <YStack>
            <XStack gap="$2" justify="space-between" items="center">
              <H2 fontSize="$5" fontWeight="700" mb="$2" $sm={{ fontSize: "$4" }}>
                Top Albums
              </H2>
              <Link href={`/artist/${token}/albums`}>
                <SizableText color="$blue11">View more</SizableText>
                <ChevronRightIcon color="$blue11" />
              </Link>
            </XStack>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              mb="$2"
              contentContainerStyle={{
                gap: "$2",
                pr: "$2",
              }}
            >
              {data?.topAlbums?.map((it) => (
                <CardItem
                  key={it.id}
                  title={it.title}
                  subtitle={it.subtitle}
                  image={it.image}
                  perma_url={it.perma_url}
                />
              ))}
            </ScrollView>
          </YStack>
        </Fragment>
      )}
      <Separator my="$1.5" />
      <SectionList data={extras} />
    </ScrollView>
  );
}

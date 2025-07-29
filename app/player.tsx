import {
  HeartOff as HeartOffIcon,
  HeartPlus as HeartPlusIcon,
  LetterText as LetterTextIcon,
  ListMusic as ListMusicIcon,
  PauseCircle as PauseCircleIcon,
  PlayCircle as PlayCircleIcon,
  RefreshCwOff as RefreshCwOffIcon,
  Repeat as RepeatAllIcon,
  Repeat1 as RepeatOneIcon,
  Share2 as ShareIcon,
  Shuffle as ShuffleIcon,
  SkipBack as SkipBackIcon,
  SkipForward as SkipForwardIcon,
} from "@tamagui/lucide-icons";
import { SheetModal } from "components";
import { QueueItem } from "components/QueueItem";
import { toggleFavourite, useIsFavourited } from "database";
import { Link, type RelativePathString } from "expo-router";
import { getSongLyrics } from "fetchers";
import he from "he";
import { useQueueTracks, useRepeatMode } from "player";
import { useState } from "react";
import { Share } from "react-native";
import TrackPlayer, {
  useActiveTrack,
  useIsPlaying,
  useProgress,
} from "react-native-track-player";
import type { FavouriteItem, Track } from "structures";
import useSWRImmutable from "swr/immutable";
import {
  Button,
  H1,
  Image,
  Paragraph,
  Separator,
  Sheet,
  Slider,
  Spinner,
  Text,
  View,
  XStack,
  YStack,
} from "tamagui";
import { formatDuration, parsePath } from "utilities";

export default function PlayerScreen() {
  const track = useActiveTrack() as Track;
  const tracks = useQueueTracks() as Track[];
  const { playing, bufferingDuringPlay } = useIsPlaying();
  const { repeatMode, cycleRepeatMode } = useRepeatMode();
  const { position, buffered, duration } = useProgress(250);
  const [isFavourite, setIsFavUI] = useIsFavourited(track?.id);
  const { data } = useSWRImmutable(["/song-lyrics", track?.id], getSongLyrics);
  const [activeSheet, setActiveSheet] = useState<"lyrics" | "queue" | null>(null);

  if (!track) return null;

  const lyrics = he
    .decode(data?.lyrics || "")
    ?.split("<br><br>")
    .map((stanza) =>
      stanza
        .split("<br>")
        .map((line) => line.trim())
        .filter(Boolean)
    );

  const favItem = {
    id: track.id,
    title: track.title,
    subtitle: track.artist,
    image: track.artwork,
    type: "song",
    perma_url: track.perma_url,
  } as FavouriteItem;

  const repeatIcons = [RefreshCwOffIcon, RepeatOneIcon, RepeatAllIcon] as const;

  return (
    <YStack bg="$background" items="center" flex={1} justify="center" p="$4" gap="$2">
      <Image
        source={{
          width: 500,
          height: 500,
          uri: track.artwork,
        }}
        rounded="$2"
        width={350}
        height={350}
      />
      <XStack my="$2" justify="space-between" columnGap="$2" width="100%" px="$1">
        <YStack>
          <Link href={parsePath(track.perma_url) as RelativePathString}>
            <H1 fontSize="$5" fontWeight="600" lineHeight="$1" $sm={{ fontSize: "$2" }}>
              {track.title!}
            </H1>
          </Link>

          <Text numberOfLines={1}>{track.artist!}</Text>
        </YStack>
        <Button
          icon={isFavourite ? HeartOffIcon : HeartPlusIcon}
          scaleIcon={1.5}
          chromeless
          unstyled
          justify="center"
          onPress={async () => await toggleFavourite(favItem, setIsFavUI)}
        ></Button>
      </XStack>
      <Slider
        width={350}
        orientation="horizontal"
        value={[Math.floor(position)]}
        max={Math.floor(duration || track.duration!)}
        step={1}
        onValueChange={async (values) => {
          await TrackPlayer.seekTo(values[0]);
        }}
      >
        <Slider.Track>
          <View
            bg="lightgrey"
            position="absolute"
            height="100%"
            width={Math.floor(buffered / track.duration!) * 350}
          />
          <Slider.TrackActive />
        </Slider.Track>
        <Slider.Thumb size="$1" index={0} circular />
      </Slider>
      <XStack justify="space-between" width="100%">
        <Text>{formatDuration(Math.floor(position))}</Text>
        <Text>{formatDuration(Math.floor(duration))}</Text>
      </XStack>
      <XStack justify="space-around" width="100%">
        <Button
          icon={ShuffleIcon}
          chromeless
          scaleIcon={2}
          unstyled
          justify="center"
          onPress={() => ""}
        ></Button>
        <Button
          icon={SkipBackIcon}
          chromeless
          scaleIcon={2}
          unstyled
          justify="center"
          onPress={async () => await TrackPlayer.skipToPrevious()}
        ></Button>
        <Button
          icon={
            bufferingDuringPlay ? (
              <Spinner size="small" />
            ) : playing ? (
              PauseCircleIcon
            ) : (
              PlayCircleIcon
            )
          }
          chromeless
          scaleIcon={3.5}
          unstyled
          justify="center"
          disabled={bufferingDuringPlay}
          onPress={async () =>
            playing ? await TrackPlayer.pause() : await TrackPlayer.play()
          }
        ></Button>
        <Button
          icon={SkipForwardIcon}
          chromeless
          scaleIcon={2}
          unstyled
          justify="center"
          onPress={async () => await TrackPlayer.skipToNext()}
        ></Button>
        <Button
          icon={repeatIcons[repeatMode]}
          chromeless
          scaleIcon={2}
          unstyled
          justify="center"
          onPress={cycleRepeatMode}
        ></Button>
      </XStack>
      <Separator my="$4" />
      <XStack justify="space-around" width="100%">
        <Button
          icon={ShareIcon}
          chromeless
          scaleIcon={1.5}
          onPress={async () => {
            await Share.share({ message: track.perma_url });
          }}
        ></Button>
        <Button
          icon={LetterTextIcon}
          chromeless
          scaleIcon={1.5}
          onPress={() => setActiveSheet("lyrics")}
        ></Button>
        <Button
          icon={ListMusicIcon}
          chromeless
          scaleIcon={1.5}
          onPress={() => setActiveSheet("queue")}
        ></Button>
        <SheetModal open={!!activeSheet} setOpen={() => setActiveSheet(null)}>
          <Sheet.ScrollView maxH="$20">
            {activeSheet === "lyrics"
              ? lyrics.map((lines, idx) => <LyricView key={idx} lines={lines} />)
              : tracks.map((it, idx) => (
                  <QueueItem key={idx + it.id} track={it} index={idx} />
                ))}
          </Sheet.ScrollView>
        </SheetModal>
      </XStack>
    </YStack>
  );
}

function LyricView({ lines }: { lines: string[] }) {
  return (
    <YStack my="$3">
      {lines.map((line, i) => (
        <Paragraph key={i} fontSize="$5" fontWeight="500">
          {line}
        </Paragraph>
      ))}
    </YStack>
  );
}

import { Pause as PauseIcon, Play as PlayIcon } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import TrackPlayer, { useActiveTrack, useIsPlaying } from "react-native-track-player";
import { Button, H4, Image, Spinner, Text, XStack, YStack } from "tamagui";

export function FloatingPlayer() {
  const { playing, bufferingDuringPlay } = useIsPlaying();
  const track = useActiveTrack();
  if (!track) return null;

  return (
    <XStack
      bg="$background"
      items="center"
      justify="space-between"
      gap="$2"
      position="absolute"
      b={45}
      p="$2"
      z={100_100}
      onPress={() => router.navigate("/player")}
    >
      <Image
        source={{ width: 500, height: 500, uri: track.artwork }}
        rounded="$2"
        width={48}
        height={48}
        flex={0}
      />
      <YStack flex={1} mx="$2" overflow="hidden">
        <H4
          fontSize="$3"
          fontWeight="600"
          numberOfLines={1}
          px="$1"
          $sm={{ fontSize: "$2" }}
        >
          {track.title!}
        </H4>
        <Text numberOfLines={1} px="$1">
          {track.artist!}
        </Text>
      </YStack>
      <Button
        icon={
          bufferingDuringPlay ? <Spinner size="small" /> : playing ? PauseIcon : PlayIcon
        }
        chromeless
        scaleIcon={2.5}
        mr="$2"
        disabled={bufferingDuringPlay}
        onPress={async () =>
          playing ? await TrackPlayer.pause() : await TrackPlayer.play()
        }
      ></Button>
    </XStack>
  );
}

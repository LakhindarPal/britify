import TrackPlayer from "react-native-track-player";
import type { Track } from "structures";
import { H4, Image, Text, XStack, YStack } from "tamagui";

export function QueueItem({ track, index }: { track: Track; index: number }) {
  return (
    <XStack
      items="center"
      justify="space-between"
      gap="$2"
      hoverStyle={{ scale: 1.03 }}
      pressStyle={{ scale: 0.97 }}
      rounded="$2"
      onPress={async () => await TrackPlayer.skip(index)}
      width="100%"
    >
      <Image
        source={{ width: 500, height: 500, uri: track.artwork }}
        rounded="$2"
        width={48}
        height={48}
        flex={0}
      />
      <YStack flex={1} mx="$3" overflow="hidden">
        <H4 fontSize="$3" fontWeight="600" numberOfLines={1} $sm={{ fontSize: "$2" }}>
          {track.title}
        </H4>
        <Text numberOfLines={1}>{track.artist}</Text>
      </YStack>
    </XStack>
  );
}

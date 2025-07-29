import { Link, type RelativePathString } from "expo-router";
import he from "he";
import type { ListSong } from "structures";
import { H4, Image, Text, XStack, YStack } from "tamagui";
import { parsePath } from "utilities";
import { MoreOptions } from "./MoreOptions";

export function ListItem(data: ListSong) {
  return (
    <Link href={parsePath(data.perma_url) as RelativePathString} asChild>
      <XStack
        items="center"
        justify="space-between"
        gap="$2"
        hoverStyle={{ scale: 1.03 }}
        rounded="$2"
      >
        <Image
          source={{ width: 150, height: 150, uri: data.image }}
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
            {he.decode(data.title)}
          </H4>
          <Text numberOfLines={1} px="$1">
            {he.decode(data.subtitle)}
          </Text>
        </YStack>

        <MoreOptions {...data} />
      </XStack>
    </Link>
  );
}

import { Link, type RelativePathString } from "expo-router";
import he from "he";
import { H3, Image, Text, YStack } from "tamagui";
import { parsePath } from "utilities";

type Props = {
  title: string;
  subtitle?: string;
  image: string;
  perma_url: string;
  circle?: boolean;
};

export function CardItem({ title, subtitle, image, perma_url, circle }: Props) {
  return (
    <Link href={parsePath(perma_url) as RelativePathString} asChild>
      <YStack
        group
        items="center"
        justify="center"
        width={150}
        rounded="$4"
        hoverStyle={{ scale: 1.03 }}
        pressStyle={{ scale: 0.97 }}
        rowGap="$1"
        $md={{ width: 120 }}
        $sm={{ width: 100 }}
      >
        <Image
          source={{ width: 150, height: 150, uri: image }}
          self="center"
          rounded={circle || /\/artist\//i.test(perma_url) ? 9999 : "$3"}
          $md={{ width: 120, height: 120 }}
          $sm={{ width: 100, height: 100 }}
        />

        <H3
          fontSize="$3"
          fontWeight="600"
          text="center"
          numberOfLines={1}
          px="$1"
          $sm={{ fontSize: "$2" }}
          $group-hover={{ color: "$red10" }}
          $group-press={{ color: "$red9" }}
        >
          {he.decode(title)}
        </H3>

        {subtitle && (
          <Text text="center" numberOfLines={1} px="$1">
            {he.decode(subtitle)}
          </Text>
        )}
      </YStack>
    </Link>
  );
}

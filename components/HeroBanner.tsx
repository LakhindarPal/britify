import type { IconProps } from "@tamagui/helpers-icon";
import {
  HeartOff as HeartOffIcon,
  HeartPlus as HeartPlusIcon,
  ListPlus as ListPlusIcon,
  PlayCircle as PlayCircleIcon,
  Share2 as ShareIcon,
} from "@tamagui/lucide-icons";
import { useToastController } from "@tamagui/toast";
import { toggleFavourite, useIsFavourited } from "database";
import he from "he";
import type { JSX, ReactNode } from "react";
import { Share } from "react-native";
import TrackPlayer from "react-native-track-player";
import type { FavouriteItem, ListSong } from "structures";
import { Button, H1, Image, Paragraph, XStack, YStack } from "tamagui";
import { createTrack } from "utilities";

type IconComponent = (propsIn: IconProps) => JSX.Element;

const CtaButton = ({ Icon, onPress }: { Icon: IconComponent; onPress: () => void }) => (
  <Button
    self="center"
    icon={Icon}
    scaleIcon={2.5}
    hoverStyle={{ scale: 1.05 }}
    pressStyle={{ scale: 0.95 }}
    focusStyle={{ scale: 1.05 }}
    onPress={onPress}
    rounded={9999}
    chromeless
  ></Button>
);

interface Props extends FavouriteItem {
  showImage?: boolean;
  description?: string;
  songs: ListSong[];
  children: ReactNode;
}

export function HeroBanner({
  id,
  title,
  subtitle = "",
  image,
  type,
  showImage = true,
  description,
  songs,
  perma_url,
  children: stats,
}: Props) {
  const toast = useToastController();
  const [isFavourite, setIsFavUI] = useIsFavourited(id);
  const item = { id, title, subtitle: subtitle, image, type, perma_url };

  return (
    <YStack mt="$3">
      {showImage && (
        <Image
          source={{
            width: 250,
            height: 250,
            uri: image.replace(/(?:50|150)x(?:50|150)\.jpg/g, "250x250.jpg"),
          }}
          self="center"
          rounded="$3"
        />
      )}
      <H1 my="$2" fontSize="$8" fontWeight="900" lineHeight="$5">
        {he.decode(title)}
      </H1>
      {description && (
        <Paragraph numberOfLines={2} ellipsizeMode="tail">
          {he.decode(description)}
        </Paragraph>
      )}
      {stats}
      <XStack gap="$3" py="$1">
        {!!songs.length && (
          <CtaButton
            Icon={PlayCircleIcon}
            onPress={async () => await play(songs, toast)}
          />
        )}
        {!!songs.length && (
          <CtaButton Icon={ListPlusIcon} onPress={async () => await add(songs, toast)} />
        )}
        <CtaButton
          Icon={isFavourite ? HeartOffIcon : HeartPlusIcon}
          onPress={async () => await save(item, setIsFavUI, toast)}
        />
        <CtaButton Icon={ShareIcon} onPress={async () => await share(perma_url)} />
      </XStack>
    </YStack>
  );
}

async function play(songs: ListSong[], toast) {
  await TrackPlayer.setQueue([createTrack(songs[0])]);
  await TrackPlayer.play();
  if (songs.length > 1) {
    const restTracks = songs.splice(1).map((it) => createTrack(it));
    await TrackPlayer.add(restTracks);
    toast.show(`${restTracks.length} songs added to queue`, { native: true });
  }
}

async function add(songs: ListSong[], toast) {
  const tracks = songs.map((it) => createTrack(it));
  await TrackPlayer.add(tracks);
  toast.show(`${songs.length} songs added to queue`, { native: true });
}

async function save(item: FavouriteItem, setIsFavUI, toast) {
  const isFavourite = await toggleFavourite(item, setIsFavUI);
  toast.show(isFavourite ? "Saved to favourites" : "Removed from favourites", {
    native: true,
  });
}

async function share(url: string) {
  await Share.share({ message: url });
}

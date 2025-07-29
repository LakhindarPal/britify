import {
  HeartOff as HeartOffIcon,
  HeartPlus as HeartPlusIcon,
  ListPlus as ListPlusIcon,
  MoreVertical as MoreIcon,
  Play as PlayIcon,
  Share2 as ShareIcon,
} from "@tamagui/lucide-icons";
import { useToastController } from "@tamagui/toast";
import { toggleFavourite, useIsFavourited } from "database";
import he from "he";
import { Fragment, useState } from "react";
import { Share } from "react-native";
import TrackPlayer from "react-native-track-player";
import type { ListSong } from "structures";
import {
  Button,
  H3,
  Image,
  ListItem,
  Separator,
  Text,
  XStack,
  YGroup,
  YStack,
} from "tamagui";
import { createTrack } from "utilities";
import { SheetModal } from "./SheetModal";

export function MoreOptions(data: ListSong) {
  const [open, setOpen] = useState(false);
  const [isFavourite, setIsFavUI] = useIsFavourited(data.id);
  const toast = useToastController();
  const favItem = {
    id: data.id,
    title: data.title,
    subtitle: data.subtitle,
    image: data.image,
    type: data.type,
    perma_url: data.perma_url,
  };

  return (
    <Fragment>
      <Button chromeless icon={MoreIcon} onPress={() => setOpen(true)}></Button>
      <SheetModal open={open} setOpen={setOpen}>
        <YGroup self="center">
          <YGroup.Item>
            <XStack items="center" justify="space-between" gap="$1" rounded="$2" mb="$3">
              <Image
                source={{ width: 150, height: 150, uri: data.image }}
                rounded="$2"
                width={48}
                height={48}
                flex={0}
              />
              <YStack flex={1} mx="$2" overflow="hidden">
                <H3
                  fontSize="$3"
                  fontWeight="600"
                  numberOfLines={1}
                  $sm={{ fontSize: "$2" }}
                >
                  {he.decode(data.title)}
                </H3>
                <Text numberOfLines={1}>{he.decode(data.subtitle)}</Text>
              </YStack>
            </XStack>
          </YGroup.Item>
          <Separator />
          <YGroup.Item>
            <ListItem
              hoverTheme
              pressTheme
              title="Play song now"
              icon={PlayIcon}
              onPress={async () => {
                await TrackPlayer.setQueue([createTrack(data)]);
                await TrackPlayer.play();
                setOpen(false);
              }}
            />
          </YGroup.Item>
          <YGroup.Item>
            <ListItem
              hoverTheme
              pressTheme
              title="Add to queue"
              icon={ListPlusIcon}
              onPress={async () => {
                await TrackPlayer.add([createTrack(data)]);
                setOpen(false);
                toast.show("Added to queue", { native: true });
              }}
            />
          </YGroup.Item>
          <YGroup.Item>
            <ListItem
              hoverTheme
              pressTheme
              title={isFavourite ? "Remove favourite" : "Save to favourites"}
              icon={isFavourite ? HeartOffIcon : HeartPlusIcon}
              onPress={async () => {
                setOpen(false);
                const isFavourite = await toggleFavourite(favItem, setIsFavUI);
                toast.show(
                  isFavourite ? "Saved to favourites" : "Removed from favourites",
                  {
                    native: true,
                  }
                );
              }}
            />
          </YGroup.Item>
          <YGroup.Item>
            <ListItem
              hoverTheme
              pressTheme
              title="Share on social"
              icon={ShareIcon}
              onPress={async () => {
                await Share.share({ message: data.perma_url });
              }}
            />
          </YGroup.Item>
        </YGroup>
      </SheetModal>
    </Fragment>
  );
}

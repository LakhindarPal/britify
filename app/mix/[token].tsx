import { HeroBanner, ListItem } from "components";
import { Redirect, type RelativePathString, useLocalSearchParams } from "expo-router";
import { getMixDetail } from "fetchers";
import useSWR from "swr";
import { ScrollView, Separator, SizableText, Spinner, XStack, YStack } from "tamagui";
import { listDuration } from "utilities";

export default function MixScreen() {
  const { token } = useLocalSearchParams();
  const { data, error, isLoading } = useSWR(["/mix", token], getMixDetail);

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

  return (
    <ScrollView px="$4" bg="$background" showsVerticalScrollIndicator={false}>
      <HeroBanner
        id={data?.id!}
        title={data?.title!}
        subtitle={data?.subtitle}
        type="playlist"
        image={data?.image!}
        perma_url={data?.perma_url!}
        description={data?.header_desc}
        songs={data?.list!}
      >
        <XStack>
          <SizableText>{listDuration(data?.list)}</SizableText>
        </XStack>
      </HeroBanner>
      <Separator my="$1.5" />
      <YStack>
        {data?.list.map((it) => (
          <ListItem key={it.id} {...it} />
        ))}
      </YStack>
    </ScrollView>
  );
}

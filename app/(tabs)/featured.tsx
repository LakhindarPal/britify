import { CardItem, Dropdown } from "components";
import languages from "constants/languages";
import { getFeaturedPlaylists } from "fetchers";
import { useState } from "react";
import useSWR from "swr";
import { ScrollView, Separator, Spinner, XStack, YStack } from "tamagui";

export default function FeaturedScreen() {
  const [lang, setLang] = useState("for you");
  const { data, isLoading } = useSWR([`/featured`, lang], getFeaturedPlaylists);

  if (isLoading) {
    return (
      <YStack bg="$background" flex={1} items="center" justify="center">
        <Spinner size="large" />
      </YStack>
    );
  }

  return (
    <YStack flex={1} bg="$background" px="$2" pt="$4">
      <XStack justify="center">
        <Dropdown
          val={lang}
          setValue={setLang}
          options={["for you", ...languages]}
          label="Select language"
        />
      </XStack>
      <Separator my="$3" />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={true}
        flex={1}
        contentContainerStyle={{
          flexDirection: "row",
          flexWrap: "wrap",
          justify: "center",
          gap: "$3",
          pb: "$4",
        }}
      >
        {data?.map((it) => (
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
  );
}

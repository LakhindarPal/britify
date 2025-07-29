import { CardItem, Dropdown } from "components";
import Languages from "constants/languages";
import { getTrendingData } from "fetchers";
import { useState } from "react";
import useSWR from "swr";
import { Button, ScrollView, Separator, Spinner, XGroup, XStack, YStack } from "tamagui";

export default function TrendingScreen() {
  const [type, setType] = useState("song");
  const [lang, setLang] = useState("hindi");
  const { data, isLoading } = useSWR([`/trending`, type, lang], getTrendingData);

  if (isLoading) {
    return (
      <YStack bg="$background" flex={1} items="center" justify="center">
        <Spinner size="large" />
      </YStack>
    );
  }

  return (
    <YStack flex={1} bg="$background" px="$2" pt="$4">
      <XStack justify="center" flexWrap="wrap" gap="$2">
        <XGroup gap="$5" mb="$3">
          {["Song", "Album", "Playlist"].map((it) => (
            <XGroup.Item key={it}>
              <Button
                size="$3"
                rounded="$11"
                onPress={() => setType(it.toLowerCase())}
                hoverTheme
                pressTheme
              >
                {it + "s"}
              </Button>
            </XGroup.Item>
          ))}
        </XGroup>
        <Dropdown
          val={lang}
          setValue={setLang}
          options={Languages}
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

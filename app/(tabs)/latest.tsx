import { CardItem, Dropdown } from "components";
import languages from "constants/languages";
import { getLatestData } from "fetchers";
import { useState } from "react";
import useSWR from "swr";
import {
  ScrollView,
  Separator,
  SizableText,
  Spinner,
  Tabs,
  XStack,
  YStack,
} from "tamagui";
import { groupBy, toCapitalize } from "utilities";

export default function LatestScreen() {
  const [lang, setLang] = useState("for you");
  const { data: raw, isLoading } = useSWR([`/latest`, lang], getLatestData);
  const data = groupBy(raw, (t) => t.type);

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
      <Tabs
        defaultValue="song"
        orientation="horizontal"
        flexDirection="column"
        flex={1}
        borderColor="$borderColor"
      >
        <Tabs.List justifyContent="space-around" bg="$background">
          {["song", "album"].map((v) => (
            <Tabs.Tab key={v} value={v} focusStyle={{ backgroundColor: "$color3" }}>
              <SizableText fontSize="$5" fontWeight="700">
                {toCapitalize(v)}
              </SizableText>
            </Tabs.Tab>
          ))}
        </Tabs.List>
        <Separator my="$2" />
        {Object.entries(data).map(([type, items]) => (
          <Tabs.Content key={type} value={type} flex={1}>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={true}
              pt="$3"
              flex={1}
              contentContainerStyle={{
                flexDirection: "row",
                flexWrap: "wrap",
                justify: "center",
                gap: "$3",
                pb: "$4",
              }}
            >
              {items.map((it) => (
                <CardItem
                  key={it.id}
                  title={it.title}
                  subtitle={it.subtitle}
                  image={it.image}
                  perma_url={it.perma_url}
                />
              ))}
            </ScrollView>
          </Tabs.Content>
        ))}
      </Tabs>
    </YStack>
  );
}

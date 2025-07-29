import { Search as SearchIcon } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Button, Form, Input, XGroup, YStack } from "tamagui";

const tabs = [
  { label: "All", path: "" },
  { label: "Songs", path: "songs/" },
  { label: "Albums", path: "albums/" },
  { label: "Playlists", path: "playlists/" },
  { label: "Artists", path: "artists/" },
];

function gotoSearch(query: string, path?: string) {
  router.navigate(`/search/${path ?? ""}${encodeURIComponent(query)}`);
}

export function SearchBox({ query }: { query: string }) {
  const [value, setValue] = useState(query);

  return (
    <YStack rowGap="$2" mt="$4">
      <Form
        items="center"
        flexDirection="row"
        gap="$2"
        onSubmit={() => gotoSearch(value)}
      >
        <Input
          flex={1}
          size="$3"
          value={value}
          onChangeText={setValue}
          py="$0.5"
          focusStyle={{ borderColor: "$accentColor" }}
          enterKeyHint="search"
          onSubmitEditing={() => gotoSearch(value)}
        />
        <Form.Trigger asChild>
          <Button size="$3" icon={SearchIcon} hoverTheme pressTheme></Button>
        </Form.Trigger>
      </Form>
      <XGroup gap="$1" mb="$3" justify="space-around">
        {tabs.map(({ label, path }) => (
          <XGroup.Item key={label}>
            <Button size="$3" rounded="$11" onPress={() => gotoSearch(value, path)}>
              {label}
            </Button>
          </XGroup.Item>
        ))}
      </XGroup>
    </YStack>
  );
}

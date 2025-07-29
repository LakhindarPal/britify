import { Anchor, Paragraph, View, XStack } from "tamagui";

export default function AboutScreen() {
  return (
    <View flex={1} items="center" justify="center" bg="$background">
      <XStack gap="$2">
        <Paragraph text="center">Made with Love by</Paragraph>
        <Anchor color="$red10" href="https://github.com/LakhindarPal" target="_blank">
          @Lakhindar
        </Anchor>
      </XStack>
    </View>
  );
}

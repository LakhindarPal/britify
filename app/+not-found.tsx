import { Link, Stack } from "expo-router";
import { Fragment } from "react";
import { SizableText, Text, YStack } from "tamagui";

export default function NotFoundScreen() {
  return (
    <Fragment>
      <Stack.Screen options={{ title: "Oops!" }} />
      <YStack bg="$background" flex={1} items="center" justify="center">
        <Text>This screen doesn't exist.</Text>
        <Link href="/">
          <SizableText color="$blue10">Go to home screen!</SizableText>
        </Link>
      </YStack>
    </Fragment>
  );
}

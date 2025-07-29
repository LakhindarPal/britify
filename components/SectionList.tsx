import { Fragment } from "react";
import { H2, ScrollView, Separator, YStack } from "tamagui";
import { CardItem } from "./CardItem";

export function SectionList({ data }: { data: Record<string, any[] | undefined> }) {
  return Object.entries(data)
    .filter(([_, items]) => !!items?.length)
    .map(([heading, items], idx, arr) => (
      <Fragment key={heading}>
        <YStack>
          <H2 fontSize="$5" fontWeight="700" mb="$2" $sm={{ fontSize: "$4" }}>
            {heading}
          </H2>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            mb="$2"
            contentContainerStyle={{
              gap: "$2",
              pr: "$2",
            }}
          >
            {items?.map((it) => (
              <CardItem
                key={it.id}
                title={it.title || it.name}
                subtitle={it.subtitle || it.description}
                image={it.image}
                perma_url={it.perma_url}
              />
            ))}
          </ScrollView>
        </YStack>
        {idx !== arr.length - 1 && <Separator my="$1.5" />}
      </Fragment>
    ));
}

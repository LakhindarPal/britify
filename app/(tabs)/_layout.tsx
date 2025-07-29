import {
  BadgeInfo,
  BookHeart as BookHeartIcon,
  Flame as FlameIcon,
  Home as HomeIcon,
  Rocket as RocketIcon,
  Star as StarIcon,
} from "@tamagui/lucide-icons";
import { FloatingPlayer } from "components";
import { Link, router, Tabs } from "expo-router";
import { Fragment } from "react";
import { useTheme } from "tamagui";

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Fragment>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: theme.red10.val,
          tabBarStyle: {
            backgroundColor: theme.background.val,
            borderTopColor: theme.borderColor.val,
          },
          headerStyle: {
            backgroundColor: theme.background.val,
            borderBottomColor: theme.borderColor.val,
          },
          headerTintColor: theme.color.val,
          headerRight: () => (
            <Link href="/about" asChild>
              <BadgeInfo mr="$4" />
            </Link>
          ),
          headerSearchBarOptions: {
            placeholder: "Search for music...",
            autoFocus: true,
            onSubmitEditing: (event) => {
              const query = event.nativeEvent.text.trim();
              if (query) {
                router.navigate(`/search/${encodeURIComponent(query)}`);
              }
            },
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => <HomeIcon color={color as any} />,
          }}
        />
        <Tabs.Screen
          name="trending"
          options={{
            title: "Trending",
            tabBarIcon: ({ color }) => <FlameIcon color={color as any} />,
          }}
        />
        <Tabs.Screen
          name="latest"
          options={{
            title: "Latest",
            tabBarIcon: ({ color }) => <RocketIcon color={color as any} />,
          }}
        />
        <Tabs.Screen
          name="featured"
          options={{
            title: "Featured",
            tabBarIcon: ({ color }) => <StarIcon color={color as any} />,
          }}
        />
        <Tabs.Screen
          name="favourites"
          options={{
            title: "Favourites",
            tabBarIcon: ({ color }) => <BookHeartIcon color={color as any} />,
          }}
        />
      </Tabs>
      <FloatingPlayer />
    </Fragment>
  );
}

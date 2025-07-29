import "../tamagui-web.css";

import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { initializeDB } from "database";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { PlaybackService, setupPlayer } from "player";
import { useEffect } from "react";
import { Linking, useColorScheme } from "react-native";
import TrackPlayer from "react-native-track-player";
import Provider from "./Provider";

//register playback service
TrackPlayer.registerPlaybackService(() => PlaybackService);

// Catch any errors thrown by the Layout component.
export { ErrorBoundary } from "expo-router";

// Ensure that reloading on `/modal` keeps a back button present.
export const unstable_settings = { initialRouteName: "(tabs)" };

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [interLoaded, interError] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  // Setup player, load fonts, Hide the splash screen
  useEffect(() => {
    if (interLoaded || interError) SplashScreen.hideAsync();
    setupPlayer();
    initializeDB();
  }, [interLoaded, interError]);

  if (!interLoaded && !interError) return null;

  return (
    <Providers>
      <RootLayoutNav />
    </Providers>
  );
}

const Providers = ({ children }: { children: React.ReactNode }) => (
  <Provider>{children}</Provider>
);

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  useEffect(() => {
    // Handle URL when app is cold-started by notification
    Linking.getInitialURL().then((url) => {
      if (url === "trackplayer://notification.click") router.replace("/player");
    });

    // Handle URL when app is already open
    const subscription = Linking.addEventListener("url", ({ url }) => {
      if (url === "trackplayer://notification.click") router.replace("/player");
    });

    return () => subscription.remove();
  }, []); // runs once on mount

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        <Stack.Screen
          name="player"
          options={{
            presentation: "card",
            gestureEnabled: true,
            gestureDirection: "vertical",
            animationDuration: 400,
            headerShown: false,
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}

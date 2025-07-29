import type { Track as RntpTrack } from "react-native-track-player";

export interface Track extends RntpTrack {
  id: string;
  title: string;
  artist: string;
  artwork: string;
  url: string;
  perma_url: string;
  duration: number;
  album: string;
  album_url: string;
  language: string;
  date: string;
  explicit: boolean;
  has_lyrics: boolean;
}

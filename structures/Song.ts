import type { ArtistMap } from "./Artist";
import type { Language } from "./Language";
import type { MediaType } from "./MediaType";
import type { Module } from "./Module";

export interface ListSong {
  id: string;
  title: string;
  subtitle: string;
  header_desc?: string;
  type: MediaType.Song;
  perma_url: string;
  image: string;
  language: Language;
  year: string;
  play_count: string;
  explicit_content: "0" | "1";
  list_count: string;
  list_type?: string;
  list?: string;
  more_info: ListSongMoreInfo;
  modules?: null;
  button_tooltip_info: unknown[];
}

interface ListSongMoreInfo {
  music: string;
  album_id: string;
  album: string;
  label: string;
  label_id: string;
  origin: Origin;
  is_dolby_content: boolean;
  "320kbps": string;
  encrypted_media_url: string;
  encrypted_cache_url?: string;
  encrypted_drm_cache_url?: string;
  encrypted_drm_media_url: string;
  album_url: string;
  duration: string;
  rights: Rights;
  cache_state: "true" | "false";
  has_lyrics: "true" | "false";
  lyrics_snippet: string;
  starred: "true" | "false";
  copyright_text: string;
  artistMap: ArtistMap;
  release_date: string;
  label_url?: string;
  vcode: string;
  vlink: string;
  triller_available: boolean;
  request_jiotune_flag: boolean;
  webp: "true" | "false";
  lyrics_id?: string;
}

enum Origin {
  None = "none",
  Playlist = "playlist",
  Album = "album",
  Artist = "artist",
}

interface Rights {
  code: string;
  cacheable: "true" | "false";
  delete_cached_object: "true" | "false";
  reason?: string;
}

export interface SongDetail {
  songs: [ListSong];
  modules: SongDetailModules;
}

interface SongDetailModules {
  reco: Module<{
    pid: string;
    language: Language;
  }>;
  currentlyTrending: Module<{
    entity_type: MediaType.Song;
    entity_language: Language;
  }>;
  songsBysameArtists: Module<{
    artist_ids: string;
    song_id: string;
    language: Language;
  }>;
  songsBysameActors: Module<{
    actor_ids: string;
    song_id: string;
    language: Language;
  }>;
  artists: Module;
}

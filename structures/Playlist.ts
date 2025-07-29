import type { BaseArtist } from "./Artist";
import type { Language } from "./Language";
import type { MediaType } from "./MediaType";
import type { Module } from "./Module";
import type { ListSong } from "./Song";

export interface BasePlaylist {
  id: string;
  title: string;
  subtitle: string;
  header_desc?: string;
  type: MediaType.Playlist;
  perma_url: string;
  image: string;
  language?: Language;
  year?: string;
  play_count?: string;
  explicit_content: "0" | "1";
  list_count: string;
  list_type?: string;
  list?: [];
  more_info: PlaylistMoreInfo;
  modules?: null;
  button_tooltip_info: unknown[];
}

interface PlaylistMoreInfo {
  listid: string;
  isWeekly: "true" | "false";
  listname: string;
  firstname: string;
  song_count: string;
  follower_count: string;
  fan_count: string;
}

export interface TopPlaylist {
  id: string;
  title: string;
  subtitle: string;
  type: MediaType.Playlist;
  image: string;
  perma_url: string;
  explicit_content: "0" | "1";
  more_info: TopPlaylistMoreInfo;
  mini_obj: boolean;
}

interface TopPlaylistMoreInfo {
  song_count: string;
  firstname: string | "JioSaavn";
  follower_count: string;
  last_updated: string;
  uid: string | "phulki_user";
}

export interface Chart {
  id: string;
  image: string;
  title: string;
  type: MediaType.Playlist;
  count: number;
  perma_url: string;
  more_info: ChartMoreInfo;
}

interface ChartMoreInfo {
  firstname: "JioSaavn";
}

export interface RecoPlaylist extends Omit<TopPlaylist, "more_info"> {
  more_info: ChartMoreInfo;
}

export interface BaseMix {
  id: string;
  title: string;
  subtitle?: string;
  header_desc?: string;
  type: MediaType.Mix;
  perma_url: string;
  image: string;
  language?: Language;
  year?: string;
  play_count?: string;
  explicit_content: "0" | "1";
  list_count: string;
  list_type?: string;
  list?: [];
  more_info: BaseMixMoreInfo;
  button_tooltip_info: unknown[];
  description?: null;
}

interface BaseMixMoreInfo {
  firstname: string;
  lastname: string;
  type: MediaType.Mix;
}

export interface PlaylistDetail
  extends Omit<BasePlaylist, "modules" | "list" | "more_info"> {
  list: ListSong[];
  more_info: PlaylistDetailMoreInfo;
  modules: PlaylistDetailModules;
}

interface PlaylistDetailMoreInfo {
  uid: string | "phulki_user";
  contents: string;
  is_dolby_content: boolean;
  subtype: unknown[];
  last_updated: string;
  username: string;
  firstname: string;
  lastname: string;
  is_followed: "true" | "false";
  isFY: boolean;
  follower_count: string;
  fan_count: string;
  playlist_type: string;
  share: string;
  sub_types: unknown[];
  images: unknown[];
  H2: string | null;
  subheading: string | null;
  video_count: string;
  artists: BaseArtist[];
  subtitle_desc: [string, string, string]; // duration, Count Songs, Number Fans
}

interface PlaylistDetailModules {
  list: Module;
  relatedPlaylist: Module<{ listid: string }>;
  currentlyTrendingPlaylists: Module<{
    entity_type: MediaType.Playlist;
    entity_language: Language;
  }>;
  artists: Module;
}

export interface MixDetail extends Omit<BaseMix, "modules" | "list" | "more_info"> {
  header_desc: string;
  list: ListSong[];
  more_info: MixDetailMoreInfo;
  modules: MixDetailModules;
}

interface MixDetailMoreInfo {
  uid?: null;
  last_updated: string;
  username: null;
  firstname: string;
  lastname: string;
  is_followed?: "true" | "false";
  playlist_type: MediaType.Mix;
  share: string;
}

interface MixDetailModules {
  list: Module;
}

export interface FeaturedPlaylists {
  data: TopPlaylist[];
  count: number;
  last_page: boolean;
}

export interface ResultPlaylist extends Omit<TopPlaylist, "more_info"> {
  numsongs: null;
  more_info: ResultPlaylistMoreInfo;
}

interface ResultPlaylistMoreInfo {
  uid: string;
  firstname: string | "JioSaavn";
  artist_name?: [string];
  entity_type: MediaType.Playlist;
  entity_sub_type?: string;
  video_available: boolean;
  is_dolby_content: null;
  sub_types: null;
  images: null;
  lastname: "Editor" | string;
  song_count: string;
  language: Language;
}

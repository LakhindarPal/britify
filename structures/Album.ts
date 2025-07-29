import type { ArtistMap } from "./Artist";
import type { Language } from "./Language";
import type { MediaType } from "./MediaType";
import type { Module } from "./Module";
import type { ListSong } from "./Song";

export interface BaseAlbum {
  id: string;
  title: string;
  subtitle?: string;
  header_desc?: string;
  type: MediaType.Album;
  perma_url: string;
  image: string;
  language: Language;
  year?: string;
  play_count?: string;
  explicit_content: "0" | "1";
  list_count?: string;
  list_type?: MediaType.Song;
  list?: "";
  more_info: BaseAlbumMoreInfo;
  modules?: null;
  button_tooltip_info: unknown[];
}

interface BaseAlbumMoreInfo {
  release_date: string;
  song_count: string;
  artistMap: ArtistMap;
}

export interface RecoAlbum extends Omit<BaseAlbum, "language" | "more_info"> {
  language?: string;
  more_info: {
    mini_obj: "true" | "false";
  };
}

export interface AlbumDetail extends Omit<BaseAlbum, "modules" | "list" | "more_info"> {
  list: ListSong[];
  more_info: AlbumDetailMoreInfo;
  modules: AlbumDetailModules;
}

interface AlbumDetailMoreInfo {
  song_count: string;
  artistMap: ArtistMap;
  copyright_text: string;
  is_dolby_content: boolean;
  label_url: string;
}

interface AlbumDetailModules {
  list: Module;
  reco: Module<{ albumid: string }>;
  currentlyTrending: Module<{
    entity_type: MediaType.Album;
    entity_language: Language;
  }>;
  topAlbumsFromSameYear: Module<{
    album_year: string;
    album_lang: Language;
  }>;
  artists: Module;
}

export interface ResultAlbum extends Omit<BaseAlbum, "modules" | "more_info"> {
  more_info: ResultAlbumMoreInfo;
}

interface ResultAlbumMoreInfo {
  query: string;
  text: string;
  music: string;
  song_count: string;
  artistMap: ArtistMap;
}

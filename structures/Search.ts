import type { BaseAlbum, ResultAlbum } from "./Album";
import type { ResultArtist } from "./Artist";
import type { Language } from "./Language";
import type { MediaType } from "./MediaType";
import type { ResultPlaylist } from "./Playlist";
import type { ListSong } from "./Song";

export interface AutoSearch {
  albums: Albums;
  songs: Songs;
  playlists: Playlists;
  artists: Artists;
  topquery: TopQuery;
  shows: Shows;
  episodes: Albums;
}

interface Albums {
  data: SearchAlbum[];
  position: number;
}

export interface SearchAlbum
  extends Omit<BaseAlbum, "language" | "more_info" | "button_tooltip_info"> {
  description: string;
  mini_obj: "true" | "false";
  more_info: SearchAlbumMoreInfo;
}

interface SearchAlbumMoreInfo {
  music: string;
  ctr: number;
  year: string;
  is_movie: "1" | "0";
  language: Language;
  song_pids: string; //comma separated
}

interface Artists {
  data: SearchArtist[];
  position: number;
}

export interface SearchArtist {
  id: string;
  title: string;
  image: string;
  extra: string;
  type: MediaType.Artist;
  mini_obj: boolean;
  isRadioPresent: boolean;
  ctr: number;
  entity: number;
  description: string;
  position: number;
}

interface Playlists {
  data: SearchPlaylist[];
  position: number;
}

export interface SearchPlaylist
  extends Omit<
    BaseAlbum,
    "language" | "more_info" | "button_tooltip_info" | "list_count" | "list"
  > {
  description: string;
  mini_obj: "true" | "false";
  more_info: SearchPlaylistMoreInfo;
}

interface SearchPlaylistMoreInfo {
  firstname: "Saavn" | string;
  artist_name: null;
  entity_type: MediaType.Playlist;
  entity_sub_type: string;
  video_available: boolean;
  is_dolby_content: boolean;
  sub_types: null;
  images: null;
  lastname: "Editor" | string;
  language: Language;
}

interface Shows {
  data: SearchShows[];
  position: number;
}

export interface SearchShows {
  id: string;
  title: string;
  subtitle: string;
  type: string;
  image: string;
  perma_url: string;
  more_info: SearchShowsMoreInfo;
  explicit_content: string;
  mini_obj: boolean;
  description: string;
}

interface SearchShowsMoreInfo {
  season_number: number;
}

interface Songs {
  data: SearchSong[];
  position: number;
}

export interface SearchSong
  extends Omit<
    ListSong,
    | "language"
    | "year"
    | "play_count"
    | "list_count"
    | "more_info"
    | "button_tooltip_info"
  > {
  mini_obj: boolean;
  description: string;
  more_info: SearchSongMoreInfo;
}

interface SearchSongMoreInfo {
  album: string;
  album_id: string;
  ctr: 1452;
  score: string;
  vcode: string;
  vlink: string;
  primary_artists: string;
  singers: string;
  video_available: null;
  triller_available: boolean;
  language: Language;
}

interface TopQuery {
  data: TopItem[];
  position: number;
}

export type TopItem = SearchSong | SearchAlbum | SearchPlaylist | SearchShows;

export interface AlbumSearch {
  total: number;
  start: number;
  results: ResultAlbum[];
}

export interface SongSearch {
  total: number;
  start: number;
  results: ListSong[];
}

export interface PlaylistSearch {
  total: number;
  start: number;
  results: ResultPlaylist[];
}

export interface ArtistSearch {
  total: number;
  start: number;
  results: ResultArtist[];
}

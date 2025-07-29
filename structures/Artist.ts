import type { ResultAlbum } from "./Album";
import type { Language } from "./Language";
import type { MediaType } from "./MediaType";
import type { Module } from "./Module";
import type { ResultPlaylist } from "./Playlist";
import type { ListSong } from "./Song";

export interface BaseArtist {
  id: string;
  name: string;
  role?: string;
  image?: string;
  type: MediaType.Artist;
  perma_url: string;
}

export interface ArtistMap {
  primary_artists: BaseArtist[];
  featured_artists: BaseArtist[];
  artists: BaseArtist[];
}

export interface ArtistOverview {
  artistId: string;
  name: string;
  subtitle: string;
  image: string;
  follower_count: string;
  type: MediaType.Artist;
  isVerified: boolean;
  dominantLanguage: Language;
  dominantType: string;
  topSongs: ListSong[];
  topAlbums: ResultAlbum[];
  dedicated_artist_playlist: ResultPlaylist[];
  featured_artist_playlist: ResultPlaylist[];
  singles: ResultAlbum[];
  latest_release: ResultAlbum[];
  similarArtists: BaseArtist[];
  isRadioPresent: true;
  bio: "[]";
  dob?: "";
  fb: string;
  twitter: string;
  wiki: string;
  urls: {
    albums: string;
    bio: string;
    comments: string;
    songs: string;
    overview: string;
  };
  availableLanguages: Language[];
  fan_count: string;
  topEpisodes: unknown[];
  is_followed: boolean;
  modules: {
    topSongs: Module;
    latest_release: Module;
    topAlbums: Module;
    dedicated_artist_playlist: Module;
    featured_artist_playlist: Module;
    singles: Module;
  };
}

export interface ResultArtist extends BaseArtist {
  ctr: number;
  entity: number;
  image: string;
  role: string;
  mini_obj: boolean;
  isRadioPresent: boolean;
  is_followed: boolean;
}

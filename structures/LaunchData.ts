import type { BaseAlbum } from "./Album";
import type { BaseChannel } from "./Channel";
import type { Module } from "./Module";
import type { BaseMix, BasePlaylist, Chart, TopPlaylist } from "./Playlist";
import type { ArtistReco, Radio } from "./Radio";
import type { ListSong } from "./Song";

type PromoVXData = {
  [key in `promo:vx:data:${string}`]?: unknown[];
};

export interface LaunchData extends PromoVXData {
  history: unknown[];
  new_trending: TrendingItem[];
  top_playlists: TopPlaylist[];
  new_albums: newItem[];
  browse_discover: BaseChannel[];
  global_config: GlobalConfig;
  charts: Chart[];
  radio: Radio[];
  artist_recos: ArtistReco[];
  tag_mixes: BaseMix[];
  modules: LaunchDataModules;
}

export type TrendingItem = ListSong | BaseAlbum | BasePlaylist;
export type newItem = ListSong | BaseAlbum;

interface GlobalConfig {
  weekly_top_songs_listid: { [Language: string]: WeeklyTopSong };
  random_songs_listid: { [Language: string]: WeeklyTopSong };
  phn_otp_providers: { string: string };
}

interface WeeklyTopSong {
  listid: string;
  image: string;
  title: string;
  count: number;
}

type PromoVxModule = {
  [key in `promo:vx:data:${string}`]?: Module;
};

export interface LaunchDataModules extends PromoVxModule {
  history: unknown[];
  new_trending: Module;
  top_playlists: Module;
  new_albums: Module;
  browse_discover: Module;
  global_config: Module;
  charts: Module;
  radio: Module;
  artist_recos: Module;
  tag_mixes: Module;
}

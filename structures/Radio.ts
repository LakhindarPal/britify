import type { Language } from "./Language";
import type { MediaType } from "./MediaType";

export interface Radio {
  id: string;
  title: string;
  subtitle: string;
  type: MediaType.Radio;
  image: string;
  perma_url: string;
  more_info: RadioMoreInfo;
  explicit_content: "0" | "1";
  mini_obj: boolean;
}

interface RadioMoreInfo {
  description: string;
  featured_station_type: "featured";
  query?: string;
  color: string;
  language: Language;
  station_display_text: string;
}

export interface ArtistReco {
  id: string;
  title: string;
  subtitle: string;
  type: MediaType.Radio;
  image: string;
  perma_url: string;
  more_info: ArtistRecoMoreInfo;
  explicit_content: "0" | "1";
  mini_obj: boolean;
}

interface ArtistRecoMoreInfo {
  featured_station_type: "featured";
  query: string;
  station_display_text: string;
}

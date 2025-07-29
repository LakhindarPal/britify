import type { MediaType } from "./MediaType";

export interface BaseChannel {
  id: string;
  title: string;
  subtitle?: string;
  type: MediaType.Channel;
  image: string;
  perma_url: string;
  more_info: BaseChannelMoreInfo;
  explicit_content: "0" | "1";
  mini_obj: boolean;
}

interface BaseChannelMoreInfo {
  badge: string;
  sub_type: string;
  available: string;
  is_featured: string;
  tags: unknown[] | ChannelTags;
  video_url: string;
  video_thumbnail: string;
}

interface ChannelTags {
  mood?: string[];
  situation?: string[];
  seasonality?: string[];
  genre?: string[];
}

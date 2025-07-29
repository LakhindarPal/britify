export interface FavouriteItem {
  id: string;
  title: string;
  subtitle?: string;
  perma_url: string;
  type: "song" | "album" | "playlist" | "artist";
  image: string;
}

import he from "he";
import type { ListSong, Track } from "structures";
import { decryptMedia } from "./decryptMedia";

export function createTrack(data: ListSong): Track {
  return {
    id: data.id,
    title: he.decode(data.title),
    artist: he.decode(data.subtitle),
    artwork: data.image?.replace("150x150.jpg", "500x500.jpg"),
    perma_url: data.perma_url,
    url: decryptMedia(data.more_info.encrypted_media_url),
    album: he.decode(data.more_info.album),
    album_url: data.more_info.album_url,
    duration: Number(data.more_info.duration),
    language: data.language,
    date: data.more_info.release_date + "T00:00:00+05:30",
    explicit: Boolean(data.explicit_content === "1"),
    has_lyrics: Boolean(data.more_info.has_lyrics === "true"),
  };
}

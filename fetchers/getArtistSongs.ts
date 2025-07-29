import { sources } from "constants/Api";
import type { ListSong } from "structures";
import { buildApi, randomUA } from "utilities";

type Props = [string, { artist_ids: string; song_id: string; language: string }];

export async function getArtistSongs([, params]: Props): Promise<ListSong[]> {
  const resp = await fetch(buildApi(sources.artist_songs, params), {
    headers: {
      accept: "application/json, text/plain, */*",
      "User-Agent": randomUA(),
    },
  });

  if (!resp.ok) throw new Error("Failed to fetch other top songs by same artists");

  const data = await resp.json();

  if (!data.length) throw new Error("There is no other top songs by same artists");

  return data;
}

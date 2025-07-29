import { sources } from "constants/Api";
import type { Lyrics } from "structures";
import { buildApi, randomUA } from "utilities";

export async function getSongLyrics([_, lyrics_id]: [string, string]): Promise<Lyrics> {
  if (!lyrics_id) throw new Error("Lyrics Id not provied");

  const resp = await fetch(buildApi(sources.song_lyrics, { lyrics_id }), {
    headers: {
      accept: "application/json, text/plain, */*",
      "User-Agent": randomUA(),
    },
  });

  if (!resp.ok) throw new Error("Failed to fetch song lyrics");

  const data = await resp.json();

  return data;
}

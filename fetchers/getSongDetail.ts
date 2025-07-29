import { sources } from "constants/Api";
import type { SongDetail } from "structures";
import { buildApi, randomUA } from "utilities";

export async function getSongDetail([_, token]: [string, string]): Promise<SongDetail> {
  const resp = await fetch(buildApi(sources.song_detail, { token }), {
    headers: {
      accept: "application/json, text/plain, */*",
      "User-Agent": randomUA(),
    },
  });

  if (!resp.ok) throw new Error("Failed to fetch song data");

  const data = await resp.json();

  if (!data.songs.length) throw new Error("Invalid song token provided");

  return data;
}

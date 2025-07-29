import { sources } from "constants/Api";
import type { SongSearch } from "structures";
import { buildApi, randomUA } from "utilities";

type Props = [string, { q: string; p: number }];

export async function getSearchSongs([_, params]: Props): Promise<SongSearch> {
  const resp = await fetch(buildApi(sources.song_search, params), {
    headers: {
      accept: "application/json, text/plain, */*",
      "User-Agent": randomUA(),
    },
  });

  if (!resp.ok) throw new Error("Failed to fetch search data");

  const data: SongSearch = await resp.json();

  if (!data.results.length)
    throw new Error("No song results found for this search query");

  return data;
}

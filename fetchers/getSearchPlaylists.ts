import { sources } from "constants/Api";
import type { PlaylistSearch } from "structures";
import { buildApi, randomUA } from "utilities";

type Props = [string, { q: string; p: number }];

export async function getSearchPlaylists([_, params]: Props): Promise<PlaylistSearch> {
  const resp = await fetch(buildApi(sources.playlist_search, params), {
    headers: {
      accept: "application/json, text/plain, */*",
      "User-Agent": randomUA(),
    },
  });

  if (!resp.ok) throw new Error("Failed to fetch search data");

  const data: PlaylistSearch = await resp.json();

  if (!data.results.length)
    throw new Error("No playlist results found for this search query");

  return data;
}
